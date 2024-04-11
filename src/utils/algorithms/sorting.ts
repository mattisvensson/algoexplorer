export default async function sorting(type: string, array: number[], getSpeedMultiplier: () => number, setArray: (newArray: number[]) => void, setAlgorithmState: (state: boolean) => void, getAlgorithmState: () => boolean): Promise<void> {
  
  function Timeout(){
    return new Promise(resolve => setTimeout(resolve, 1 * (100 - getSpeedMultiplier())));
  }
  
  if (type === 'bubble-sort') {
    outerLoop:
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < (array.length - i - 1); j++) {
        await Timeout();
        if (!getAlgorithmState()) {
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
    setAlgorithmState(false)
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
        await Timeout();
        if (!getAlgorithmState()) {
          break outerLoop;
        }
        [array[i], array[lowest]] = [array[lowest], array[i]]
        setArray([...array])
      }
    }
    setAlgorithmState(false)
  } else if (type === 'insertion-sort') {
    outerLoop:
    for (let i = 1; i < array.length; i++) {
      const currentValue = array[i]
      let j
      await Timeout();
      if (!getAlgorithmState()) {
        break outerLoop;
      }
      for (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
        array[j + 1] = array[j]
      }
      array[j + 1] = currentValue
      setArray([...array])
    }
    setAlgorithmState(false)
  } else if (type === 'merge-sort') {
    //merge sort
  } else if (type === 'quick-sort') {
    await quickSort(array, 0, array.length - 1)
    setAlgorithmState(false)
  } else if (type === 'heap-sort') {
    // console.log(array)
    heapSort(array)
    // setAlgorithmState(false)
  }

  async function quickSort(array: number[], start: number, end: number) {
    if (start === undefined) {
      start = 0
      end = array.length - 1
    } else if (start >= end) {
      return array
    }
    const rStart = start
    const rEnd = end
    const pivot = array[Math.floor(Math.random() * (end - start + 1) + start)]

    while (start < end) {
      while (array[start] <= pivot) start++
      while (array[end] > pivot) end--

      await Timeout()
      if (!getAlgorithmState()) {
        break
      }

      if (start < end) {
        const temp = array[start]
        array[start] = array[end]
        array[end] = temp
        setArray([...array])
      }
    }
    
    await Promise.all([
      quickSort(array, rStart, start - 1),
      quickSort(array, start, rEnd)
    ]);
  }

  async function heapSort(array: number[]) {
    // console.log(array)
    // Build max heap
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        await heapify(array, array.length, i);
    }

    // Heap sort
    for (let i = array.length - 1; i > 0; i--) {
      // Move current root to end
      [array[0], array[i]] = [array[i], array[0]];

      await Timeout();
      if (!getAlgorithmState()) {
        return;
      }
      // Heapify the reduced heap
      await heapify(array, i, 0);
      // setArray([...array]); // Assuming setArray and getAlgorithmState are defined elsewhere
    }

    setArray([...array]);
  }

  async function heapify(array: number[], n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // If left child is larger than root
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];

        if (!getAlgorithmState()) {
            return;
        }

        setArray([...array]);

        // Recursively heapify the affected sub-tree
        await heapify(array, n, largest);
    }
  }
}
