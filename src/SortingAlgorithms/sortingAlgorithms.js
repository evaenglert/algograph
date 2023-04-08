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

export function quickSort(animationArray, arr, left, right) {
  var index;

  if (arr.length > 1) {
    [index, animationArray] = partition(animationArray, arr, left, right); //index returned from partition
    if (left < index - 1) { //more elements on the left side of the pivot
      quickSort(animationArray, arr, left, index - 1);
    }
    if (index < right) { //more elements on the right side of the pivot
      quickSort(animationArray, arr, index, right);
    }
  }
  return [arr, animationArray]
};

function partition(animationArray, arr, left, right) {
  var pivot = arr[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      var temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp

      animationArray.push([i, j, 'swap']);

      i++;
      j--;
    }
  }

  return [i, animationArray];
}


function merge(animationArray, index_left, left, right) {
  let arr = [];
  let left_arr_idx = 0;
  let right_arr_idx = left.length-1;


  while (left.length && right.length) {

    if (left[0] < right[0]) {
      arr.push(left.shift())
      animationArray.push([index_left + arr.length - 1, arr[arr.length - 1], index_left + left_arr_idx, index_left + right_arr_idx])
      left_arr_idx += 1;
    } else {
      arr.push(right.shift())
      animationArray.push([index_left + arr.length - 1, arr[arr.length - 1], index_left + left_arr_idx, index_left + right_arr_idx])
      right_arr_idx += 1;
    }
  }

  while (left.length) {
    arr.push(left.shift())
    animationArray.push([index_left + arr.length - 1, arr[arr.length - 1], index_left + left_arr_idx, index_left + right_arr_idx])
    left_arr_idx += 1;
  }

  while (right.length) {
    arr.push(right.shift())
    animationArray.push([index_left + arr.length - 1, arr[arr.length - 1], index_left + left_arr_idx, index_left + right_arr_idx])
    right_arr_idx += 1;
  }

  return [[...arr], animationArray]
}

export function mergeSort(animationArray, index_left, arr) {
  const half = arr.length / 2

  // Base case or terminating case
  if (arr.length < 2) {
    return [arr, animationArray]
  }

  const left = arr.splice(0, half);


  const [left_sorted, left_animation_array] = mergeSort(animationArray, index_left, left);
  const [right_sorted, right_animation_array] = mergeSort(animationArray, index_left + arr.length -1, arr)


  return merge(animationArray, index_left, left_sorted, right_sorted)
}
