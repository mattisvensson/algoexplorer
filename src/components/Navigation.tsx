import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState, useContext } from 'react'
import { useLocation, Link } from 'react-router-dom';
import classNames from '@utils/classNames';
import { NavigationContext } from "@/App"


export default function Navigation() {

  const navigation = useContext(NavigationContext);

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
  }, [location, navigation]);

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
      <ul className="flex items-center h-16 gap-4 px-4 overflow-x-auto sm:px-0">
        {activeItem?.submenu?.map((item) => (
          <NavItem key={item.name} name={item.name} href={item.href} />
        ))}
      </ul>
    )
  }

  return (
    <>
      <div className="pb-32 bg-gray-800">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link to="/">
                          <img
                            className="w-8 h-8"
                            src="src/assets/logo.png"
                            alt="algoExplorer logo"
                          />
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <ul className="flex items-baseline ml-10 space-x-4">
                          {navigation.map((item) => (
                            <NavItem key={item.name} name={item.name} href={item.href} />
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex -mr-2 md:hidden">
                      <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
                {activeItem?.submenu && <Subnavigation/>}
              </div>
              <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                <ul className="flex flex-col px-2 py-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <NavItem key={item.name} name={item.name} href={item.href} />
                  ))}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-10">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">{activeSubmenuItem?.name || activeItem?.name || 'AlgoExplorer'}</h1>
          </div>
        </header>
      </div>
    </>
  )
}