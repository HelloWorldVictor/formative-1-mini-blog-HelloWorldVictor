import { memo, type CSSProperties } from 'react'
import type { Post as PostType } from '../types/post'
import { formatDate, getPreview } from '../utils/postUtils'
import './Post.css'

export interface PostProps {
  post: PostType
  /** Posts by the spotlighted author get a warm background. */
  isHighlighted?: boolean
  /** Shows a "New!" badge for posts from the last 24 hours. */
  isNew?: boolean
}

// Inline style objects are defined once, outside the component, so the
// same reference is reused on every render.
const highlightedStyle: CSSProperties = {
  backgroundColor: 'var(--color-highlight)',
  borderColor: 'var(--color-highlight-border)',
}

const newBadgeStyle: CSSProperties = {
  flexShrink: 0,
  padding: '2px 10px',
  borderRadius: 999,
  backgroundColor: 'var(--color-new)',
  color: '#fff',
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

/**
 * Renders a single blog post card: title, author, content preview and date.
 *
 * Functional component wrapped in React.memo — see README for the reasoning.
 */
function Post({ post, isHighlighted = false, isNew = false }: PostProps) {
  const { title, author, content, datePosted } = post

  return (
    <article
      className="post"
      style={isHighlighted ? highlightedStyle : undefined}
      data-highlighted={isHighlighted}
    >
      <div className="post__header">
        <h2 className="post__title">{title}</h2>
        {isNew && <span style={newBadgeStyle}>New!</span>}
      </div>
      <div className="post__meta">
        <span className="post__author">{author.name}</span>
        <span>{author.role}</span>
        <time dateTime={datePosted}>{formatDate(datePosted)}</time>
      </div>
      <p className="post__preview">{getPreview(content)}</p>
    </article>
  )
}

export default memo(Post)
