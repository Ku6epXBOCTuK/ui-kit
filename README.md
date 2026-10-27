# @ku6epxboctuk/ui

Personal Svelte 5 UI kit: design tokens, headless behaviour and styled components, extracted from three projects that each grew their own.

Status: token layer is done. Headless and component layers are being built.

## Layers

| Import | What it is | CSS |
| --- | --- | --- |
| `@ku6epxboctuk/ui/tokens.css` | the token contract plus the `tool` theme, light and dark | yes |
| `@ku6epxboctuk/ui/kawaii.css` | the second theme preset, light and dark | yes |
| `src/headless/*` | `.svelte.ts` state machines, no styles, no markup | none |
| `src/ui/*` | Svelte components built on the headless layer and the tokens | own, scoped |

The tokens are the only way a component learns how it should look. A component never hardcodes a colour, size or duration, and never checks which theme is active.

## Tokens

61 custom properties, all prefixed `--ui-`, in six groups.

Surfaces: `--ui-bg --ui-bg-muted --ui-surface --ui-panel --ui-field --ui-hover --ui-selected --ui-backdrop`

Text: `--ui-fg --ui-fg-secondary --ui-fg-muted --ui-on-accent --ui-on-danger`

Lines: `--ui-line --ui-line-strong --ui-line-w`

Intent: `--ui-accent --ui-accent-hover --ui-accent-ink --ui-accent-surface --ui-success --ui-success-surface --ui-warning --ui-warning-surface --ui-danger --ui-danger-surface --ui-info --ui-focus`

Shape: `--ui-r-chip --ui-r-control --ui-r-panel --ui-r-pill --ui-shadow-color --ui-shadow-control --ui-shadow-raised --ui-shadow-panel --ui-shadow-pop`

Density and type: `--ui-control-h-sm|md|lg --ui-space-1..8 --ui-font --ui-font-mono --ui-fs-xs|sm|md|lg|xl --ui-lh --ui-label-font --ui-label-transform --ui-label-track --ui-duration`

Plus `--ui-brand-seed`, the one input the `tool` theme is generated from.

Intent colours come in six tones only: neutral, accent, success, warning, danger, info. Domain palettes, such as the task statuses of `xboct-log`, stay in the application.

`tool` is generated from `tokens/tool.src.css`, where colours are authored as `hct()`. `pnpm build:themes` transpiles them to plain hex, so no consumer needs a PostCSS plugin. `kawaii` is written directly in `oklch()`.

## Using it

```css
@import "@ku6epxboctuk/ui/tokens.css";
@import "@ku6epxboctuk/ui/kawaii.css";
```

```html
<html data-ui-theme="tool" data-ui-mode="dark">
```

`tokens.css` already applies `tool` to `:root`. Pick another look by setting `data-ui-theme` to `tool` or `kawaii` on any element, and `data-ui-mode` to `light` or `dark`. Both attributes work on a nested container, which is how the preview shows four panes on one page.

Fonts are not shipped. The `tool` theme expects `@fontsource/ibm-plex-sans` and `@fontsource/ibm-plex-mono`, `kawaii` expects `@fontsource/nunito` and `@fontsource/comfortaa`. If they are missing the stacks fall back and the layout still holds.

## Headless layer

`src/headless` holds behaviour only: no markup, no CSS, no icons, no strings. The state machines are `.svelte.ts`, so they use runes and stay reactive when a component reads them.

```ts
import { createSelect } from "@ku6epxboctuk/ui/headless/select";
import { createTagInput } from "@ku6epxboctuk/ui/headless/tags";
```

`createSelect<T>(config)` owns `open`, `query`, `filtered`, `active` and `activeIndex`, and returns `show hide toggle setQuery move moveTo pick pickActive handleKeydown`. `handleKeydown` returns whether it consumed the key, so the caller can fall through. Config: `items` and `getLabel` required, then `getKeywords`, `filter`, `onPick`, `closeOnPick` (default true), `onOpen`, `onClose`, `onQuery`, `wrap` (default true).

`createTagInput(config)` wraps a select of suggestions and returns `text available chips select setText clear add commit remove handleKeydown`. A commit splits on whitespace and commas, lowercases, drops duplicates and already chosen tags, then reports the new list through `onChange`. `onUnknown` is awaited for every committed tag that is not in `suggestions`.

Two things to know:

- `show()` and `hide()` reset the query without telling `onQuery`, so an owner that fetches on every keystroke has to clear its own results in `onOpen` and `onClose`.
- Keyboard handling is the machine's job, focus and scroll position are the component's. `activeIndex` is there for `aria-activedescendant`.

## Scripts

- `pnpm build:themes` writes `tokens/tool.css` from `tokens/tool.src.css`. Run it after editing the source.
- `pnpm check:tokens` asserts that both themes define the same 61 names, that a dark block only overrides names from its own light block, that no `hct()` reaches a shipped file, and that every `var(--ui-*)` in the package and the preview resolves.
- `pnpm test` runs the headless specs in `src/**/*.spec.svelte.ts`.
- `pnpm check` runs `svelte-check` against `tsconfig.json`.
- `pnpm preview` serves the token page on http://localhost:4321/preview/ with all four theme and mode combinations side by side.

## Known properties of the source themes

`tool` keeps the accent and the success tone on neighbouring hues, so a success badge and an accent badge look alike. That is how `easy-image-tools` looks today; the kit reproduces it rather than fixing it silently. The same goes for `--ui-info`, which is magenta in that project.

`kawaii` has no type scale in its source, so `--ui-fs-*` was derived from the handful of hardcoded sizes the site uses. Treat those five steps as an approximation until the site is migrated onto them.

## Migration

An application migrates in three moves:

1. Import the tokens and add one `compat.css` that aliases the project's current names onto the `--ui-*` ones. Nothing else changes yet, and the look stays identical.
2. Replace components one at a time with the kit versions, deleting the matching aliases as their last consumer goes.
3. Delete `compat.css` once it is only aliases nobody reads.

`xboct-log` is the first target. Its 73 components keep working through the alias file while the interactive ones are rebuilt on the headless layer.
