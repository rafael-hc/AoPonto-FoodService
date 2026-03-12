import { render } from '@testing-library/react'

import AopontoUiKit from './ui-kit'

describe('AopontoUiKit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AopontoUiKit />)
    expect(baseElement).toBeTruthy()
  })
})
