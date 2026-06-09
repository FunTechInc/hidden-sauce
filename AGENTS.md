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

## Maintenance Commands

```sh
npm run lint
npm run build
npm run skills:list
npm run skills:update
```

Use `next-upgrade` guidance only during Next.js/React upgrades.
