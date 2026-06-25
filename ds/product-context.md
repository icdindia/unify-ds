# Product Context — UnifyApps

Compiled from public sources (UnifyApps.com via search results, ICD case-study summary). Used to ground realistic copy, personas, sample data, and tone for every design task. Not marketing — only what changes my output.

---

## What Unify is

**UnifyApps** — "Enterprise Operating System for AI." A unified enterprise AI orchestration + automation platform. Turns fragmented enterprise systems into governed, AI-native workflows and agents.

One-liner for cap-friendly copy: *"Build AI-native enterprise apps and agents on a single platform with 1000+ pre-built connectors."*

Funding: Series B ($50M, Oct 2025). Growth: 600%+ YoY. Design partner: **Itu Chaudhuri Design (ICD)** — same team behind the DS this repo mirrors.

---

## Product surface (5 modules)

Use these names exactly when referencing products in copy. They're branded.

| Module | What it does | Common UI references |
|---|---|---|
| **Unify Applications** | No-code app builder. Build internal/external apps 10x faster, zero coding. | App canvas, component picker, screen builder, preview pane |
| **Unify AI Agents** (Agentic AI) | Build external (customer-facing) or internal (employee-facing) AI agents. LLM-agnostic. Multi-agent orchestration with a manager agent. | Agent builder, prompt configurator, agent runs, agent skills, conversation log |
| **Unify Integrations** | 1000+ pre-built connectors to enterprise apps + databases. Core layer everything else sits on. | Connector catalog, connection config, test connection, mapping, sync status |
| **Unify Data** | ETL/Reverse ETL across apps and databases. Data Catalog. Master Data Management. Real-time pipelines for AI apps. | Pipeline builder, schema mapping, catalog browse, MDM rules, run history |
| **Unify Automations** | Build business logic and automate workflows. Invokable by AI agents. | Flow canvas, trigger setup, step config, run log, dispatcher |

---

## Customers (use for realistic sample logos / references)

HDFC Bank · Deutsche Telekom · Contentstack · Lowe's · Belcorp · Sirion Labs · WalkMe · Air Arabia · Liva Insurance · Abu Dhabi government · Dubai government.

When inventing a fictional customer for a sample screen, match this profile: large enterprise (Fortune 500-scale), regulated industry (BFSI / telecom / retail / public sector / healthcare / travel), global or APAC presence.

---

## Industries served

Banking & financial services · Insurance · Retail · Telecom · Healthcare · Public sector · Travel · Technology.

When the brief doesn't specify, default to **banking** or **insurance** for sample data — they're the most-cited and rules around governance/compliance are well-understood.

---

## Personas (reuse these across flows for consistency)

Names chosen to reflect the customer base (Indian, MENA, global enterprise).

| Persona | Role | Uses Unify for |
|---|---|---|
| **Priya Kumar** | CIO at mid-cap insurer | Strategic oversight of agents/automations, compliance reporting |
| **Raj Mehta** | Integration Platform Admin | Connector setup, data flow config, sync monitoring |
| **Sarah Chen** | AI Workflow Builder (business analyst) | No-code app builder, agent prompt design |
| **Ahmed Khan** | Operations Lead at retail bank | Workflow runs, claims processing, exception handling |
| **Aisha Patel** | App Developer (low-code) | Building customer-facing apps, embedding agents |

Keep persona names consistent within a single flow. Don't mix across flows unless the brief calls for it.

---

## Sample data conventions

**Connector / app names** (when listing integrations): Salesforce, HubSpot, NetSuite, Workday, ServiceNow, SAP, Slack, Microsoft Teams, Outlook, Snowflake, BigQuery, PostgreSQL, MySQL, S3, Stripe, Zendesk, Jira, Confluence.

**Agent names** (when listing agents in a console):
- Claims Pre-Auth Agent
- Reconciliation Agent
- Order Status Bot
- Pricing Assistant
- Compliance Reviewer
- Onboarding Coordinator
- Renewal Notifier

**Workflow names** (when listing automations):
- New Employee Onboarding
- Claims Processing — Hospital Network
- Order Reconciliation — Daily
- Vendor Invoice Approval
- Lead-to-Account Sync
- Quarterly Audit Pull

**Currency / numbers**: ₹ / $ / € depending on customer locale. Mid-range enterprise values (e.g. ₹4.2L claims processed, $1.2M GMV, 87% SLA).

**Dates**: realistic recent dates (2026), e.g. "Updated 12 May 2026 · 2:34 PM IST".

---

## Voice & tone

Inferred from public copy. Confirm against any sample real screens when available.

- **Enterprise-confident, not breathy.** "Build" / "orchestrate" / "govern" / "scale" beat "amazing" / "magical".
- **AI-native vocabulary is fine** — "agent", "orchestration", "LLM-agnostic", "multi-agent", "governed workflow". Use without scare quotes.
- **Concrete over abstract.** "Automate hospital pre-authorisation across 200 networks" beats "transform your operations."
- **Mix outcomes + mechanism.** Bare outcome claims feel marketing-y; pair with the how.
- **No exclamation marks** in product UI. Reserved for marketing surfaces.
- **Active voice.** "Sync runs every 5 minutes" not "Syncs are run every 5 minutes."

---

## Design / UX conventions worth noting

- Design built end-to-end by ICD — DS this repo mirrors is theirs, so consistency is expected; don't reinvent core patterns.
- AI agent / automation UX is the platform's distinctive surface — these get more thoughtful treatment than CRUD screens.
- "Governance" / "auditability" are recurring themes — surfaces like audit log, change history, permission scopes, approval flows are first-class.
- The product is **CIO-facing as well as builder-facing** — surfaces should read clean enough for senior decision makers without being dumbed down for builders.

---

## What's missing (flag in chat when relevant)

- Real screenshots of production UI (the public site has marketing visuals; production screens not seen).
- Documented internal copy guidelines (style guide, glossary of approved terms).
- Specific A11y targets beyond WCAG AA (any AAA, motion preferences, etc.).

When a brief brushes against any of these, ask before inventing.
