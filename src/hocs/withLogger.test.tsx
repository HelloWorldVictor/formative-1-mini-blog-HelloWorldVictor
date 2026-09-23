import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import withLogger from './withLogger'

function Greeting({ name }: { name: string }) {
  return <p>Hello, {name}</p>
}

describe('withLogger', () => {
  it('passes props through and logs mount and unmount', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const LoggedGreeting = withLogger(Greeting)

    const { unmount } = render(<LoggedGreeting name="Dev" />)
    expect(screen.getByText('Hello, Dev')).toBeInTheDocument()
    expect(log).toHaveBeenCalledWith('[withLogger] Greeting mounted')

    unmount()
    expect(log).toHaveBeenCalledWith('[withLogger] Greeting unmounted')
    expect(LoggedGreeting.displayName).toBe('withLogger(Greeting)')

    log.mockRestore()
  })
})
