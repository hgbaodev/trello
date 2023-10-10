import { lazy } from 'react'
import Loadable from '~/components/Loadable'

// project-imports

// render - data display components
const Page404 = Loadable(lazy(() => import('~/pages/Error/page404')))
// ==============================|| COMPONENTS ROUTES ||============================== //

const ErrorRoutes = {
  path: '*',
  element: <Page404 />
}

export default ErrorRoutes
