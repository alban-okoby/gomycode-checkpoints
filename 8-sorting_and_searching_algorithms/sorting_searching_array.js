/**
 * Loop through the array starting from the second element (index 1)
 * Move elements of arr[0..i-1] that are greater than the key
 * one position ahead of their current position
 * Insert the key after the position of the first element that's smaller than it
 * @param {*} arr array to sort
 * @returns sorted array
 */
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1; 

      while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          j = j - 1;
      }

      arr[j + 1] = key;
  }
  return arr;
}

// Test our program
let array = [99, 12, 11, 13, 5, 6];
console.log("Original array:", array);
console.log("Sorted array:", insertionSort(array));