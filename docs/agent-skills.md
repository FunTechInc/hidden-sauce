# Agent Skills

Internal maintainer note.

## Installed

The boilerplate tracks project-scoped Codex skills in `.agents/skills/`.

```sh
npx skills add vercel-labs/next-skills --skill next-best-practices -a codex --copy -y
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices --skill vercel-composition-patterns --skill web-design-guidelines -a codex --copy -y
npx skills add vercel/components.build --skill building-components -a codex --copy -y
```

## Update

```sh
npm run skills:update
```

The update command updates project skills from `skills-lock.json`.

## Not Installed By Default

- `next-upgrade`: use only for framework upgrades.
- `next-cache-components`: use only when enabling Cache Components/PPR.
- `workflow`: not needed for static-first websites.
- `ai-sdk`, `ai-elements`, `streamdown`: install only for AI features.

## Structure Notes

- `components/` and `hooks/` are shared boilerplate utilities. Reuse or refine them before creating equivalents.
- `app/**/_components` is for route-local components only.
- `css/` is the authored style source. Generated CSS output should not be committed.
- The microCMS sample is a removable reference implementation for CMS-backed pages.
