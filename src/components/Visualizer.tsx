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
  const [isAlgorithmRunning, SetIsAlgorithmRunning] = useState<boolean>(false)
  const isAlgorithmRunningRef = useRef(false)

  useEffect(() => {
    isAlgorithmRunningRef.current = true
    SetIsAlgorithmRunning(true)
    setAlgorithmArray(generateArray())
    
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
    if (!algorithmType || !algorithmArray || isAlgorithmRunning) return
    sorting(algorithmType, algorithmArray, setAlgorithmArray, isAlgorithmStopped)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAlgorithmRunning])

  function isAlgorithmStopped() {
    return isAlgorithmRunningRef.current
  }

  function toggleAlgorithm(state?: boolean) {
    SetIsAlgorithmRunning(prev => state != undefined ? state : !prev)
    isAlgorithmRunningRef.current = state ? state != undefined : !isAlgorithmRunningRef.current
  }

  function resetAlgorithm() {
    toggleAlgorithm(false)
    setAlgorithmArray(generateArray())
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Container additionalClasses='col-span-2'>
        <div className="flex items-end h-[300px] gap-4">
          {algorithmArray && algorithmArray.map((item) => (
            <div key={item} style={{ height: item * 2 + '%' }} className="w-[calc(100%_/_8)] bg-black rounded-md"></div>
          ))}
        </div>
      </Container>
      <Container>
        <>
          <h3>Settings</h3>
          <button onClick={() => toggleAlgorithm()}>{isAlgorithmRunning ? "Play" : "Pause"}</button>
          <button onClick={() => resetAlgorithm()}>Reset</button>
        </>
      </Container>
      <Container>
        <>
          <h3>About the algorithm</h3>
          {currentAlgorithm?.description && <p>{currentAlgorithm?.description}</p>}
        </>
      </Container>
    </div>
  )
}