import type { Post as PostType } from '../types/post'
import Post from './Post'
import './PostList.css'

const HOUR_MS = 60 * 60 * 1000

/**
 * Hardcoded sample posts. The first one is dated a few hours before the
 * page loads so the "New!" badge always has something to show.
 */
const samplePosts: PostType[] = [
  {
    id: 1,
    title: 'Stop re-rendering everything: a quick guide to React.memo',
    author: { name: 'Ada Okafor', role: 'Frontend Engineer' },
    content:
      'React.memo lets a function component skip re-rendering when its props have not changed. It is a shallow comparison, so keep your props stable: lift constant objects out of render and reach for useCallback when you pass handlers down.',
    datePosted: new Date(Date.now() - 3 * HOUR_MS).toISOString(),
    tags: ['react', 'performance'],
  },
  {
    id: 2,
    title: 'Why we switched our tooling to Vite',
    author: { name: 'Kwame Mensah', role: 'Platform Engineer' },
    content:
      'Our old bundler took almost a minute to start the dev server. Vite serves source files over native ES modules and only pre-bundles dependencies, so cold starts dropped to under a second and hot updates feel instant.',
    datePosted: '2026-09-18T10:15:00Z',
    tags: ['tooling', 'vite'],
  },
  {
    id: 3,
    title: 'TypeScript tip: model your data before you build the UI',
    author: { name: 'Ada Okafor', role: 'Frontend Engineer' },
    content:
      'Writing the interface for a Post before writing a single component forces you to decide what a post actually is. The compiler then catches every place that forgets a field, long before a user sees undefined on the screen.',
    datePosted: '2026-09-12T14:40:00Z',
    tags: ['typescript'],
  },
]

/** Lists all blog posts, newest first. */
function PostList() {
  return (
    <section className="post-list container" aria-labelledby="post-list-heading">
      <h1 id="post-list-heading" className="post-list__heading">
        Latest insights
      </h1>
      <p className="post-list__subheading">
        Quick tips and updates from the Dev Insights team.
      </p>
      <ul className="post-list__items">
        {samplePosts.map((post) => (
          // Stable, unique ids as keys let React match items between renders.
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PostList
