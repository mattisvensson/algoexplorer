import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { algorithmInfo } from '@utils/algorithms/algorithmInfo'
import sorting from '@utils/algorithms/sorting'
import generateArray from '@/utils/generateArray'

function Container({ additionalClasses, children }: { additionalClasses?: string, children: JSX.Element }) {
  return (
    <div className={`px-5 py-6 bg-white rounded-lg shadow sm:px-6 ${additionalClasses ? additionalClasses : ''}`}>
      {children}
    </div>
  )
}

export default function Visualizer() {
  const { algorithmType } = useParams()
  const [algorithmArray, setAlgorithmArray] = useState<number[]>()
  const [currentAlgorithm, setCurrentAlgorithm] = useState<SubnavigationItem>()
  const [algorithmState, setAlgorithmState] = useState<boolean>(false)
  const [arraySize, setArraySize] = useState<number>(50)
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(50);
  const algorithmStateRef = useRef(false)
  const speedMultiplierRef = useRef(1)

  useEffect(() => {
    setAlgorithmState(false)
    setAlgorithmArray(generateArray(arraySize))

    if (!algorithmType) return

    algorithmInfo.map((item) => {
      item.submenu?.map((subitem) => {
        if (subitem.href.includes(algorithmType)) {
          setCurrentAlgorithm(subitem)
        }
      })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithmType])

  useEffect(() => {
    algorithmStateRef.current = algorithmState
    if (!algorithmType || !algorithmArray || !algorithmState) return
    sorting(algorithmType, algorithmArray, getSpeedMultiplier, setAlgorithmArray, setAlgorithmState, getAlgorithmState)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithmState])

  useEffect(() => {
    if (typeof arraySize !== 'number') return
    toggleAlgorithm(false)
    setAlgorithmArray(generateArray(arraySize))
  }, [arraySize])

  useEffect(() => {
    speedMultiplierRef.current = speedMultiplier
  }, [speedMultiplier])

  function getAlgorithmState() {
    return algorithmStateRef.current
  }

  function getSpeedMultiplier() {
    return speedMultiplierRef.current
  }

  function toggleAlgorithm(state?: boolean) {
    setAlgorithmState(prev => state != undefined ? state : !prev)
  }

  function resetAlgorithm() {
    toggleAlgorithm(false)
    setAlgorithmArray(generateArray(arraySize))
  }

  function setValue(value: number | string, min: number, max: number, setter: (value: number) => void) {
    const newValue = typeof value === 'number' ? value : parseFloat(value)

    if (newValue <= min) {
      setter(min);
    } else if (newValue >= max) {
      setter(max);
    } else {
      setter(newValue);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 pb-12 mx-auto md:grid-cols-2 max-w-7xl sm:px-6 lg:px-8">
      <Container additionalClasses='md:col-span-2'>
        <div className="flex items-end h-[300px]">
          {algorithmArray && algorithmArray.map((item) => (
            <div key={item} style={{ height: item / 100 * (100 / (algorithmArray.length / 100)) + '%' }} className="w-full bg-gray-800 first:rounded-l last:rounded-r"></div>
          ))}
        </div>
      </Container>
      <Container>
        <>
          <h2 className='mb-1 font-bold'>Settings</h2>
          <div>
            <button onClick={() => toggleAlgorithm()} className="mr-2">{algorithmState ? "Pause" : "Play"}</button>
            <button onClick={() => resetAlgorithm()}>Reset</button>
            <div className="flex items-center gap-3 mt-4">
              <label className='contents'>
                <p className='sr-only'>Algorithm speed</p>
                <input type="range" min="0" max="100" value={speedMultiplier} onChange={e => setValue(e.target.value, 0, 100, setSpeedMultiplier)} />
                <input type="number" min="0" max="100" value={speedMultiplier} onChange={e => setValue(e.target.value, 0, 100, setSpeedMultiplier)} />
              </label>
              <p>Speed: {speedMultiplier}%</p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <label className='contents'>
                <p className='sr-only'>Amount of elements</p>
                <input type="range" min="10" max="1000" value={arraySize} onChange={e => setValue(e.target.value, 10, 1000, setArraySize)} />
                <input
                  type="number" 
                  min="10" 
                  max="1000" 
                  value={arraySize} 
                  onChange={e => setValue(e.target.value, 10, 1000, setArraySize)}
                />
              </label>
              <p>Size: {arraySize} Elements</p>
            </div>
          </div>
        </>
      </Container>
      <Container>
        <>
          <h2 className='mb-1 font-bold'>Description</h2>
          {currentAlgorithm?.description && <p>{currentAlgorithm?.description}</p>}
        </>
      </Container>
    </div>
  )
}