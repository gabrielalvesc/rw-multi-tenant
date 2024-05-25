import { render } from '@redwoodjs/testing/web'

import PageSkeleton from './PageSkeleton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PageSkeleton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PageSkeleton />)
    }).not.toThrow()
  })
})
