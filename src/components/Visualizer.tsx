import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { algorithmInfo } from '@utils/algorithms/algorithmInfo'
import sorting from '@utils/algorithms/sorting'
import generateArray from '@/utils/generateArray'

function Container({ additionalClasses, children}: { additionalClasses?: string, children: JSX.Element}) {
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
  const algorithmStateRef = useRef(false)

  useEffect(() => {
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
    sorting(algorithmType, algorithmArray, setAlgorithmArray, setAlgorithmState, getAlgorithmState)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithmState])

  function getAlgorithmState() {
    return algorithmStateRef.current
  }

  function toggleAlgorithm(state?: boolean) {
    setAlgorithmState(prev => state != undefined ? state : !prev)
  }

  function resetAlgorithm() {
    toggleAlgorithm(false)
    setAlgorithmArray(generateArray(arraySize))
  }

  useEffect(() => {
    if (typeof arraySize !== 'number') return
    toggleAlgorithm(false)
    setAlgorithmArray(generateArray(arraySize))
  }, [arraySize])

  return (
    <div className="grid grid-cols-2 gap-4 px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Container additionalClasses='col-span-2'>
        <div className="flex items-end h-[300px]">
          {algorithmArray && algorithmArray.map((item) => (
            <div key={item} style={{ height: item / 100 * (100 / (algorithmArray.length / 100)) + '%' }} className="w-full bg-gray-800 first:rounded-l last:rounded-r"></div>
          ))}
        </div>
      </Container>
      <Container>
        <>
          <h3 className='mb-1 font-bold'>Settings</h3>
          <div>
            <button onClick={() => toggleAlgorithm()} className="mr-2">{algorithmState ? "Pause" : "Play"}</button>
            <button onClick={() => resetAlgorithm()}>Reset</button>
            {/* <input type="number" min={0} max={10} value='1'/> */}
            <div className="flex items-center gap-3 mt-4">
              <input type="range" min="10" max="1000" value={arraySize} onChange={e => setArraySize(parseInt(e.target.value))}/>
              <input type="number" min="10" max="1000" value={arraySize} onChange={e => setArraySize(parseInt(e.target.value))}/>
              <p>Size: {arraySize} Elements</p>
            </div>
          </div>
        </>
      </Container>
      <Container>
        <>
          <h3 className='mb-1 font-bold'>Description</h3>
          {currentAlgorithm?.description && <p>{currentAlgorithm?.description}</p>}
        </>
      </Container>
    </div>
  )
}