import { useEffect, useState, useCallback } from 'react'
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
  const [currentAlgorithm, setCurrentAlgorithm] = useState<SubnavigationItem>()
  const [animationState, setAnimationState] = useState<boolean>(false)
  const [arraySize, setArraySize] = useState<number>(50)
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(50);
  const [steps, setSteps] = useState<number[][]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isFinished, setIsFinished] = useState<boolean>(false)

  const resetAnimation = useCallback(() => {
    setCurrentStep(0)
    setAnimationState(false)
    const array = generateArray(arraySize)
    setSteps([array])
  }, [arraySize]);

  useEffect(() => {
    resetAnimation()

    if (!algorithmType) return

    algorithmInfo.map((item) => {
      item.submenu?.map((subitem) => {
        if (subitem.href.includes(algorithmType)) {
          setCurrentAlgorithm(subitem)
        }
      })
    })
  }, [algorithmType, resetAnimation])

  useEffect(() => {
    if (typeof arraySize !== 'number') return
    resetAnimation()
  }, [arraySize, resetAnimation])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const tick = () => {
      setCurrentStep(prevStep => {
        if (steps.length - 1 === 0) return 0
        if (prevStep < steps.length - 1) {
          return prevStep + 1
        } else if (prevStep === steps.length - 1) {
          setAnimationState(false)
          setIsFinished(true)
          clearTimeout(timeoutId)
          return prevStep
        } else {
          return prevStep
        }
      })
    }
  
    function run() {
      if (!animationState) return
      tick()
      timeoutId = setTimeout(run, 1 * (100 - speedMultiplier))
    }
  
    if (animationState) {
      run()
    }
  
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps, animationState, speedMultiplier]);
  

  useEffect(() => {
    if (!animationState || !algorithmType || steps.length > 1) return

    const sort = async () => {
      const array = await sorting(algorithmType, steps[0]) || []
      setSteps(array)
    }
    sort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationState])

  function toggleAnimation() {
    if (isFinished) {
      setCurrentStep(0) 
      setIsFinished(false) 
    }
    setAnimationState(prev => !prev)
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
          {steps.length > 0 && steps[currentStep].map((item) => (
            <div key={item} style={{ height: item / 100 * (100 / (steps[currentStep].length / 100)) + '%' }} className="w-full bg-gray-800 first:rounded-l last:rounded-r"></div>
          ))}
        </div>
      </Container>
      <Container>
        <>
          <h2 className='mb-1 font-bold'>Settings</h2>
          <div>
            <button onClick={() => toggleAnimation()} className="mr-2">{animationState ? "Pause" : "Play"}</button>
            <button onClick={() => resetAnimation()}>Reset</button>
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