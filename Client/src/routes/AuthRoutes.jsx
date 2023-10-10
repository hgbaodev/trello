import { lazy } from 'react'
import Loadable from '~/components/Loadable'

// project-imports

// render - data display components
const AuthLogin = Loadable(lazy(() => import('~/pages/auth/login')))
const AuthRegister = Loadable(lazy(() => import('~/pages/auth/register')))
// ==============================|| COMPONENTS ROUTES ||============================== //

const AuthRoutes = {
  path: '/auth',
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    }
  ]
}

export default AuthRoutes
