# Copilot Instructions for rabbit-view

## Project Overview
A SvelteKit 2 + Svelte 5 application for managing rabbits with PocketBase backend. Uses DaisyUI/Tailwind CSS v4 for styling.

## Tech Stack & Versions
- **Svelte 5** with runes (`$state`, `$effect`, `$derived`, `$props`)
- **SvelteKit 2** with file-based routing
- **PocketBase** (v0.26.3) as backend, running on `http://127.0.0.1:8090`
- **TailwindCSS v4** + DaisyUI v5 for styling
- **pnpm** as package manager

## Architecture Patterns

### State Management
Global state lives in `src/lib/store.svelte.js` using Svelte 5 runes:
```javascript
export let store = $state({
  rabbits: [],
  listRabbits: async () => { /* PocketBase fetch */ },
  editRabbit: async (id, rabbit) => { /* ... */ }
});
```
- **Always** call `store.listRabbits()` after mutations (add/edit/delete) to refresh data
- PocketBase client exported as `pb` from store.svelte.js
- Use `expand: 'rabbithole'` in queries to fetch related data

### Authentication Flow
- Auth check in `+layout.svelte` using `$effect()` - redirects to `/auth` if invalid
- Login calls `pb.collection('users').authWithPassword()` then `store.listRabbits()`
- PocketBase maintains auth state via `pb.authStore.isValid`

### Component Patterns
- Use Svelte 5 `$state()` for local reactive variables, not `let` with `$:` 
- Props: `let { rabbitId = '' } = $props()`
- Event handlers: `onclick={functionName}` (not `on:click`)
- Derived values: `let wrongRabbitName = $derived(rabbit.name.length > 0 && rabbit.name[0] !== 'J')`
- Children: `{@render children?.()}`

### Routing
- Dynamic routes: `/[rabbit]/+page.svelte` access via `$page.params.rabbit`
- Use `goto()` from `$app/navigation` for programmatic navigation
- SSR commented out in `+layout.server.js` - currently client-side only

### Styling
- DaisyUI components: `btn btn-primary`, `card`, `select`, `input`, `alert alert-error`
- Theme switching via `data-theme={theme}` attribute on root element
- Tailwind v4 plugin loaded in `vite.config.js`

## Development Workflow

### Commands
```bash
pnpm dev           # Start dev server
pnpm build         # Production build
pnpm format        # Format with Prettier
```

### PocketBase Setup
Expects PocketBase running at `http://127.0.0.1:8090` with collections:
- `rabbits` (fields: name, rabbithole)
- `rabbitholes` (field: name)
- `users` (email, name, password)

### Business Rules
- **Critical**: Rabbit names MUST start with "J" (validated in RabbitForm)
- Form submission disabled when validation fails

## Key Files
- [src/lib/store.svelte.js](src/lib/store.svelte.js) - Global state & PocketBase client
- [src/routes/+layout.svelte](src/routes/+layout.svelte) - Auth guard, theme switching, navigation
- [src/lib/components/RabbitForm.svelte](src/lib/components/RabbitForm.svelte) - Create/edit pattern with validation
