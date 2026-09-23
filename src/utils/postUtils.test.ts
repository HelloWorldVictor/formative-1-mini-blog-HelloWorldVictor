import { describe, expect, it } from 'vitest'
import { formatDate, getPreview, isNewPost } from './postUtils'

describe('getPreview', () => {
  it('returns short content unchanged', () => {
    expect(getPreview('Hello world', 5)).toBe('Hello world')
  })

  it('truncates long content and adds an ellipsis', () => {
    expect(getPreview('one two three four five six', 3)).toBe('one two three…')
  })
})

describe('formatDate', () => {
  it('formats ISO dates as a readable string', () => {
    expect(formatDate('2026-09-18T10:15:00Z')).toBe('Sep 18, 2026')
  })
})

describe('isNewPost', () => {
  const now = new Date('2026-09-23T12:00:00Z')

  it('is true for posts from the last 24 hours', () => {
    expect(isNewPost('2026-09-23T02:00:00Z', now)).toBe(true)
  })

  it('is false for older posts', () => {
    expect(isNewPost('2026-09-21T12:00:00Z', now)).toBe(false)
  })

  it('is false for posts dated in the future', () => {
    expect(isNewPost('2026-09-24T12:00:00Z', now)).toBe(false)
  })
})

describe('getPreview punctuation', () => {
  it('drops trailing punctuation before the ellipsis', () => {
    expect(getPreview('It works. Really well', 2)).toBe('It works…')
  })
})
