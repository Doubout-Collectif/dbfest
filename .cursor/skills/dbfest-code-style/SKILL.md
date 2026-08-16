---
name: dbfest-code-style
description: >-
  Applies dbfest coding conventions for TypeScript/React/Next.js: minimal inline
  comments with TSDoc for API docs, arrow functions, and small focused files.
  Use when writing, editing, or reviewing code in this repository.
---

# dbfest Code Style

Follow these conventions for all TypeScript and React code in this project.

## Comments and documentation

- Do **not** add inline comments that restate what the code already says.
- Do **not** write long explanatory comments.
- Add a **short** inline comment only when:
  - names alone are not enough to explain intent, or
  - the logic is genuinely complex (non-obvious algorithm, workaround, edge case).
- Put **documentation on public APIs** (exported functions, components, hooks, types) in **TSDoc** (`/** ... */`), not in inline comments.

```typescript
/** Returns the user's display name, falling back to email when name is empty. */
export const getDisplayName = (user: User): string => {
  if (user.name.trim()) return user.name;
  return user.email;
};

// Offset by one day because the API uses exclusive end dates.
const endDate = addDays(rawEndDate, 1);
```

Prefer renaming (`isRegistrationOpen`, `fetchFestivalBySlug`) over commenting.

## Arrow functions

- Prefer **arrow functions** for components, hooks, helpers, and callbacks.
- Use a `const` binding, then `export` when needed.

```typescript
type FestivalCardProps = {
  name: string;
  date: string;
};

export const FestivalCard = ({ name, date }: FestivalCardProps) => (
  <article>
    <h2>{name}</h2>
    <time>{date}</time>
  </article>
);

export const formatFestivalDate = (date: Date): string =>
  date.toLocaleDateString("fr-FR");
```

Reasonable exceptions: framework-required `function` declarations (e.g. Next.js middleware) when an arrow function is awkward or unsupported.

## Simplicity and file size

- Keep code **simple and readable**. Prefer clarity over cleverness.
- One file should do **one clear job**. Extract when a file grows hard to scan or mixes unrelated concerns.
- Split into **components**, **hooks**, and **utilities** in separate files rather than one large module.

Guidelines:

- Extract a sub-component when JSX becomes nested or repetitive.
- Extract a hook when state/effects form a cohesive unit.
- Extract helpers when logic is reused or obscures the main flow.
- Co-locate related files (e.g. `FestivalCard.tsx`, `useFestival.ts`, `festival-utils.ts`).

Before adding code, ask: *Can this be removed, renamed, or split instead of commented or inlined?*

## Quick checklist

- [ ] No redundant or verbose inline comments
- [ ] TSDoc on exported public APIs where useful
- [ ] Arrow functions used by default
- [ ] Files stay focused; large sections extracted into dedicated modules
