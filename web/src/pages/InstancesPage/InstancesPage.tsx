import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const InstancesPage = () => {
  return (
    <>
      <Metadata title="Instances" description="Instances page" />

      <h1>InstancesPage</h1>
      <p>
        Find me in <code>./web/src/pages/InstancesPage/InstancesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>instances</code>, link to me with `
        <Link to={routes.instances()}>Instances</Link>`
      </p>
    </>
  )
}

export default InstancesPage
