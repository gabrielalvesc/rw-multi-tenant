import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const TechnicalPage = () => {
  return (
    <>
      <Metadata title="Technical" description="Technical page" />

      <h1>TechnicalPage</h1>
      <p>
        Find me in <code>./web/src/pages/TechnicalPage/TechnicalPage.tsx</code>
      </p>
      <p>
        My default route is named <code>technical</code>, link to me with `
        <Link to={routes.technical()}>Technical</Link>`
      </p>
    </>
  )
}

export default TechnicalPage
