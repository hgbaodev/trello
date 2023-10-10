import { useRoutes } from 'react-router-dom'

import AuthRoutes from './AuthRoutes'
import ErrorRoutes from './ErrorRoutes'
import UserRoutes from '~/routes/UserRoutes'

export default function ThemeRoutes() {
  return useRoutes([AuthRoutes, ErrorRoutes, UserRoutes])
}
