package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
   // fmt.Print("Hello World\n");

  data, err := os.ReadFile("../input.txt")

  if err != nil {
    panic(err)
  }

  all := string(data)
  lines := strings.Split(all, "\n")
  left := make([]int, 0, len(lines))
  right := make([]int, 0, len(lines))
  for i := 0; i < len(lines) - 1; i++ {
    nums := strings.Fields(lines[i])
    tmpleft, err := strconv.Atoi(nums[0])
    if err != nil {
      panic(err)
    }
    left = append(left, tmpleft)
    tmpright, err := strconv.Atoi(nums[1])
    if err != nil {
      panic(err)
    }
    right = append(right, tmpright)
  }

  for j := 0; j < len(lines) - 1; j++ {
    // fmt.Printf("%d left: %d, right: %d\n", j, left[j], right[j])
  }

  sort(left)
  sort(right)

  for j := 0; j < len(lines) - 1; j++ {
    // fmt.Printf("%d left: %d\n", j, left[j])
  }

  for j := 0; j < len(lines) - 1; j++ {
    // fmt.Printf("%d right: %d\n", j, right[j])
  }

  res := 0
  for j := 0; j < len(lines) - 1; j++ {
    if (left[j] > right[j]) {
      res = res + (left[j] - right[j]) 
    } else {
      res = res + (right[j] - left[j])
    } 
  }

  fmt.Printf("result = %d\n", res)
  return

}

func merge(left []int, right []int) {
  // fmt.Printf("left = %v, left len = %d, left cap = %d\n", left, len(left), cap(left))
  // fmt.Printf("right = %v, right len = %d, right cap = %d\n", right, len(right), cap(right))
	count := 0
	left_index := 0
	right_index := 0
	
	// temp := make([]int, 0, len(left) + len(right))
	temp := make([]int, len(left) + len(right))
	
	total_length := len(left) + len(right)
	
	for count < total_length {
		if (left_index == len(left)) {
			for ; count < total_length; {
				temp[count] = right[right_index]
				right_index++
				count++
			}
			break
		}
		
		if (right_index == len(right)) {
			for ; count < total_length; {
				temp[count] = left[left_index]
				left_index++
				count++
			}
			break
		}
		
		if (left[left_index] <= right[right_index]) {
			temp[count] = left[left_index]
			left_index++
		} else {
			temp[count] = right[right_index]
			right_index++
		}
		count++
	}

  left = left[:cap(left)]
  for i := 0; i < total_length; i++ {
    left[i] = temp[i]
  }
}

func sort(input []int) {
	if (len(input) < 2) {
		return
	}

	midpoint := len(input) / 2

	left_slice := input[ : midpoint]
	right_slice := input[midpoint : ]

  sort(left_slice)
  sort(right_slice)

	merge(left_slice, right_slice)

  return

}


