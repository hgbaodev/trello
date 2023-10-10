// type
import { Home3 } from 'iconsax-react'
// icons
const icons = {
  navigation: Home3
}

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Hệ thống',
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Tổng quan',
      type: 'item',
      url: '/admin',
      icon: icons.dashboard
    }
  ]
}

export default dashboard
