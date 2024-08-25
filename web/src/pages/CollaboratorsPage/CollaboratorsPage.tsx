import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const CollaboratorsPage = () => {
  return (
    <>
      <Metadata title="Collaborators" description="Collaborators page" />

      <h1>CollaboratorsPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/CollaboratorsPage/CollaboratorsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>collaborators</code>, link to me with `
        <Link to={routes.collaborators()}>Collaborators</Link>`
      </p>
    </>
  )
}

export default CollaboratorsPage
