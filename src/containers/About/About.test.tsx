import { render, screen } from '@testing-library/react'
import About from './index'

import '@testing-library/jest-dom'

describe('About', () => {
  it('renders a button go to home', () => {
    render(<About />)

    const heading = screen.getByText('MUI v5 + Next.js with TypeScript example About with custom layout')

    expect(heading).toBeInTheDocument()
  })
})