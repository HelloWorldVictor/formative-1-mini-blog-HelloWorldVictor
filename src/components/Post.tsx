import { memo } from 'react'
import type { Post as PostType } from '../types/post'
import { formatDate, getPreview } from '../utils/postUtils'
import './Post.css'

export interface PostProps {
  post: PostType
}

/**
 * Renders a single blog post card: title, author, content preview and date.
 *
 * Functional component wrapped in React.memo — see README for the reasoning.
 */
function Post({ post }: PostProps) {
  const { title, author, content, datePosted } = post

  return (
    <article className="post">
      <div className="post__header">
        <h2 className="post__title">{title}</h2>
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
