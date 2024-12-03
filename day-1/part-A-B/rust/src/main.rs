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
        left.push(words[0].to_string());
        right.push(words[1].to_string());
    }

    left.sort();
    right.sort();

    let mut count = 0; 
    for n in 0..left.len() {
        if left[n] > right[n] {
            // left[n] will be a string slice so need to turn it into a number
            count = count + (left[n].parse::<i32>().unwrap() - right[n].parse::<i32>().unwrap()) 
        } else {
            count = count + (right[n].parse::<i32>().unwrap() - left[n].parse::<i32>().unwrap()) 
        } 
    }

    println!("{}", count);
}
