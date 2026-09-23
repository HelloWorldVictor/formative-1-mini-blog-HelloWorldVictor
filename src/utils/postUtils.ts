const ONE_DAY_MS = 24 * 60 * 60 * 1000

/**
 * Returns the first `wordCount` words of `content`, followed by an
 * ellipsis when the content was cut short.
 */
export function getPreview(content: string, wordCount = 20): string {
  const words = content.trim().split(/\s+/)
  if (words.length <= wordCount) return words.join(' ')
  return `${words.slice(0, wordCount).join(' ').replace(/[.,;:!?]+$/, '')}…`
}

/** Formats an ISO date string as e.g. "Sep 21, 2026". */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/** True when `isoDate` falls within the 24 hours before `now`. */
export function isNewPost(isoDate: string, now: Date = new Date()): boolean {
  const age = now.getTime() - new Date(isoDate).getTime()
  return age >= 0 && age < ONE_DAY_MS
}
