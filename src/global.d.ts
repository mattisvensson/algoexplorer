interface NavigationItem {
  name: string;
  href: string;
  submenu?: SubnavigationItem[]; // Optional submenu property for nested navigation items
}

interface SubnavigationItem {
  name: string;
  href: string;
}

type NavigationProps = NavigationItem[];