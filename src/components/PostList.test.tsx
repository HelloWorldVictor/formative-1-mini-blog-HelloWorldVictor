import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import PostList from './PostList'

vi.spyOn(console, 'log').mockImplementation(() => {})

describe('PostList', () => {
  it('renders every sample post', () => {
    render(<PostList />)
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('marks only the recent post as new', () => {
    render(<PostList />)
    expect(screen.getAllByText('New!')).toHaveLength(1)
  })

  it('highlights posts by the selected spotlight author', async () => {
    render(<PostList />)
    const highlighted = () =>
      screen
        .getAllByRole('article')
        .filter((el) => el.dataset.highlighted === 'true')

    expect(highlighted()).toHaveLength(2)

    await userEvent.selectOptions(screen.getByLabelText('Spotlight author'), 'Kwame Mensah')
    expect(highlighted()).toHaveLength(1)
    expect(within(highlighted()[0]).getByText('Kwame Mensah')).toBeInTheDocument()
  })
})
