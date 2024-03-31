import { Routes, Route } from 'react-router-dom'
import { createContext } from 'react'
import Overview from '@components/Overview'
import Navigation from '@components/Navigation'
import { algorithmInfo } from '@utils/algorithms/algorithmInfo'


export const AlgorithmContext = createContext(algorithmInfo)

function App() {
  return (
    <AlgorithmContext.Provider value={algorithmInfo}>
      <div className="min-h-full">
          <div className='flex items-center justify-center w-full h-10 bg-yellow-300'>
            <p>Work in progress - more algorithms coming soon!</p>
          </div>
          <Navigation/>
          <main className="-mt-32">
            <Routes>
              <Route path="/" element={<Overview/>}/>
              <Route path="/:category" element={<Overview/>} />
            </Routes>
          </main>
      </div>
    </AlgorithmContext.Provider>
  )
}

export default App
