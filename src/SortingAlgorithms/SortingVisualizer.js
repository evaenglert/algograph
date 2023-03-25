import React from "react"
import bubbleSort, { quickSort, mergeSort } from "./sortingAlgorithms";

export default function SortingBar() {

  const sort_container_height = 400;

  const new_array = [];
  for (var i = 0; i < 150; i++) {
    var new_number = randomIntFromInterval(1, 500);
    new_array.push([new_number, 'red'])
  }

  const [barArray, setBarArray] = React.useState(new_array);

  const bars = barArray.map((item, index) => {
    return (<div className="bar" style={{ height: item[0] * sort_container_height / 500, width: 10, backgroundColor: item[1] }} key={index}></div>)
  })


  function generateNewArray() {
    setBarArray(() => {
      const new_array = [];
      for (var i = 0; i < 150; i++) {
        var new_number = randomIntFromInterval(1, 500);
        new_array.push([new_number, 'red'])
      }

      return new_array
    });
  }

  function runBubbleSort() {
    const copy_of_array = barArray.map(item => item[0]);
    const animationArray = bubbleSort(copy_of_array)[1];
    const buttons = document.getElementsByTagName('button');
    console.log(buttons);

    buttons.forEach(button => {button.disabled = true});

    for (let i=0; i < animationArray.length; i++) {

      const [idx1, idx2, is_swap] = animationArray[i];
      setTimeout(() => {
        setBarArray((prevBarArray) => {
          const newBarArray = prevBarArray.map(item => item);
          if (i > 0) {
            const [idx1_prev, idx2_prev, _] = animationArray[i-1];
            newBarArray[idx1_prev][1] = 'red';
            newBarArray[idx2_prev][1] = 'red';
          }

          newBarArray[idx1][1] = 'blue';
          newBarArray[idx2][1] = 'blue';

          if (is_swap==='swap') {
            var tmp = newBarArray[idx1];
            newBarArray[idx1] = newBarArray[idx2];
            newBarArray[idx2] = tmp;
          }

          return newBarArray
        })
      }, 1*i);
    }

    setTimeout(() => {
      setBarArray((prevBarArray) => {
        const newBarArray = prevBarArray.map(item => item);
        for (let i = 0; i < newBarArray.length; i++) {
          newBarArray[i][1] = 'green';
        }
        return newBarArray
      })
    }, 1 * (animationArray.length) + 1);
  }

  function runQuickSort() {
    const copy_of_array = barArray.map(item => item[0]);
    const animationArray = quickSort([], copy_of_array, 0, copy_of_array.length-1)[1];
    console.log(animationArray);

    for (let i = 0; i < animationArray.length; i++) {
      console.log(i);

      const [idx1, idx2, is_swap] = animationArray[i];
      setTimeout(() => {
        setBarArray((prevBarArray) => {
          const newBarArray = prevBarArray.map(item => item);
          if (i > 0) {
            const [idx1_prev, idx2_prev, _] = animationArray[i - 1];
            newBarArray[idx1_prev][1] = 'red';
            newBarArray[idx2_prev][1] = 'red';
          }

          newBarArray[idx1][1] = 'blue';
          newBarArray[idx2][1] = 'blue';

          if (is_swap === 'swap') {
            var tmp = newBarArray[idx1];
            newBarArray[idx1] = newBarArray[idx2];
            newBarArray[idx2] = tmp;
          }

          return newBarArray
        })
      }, 10 * i);
    }

    setTimeout(() => {
      setBarArray((prevBarArray) => {
      const newBarArray = prevBarArray.map(item => item);
      for (let i=0; i<newBarArray.length; i++) {
        newBarArray[i][1] = 'green';
      }
      return newBarArray
      })
    }, 10 * (animationArray.length) +1);

  }

  function runMergeSort() {
    const copy_of_array = barArray.map(item => item[0]);
    const sorted_array = mergeSort([], copy_of_array);

    setBarArray((prevBarArray) => {
      const newBarArray = prevBarArray.map(item => item);
      for (let i=0; i<newBarArray.length; i++) {
        newBarArray[i][0] = sorted_array[i]
      }

      return newBarArray
    });

  }


  return (
    <div className='main-content'>
      <div className="sort-container" style={{ width: 800 }}>
        {bars}
      </div>
      <div className='settings'>
        <button onClick={generateNewArray} id="new-array">Generate New Array</button>
        <button onClick={runBubbleSort} id="bubble-sort">Bubble Sort</button>
        <button onClick={runQuickSort} id="quick-sort">Quick Sort</button>
        <button onClick={runMergeSort} id="merge-sort">Merge Sort</button>
      </div>

    </div>
  )
}



function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
