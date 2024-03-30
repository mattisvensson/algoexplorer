import Overview from '@components/Overview'
import Navigation from '@components/Navigation'
import { Routes, Route } from 'react-router-dom'
import { createContext } from 'react'

const navigation: NavigationProps = [
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

export const NavigationContext = createContext(navigation)

function App() {
  return (
    <NavigationContext.Provider value={navigation}>
      <div className="min-h-full">
          <Navigation/>
          <main className="-mt-32">
            <div className="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="px-5 py-6 bg-white rounded-lg shadow sm:px-6">
                <Routes>
                  <Route path="/" element={<Overview/>}/>
                  <Route path="/:category" element={<Overview/>} />
                </Routes>
              </div>
            </div>
          </main>
      </div>
    </NavigationContext.Provider>
  )
}

export default App
