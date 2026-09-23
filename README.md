# Dev Insights · Mini Blog

An internal mini blog for the "Dev Insights" team, where developers share quick web development tips, insights and updates. It is built with **React 19 + TypeScript** and uses **[Vite](https://vite.dev/)** as the dev server and build tool.

The project was set up with `npm create vite@latest` (the `react-ts` option) and every component was written by hand. No React UI template or starter kit was used.

## Features

- **Header**: text-based "Dev Insights" logo and a "New Post" link (a placeholder for now).
- **PostList**: renders a hardcoded array of three sample posts, each keyed by its unique `id`.
- **Post**: a reusable card that shows the title, author, a short preview (the first 20 words) and the date posted.
- **Conditional styling**:
  - Posts by the **spotlight author** get a highlighted background. You can change the spotlight author with the dropdown.
  - Posts from the **last 24 hours** show a green **New!** badge.
- **Optimization**: `Post` is wrapped in `React.memo`, and list items use stable `key` props.
- **HOC**: `withLogger` logs to the console when a component mounts and unmounts. It is applied to `PostList` and `Post`.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (required by Vite)
- npm (comes with Node)

### Install

```bash
git clone https://github.com/HelloWorldVictor/formative-1-mini-blog-HelloWorldVictor.git
cd formative-1-mini-blog-HelloWorldVictor
npm install
```

### Run (development)

```bash
npm run dev
```

Vite starts a dev server with hot module replacement, usually at <http://localhost:5173>. Open your browser's console to see the `withLogger` mount messages.

### Build and preview (production)

```bash
npm run build     # type-checks with tsc, then bundles with Vite into dist/
npm run preview   # serves the built dist/ folder locally
```

### Test

```bash
npm test            # runs the test suite once (Vitest)
npm run test:watch  # re-runs tests when files change
npm run lint        # lints the code with oxlint
```

The tests use **Vitest** (a test runner that shares Vite's config) and **React Testing Library** in a `jsdom` environment. They cover:

- the post helpers (`getPreview`, `formatDate`, `isNewPost`)
- `Post` rendering, the New! badge and the highlight style
- `PostList` rendering all posts and changing the highlight when the spotlight author changes
- `withLogger` passing props through and logging on mount and unmount

## Project structure

```
src/
├── components/        # UI components, each next to its own CSS file and tests
│   ├── Header.tsx / Header.css
│   ├── PostList.tsx / PostList.css / PostList.test.tsx
│   └── Post.tsx / Post.css / Post.test.tsx
├── hocs/
│   └── withLogger.ts  # higher-order component (+ test)
├── styles/
│   └── global.css     # design tokens (CSS variables), reset, layout container
├── test/
│   └── setup.ts       # Testing Library / jest-dom setup for Vitest
├── types/
│   └── post.ts        # Post and Author TypeScript interfaces
├── utils/
│   └── postUtils.ts   # getPreview, formatDate, isNewPost (+ tests)
├── App.tsx            # root component: Header + PostList
└── main.tsx           # entry point
```

## Design decisions

### Component types: functional vs. class

**All components, including `Post`, are functional components.** In Week 3 we compared functional and class components and looked at how each one handles state, lifecycle and optimization (`React.memo` for functions, `PureComponent` for classes). Based on that comparison, I chose a functional component for `Post` because:

- `Post` only receives props and returns markup. It has no state and no lifecycle logic, so a class would only add boilerplate (`extends React.Component`, `render()`, `this.props`).
- Functional components are the recommended way to write React today. Hooks such as `useState` and `useEffect` cover everything class lifecycle methods used to do, and the React docs present class components as legacy.
- The optimization I wanted, skipping re-renders when props don't change, is available to functional components through `React.memo`. It does the same job as `PureComponent` does for classes, so I didn't need a class to get it.
- Functional components work better with TypeScript: the props are just a typed function parameter (`PostProps`).

I would only reach for a class component when I need something hooks can't provide yet, such as an **error boundary** (`componentDidCatch`). This project doesn't need one.

### Types

`src/types/post.ts` defines a `Post` interface (`id`, `title`, `author`, `content`, `datePosted`, and optional `tags`) and an `Author` interface. The sample data, the `Post` props and the helper functions all use these types, so the compiler catches a missing or misspelled field. `datePosted` is an ISO 8601 string, which keeps the data serializable, like data that would come from an API later.

### Styling methods

I used **two** styling methods:

1. **External CSS files.** Each component imports its own stylesheet (`Header.css`, `PostList.css`, `Post.css`), and `styles/global.css` holds shared design tokens as CSS custom properties (`--color-primary`, `--radius`, …). Class names follow a BEM-like pattern (`post__title`) to avoid collisions without a CSS-in-JS library. I used external CSS for layout, spacing and hover/focus states, which inline styles can't express.
2. **Inline styles.** These are typed `CSSProperties` objects in `Post.tsx`, used for the **conditional** styling: the highlighted card background and the New! badge. Inline styles suit values that depend on props. The style objects are defined **outside** the component, so the same object reference is reused on every render.

Conditional styling:

- `isHighlighted` is true when the post's author matches the spotlight author picked in the dropdown. It applies the highlight background and border.
- `isNew` comes from `isNewPost(datePosted)` and shows the **New!** badge for posts from the last 24 hours. One sample post is dated three hours before the page loads, so the badge is always visible in the demo. A hardcoded date would stop being "new" the next day.

### Optimization strategies

- **`React.memo` on `Post`.** `PostList` has state (the spotlight author). Without `memo`, every change to that dropdown would re-render all three cards. With `memo`, React compares props shallowly and only re-renders cards whose `isHighlighted` value actually changed. Two things keep that comparison useful:
  - the `post` objects come from a constant array defined outside the component, so their references don't change between renders
  - `isHighlighted` and `isNew` are booleans, so they compare by value
- **Unique `key` props.** Each list item uses `key={post.id}` rather than the array index, so React can match items correctly between renders even if posts are re-ordered, added or removed. The author dropdown options use the author name as their key.
- **Stable style objects.** Inline style objects are created once at module level instead of on every render.

### Higher-order component: `withLogger`

```ts
const PostList = withLogger(PostListBase, 'PostList')
const Post = memo(withLogger(PostCard, 'Post'))
```

`withLogger` takes a component and returns a new component that renders it with the same props. Inside, a `useEffect` with an empty dependency array logs `"[withLogger] <Name> mounted"`, and its cleanup function logs `"… unmounted"`. It is generic (`withLogger<P>`), so the wrapped component keeps its prop types, and it sets a `displayName` such as `withLogger(Post)` so it is easy to find in React DevTools.

For `Post`, `memo` goes on the **outside** (`memo(withLogger(...))`). That way the memo check runs before the logger wrapper, and neither the wrapper nor the card re-renders when props haven't changed.

## Challenges and how I solved them

- **Double "mounted" logs in development.** At first the console showed `mounted → unmounted → mounted` for every component. This is expected: `<StrictMode>` mounts, unmounts and remounts components in development to surface effects that don't clean up properly. It shows that the HOC's cleanup function works. The production build logs each mount once.
- **Where to put `memo` with the HOC.** The order of the wrappers matters. With `withLogger(memo(Post))`, the logger wrapper would still re-render on every parent render and only the inner card would be skipped. Putting `memo` on the outside skips both.
- **The "New!" badge going stale.** A fixed date would only count as "new" for one day. I kept the historical posts on fixed dates and made the newest one relative to the current time. I also made `isNewPost` accept a `now` parameter so the tests can pass in a fixed time.
- **Fast Refresh lint warnings.** oxlint's `only-export-components` rule flagged the HOC-wrapped exports and the HOC file itself. I gave the wrapped components names before exporting them, and I turned `withLogger` into a `.ts` module that uses `createElement`, so the file only exports the HOC.
- **Content touching the screen edge on phones.** When I checked a narrow viewport, the post list had no side padding. The shorthand `padding: 32px 0 64px` was overriding the `.container` class's horizontal padding. Switching to `padding-block` fixed it.
- **`verbatimModuleSyntax`.** Vite's TypeScript config requires type-only imports to be written as `import type { Post } …`. This makes it clear which imports disappear after compilation.

## External libraries and packages

| Package | Purpose |
| --- | --- |
| `react`, `react-dom` | UI library and DOM renderer |
| `vite`, `@vitejs/plugin-react` | Dev server, bundler and React (JSX/Fast Refresh) support |
| `typescript`, `@types/react`, `@types/react-dom`, `@types/node` | Static typing |
| `oxlint` | Linting |
| `vitest`, `jsdom` | Test runner and browser-like test environment |
| `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` | Component testing utilities and DOM matchers |

No CSS-in-JS or UI component libraries are used.

## Reflection

Building this mini blog brought the first three weeks together. The most valuable part was seeing how small decisions affect rendering. Defining the `Post` type first made the components easy to write, because the editor autocompleted every field and flagged every mistake. Adding the spotlight dropdown showed me a concrete reason to use `React.memo`. Without it, every card re-rendered on each change. With it, only the cards whose highlight changed re-rendered, but only as long as I kept the props stable. Writing `withLogger` also showed me what a higher-order component really is: a function that takes a component and returns a new one. Seeing StrictMode's mount, unmount and mount sequence in the console helped me understand effect cleanup better than reading about it did.

Next, I want to go further with performance by measuring re-renders with the React DevTools Profiler instead of reasoning about them. I also want to look at `useMemo`/`useCallback` and when they are worth it, and try a CSS-in-JS approach such as styled-components to compare it with plain CSS files. I'd also like to make "New Post" work, with a form, local state and eventually routing and a real API, and I want to keep improving my component tests.
