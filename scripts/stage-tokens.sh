#!/usr/bin/env bash
# scripts/stage-tokens.sh
#
# Stage token JSON exports from a Figma variables plugin (Tokens Studio,
# Variables2JSON, etc.) into ds/tokens/ with proper _meta blocks and a
# normalized shape.
#
# Each target file is OPTIONAL — pass only the ones you have. Missing files
# stay untouched.
#
# Usage:
#   scripts/stage-tokens.sh \
#     --colors path/to/colors-export.json \
#     --semantic path/to/semantic-export.json \
#     --spacing path/to/spacing-export.json \
#     --radius path/to/radius-export.json \
#     --typography path/to/typography-export.json \
#     --ds-file-key qT9zH1YYapGTwpJxwNEGzt
#
# If --ds-file-key is omitted, the _meta blocks will say "TBD" and you can
# fill in ds/config.md later.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TOKENS_DIR="$REPO_ROOT/ds/tokens"
DS_FILE_KEY="TBD"

usage() {
    sed -n '2,22p' "$0" | sed -e 's/^# \{0,1\}//'
    exit 0
}

# Inject a _meta block at the top of a JSON file (preserves the rest)
inject_meta() {
    local file="$1"
    local description="$2"
    local extra_fields="$3"  # optional jq object expression
    local tmp
    tmp=$(mktemp)
    jq --arg desc "$description" \
       --arg key  "$DS_FILE_KEY" \
       --argjson extra "${extra_fields:-{}}" \
       '. as $orig
        | { _meta: ({
            description: $desc,
            source_file_key: $key,
            source: "Exported from Figma via variables plugin; staged by scripts/stage-tokens.sh"
          } + $extra) }
          + ($orig | del(._meta))' \
       "$file" > "$tmp"
    mv "$tmp" "$file"
}

stage_file() {
    local target="$1"        # e.g. colors.json
    local src="$2"           # path to export
    local description="$3"
    local extra="${4:-{}}"
    if [[ -z "$src" ]]; then
        echo "  ⨯ skip $target (no source provided)"
        return
    fi
    if [[ ! -f "$src" ]]; then
        echo "  ⨯ skip $target — source not found: $src"
        return
    fi
    if ! jq empty "$src" > /dev/null 2>&1; then
        echo "  ⨯ skip $target — invalid JSON: $src"
        return
    fi
    cp "$src" "$TOKENS_DIR/$target"
    inject_meta "$TOKENS_DIR/$target" "$description" "$extra"
    echo "  ✓ staged $target"
}

# Parse args
COLORS=""; SEMANTIC=""; SPACING=""; RADIUS=""; TYPOGRAPHY=""
while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--help) usage ;;
        --colors)     COLORS="$2"; shift 2 ;;
        --semantic)   SEMANTIC="$2"; shift 2 ;;
        --spacing)    SPACING="$2"; shift 2 ;;
        --radius)     RADIUS="$2"; shift 2 ;;
        --typography) TYPOGRAPHY="$2"; shift 2 ;;
        --ds-file-key) DS_FILE_KEY="$2"; shift 2 ;;
        *) echo "unknown arg: $1" >&2; exit 1 ;;
    esac
done

mkdir -p "$TOKENS_DIR"

echo "Staging tokens into $TOKENS_DIR (DS file key: $DS_FILE_KEY)..."

stage_file colors.json     "$COLORS"     "Palette color variables. Authoritative source for every hex value used in the DS."
stage_file semantic.json   "$SEMANTIC"   "Semantic color variables with both Light and Dark mode resolutions. Each leaf is an alias string into colors.json."
stage_file spacing.json    "$SPACING"    "Spacing variables — base scale plus optional component-specific entries. Values in px."
stage_file radius.json     "$RADIUS"     "Radius variables — base scale. Values in px."
stage_file typography.json "$TYPOGRAPHY" "Text style catalog. Each entry under styles matches a Figma text-style name verbatim. Bind by setTextStyleIdAsync using keys from ds/figma-keys.md."

echo ""
echo "Next steps:"
echo "  1. Run ds/tokens/_resolver.sh --test  → sanity-check the resolver"
echo "  2. Fill in ds/config.md with the canvas + DS Figma URLs"
echo "  3. Use scripts/probe-keys.md to capture component / text-style / icon keys into ds/figma-keys.md"
echo "  4. Update ds/design-rules.md and ds/product-context.md for your DS"
