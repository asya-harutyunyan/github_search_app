# GitHub Search App

A GitHub search application built with React 19, Redux Toolkit, and TypeScript. Search repositories and users with debounced input, response caching, paginated results, and a dark Linear-inspired UI.

## Architecture

- **Atomic Design** — Components organized as atoms, molecules, organisms, templates, and pages
- **Redux Toolkit** with `createAsyncThunk` for async state management
- **redux-persist** — Cache survives page reloads (only cache is persisted, not UI state)
- **Zod validation** — Runtime schema validation at the API boundary; types inferred from schemas
- **CSS Modules** — Scoped styles with design tokens via CSS custom properties
- **Pagination** — Page-based navigation with per-page caching; page resets on query or entity type change
- **Custom hooks** — `useDebounce` (300ms) + `useSearch` orchestration hook

## Key Decisions

| Decision | Why |
|----------|-----|
| Cache key `${entityType}:${query}:${page}` | Unique per search + page; each page cached independently |
| Debounce in hook, not middleware | Simpler to test and reason about |
| `createAsyncThunk` condition | Prevents duplicate in-flight requests |
| Singleton GitHubService | Consistent behavior, easily mockable |
| CSS transitions for layout | Search bar moves from center to top without animation libraries |

## Setup

```bash
yarn install
yarn dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start dev server |
| `yarn build` | Type-check and build for production |
| `yarn test` | Run tests |
| `yarn test:watch` | Run tests in watch mode |
| `yarn lint` | Lint with ESLint |
| `yarn format` | Format with Prettier |

## Tech Stack

React 19, Vite 7, TypeScript 5, Redux Toolkit 2, react-redux 9, redux-persist 6, react-router-dom 7, Zod 3, Vitest 3, Testing Library
