# Agent Rules

This is an internal Next.js/Tailwind boilerplate for static-first, high-quality websites.

## Development Style

This boilerplate is optimized for polished, motion-forward websites rather than large application platforms.

Use the right workflow for the change:

- Tweak-Driven for visual design, motion, interaction, timing, responsive feel, and overall polish. Explore in the browser, tune quickly, then persist final values in normal source files such as typed constants, tokens, classes, or presets.
- Test-Driven for logic, contracts, routing, CMS/data shapes, accessibility-critical behavior, and regressions where the expected behavior can be specified clearly.
- Human-Reviewed for final visual quality. Automated checks support review, but browser/visual inspection remains the quality gate for layout, motion, spacing, and perceived polish.

Do not scatter magic numbers found during visual tuning. Keep meaningful values named, reviewable, and easy to adjust. Development-only tuning tools are allowed only when a derived project needs them; keep them explicitly gated and out of the normal production runtime.

## Agent Decision Protocol

- Clarify scope before implementation when a choice would materially change architecture, UX, data shape, or test strategy.
- For local, low-risk decisions, infer from existing code, this file, and official framework conventions. Share important assumptions in the final report.
- Prefer the smallest change that satisfies the request. Do not abstract, configure, or generalize for hypothetical future needs.
- Keep diffs surgical. Avoid unrelated refactors, incidental formatting churn, preference-only renames, and cleanup of pre-existing dead code unless requested.
- Remove imports, variables, and helpers made unused by your own change.
- For non-trivial changes, define the success condition and verification path before editing.

## Default Skills

Project-scoped Codex skills live in `.agents/skills/` and are tracked by `skills-lock.json`.

Use these as the default review lens:

- `next-best-practices`
- `vercel-react-best-practices`
- `vercel-composition-patterns`
- `building-components`
- `web-design-guidelines`

Do not add app runtime dependencies for agent-only guidance.

## React Rules

- Treat `useEffect` as an escape hatch for external systems such as the DOM, browser APIs, subscriptions, timers, and network synchronization.
- Derive values from props/state during render when possible. Use `useMemo` for expensive pure calculations, event handlers for direct user actions, and `useSyncExternalStore` for external subscriptions.
- Do not drive per-frame motion, scroll progress, pointer movement, or animation timelines through React state. Prefer refs and the existing animation/runtime utilities, then commit only meaningful UI state back to React.
- Keep Client Components narrow. If only a small child needs browser APIs or interaction, keep the parent as a Server Component and isolate the client boundary.

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

Hook reuse map:

| Purpose | Prefer |
| --- | --- |
| SSR-safe layout timing | `useIsomorphicLayoutEffect` |
| Viewport/media queries | `useMediaQuery`, `useWindowResizeObserver` |
| Element measurement | `useResizeObserver` |
| Visibility/intersection | `useIntersectionObserver` |
| Hover state | `useOnHovering` |
| Animation ticker | `useGsapTicker` |
| Locale-aware pathname | `useLocalePathname` |
| Device/touch capability | `useDeviceDetector`, `useIsTouchDevice` |
| Share actions | `useShare` |
| Element validation | `useValidElement` |

Component reuse map:

| Purpose | Prefer |
| --- | --- |
| Locale-aware links | `LocaleLink` |
| Responsive rendering | `MediaQuery` |
| Motion/text/scrollers | `SplitText`, `Parallax`, `ParallaxThumbnail`, `InfinityLoop`, `StableScroller` |
| Media/modal/loading | `Video`, `ModalButton`, `Loader` |
| Forms/disclosure | `FormField`, `Accordion` |
| Text/date/HTML parsing | `HTMLConverter`, `CustomBreakLineParser`, `DateParser` |
| Global/browser setup | `AppSetup`, `Lenis` |

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
