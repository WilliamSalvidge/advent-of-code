use std::fs;

fn main() {

    // Non mutable String - Heap
    let contents = fs::read_to_string("../input.txt")
        .expect("inputs txt should exist");

    // Non mutable Vector of string slices
    // A string slice is a references to portion of a String 
    let lines: Vec<&str> = contents.split("\n").filter(|line| !line.is_empty()).collect();

    let mut left: Vec<String> = Vec::new();
    let mut right: Vec<String> = Vec::new();

    // line will be dereferenced string slice
    for line in lines {
        let words: Vec<&str> = line.split_whitespace().collect();
        // I think we need to create a copy otherwise are just pushing another reference
        // but maybe we can just organise the references into order?
        left.push(words[0].to_string());
        right.push(words[1].to_string());
    }

    left.sort();
    right.sort();

    let mut count_a = 0;
    for n in 0..left.len() {
        if left[n] > right[n] {
            // left[n] will be a string slice so need to turn it into a number
            count_a = count_a + (left[n].parse::<i32>().unwrap() - right[n].parse::<i32>().unwrap());
        } else {
            count_a = count_a + (right[n].parse::<i32>().unwrap() - left[n].parse::<i32>().unwrap());
        } 
    }

    let mut count_b = 0;
    for n in 0..left.len() {
        let mut tmp = 0;
        for j in 0..right.len() {
            if left[n] == right[j] {
               tmp = tmp + 1;
            }
        }
        count_b = count_b + left[n].parse::<i32>().unwrap() * tmp;
    }

    println!("part A: {}", count_a);
    println!("part B: {}", count_b)
}
