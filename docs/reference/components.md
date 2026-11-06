# Component props

Generated from `interface Props` in `src/components` by `pnpm docs:build`. Do not edit by hand: rerun the command instead.

A prop shown as `bind:name` is bindable; `?` marks an optional prop.

## Badge

```svelte
import Badge from "@ku6epxboctuk/ui-kit/components/Badge.svelte";
```

| Prop        | Type                                                                    | Default     | Description                                                                   |
| ----------- | ----------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------- |
| `tone?`     | `"neutral" \| "accent" \| "success" \| "warning" \| "danger" \| "info"` | `"neutral"` | Colour family: neutral, accent, success, warning, danger or info.             |
| `variant?`  | `"soft" \| "solid" \| "outline"`                                        | `"soft"`    | Soft tint, solid fill or outline.                                             |
| `size?`     | `"xs" \| "sm" \| "md"`                                                  | `"sm"`      | xs, sm or md padding and text step.                                           |
| `dot?`      | `boolean`                                                               | `false`     | Draws a small dot before the label.                                           |
| `color?`    | `string`                                                                |             | A CSS colour that overrides the tone, for data colours outside the six tones. |
| `children?` | `Snippet`                                                               |             | Badge label; text, an icon or both.                                           |
| `class?`    | `string`                                                                | `""`        | Extra classes on the root span.                                               |

## Button

```svelte
import Button from "@ku6epxboctuk/ui-kit/components/Button.svelte";
```

Extends `HTMLButtonAttributes`; those attributes and event handlers pass through.

| Prop           | Type                                              | Default       | Description                                                                                                   |
| -------------- | ------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- |
| `variant?`     | `"primary" \| "secondary" \| "ghost" \| "danger"` | `"secondary"` | primary for the main action, secondary for a normal one, ghost for a quiet one, danger for a destructive one. |
| `size?`        | `"sm" \| "md" \| "lg"`                            | `"md"`        | sm, md or lg height and text step.                                                                            |
| `icon?`        | `Snippet`                                         |               | Snippet before the label; the spinner takes its place while loading.                                          |
| `iconAfter?`   | `Snippet`                                         |               | Snippet after the label; hidden while loading.                                                                |
| `loading?`     | `boolean`                                         | `false`       | Disables the button, sets aria-busy and puts a spinner where the icon goes.                                   |
| `children?`    | `Snippet`                                         |               | Button label.                                                                                                 |
| `bind:element` | `HTMLButtonElement`                               |               | Bindable native button element.                                                                               |

## Checkbox

```svelte
import Checkbox from "@ku6epxboctuk/ui-kit/components/Checkbox.svelte";
```

Extends `Omit<HTMLInputAttributes, "type" | "value" | "checked">`; those attributes and event handlers pass through.

| Prop           | Type      | Default | Description             |
| -------------- | --------- | ------- | ----------------------- |
| `bind:checked` | `boolean` |         | Bindable checked state. |

## Chip

```svelte
import Chip from "@ku6epxboctuk/ui-kit/components/Chip.svelte";
```

| Prop           | Type         | Default | Description                                                                          |
| -------------- | ------------ | ------- | ------------------------------------------------------------------------------------ |
| `onopen?`      | `() => void` |         | Turns the label into a button; without it the chip is static.                        |
| `openLabel?`   | `string`     |         | aria-label of the open button, for when the label text does not describe the action. |
| `onremove?`    | `() => void` |         | Shows the remove button and runs on click.                                           |
| `removeLabel?` | `string`     |         | aria-label of the remove button, for example Remove alpha.                           |
| `unavailable?` | `boolean`    | `false` | Dims the chip and turns the label into a disabled span.                              |
| `hint?`        | `string`     |         | Title shown while the chip is unavailable, to explain why.                           |
| `children?`    | `Snippet`    |         | Chip label.                                                                          |
| `class?`       | `string`     | `""`    | Extra classes on the chip.                                                           |

## ConfirmDialog

```svelte
import ConfirmDialog from
"@ku6epxboctuk/ui-kit/components/ConfirmDialog.svelte";
```

| Prop            | Type         | Default    | Description                                                        |
| --------------- | ------------ | ---------- | ------------------------------------------------------------------ |
| `title`         | `string`     |            | Heading, also the accessible name of the dialog.                   |
| `body?`         | `string`     |            | Plain text body; use children when the body needs markup.          |
| `open?`         | `boolean`    | `true`     | Whether the dialog is shown.                                       |
| `confirmLabel?` | `string`     | `"OK"`     | Text of the confirm button.                                        |
| `cancelLabel?`  | `string`     | `"Cancel"` | Text of the cancel button.                                         |
| `danger?`       | `boolean`    | `true`     | Paints the confirm button as destructive; it is primary otherwise. |
| `disabled?`     | `boolean`    | `false`    | Disables the confirm button, for a confirm that is still running.  |
| `onconfirm`     | `() => void` |            | Called by the confirm button.                                      |
| `oncancel`      | `() => void` |            | Called by the cancel button, Escape and a backdrop click.          |
| `children?`     | `Snippet`    |            | Extra markup under the body.                                       |

## ControlRow

```svelte
import ControlRow from "@ku6epxboctuk/ui-kit/components/ControlRow.svelte";
```

| Prop        | Type                           | Default               | Description                                 |
| ----------- | ------------------------------ | --------------------- | ------------------------------------------- |
| `align?`    | `"start" \| "center" \| "end"` | `"end"`               | Cross-axis alignment: start, center or end. |
| `gap?`      | `string`                       | `"var(--ui-space-2)"` | CSS gap between the children.               |
| `children?` | `Snippet`                      |                       | Leading content.                            |
| `end?`      | `Snippet`                      |                       | Snippet pinned to the right.                |
| `class?`    | `string`                       | `""`                  | Extra classes on the row.                   |

## Field

```svelte
import Field from "@ku6epxboctuk/ui-kit/components/Field.svelte";
```

| Prop           | Type                | Default   | Description                                                                  |
| -------------- | ------------------- | --------- | ---------------------------------------------------------------------------- |
| `label?`       | `string`            |           | Visible label, tied to the generated control id.                             |
| `hint?`        | `string`            |           | Helper text under the control; error takes its place when set.               |
| `error?`       | `string`            |           | Error text under the control; also marks the field invalid.                  |
| `required?`    | `boolean`           | `false`   | Adds the asterisk to the label; set required on the control yourself.        |
| `id?`          | `string`            |           | Control id; generated when omitted and passed to children.                   |
| `orientation?` | `"stack" \| "row"`  | `"stack"` | stack puts the label above the control, row puts them side by side.          |
| `children`     | `Snippet<[string]>` |           | Receives the id generated for the control, so label and control stay paired. |
| `class?`       | `string`            | `""`      | Extra classes on the field.                                                  |

## FileDrop

```svelte
import FileDrop from "@ku6epxboctuk/ui-kit/components/FileDrop.svelte";
```

| Prop        | Type                   | Default | Description                                                                                  |
| ----------- | ---------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `label`     | `string`               |         | Text inside the drop zone.                                                                   |
| `accept?`   | `string`               |         | Comma-separated MIME types, wildcards and extensions.                                        |
| `disabled?` | `boolean`              | `false` | Blocks clicks, drops and keyboard activation.                                                |
| `onpick`    | `(file: File) => void` |         | Called with the first accepted file; the input resets, so the same file can be picked again. |
| `class?`    | `string`               | `""`    | Extra classes on the drop zone.                                                              |

## FilterChips

```svelte
import FilterChips from "@ku6epxboctuk/ui-kit/components/FilterChips.svelte";
```

| Prop         | Type                        | Default | Description                                         |
| ------------ | --------------------------- | ------- | --------------------------------------------------- |
| `options`    | `Option[]`                  |         | Chips in display order.                             |
| `bind:value` | `string[]`                  |         | Bindable selected values.                           |
| `allLabel?`  | `string`                    |         | Label of the select-all chip; no chip when omitted. |
| `label`      | `string`                    |         | Accessible name of the group.                       |
| `disabled?`  | `boolean`                   | `false` | Disables every chip.                                |
| `onchange?`  | `(value: string[]) => void` |         | Called with the new selection.                      |
| `class?`     | `string`                    | `""`    | Extra classes on the group.                         |

## IconButton

```svelte
import IconButton from "@ku6epxboctuk/ui-kit/components/IconButton.svelte";
```

Extends `HTMLButtonAttributes`; those attributes and event handlers pass through.

| Prop           | Type                                 | Default   | Description                                                                     |
| -------------- | ------------------------------------ | --------- | ------------------------------------------------------------------------------- |
| `label`        | `string`                             |           | Becomes the button's aria-label; the button has no visible text.                |
| `variant?`     | `"ghost" \| "secondary" \| "danger"` | `"ghost"` | ghost has no chrome until hover, secondary has a border, danger is destructive. |
| `size?`        | `"sm" \| "md" \| "lg"`               | `"md"`    | sm, md or lg square.                                                            |
| `active?`      | `boolean`                            | `false`   | Pressed state: sets aria-pressed and the active style.                          |
| `expanded?`    | `boolean`                            |           | Value for aria-expanded when the button controls a disclosure.                  |
| `children`     | `Snippet`                            |           | Icon markup; the label prop carries the text.                                   |
| `bind:element` | `HTMLButtonElement`                  |           | Bindable native button element.                                                 |

## Label

```svelte
import Label from "@ku6epxboctuk/ui-kit/components/Label.svelte";
```

| Prop       | Type                                             | Default   | Description                                                       |
| ---------- | ------------------------------------------------ | --------- | ----------------------------------------------------------------- |
| `tone?`    | `"muted" \| "secondary" \| "accent" \| "danger"` | `"muted"` | muted by default; secondary, accent and danger change the colour. |
| `children` | `Snippet`                                        |           | Label text.                                                       |
| `class?`   | `string`                                         | `""`      | Extra classes on the span.                                        |

## Modal

```svelte
import Modal from "@ku6epxboctuk/ui-kit/components/Modal.svelte";
```

| Prop           | Type                            | Default     | Description                                                              |
| -------------- | ------------------------------- | ----------- | ------------------------------------------------------------------------ |
| `open`         | `boolean`                       |             | Whether the dialog is shown; closing reports back through onclose.       |
| `title`        | `string`                        |             | Heading, also the default accessible name.                               |
| `label?`       | `string`                        |             | Overrides title as the accessible name when the heading is not enough.   |
| `size?`        | `"default" \| "wide" \| "full"` | `"default"` | default, wide or full width.                                             |
| `dismissable?` | `boolean`                       | `false`     | Closes on a backdrop click; Escape and the close button work either way. |
| `onclose`      | `() => void`                    |             | Called whenever the dialog closes, including Escape and the backdrop.    |
| `closeIcon?`   | `Snippet`                       |             | Replaces the default close glyph.                                        |
| `actions?`     | `Snippet`                       |             | Header actions shown next to the close button.                           |
| `children`     | `Snippet`                       |             | Dialog body.                                                             |

## Notice

```svelte
import Notice from "@ku6epxboctuk/ui-kit/components/Notice.svelte";
```

| Prop       | Type                                                                    | Default     | Description                                                                |
| ---------- | ----------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------- |
| `tone?`    | `"neutral" \| "accent" \| "success" \| "warning" \| "danger" \| "info"` | `"neutral"` | Colour family: neutral, accent, success, warning, danger or info.          |
| `variant?` | `"inline" \| "box"`                                                     | `"inline"`  | inline sits in the text flow, box draws a bordered block.                  |
| `size?`    | `"sm" \| "md" \| "lg"`                                                  | `"md"`      | sm, md or lg text step.                                                    |
| `role?`    | `string`                                                                |             | Passed to the container as role, so a live region can announce the notice. |
| `children` | `Snippet`                                                               |             | Notice text.                                                               |
| `class?`   | `string`                                                                | `""`        | Extra classes on the container.                                            |

## Panel

```svelte
import Panel from "@ku6epxboctuk/ui-kit/components/Panel.svelte";
```

| Prop           | Type      | Default | Description                                            |
| -------------- | --------- | ------- | ------------------------------------------------------ |
| `title?`       | `string`  |         | Heading above the body; no heading when omitted.       |
| `description?` | `string`  |         | Helper text under the heading.                         |
| `flush?`       | `boolean` | `false` | Removes the body padding, for tables and scroll areas. |
| `children`     | `Snippet` |         | Panel body.                                            |
| `footer?`      | `Snippet` |         | Actions under a divider, right-aligned.                |
| `class?`       | `string`  | `""`    | Extra classes on the container.                        |

## Popover

```svelte
import Popover from "@ku6epxboctuk/ui-kit/components/Popover.svelte";
```

| Prop           | Type                  | Default | Description                                                                             |
| -------------- | --------------------- | ------- | --------------------------------------------------------------------------------------- |
| `open`         | `boolean`             |         | Whether the panel is shown.                                                             |
| `anchor`       | `HTMLElement \| null` |         | Element the panel is placed against.                                                    |
| `placement?`   | `PopoverPlacement`    | `"end"` | start or end below the anchor, side next to it; goes above when there is no room below. |
| `gap?`         | `number`              | `4`     | Distance in pixels between the anchor and the panel.                                    |
| `margin?`      | `number`              | `8`     | Closest the panel may come to the viewport edge.                                        |
| `id?`          | `string`              |         | Id of the panel, so a trigger can point at it with aria-controls.                       |
| `role?`        | `string`              |         | Role of the panel, for example dialog or listbox.                                       |
| `label?`       | `string`              |         | Accessible name of the panel.                                                           |
| `minWidth?`    | `string`              |         | CSS min-width of the panel.                                                             |
| `maxWidth?`    | `string`              |         | CSS max-width of the panel.                                                             |
| `bind:element` | `HTMLDivElement`      |         | Bindable panel element.                                                                 |
| `class?`       | `string`              | `""`    | Extra classes on the panel.                                                             |
| `onclose?`     | `() => void`          |         | Called on an outside pointerdown or Escape; the caller closes the panel.                |
| `children`     | `Snippet`             |         | Panel content.                                                                          |

## ScrollArea

```svelte
import ScrollArea from "@ku6epxboctuk/ui-kit/components/ScrollArea.svelte";
```

Extends `HTMLAttributes<HTMLDivElement>`; those attributes and event handlers pass through.

| Prop        | Type                   | Default | Description                           |
| ----------- | ---------------------- | ------- | ------------------------------------- |
| `axis?`     | `"x" \| "y" \| "both"` | `"y"`   | Directions that scroll: y, x or both. |
| `children?` | `Snippet`              |         | Scrollable content.                   |

## SectionTitle

```svelte
import SectionTitle from "@ku6epxboctuk/ui-kit/components/SectionTitle.svelte";
```

| Prop       | Type                                           | Default   | Description                                                                |
| ---------- | ---------------------------------------------- | --------- | -------------------------------------------------------------------------- |
| `level?`   | `2 \| 3 \| 4`                                  | `2`       | Heading level 2, 3 or 4; the element follows it.                           |
| `tone?`    | `"muted" \| "accent" \| "danger" \| "warning"` | `"muted"` | muted by default; accent for section heads, danger and warning for states. |
| `size?`    | `"sm" \| "md"`                                 | `"md"`    | sm or md.                                                                  |
| `mono?`    | `boolean`                                      | `false`   | Uses the monospace face, for paired-column heads.                          |
| `children` | `Snippet`                                      |           | Title text.                                                                |
| `class?`   | `string`                                       | `""`      | Extra classes on the heading.                                              |

## Segmented

```svelte
import Segmented from "@ku6epxboctuk/ui-kit/components/Segmented.svelte";
```

| Prop         | Type                      | Default | Description                                  |
| ------------ | ------------------------- | ------- | -------------------------------------------- |
| `options`    | `Option[]`                |         | Segments in display order.                   |
| `bind:value` | `string`                  |         | Bindable value of the selected segment.      |
| `wide?`      | `boolean`                 | `false` | Stretches the group to the container width.  |
| `disabled?`  | `boolean`                 | `false` | Disables every segment.                      |
| `label`      | `string`                  |         | Accessible name of the radio group.          |
| `onchange?`  | `(value: string) => void` |         | Called with the value of the picked segment. |
| `class?`     | `string`                  | `""`    | Extra classes on the group.                  |

## Select

```svelte
import Select from "@ku6epxboctuk/ui-kit/components/Select.svelte";
```

| Prop                 | Type                                | Default           | Description                                                                       |
| -------------------- | ----------------------------------- | ----------------- | --------------------------------------------------------------------------------- |
| `select`             | `Select<T>`                         |                   | State and behaviour from createSelect.                                            |
| `getKey`             | `(item: T) => string \| number`     |                   | Stable key of an item, used by the keyed each.                                    |
| `trigger`            | `Snippet`                           |                   | Your trigger markup; the list opens when select.open turns true.                  |
| `option`             | `Snippet<[T]>`                      |                   | Snippet for one option, called with the item.                                     |
| `footer?`            | `Snippet`                           |                   | Snippet under the list, for actions such as Clear.                                |
| `isSelected?`        | `(item: T) => boolean`              | `() => false`     | Whether an item shows as selected; defaults to none.                              |
| `onkeydown?`         | `(event: KeyboardEvent) => boolean` |                   | Runs before the machine's keyboard handling; return true to mark the key handled. |
| `searchable?`        | `boolean`                           | `false`           | Shows a search input at the top of the list and focuses it on open.               |
| `searchPlaceholder?` | `string`                            | `"Search"`        | Placeholder and aria-label of the search input.                                   |
| `emptyLabel?`        | `string`                            | `"Nothing found"` | Text shown when nothing matches the query.                                        |
| `listLabel?`         | `string`                            | `"Options"`       | aria-label of the listbox.                                                        |
| `listId?`            | `string`                            |                   | Id of the listbox, so a trigger can point at it with aria-controls.               |
| `multiselect?`       | `boolean`                           | `false`           | Tells assistive tech that several items can be selected.                          |
| `variant?`           | `"filter" \| "field"`               | `"filter"`        | filter is inline, field fills the width like an input.                            |
| `size?`              | `"sm" \| "md" \| "lg"`              | `"md"`            | sm, md or lg trigger height.                                                      |
| `class?`             | `string`                            | `""`              | Extra classes on the root.                                                        |

## TagInput

```svelte
import TagInput from "@ku6epxboctuk/ui-kit/components/TagInput.svelte";
```

| Prop           | Type                                        | Default                              | Description                                                                               |
| -------------- | ------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------- |
| `value`        | `string[]`                                  |                                      | The chosen tags. Not bindable: the caller owns the list.                                  |
| `onchange`     | `(tags: string[]) => void`                  |                                      | Called with a new array after every add, remove or reorder.                               |
| `suggestions?` | `string[]`                                  | `[]`                                 | Tags offered in the dropdown.                                                             |
| `counts?`      | `Record<string, number>`                    | `{}`                                 | Number shown next to a suggestion, keyed by tag.                                          |
| `onunknown?`   | `(tag: string) => Promise<unknown> \| void` |                                      | Called for every committed tag outside suggestions; awaited, so it can fetch the tag.     |
| `validate?`    | `(tag: string) => string \| null`           |                                      | Returns an error message for a tag to reject, or null; the message shows under the input. |
| `lowercase?`   | `boolean`                                   | `true`                               | Lowercases tags before they are added.                                                    |
| `placeholder?` | `string`                                    | `"Add tags"`                         | Placeholder of the text input.                                                            |
| `ariaLabel?`   | `string`                                    | `"Tags"`                             | aria-label of the text input and the suggestion list.                                     |
| `id?`          | `string`                                    |                                      | Id of the text input, for pairing with a label.                                           |
| `disabled?`    | `boolean`                                   | `false`                              | Blocks typing, removing and reordering, and dims the chips.                               |
| `invalid?`     | `boolean`                                   | `false`                              | Marks the input and the trigger invalid.                                                  |
| `reorderable?` | `boolean`                                   | `false`                              | Lets chips be dragged into a new order.                                                   |
| `copyable?`    | `boolean`                                   | `false`                              | Clicking a chip copies its tag to the clipboard.                                          |
| `copyLabel?`   | `(tag: string) => string`                   | `` (tag: string) => `Copy ${tag}` `` | aria-label of the copy button, called with the tag.                                       |
| `copiedLabel?` | `string`                                    | `"Copied"`                           | Text shown for a moment after a copy.                                                     |
| `showAll?`     | `boolean`                                   | `true`                               | Opens all suggestions on focus; otherwise the list waits for typed text.                  |
| `variant?`     | `"filter" \| "field"`                       | `"field"`                            | filter is inline, field fills the width.                                                  |
| `class?`       | `string`                                    | `""`                                 | Extra classes on the root.                                                                |

## TextArea

```svelte
import TextArea from "@ku6epxboctuk/ui-kit/components/TextArea.svelte";
```

Extends `Omit<HTMLTextareaAttributes, "value">`; those attributes and event handlers pass through.

| Prop         | Type      | Default | Description                 |
| ------------ | --------- | ------- | --------------------------- |
| `bind:value` | `string`  |         | Bindable text.              |
| `invalid?`   | `boolean` | `false` | Marks the textarea invalid. |
| `mono?`      | `boolean` | `false` | Uses the monospace face.    |

## TextInput

```svelte
import TextInput from "@ku6epxboctuk/ui-kit/components/TextInput.svelte";
```

Extends `Omit<HTMLInputAttributes, "size" | "value">`; those attributes and event handlers pass through.

| Prop           | Type                   | Default | Description                        |
| -------------- | ---------------------- | ------- | ---------------------------------- |
| `bind:value`   | `string`               |         | Bindable text.                     |
| `size?`        | `"sm" \| "md" \| "lg"` | `"md"`  | sm, md or lg height and text step. |
| `invalid?`     | `boolean`              | `false` | Marks the input invalid.           |
| `mono?`        | `boolean`              | `false` | Uses the monospace face.           |
| `bind:element` | `HTMLInputElement`     |         | Bindable native input element.     |

## ToggleChip

```svelte
import ToggleChip from "@ku6epxboctuk/ui-kit/components/ToggleChip.svelte";
```

Extends `HTMLButtonAttributes`; those attributes and event handlers pass through.

| Prop           | Type                | Default | Description                                            |
| -------------- | ------------------- | ------- | ------------------------------------------------------ |
| `active?`      | `boolean`           | `false` | Pressed state: sets aria-pressed and the active style. |
| `children`     | `Snippet`           |         | Chip label.                                            |
| `bind:element` | `HTMLButtonElement` |         | Bindable native button element.                        |
