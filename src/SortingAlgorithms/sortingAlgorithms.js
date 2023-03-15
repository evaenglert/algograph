export default function bubbleSort(arr) {

  const animationArray = [];

  for (var i = 0; i < arr.length; i++) {

    // Last i elements are already in place
    for (var j = 0; j < (arr.length - i - 1); j++) {

      animationArray.push([j, j + 1, 'no_swap']);

      // Checking if the item at present iteration
      // is greater than the next iteration
      if (arr[j] >= arr[j + 1]) {

        animationArray.push([j, j+1, 'swap']);

        // If the condition is true then swap them
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }

  return [arr, animationArray]

}

export function quickSort(animationArray, items, left, right) {
  var index;

  if (items.length > 1) {
    [index, animationArray] = partition(animationArray, items, left, right); //index returned from partition
    if (left < index - 1) { //more elements on the left side of the pivot
      quickSort(animationArray, items, left, index - 1);
    }
    if (index < right) { //more elements on the right side of the pivot
      quickSort(animationArray, items, index, right);
    }
  }
  return [items, animationArray]
};

function partition(animationArray, items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      var temp = items[i]
      items[i] = items[j]
      items[j] = temp

      animationArray.push([i, j, 'swap']);

      i++;
      j--;
    }
  }

  return [i, animationArray];
}


export function mergeSort() {

}
