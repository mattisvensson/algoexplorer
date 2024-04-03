export default async function sorting(type: string, array: number[], setArray: (newArray: number[]) => void, isAlgorithmRunning: () => boolean): Promise<void> {
  if (type === 'bubble-sort') {
    outerLoop:
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < (array.length - i - 1); j++) {
        await new Promise(r => setTimeout(r, 50));
        if (!isAlgorithmRunning()) {
          break outerLoop;
        }
        if (array[j] > array[j + 1]) {
          const temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp
          setArray([...array])
        }
      }
    }
  } else if (type === 'selection-sort') {
    outerLoop:
    for (let i = 0; i < array.length; i++) {
      let lowest = i
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[lowest]) {
          lowest = j
        }
      }
      if (lowest !== i) {
        await new Promise(r => setTimeout(r, 50));
        if (!isAlgorithmRunning()) {
          break outerLoop;
        }
        [array[i], array[lowest]] = [array[lowest], array[i]]
        setArray([...array])
      }
    }
  } else if (type === 'insertion-sort') {
    outerLoop:
    for (let i = 1; i < array.length; i++) {
      const currentValue = array[i]
      let j
      await new Promise(r => setTimeout(r, 50));
      if (!isAlgorithmRunning()) {
        break outerLoop;
      }
      for (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
        array[j + 1] = array[j]
      }
      array[j + 1] = currentValue
      setArray([...array])
    }
  }
}