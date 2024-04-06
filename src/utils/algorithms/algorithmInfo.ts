export const algorithmInfo =
  [
    { 
      name: 'Sorting', 
      href: 'sorting',
      submenu: [
        {
          name: 'Bubble Sort',
          href: 'sorting/bubble-sort',
          description: 'Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the input list element by element, comparing the current element with the one after it, swapping their values if needed. These passes through the list are repeated until no swaps have to be performed during a pass, meaning that the list has become fully sorted. The algorithm, which is a comparison sort, is named for the way the larger elements "bubble" up to the top of the list.',
        },
        {
          name: 'Selection Sort',
          href: 'sorting/selection-sort',
          description: 'Selection sort, often dubbed as the "minimal exchange sort," is a straightforward sorting algorithm. It iterates over the input list, selecting the minimum element each time and swapping it with the element at the beginning of the unsorted portion of the list. This process continues until the entire list is sorted. Unlike bubble sort, which moves elements by repeatedly swapping adjacent elements, selection sort directly selects the minimum element and places it in its correct position. The algorithm`s name stems from the systematic selection of the smallest element, akin to plucking cards from a hand and arranging them in ascending order.',
        },
        {
          name: 'Insertion Sort',
          href: 'sorting/insertion-sort',
          description: 'Insertion sort, often likened to arranging playing cards in hand, is a straightforward sorting algorithm. It works by iterating over the input list, dividing it into sorted and unsorted portions. In each iteration, the algorithm selects an element from the unsorted portion and inserts it into its correct position within the sorted portion by shifting elements as necessary. This process repeats until all elements are sorted. Unlike selection sort, which selects the smallest element from the unsorted portion, insertion sort builds the sorted portion gradually by inserting elements in their appropriate places. The algorithm`s efficiency shines in nearly sorted lists, making it a practical choice for certain scenarios.',
        },
        {
          name: 'Merge Sort',
          href: 'sorting/merge-sort',
          description: 'Merge sort, often hailed as a "divide and conquer" algorithm, is a sophisticated sorting technique. It operates by recursively dividing the input list into smaller sublists until each sublist contains only one element, then merging those sublists in a sorted manner. During the merge phase, the algorithm compares elements from the divided sublists, gradually building a larger sorted list. This process continues until the entire list is sorted. Merge sort`s efficiency lies in its ability to efficiently handle large datasets by breaking them down into manageable parts and then combining them in a sorted manner, akin to organizing a stack of documents into sorted piles before merging them back together.',
        },
        {
          name: 'Quick Sort',
          href: 'sorting/quick-sort',
          description: 'Quick sort, known for its efficiency and elegance, is a highly efficient sorting algorithm. It employs a "divide and conquer" strategy by selecting a pivot element from the input list and partitioning the list into two sublists: one containing elements less than the pivot and another containing elements greater than the pivot. The algorithm then recursively sorts the sublists until the entire list is sorted. Quick sort`s performance is notable, especially for large datasets, due to its efficient partitioning and sorting approach, reminiscent of organizing a stack of papers by repeatedly selecting a pivot and rearranging the papers around it until the entire stack is sorted.',
        },
        {
          name: 'Heap Sort',
          href: 'sorting/heap-sort',
          description: 'Heap sort, characterized by its use of a binary heap data structure, is a proficient sorting algorithm. It begins by constructing a max-heap from the input list, ensuring that the root element is the largest in the heap. The algorithm then repeatedly removes the largest element from the heap (which is always the root), swaps it with the last element in the heap, and maintains the heap property by heapifying the remaining elements. This process continues until the heap is empty, resulting in a sorted list. Heap sort`s efficiency stems from its ability to maintain the heap property during each step, akin to systematically arranging a stack of items in order of increasing size until the entire stack is sorted.',
        }
      ] 
    },
  ]
