import { render, screen } from '@testing-library/react'
import About from './index'
import '@testing-library/jest-dom'

describe('About', () => {
  it('renders a button go to home', () => {
    render(<About />)

    const heading = screen.getByText('Go to the home page')

    expect(heading).toBeInTheDocument()
  })
})