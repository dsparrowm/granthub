## Quick context (what this project is)

- Vite + React + TypeScript app scaffolded with shadcn-ui and Tailwind.
- Key libs: @tanstack/react-query for data fetching, react-router-dom for routing, lucide-react for icons, and a large `src/components/ui` component set (shadcn pattern).
- Source entry: `src/main.tsx` -> `src/App.tsx`. Pages live in `src/pages/` (e.g., `Grants.tsx`, `GrantDetail.tsx`).

## How the app is wired (big picture)

- Routing: `App.tsx` contains a BrowserRouter with explicit routes. Add new routes in `src/App.tsx` above the catch-all `"*"` route.
- Global state / data fetching: `QueryClientProvider` wraps the app (see `src/App.tsx`) — use `@tanstack/react-query` hooks for server state.
- UI components: reusable primitives live under `src/components/ui/` (e.g., `button.tsx`, `input.tsx`, `toaster.tsx`). Prefer these over adding raw markup.
- CSS: Tailwind is used; `index.css` is imported in `src/main.tsx`. Tailwind config is at `tailwind.config.ts`.

## Build & dev commands (exact)

- Install: `npm i` (project uses npm by default)
- Dev server: `npm run dev` → Vite (host: ::, port: 8080 per `vite.config.ts`)
- Build: `npm run build` (also `build:dev` available)
- Preview production build: `npm run preview`
- Lint: `npm run lint` (uses ESLint)

Use these exact scripts when creating tasks, CI steps, or test commands.

## Project-specific conventions & pitfalls for code edits

- Path alias: `@` maps to `./src` (see `vite.config.ts`). Import using `@/components/...` or `@/pages/...` instead of relative `../../../` paths.
- Routes: Add new pages under `src/pages/` and wire them in `src/App.tsx`. There's an explicit comment in `App.tsx` reminding contributors to add routes above the `"*"` route.
- UI component pattern: `src/components/ui/*` follows shadcn-style primitives (small, composable components). When adding visual pieces, prefer creating a component under `src/components/ui/` for reuse.
- Toaster & notifications: Project contains two toaster implementations: `Toaster` and `Sonner` components imported from `@/components/ui/*`. Keep both presence in mind (removing one may change UX unexpectedly).
- Data fetching: Use react-query patterns (QueryClient is created in `App.tsx`). Avoid direct fetches in components that should use queries/mutations — prefer `useQuery` / `useMutation`.

## Integration points / environment

- Vite plugin: `lovable-tagger` is enabled in development mode in `vite.config.ts` — it may add dev-only build tags. Avoid changing plugin usage without checking dev preview behavior.
- No server/backend code in repo — external APIs are used from pages; search for fetch/axios in `src/pages` when changing data flows.

## Example edits (concrete, copyable)

- Add a route for a new page `src/pages/Foo.tsx`:

  1. Create `src/pages/Foo.tsx` (TSX component exporting default).
  2. Import and add route in `src/App.tsx`: ` <Route path="/foo" element={<Foo />} />` above `path="*"`.

- Create a reusable button:

  1. Add `src/components/ui/MyButton.tsx` exporting a small wrapper around `button.tsx` styles.
  2. Import via `@/components/ui/MyButton`.

## Files to look at for examples

- Routing and app composition: `src/App.tsx`
- Entry + CSS: `src/main.tsx`, `src/index.css`
- Component primitives: `src/components/ui/` (many small files)
- Page examples: `src/pages/Index.tsx`, `src/pages/Grants.tsx`, `src/pages/GrantDetail.tsx`
- Build/config: `package.json`, `vite.config.ts`, `tailwind.config.ts`

## What to avoid / quick checks for PR reviewers

- Don’t break the `@` alias imports; run the dev server after changes: `npm run dev`.
- If editing layout or shared UI, search `src/components/ui` first — duplication is common if PRs add new ad-hoc components.
- Check for react-query usage consistency (avoid mixing local fetch logic and query caching patterns).

If anything here looks wrong or you want more examples (e.g., a template PR with a new page + tests), tell me which area to expand. — Thanks!
