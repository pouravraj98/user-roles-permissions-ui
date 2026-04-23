# Dashboard Prototype — Pattern Reference

Last updated: 2026-04-23 (added SSO page + Login page)

Use this file during `/design` instead of reading through all prototype code. Update this file whenever the prototype is modified.

---

## Tech Stack

- React 19.2.0, React Router 7.12.0 (HashRouter)
- Vite 7.2.4, Tailwind CSS v4.1.18
- Font: Inter (system-ui fallback)
- No global state library — pure React hooks (useState, useEffect, useRef)

## File Structure

```
src/
├── App.jsx                    — Router + layout wrapper
├── main.jsx                   — Entry point
├── index.css                  — Tailwind imports + Inter font
├── components/
│   ├── Sidebar.jsx            — Main navigation sidebar
│   ├── PageHeader.jsx         — Page title + tab navigation
│   └── PermissionsTable.jsx   — Complex permissions matrix
└── pages/
    ├── Users.jsx              — User management (stub)
    ├── Groups.jsx             — Group listing + search/filters
    ├── GroupDetails.jsx       — Group details + member permissions
    ├── ChatSettings.jsx       — Multi-section settings form
    ├── ConversationExplorer.jsx — 3-panel conversation viewer
    ├── NotificationSettings.jsx — Tab-based notification config
    ├── ModerationSettings.jsx — Rule management + detail modals
    ├── AIAgents.jsx           — Agent grid + toggles
    ├── BYOAgents.jsx          — Agent list + tabs
    ├── ConnectAgent.jsx       — Agent connection form
    ├── AuditLogs.jsx          — Audit log viewer (table, filters, side panel, plan-gated)
    ├── SSO.jsx                — SAML SSO config page (empty/enabled/enforced/gated, 5-step wizard)
    └── Login.jsx              — Dashboard login page (standalone, not in Layout)
```

## Master Layout

```
┌─────────────────┬──────────────────────────────┐
│  Sidebar (fixed)│  Main Content (flex-1)       │
│  Left nav       │  overflow-auto               │
│  App selector   │                              │
└─────────────────┴──────────────────────────────┘
```

```jsx
<div className="flex h-screen bg-gray-50">
  <Sidebar activePage={activePage} />
  <main className="flex-1 flex flex-col overflow-hidden">
    {children}
  </main>
</div>
```

## Navigation Structure

**GENERAL:**
- Overview (not implemented)
- User & Groups → Users `/users`, Groups `/groups`, User Roles `/user-roles`

**PRODUCTS:**
- Chat & Messaging → Get Started `/chats/get-started`, Logs `/chats/logs`, Conversation Explorer `/chats/conversation-explorer`, Features `/chats/features`, Moderation (external link), Analytics (external link), Settings `/chats/settings`, Widgets `/chats/widgets`
- Voice & Video (placeholder)
- AI Agents → Get Started `/ai-agents/get-started`, AI Agents `/ai-agents`
- BYO Agents → Get Started `/byo-agents/get-started`, BYO Agents `/byo-agents`, Custom Bots `/byo-agents/custom-bots`

**FEATURES:**
- Moderation → Get Started, Logs, Settings `/moderation/settings`
- Notifications → Get Started `/notifications/get-started`, Logs `/notifications/logs`, Settings `/notifications/settings`
- Insights

**ACCOUNT:**
- Application → Credentials `/application/credentials`, Webhooks `/application/webhooks`, Team Members `/application/team-members`, SSO `/application/sso`, Audit Logs `/application/audit-logs`, Plans & Billing `/application/plans`, Settings `/application/settings`
- Profile (chevron)
- Resources (chevron)

**STANDALONE (outside Layout):**
- Login `/login` — Dashboard login page, no sidebar

Sidebar auto-expands submenus based on `activePage` prop. Active item: `bg-gray-100 text-gray-900 font-medium`. Cross-links (external) use arrow icon.

## Page Layout Patterns

### Pattern A: Header + Scrollable Content
Used by: Groups, Users, AI Agents
- Fixed header: `bg-white border-b` with title + CTA buttons
- Scrollable area: `flex-1 overflow-auto`
- Content: Grid-based table or card list

### Pattern B: Tab Navigation
Used by: User Roles, BYO Agents, Notification Settings
- Header with title (optional back arrow)
- Underline tabs: `border-b-2 border-gray-900` (active) / `border-transparent` (inactive)
- Tab content switches via `activeTab` state

### Pattern C: 3-Panel Layout
Used by: Conversation Explorer
- Left panel (320px fixed): Conversation list + search/filters
- Center panel (flex-1): Message thread + search
- Right panel (380px fixed): Metadata sidebar
- Selected conversation: `bg-purple-50` + left `purple-500` border

### Pattern D: Settings Form
Used by: Chat Settings, Notification Settings, Moderation Settings
- Title section with description
- Toggle rows with descriptions
- Expandable sections
- Info tooltips on hover
- Save/Cancel buttons at bottom

### Pattern E: List + Detail Form
Used by: BYO Agents, AI Agents
- Header with description + action buttons
- Tab navigation
- Grid/list of items with toggles

### Pattern F: Configuration Form
Used by: Connect Agent
- Horizontal scrolling platform selector
- Left-aligned form below
- Max-width: `max-w-2xl`

### Pattern H: Status Card + Toggles + Wizard Modal
Used by: SSO
- Header with title/subtitle + state switcher (prototype only: gated/empty/enabled/enforced)
- Four view states: `gated` (blurred + upgrade CTA — reuses Audit Logs gate pattern), `empty` (centered setup card with IdP logos + primary CTA), `enabled` (status card + toggles), `enforced` (status card + purple info banner with break-glass Owner + toggles)
- **Status card:** colored brand-initial square (48px) + name + status pill (green=Enabled, purple=Enforced) + right-aligned secondary actions (Test Connection, Reconfigure)
- **Enforcement banner (purple):** purple-50 bg + purple-200 border + shield icon + break-glass Owner row (white card inside the banner)
- **Toggle list card:** `bg-white rounded-xl border divide-y` with toggle rows (label+description on left, toggle on right)
- **Danger zone:** separate card with red-bordered action button
- **Wizard modal:** 5-step modal with progress bar — `max-w-2xl`, step header ("Step N of 5"), progress bar (purple-500), Continue disabled until step is valid, Back/Cancel on left, Continue/Enable on right
- **Confirmation modals:** amber icon for warning (enforce), red icon for destructive (disable); bullet list of consequences with check-circle icons

### Pattern I: Authentication Page (Standalone)
Used by: Login
- Standalone full-screen layout — NOT inside main Layout/Sidebar
- Top-left: "cometchat" wordmark (22px, `font-normal` + `font-semibold`)
- Centered column: `max-w-md` with `mt-8`
- Welcome heading → social login buttons → "Or" divider → email/password → submit → sign-up link
- Social buttons: full-width white + gray border, inline brand SVG icon
- Three views via state switcher (prototype only): `default`, `sso-email` (email entry step after clicking "Sign in with SSO"), `redirecting` (spinner + IdP callout)
- SSO email entry view: back button + purple icon tile + heading + email input + Continue button

### Pattern G: Filterable Table + Side Panel
Used by: Audit Logs
- Header with title/subtitle + Export and Filter buttons (top-right)
- Filter button toggles chip row below header (+ icon prefix, search + checkboxes dropdown, Clear/Apply footer)
- Section filter drives Action filter options (dependent filters)
- Table inside `bg-white rounded-xl border` card with `p-6` wrapper
- Clickable rows open 400px side panel from right (overlay with slide animation)
- Side panel: resource headline, action/outcome/source badges, actor row, 2-col metadata grid, changes section (before/after for updates, key-value list for create/delete/events)
- Pagination below table card
- Three states: populated, empty (disabled buttons visible), plan-gated (blurred + upgrade CTA, disabled buttons visible)
- Investigation pivot: clicking actor name applies purple filter chip

## Components

### Sidebar (`components/Sidebar.jsx`)
- Hierarchical menu with auto-expanding submenus
- App selector at bottom (shows app name + ID)
- Active state: `bg-gray-100 text-gray-900 font-medium`

### PageHeader (`components/PageHeader.jsx`)
- Page title + optional tab navigation
- Underline-style tabs

### PermissionsTable (`components/PermissionsTable.jsx`)
- Complex matrix with 6 categories (Users, Messages, Threads, Reactions, Groups, Calls)
- Value types: `allow_deny` (ScopeSelect), `mode` (ScopeSelect), `array` (MultiSelect)
- Draft vs saved state pattern
- Edit/Save/Cancel/Reset flow with confirmation modal

### Toggle
Used in: ChatSettings, NotificationSettings, ModerationSettings, AIAgents, BYOAgents
```jsx
<div className="h-6 w-11 rounded-full transition-colors {enabled ? 'bg-purple-500' : 'bg-gray-200'}">
  <div className="h-5 w-5 rounded-full bg-white shadow transform transition-transform" />
</div>
```

### Dropdown
Fixed-position overlay with backdrop click to close:
```jsx
{isOpen && (
  <>
    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
    <div className="absolute right-0 mt-1 ... z-20">{options}</div>
  </>
)}
```

### Modal
Centered with fixed backdrop:
- Backdrop: `fixed inset-0 bg-black/50`
- Content: `rounded-2xl shadow-xl max-w-*`
- Footer: Cancel + Action buttons
- Danger actions: red styling

### Search + Filter
Used in: Conversation Explorer, Groups
- Left icon + input + right filter button
- Real-time filtering via `useState`
- Search highlighting: `<mark className="bg-yellow-200">`

### Tables
- Grid-based (`grid grid-cols-*`), not HTML `<table>`
- Header: `bg-gray-50` with `text-xs font-medium text-gray-500 uppercase tracking-wider`
- Rows: `border-b hover:bg-gray-50`
- Action column on right

### Cards
- `bg-white border border-gray-200 rounded-xl shadow-sm`
- Hover: `hover:border-purple-300` or `hover:bg-gray-50`

### Empty States
- Icon + title + description + optional CTA button
- Centered in content area
- Examples: "No conversations found", "No groups found"

### Side Panel (Overlay)
Used in: Audit Logs
- 400px, slides from right with `slideInRight` animation
- Header with title + close (X) button
- Sections separated by `border-b border-gray-100`
- Backdrop click to close

### Filter Chips (Expandable)
Used in: Audit Logs
- Toggled by Filter button in header
- Rounded-full chips with `+` icon prefix
- Dropdown: search input + checkbox options + Clear/Apply footer
- Active filter: `border-purple-300 bg-purple-50 text-purple-700`

### Plan-Gated State (Blurred Upgrade CTA)
Used in: Audit Logs, SSO
- Blurred sample content: `filter: blur(4px)`, `pointer-events-none select-none`
- Overlay: `bg-white/60` with centered card
- Card: `rounded-2xl shadow-lg` with icon, title, description, purple CTA button
- For table-style pages (Audit Logs): Export/Filter buttons visible but disabled
- For settings-style pages (SSO): placeholder cards with gray rounded shapes

### Copy-to-Clipboard Input Row
Used in: SSO wizard Step 2
- Label (`text-[10px] font-semibold text-gray-500 uppercase tracking-wider`)
- Flex row: read-only input (`bg-white border rounded-lg font-mono text-xs`) + Copy button
- Copy button shows "Copied" with green checkmark for 1.5s after click

### Multi-Step Wizard Modal
Used in: SSO setup
- Modal: `max-w-2xl rounded-2xl shadow-xl` with `max-h-[90vh]`
- Header (flex-shrink-0): Title + "Step N of 5" + close X
- Progress bar (flex-shrink-0): `h-1 bg-gray-100` with `bg-purple-500` fill at `(step/total)*100%`
- Body (flex-1 overflow-auto): step content
- Footer (flex-shrink-0): Back/Cancel on left, Continue/Enable on right; Continue disabled until step valid
- Step validation examples: IdP picked (step 1), metadata parsed (step 3), test passed (step 4)

### Simulated External Auth Flow
Used in: SSO Test Connection (wizard Step 4)
- Centered in gray-50 card inside modal
- Four states via `useState`: `idle` (icon + CTA button), `running` (animate-spin for 1.5s), `success` (green check + details), `failure` (red alert + error message)
- On success: allows progression to next wizard step

### Toast/Feedback
- Confirmation modals for save/reset/delete
- Success modal states (checkmark + text)
- Warning alerts: `bg-amber-50` with icon

## Design Tokens

### Colors
| Purpose | Token |
|---------|-------|
| Primary text | `text-gray-900` |
| Secondary text | `text-gray-500` |
| Tertiary text | `text-gray-400` |
| Accent/Active | `purple-500`, `purple-600` |
| Page background | `bg-gray-50` |
| Card background | `bg-white` |
| Hover background | `bg-gray-100` |
| Primary border | `border-gray-200` |
| Subtle border | `border-gray-100` |
| Success/Approve | `bg-green-50 text-green-800` |
| Warning/Flag | `bg-amber-50 text-amber-800` |
| Danger/Block | `bg-red-50 text-red-800` |
| Role: User | `blue-50/600` |
| Role: Group | `purple-50/600` |
| Role: Password | `amber-50` |

### Typography
| Use | Classes |
|-----|---------|
| Page title | `text-xl font-semibold text-gray-900` |
| Section title | `text-sm font-medium text-gray-900` |
| Body | `text-sm text-gray-900` |
| Secondary body | `text-sm text-gray-500` |
| Table header | `text-xs font-medium text-gray-500 uppercase tracking-wider` |
| Label | `text-xs font-medium text-gray-500 uppercase tracking-wider` |

### Spacing
- Padding: `p-3`, `p-4`, `p-5`, `p-6`, `p-8`
- Gap: `gap-2`, `gap-3`, `gap-4`, `gap-6`
- Common section margin: `mb-4`, `mb-6`

### Border Radius
- Buttons/inputs: `rounded-lg`
- Cards/containers: `rounded-xl`
- Modals: `rounded-2xl`
- Badges/avatars: `rounded-full`

### Shadows
- Cards/buttons: `shadow-sm`
- Modals: `shadow-lg` or `shadow-xl`
- No shadow on most elements

### Transitions
- Hover/focus: `transition-colors`
- Toggles: `transition-transform`
- General: `transition-all`

## Interaction Patterns

### Form Save Flow
1. Click Edit → controls become editable (draft state)
2. Make changes → draft state updated
3. Click Save → confirmation modal appears
4. Confirm → draft promoted to saved state, edit mode exits
5. Cancel → draft discarded, reverts to saved state

### Toggle Enable/Disable
- Click toggle → state flips immediately
- No confirmation for simple toggles
- Destructive toggles may show confirmation

### Tab Switching
- Click tab → `activeTab` state changes
- Underline indicator moves to active tab
- Content re-renders for new tab

### Search & Filter
- Type in search → real-time filter via `useState`
- Apply dropdown filters → combine with search
- Clear filters → reset to all

### Moderation States (Conversation Explorer)
- `approved`: Green badge, normal styling
- `flagged`: Amber background + amber-400 left border + badge
- `blocked`: Red background + red badge + content replaced with icon

### Hover Actions (Conversation Explorer)
- Mouse enter row → action buttons appear (absolute positioned)
- Actions: edit, delete, ban, flag
- Mouse leave → actions disappear

## Avatar System
- 6 gradient colors: blue→indigo, emerald→teal, purple→pink, amber→orange, cyan→blue, rose→red
- Hash-based color selection from user ID/name
- Size: typically `w-8 h-8` or `w-10 h-10` with `rounded-full`

## States NOT Yet Implemented
- Network error states (forms assume success)
- Input validation error feedback
- Permission denied screens
- Loading skeletons
- Mobile responsive layouts (all fixed px widths)

## RBAC Roles (Data Model)
6 roles: Owner, Admin, Billing, Developer, Moderator, Analyst
- Full permission matrix in PermissionsTable component
- 6 categories: Users, Messages, Threads, Reactions, Groups, Calls
