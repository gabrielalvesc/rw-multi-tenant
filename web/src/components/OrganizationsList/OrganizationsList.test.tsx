import { render } from '@redwoodjs/testing/web'

import OrganizationsList from './OrganizationsList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationsList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationsList />)
    }).not.toThrow()
  })
})
