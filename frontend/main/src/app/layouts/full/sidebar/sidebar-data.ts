import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/ui-components/home',
  },
  {
    navCap: 'Ui Components',
    divider: true
  },
  {
    displayName: 'Ecoles',
    iconName: 'solar:tablet-line-duotone',
    route: '/ui-components/ecoles',
  },
  {
    displayName: 'Classes',
    iconName: 'solar:tablet-line-duotone',
    route: '/ui-components/classes',
  },
  {
    displayName: 'Profs',
    iconName: 'solar:tablet-line-duotone',
    route: '/ui-components/profs',
  },
];
