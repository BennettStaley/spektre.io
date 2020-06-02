type MenuItemType = {
  title: string;
  icon?: { name: string };
  link?: { as: string; href: string };
  subNav?: Array<MenuItemType>;
};

export const MenuItems: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { as: '/', href: '/' },
  },
  {
    title: 'About',
    icon: { name: 'About' },
    link: { href: '/about', as: '/about' },
  },
  {
    title: 'Account',
    icon: { name: 'About' },
    subNav: [{ title: 'Coming soon... ' }],
  },
];
