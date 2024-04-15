export default async function sorting(type: string, array: number[]): Promise<number[][]> {

  const fullArray: number[][] = []

  let mergeSortTemp = [...array]

  function findFirstIndex(a: number[], b: number[]) {
    for (let i = 0; i < b.length; i++) {
      if (a.includes(b[i])) {
        return i;
      }
    }
    return -1;
  }
  
  if (type === 'bubble-sort') {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < (array.length - i - 1); j++) {
        if (array[j] > array[j + 1]) {
          const temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp

          const copy = structuredClone(array)
          fullArray.push(copy)
        }
      }
    }
  } else if (type === 'selection-sort') {
    for (let i = 0; i < array.length; i++) {
      let lowest = i
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[lowest]) {
          lowest = j
        }
      }
      if (lowest !== i) {
        [array[i], array[lowest]] = [array[lowest], array[i]]

        const copy = structuredClone(array)
        fullArray.push(copy)
      }
    }
  } else if (type === 'insertion-sort') {
    for (let i = 1; i < array.length; i++) {
      const currentValue = array[i]
      let j
      for (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
        array[j + 1] = array[j]
      }
      array[j + 1] = currentValue

      const copy = structuredClone(array)
      fullArray.push(copy)
    }
  } else if (type === 'merge-sort') {
    mergeSort(array, [])
  } else if (type === 'quick-sort') {
    quickSort(array, 0, array.length - 1)
  } else if (type === 'heap-sort') {
    heapSort(array)
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

      if (start < end) {
        const temp = array[start]
        array[start] = array[end]
        array[end] = temp

        const copy = structuredClone(array)
        fullArray.push(copy)
      }
    }

    await Promise.all([
      quickSort(array, rStart, start - 1),
      quickSort(array, start, rEnd)
    ]);
  }

  async function heapSort(array: number[]) {
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
      await heapify(array, array.length, i);
    }

    for (let i = array.length - 1; i > 0; i--) {
      [array[0], array[i]] = [array[i], array[0]];

      const copy = structuredClone(array)
      fullArray.push(copy)

      await heapify(array, i, 0);
    }

    const arrayCopy = structuredClone(array)
    fullArray.push(arrayCopy)

  }

  async function heapify(array: number[], n: number, i: number) {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && array[left] > array[largest]) largest = left
    if (right < n && array[right] > array[largest]) largest = right

    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];

      const arrayCopy = structuredClone(array)
      fullArray.push(arrayCopy)

      await heapify(array, n, largest)
    }
  }

  async function mergeSort(newArray: number[], tempArray: number[][]) {
    if (newArray.length < 2) {
      return newArray;
    }
  
    const mid = Math.floor(newArray.length / 2);
    const left = newArray.slice(0, mid);
    const right = newArray.slice(mid);
  
    const sortedLeft = await mergeSort(left, tempArray);
    const sortedRight = await mergeSort(right, tempArray);
  
    const sortedArray = merge(sortedLeft, sortedRight);
    
    const start = findFirstIndex(sortedArray, array);
    const end = start + sortedArray.length;
    const arrayCopy = structuredClone(mergeSortTemp)
    arrayCopy.splice(start, end - start, ...sortedArray);
    mergeSortTemp = arrayCopy
    fullArray.push(arrayCopy);

    return sortedArray;
  }
  
  function merge(left: number[], right: number[]): number[] {
    const sorted: number[] = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) sorted.push(left.shift()!);
      else sorted.push(right.shift()!);
    }
    return sorted.concat(left.slice().concat(right.slice()));
  }

  return fullArray
}
