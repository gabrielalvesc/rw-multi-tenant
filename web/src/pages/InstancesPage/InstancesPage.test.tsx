import { render } from '@redwoodjs/testing/web'

import InstancesPage from './InstancesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('InstancesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InstancesPage />)
    }).not.toThrow()
  })
})
