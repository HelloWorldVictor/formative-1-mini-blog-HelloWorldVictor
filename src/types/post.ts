/**
 * Shape of a single blog post in the Dev Insights mini blog.
 */
export interface Post {
  id: number
  title: string
  author: Author
  content: string
  /** ISO 8601 date string, e.g. "2026-09-20T09:30:00Z" */
  datePosted: string
  tags?: string[]
}

export interface Author {
  name: string
  role: string
}
