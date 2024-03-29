import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import classNames from '../utils/classNames';

const navigation = [
  { 
    name: 'Sorting', 
    href: 'sorting',
    submenu: [
      {
        name: 'Bubble Sort',
        href: 'sorting/bubble-sort'
      },
      {
        name: 'Selection Sort',
        href: 'sorting/selection-sort'
      },
      {
        name: 'Insertion Sort',
        href: 'sorting/insertion-sort'
      },
      {
        name: 'Merge Sort',
        href: 'sorting/merge-sort'
      },
      {
        name: 'Quick Sort',
        href: 'sorting/quick-sort'
      },
      {
        name: 'Heap Sort',
        href: 'sorting/heap-sort'
      }
    ] 
  },
]

export default function Navigation() {

  const location = useLocation();

  const [activeItem, setActiveItem] = useState<NavigationItem>()
  const [activeSubmenuItem, setActiveSubmenuItem] = useState<SubnavigationItem>()

  useEffect(() => {
    setActiveItem(undefined)
    setActiveSubmenuItem(undefined)
    navigation.forEach((item) => {
      if (location.pathname.includes(item.href) || `/${item.href}` === location.pathname) {
        setActiveItem(item)

        if (item.submenu) {
          item.submenu.forEach((subitem) => {
            if (location.pathname.includes(subitem.href) || `/${subitem.href}` === location.pathname){
              setActiveSubmenuItem(subitem)
            }
          })
        }
      }
    })
  }, [location]);

  function isCurrentPage(name: string) {
    return name === activeItem?.name || name === activeSubmenuItem?.name
  }

  function NavItem(item: { name: string, href: string }) {
    return (
      <li className='shrink-0'>
        <Link
          to={item.href}
          className={classNames(
            isCurrentPage(item.name)
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'inline-block w-full rounded-md px-3 py-2 text-sm font-medium'
          )}
          aria-current={isCurrentPage(item.name) ? 'page' : undefined}
        >
          {item.name}
        </Link>
      </li>
    )
  }

  function Subnavigation () {
    return (
      <ul className="flex h-16 items-center gap-4 px-4 sm:px-0 overflow-x-auto">
        {activeItem?.submenu?.map((item) => (
          <NavItem key={item.name} name={item.name} href={item.href} />
        ))}
      </ul>
    )
  }

  return (
    <>
      <div className="bg-gray-800 pb-32">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link to="/">
                          <img
                            className="h-8 w-8"
                            src="src/assets/logo.png"
                            alt="algoExplorer logo"
                          />
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <ul className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <NavItem key={item.name} name={item.name} href={item.href} />
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
                {activeItem?.submenu && <Subnavigation/>}
              </div>
              <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                <ul className="flex flex-col space-y-1 px-2 py-3 sm:px-3">
                  {navigation.map((item) => (
                    <NavItem key={item.name} name={item.name} href={item.href} />
                  ))}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">{activeSubmenuItem?.name || activeItem?.name || 'AlgoExplorer'}</h1>
          </div>
        </header>
      </div>
    </>
  )
}