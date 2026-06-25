#!/usr/bin/env bash
# ds/tokens/_resolver.sh
#
# Single entry point for resolving any token reference to its terminal value.
# Wraps the three alias conventions used across the JSON token files in one
# place so agents/users don't have to reason about per-file syntax. The JSON
# files mirror Figma 1:1 and must not be hand-edited — this script only
# READS them.
#
# Conventions handled:
#   {Palette.<Group>.<step>}    -> colors.json    (e.g. {Palette.Brand.600})
#   {spacing-<size>}            -> spacing.json   (.Spacing.Base)
#   {radius-<size>}             -> radius.json    (.Radius.Base)
#   <Size>/<Weight>             -> typography.json (.styles)
#   Button-<size>               -> typography.json (.aliases -> .styles)
#
# Resolution is recursive — a semantic role chains through to colors.json,
# a spacing component value chains through to spacing.Base, etc.
#
# Usage:
#   _resolver.sh "{Palette.Brand.600}"            # palette hex      -> #0f2805
#   _resolver.sh "{spacing-md}"                   # spacing px       -> 8
#   _resolver.sh "{radius-md}"                    # radius px        -> 8
#   _resolver.sh "Text md/Semibold"               # type style obj
#   _resolver.sh "Button-md"                      # alias -> style obj
#   _resolver.sh --semantic "text-primary (900)"             # both modes
#   _resolver.sh --semantic "text-primary (900)" --mode dark # one mode
#   _resolver.sh --test                                      # sanity checks
#   _resolver.sh --help

set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
COLORS="$DIR/colors.json"
SEMANTIC="$DIR/semantic.json"
SPACING="$DIR/spacing.json"
RADIUS="$DIR/radius.json"
TYPOGRAPHY="$DIR/typography.json"

unwrap() {
    local s="$1"
    s="${s#\{}"
    s="${s%\}}"
    printf '%s' "$s"
}

resolve_palette() {
    # Input: Palette.<Group>.<step> — always 3 dot-separated tokens.
    local key="$1"
    local rest="${key#Palette.}"
    local step="${rest##*.}"
    local group="${rest%.*}"
    jq -r --arg g "$group" --arg s "$step" \
        '.Palette[$g][$s] // ("(not found: Palette." + $g + "." + $s + ")")' \
        "$COLORS"
}

resolve_spacing() {
    local key="$1"
    jq -r --arg k "$key" \
        '.Spacing.Base[$k] // ("(not found: " + $k + ")")' "$SPACING"
}

resolve_radius() {
    local key="$1"
    jq -r --arg k "$key" \
        '.Radius.Base[$k] // ("(not found: " + $k + ")")' "$RADIUS"
}

resolve_typography() {
    # Check aliases first (Button-md, etc.), then fall through to styles.
    local key="$1"
    local mapped
    mapped=$(jq -r --arg k "$key" '.aliases[$k] // empty' "$TYPOGRAPHY")
    [[ -n "$mapped" ]] && key="$mapped"
    jq -c --arg k "$key" \
        '.styles[$k] // ("(not found: " + $k + ")")' "$TYPOGRAPHY"
}

resolve_one() {
    # Single-step dispatch by prefix. No recursion.
    local ref="$1"
    local stripped
    if [[ "$ref" == "{"*"}" ]]; then
        stripped=$(unwrap "$ref")
    else
        stripped="$ref"
    fi
    case "$stripped" in
        Palette.*)  resolve_palette    "$stripped" ;;
        spacing-*)  resolve_spacing    "$stripped" ;;
        radius-*)   resolve_radius     "$stripped" ;;
        Button-*)   resolve_typography "$stripped" ;;
        *"/"*)      resolve_typography "$stripped" ;;
        *)
            echo "Unknown convention: $stripped" >&2
            echo "Hint: brace-wrapped aliases ({Palette.x.y}, {spacing-md}, {radius-md}) or typography style names (Text md/Semibold) or aliases (Button-md)." >&2
            return 1
            ;;
    esac
}

resolve() {
    # Entry-level resolve with recursion. If a resolved value is itself a
    # brace-wrapped alias (e.g. spacing.Buttons.md.left -> {spacing-lg}),
    # chase it. Bare hex / numbers / typography JSON objects are terminal.
    local ref="$1"
    local result
    result=$(resolve_one "$ref")
    case "$result" in
        "{Palette."*"}"|"{spacing-"*"}"|"{radius-"*"}")
            resolve "$result"
            ;;
        *)
            printf '%s\n' "$result"
            ;;
    esac
}

resolve_semantic_role() {
    # Walk semantic.json for an entry whose key matches the role under the
    # selected mode(s). Returns the alias, then resolves it through to hex.
    local role="$1"
    local mode="${2:-both}"
    local m
    for m in "Light mode" "Dark mode"; do
        [[ "$mode" == "light" && "$m" != "Light mode" ]] && continue
        [[ "$mode" == "dark"  && "$m" != "Dark mode"  ]] && continue
        local alias_val
        alias_val=$(jq -r --arg m "$m" --arg r "$role" '
            ."1. Colors".modes[$m]
            | [ .. | objects | to_entries[] | select(.key == $r) | .value ]
            | first // empty
        ' "$SEMANTIC")
        if [[ -n "$alias_val" ]]; then
            printf '%-11s | %-60s | %s\n' "$m" "$alias_val" "$(resolve "$alias_val")"
        else
            printf '%-11s | (role not found: %s)\n' "$m" "$role"
        fi
    done
}

usage() {
    sed -n '/^# ds\/tokens\/_resolver.sh/,/^set -euo/p' "$0" | sed -e '$d' -e 's/^# \{0,1\}//'
}

main() {
    case "${1:-}" in
        --semantic)
            shift
            local role="${1:-}"
            local mode="both"
            [[ -z "$role" ]] && { echo "--semantic requires a role name" >&2; exit 1; }
            if [[ "${2:-}" == "--mode" ]]; then mode="${3:-both}"; fi
            resolve_semantic_role "$role" "$mode"
            ;;
        --test)
            printf '== Direct lookups ==\n'
            printf '  Palette.Brand.600       -> %s\n' "$(resolve '{Palette.Brand.600}')"
            printf '  Palette.Gray (light mode).900 -> %s\n' "$(resolve '{Palette.Gray (light mode).900}')"
            printf '  spacing-md              -> %s\n' "$(resolve '{spacing-md}')"
            printf '  radius-md               -> %s\n' "$(resolve '{radius-md}')"
            printf '  radius-full             -> %s\n' "$(resolve '{radius-full}')"
            printf '  Text md/Semibold        -> %s\n' "$(resolve 'Text md/Semibold')"
            printf '  Button-md (alias)       -> %s\n' "$(resolve 'Button-md')"
            printf '\n== Semantic roles (light + dark) ==\n'
            resolve_semantic_role 'text-primary (900)'
            resolve_semantic_role 'text-secondary (700)'
            resolve_semantic_role 'text-quaternary (500)'
            ;;
        -h|--help|'')
            usage
            ;;
        *)
            resolve "$1"
            ;;
    esac
}

main "$@"
