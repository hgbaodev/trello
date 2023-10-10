import { lazy } from 'react'
import Loadable from '~/components/Loadable'

// project-imports

// render - data display components
const HomePage = Loadable(lazy(() => import('~/pages/Borads/_id')))
// ==============================|| COMPONENTS ROUTES ||============================== //

const UserRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <HomePage />
    }
  ]
}

export default UserRoutes
