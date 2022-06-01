import { render, screen } from '@testing-library/react'
import DialogBasic from './index'
import '@testing-library/jest-dom'

describe('DialogBasic', () => {
  it('renders dialog with required props only', () => {
    const childText = 'dialog child'
    const DEFAULT_PROPS = {
      children: (<>{childText}</>),
      isOpen: true,
      onClose: () => ({}),
    }
    const renderComponent = (props = {}) =>  {
      return {
          ...render(<DialogBasic {...DEFAULT_PROPS} {...props} />),
          props: {
              ...DEFAULT_PROPS,
              ...props,
          },
      };
    };
    renderComponent()

    const childTextComponent = screen.getByText(childText)
    const titleComponent = screen.queryByTestId('dialog-title')

    expect(childTextComponent).toBeInTheDocument()
    expect(titleComponent).toBeNull()
  })
})