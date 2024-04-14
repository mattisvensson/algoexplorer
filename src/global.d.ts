interface NavigationItem {
  name: string;
  href: string;
  submenu?: SubnavigationItem[];
}

interface SubnavigationItem {
  name: string;
  href: string;
  description?: string;
}

type NavigationProps = NavigationItem[];
