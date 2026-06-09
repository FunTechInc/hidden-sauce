# Agent Rules

This is an internal Next.js/Tailwind boilerplate for static-first, high-quality websites.

## Default Skills

Project-scoped Codex skills live in `.agents/skills/` and are tracked by `skills-lock.json`.

Use these as the default review lens:

- `next-best-practices`
- `vercel-react-best-practices`
- `vercel-composition-patterns`
- `building-components`
- `web-design-guidelines`

Do not add app runtime dependencies for agent-only guidance.

## Scope

- Prefer official Next.js, React, Tailwind, and Vercel patterns.
- Keep the boilerplate minimal and static-first.
- Keep Server Components as the default.
- Add `use client` only for browser APIs, interactivity, animation runtime, or client state.
- Keep global client setup small and intentional.
- Treat microCMS routes as sample infrastructure.
- Do not add Workflow SDK, AI SDK, commerce, auth, database, or background-job infrastructure unless the project explicitly requires it.

## Shared Utilities

`components/` and `hooks/` contain cross-project boilerplate utilities. Before creating a new component, hook, animation helper, media helper, form helper, modal helper, or responsive/browser utility, inspect these directories first and reuse or extend the existing API when it fits.

- Do not regenerate equivalent utilities under app routes or local feature folders.
- Keep shared utilities generic, composable, and project-agnostic.
- Avoid adding project-specific copy, styling, CMS assumptions, or business logic to shared utilities.
- Prefer small API-compatible refinements over replacing an established utility.
- If a derived project needs a one-off variant, keep that variant in the derived project instead of widening this boilerplate utility.

## Directory Responsibilities

- `app/` is the route tree. Put route-local components under `app/**/_components`.
- `components/` is for cross-project UI and browser/runtime utilities.
- `hooks/` is for cross-project React hooks.
- `lib/` is for app infrastructure and shared non-React helpers, grouped by responsibility when it grows.
- `css/` is the source of authored styles. Do not commit generated CSS output such as `src/assets/css/*.min.css`.
- `public/` is for static public assets only.
- `.agents/` is agent guidance and must not be imported by app code.

Use `@/...` imports when shared utilities cross top-level directories, such as `components/` importing from `hooks/` or `lib/`. Relative imports are fine inside a colocated component folder.

## Sample CMS

The microCMS sample routes under `app/[lang]/sample` and the CMS helpers are removable reference implementation, not required boilerplate infrastructure.

- Keep CMS assumptions out of generic `components/` and `hooks/`.
- Do not expand the sample CMS into a required project architecture.
- Derived projects may delete or replace the sample CMS routes and helpers.

## Maintenance Commands

```sh
npm run lint
npm run build
npm run skills:list
npm run skills:update
```

Use `next-upgrade` guidance only during Next.js/React upgrades.
