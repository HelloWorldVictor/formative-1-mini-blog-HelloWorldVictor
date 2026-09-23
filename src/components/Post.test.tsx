import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { Post as PostType } from '../types/post'
import Post from './Post'

vi.spyOn(console, 'log').mockImplementation(() => {})

const post: PostType = {
  id: 1,
  title: 'Testing React components',
  author: { name: 'Ada Okafor', role: 'Frontend Engineer' },
  content:
    'one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty twenty-one',
  datePosted: '2026-09-18T10:15:00Z',
}

describe('Post', () => {
  it('renders the title, author, preview and date', () => {
    render(<Post post={post} />)

    expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument()
    expect(screen.getByText('Ada Okafor')).toBeInTheDocument()
    expect(screen.getByText('Sep 18, 2026')).toBeInTheDocument()
    expect(screen.getByText(/twenty…$/)).toBeInTheDocument()
  })

  it('shows the New! badge only when isNew is true', () => {
    const { rerender } = render(<Post post={post} />)
    expect(screen.queryByText('New!')).not.toBeInTheDocument()

    rerender(<Post post={post} isNew />)
    expect(screen.getByText('New!')).toBeInTheDocument()
  })

  it('applies the highlight style when isHighlighted is true', () => {
    render(<Post post={post} isHighlighted />)
    expect(screen.getByRole('article')).toHaveStyle({
      backgroundColor: 'var(--color-highlight)',
    })
  })
})
