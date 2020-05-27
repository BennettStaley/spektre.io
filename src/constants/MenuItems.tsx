type MenuItemType = {
  title: string;
  icon?: { name: string };
  link: { to: string };
};

export const MenuItems: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { to: '/' },
  },
  {
    title: 'About',
    icon: { name: 'About' },
    link: { to: '/bout' },
  },
];
