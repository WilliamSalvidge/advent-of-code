use std::fs;

fn main() {

    // Non mutable String - Heap
    let contents = fs::read_to_string("../../input.txt")
        .expect("inputs txt should exist");

    // Non mutable Vector of string slices
    // A string slice is a references to portion of a String 
    let lines: Vec<&str> = contents
        .split("\n")
        .filter(|line| !line.is_empty())
        .collect();

    let mut left: Vec<i32> = Vec::new();
    let mut right: Vec<i32> = Vec::new();

    for line in lines {
        let str_nums_iter = line.split(" ").enumerate();
        for (i, str_num) in str_nums_iter {
            let c = str_num.parse::<i32>().unwrap();
                if i == 0 {
                left.push(c);
            } else {
                right.push(c);
            }
        }
    }

    left.sort();
    right.sort();

    let mut count_a = 0;
    for n in 0..left.len() {
        if left[n] > right[n] {
            count_a = count_a + (left[n] - right[n]);
        } else {
            count_a = count_a + (right[n] - left[n]);
        } 
    }

    println!("part A: {}", count_a);
}

fn merge(left: &mut [i32], right: &mut [i32]) {}

// Borrowing mutable ref to the vector
fn sort(input: &[i32]) {
    if input.len() < 2 {
        return;
    }

    let midpoint = input.len() / 2;

    let (mut left_slice, mut right_slice) = input.split_at(midpoint);

    sort(left_slice);
    sort(right_slice);

    merge(&mut left_slice, &mut right_slice)
}
