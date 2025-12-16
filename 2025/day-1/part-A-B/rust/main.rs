use std::fs;

fn left (input: i32, mut internal_position: i32, mut internal_passcode: i32) -> (i32, i32) {
    let mods = input % 100;
    let result = internal_position - mods;
    if result == 0 {
        internal_position = 0;
        internal_passcode = internal_passcode + 1;
    }
    if result > 0 {
        internal_position = result;
    }
    if result < 0 {
        internal_position = 100 + result;
    }
    (internal_position, internal_passcode)
}

fn right (input: i32, mut internal_position: i32, mut internal_passcode: i32) -> (i32, i32) {
    let mods = input % 100;
    let result = internal_position + mods;
    if result == 100 {
        internal_position = 0;
        internal_passcode = internal_passcode + 1;
    }
    if result < 100 {
        internal_position = result;
    }
    if result > 100 {
        internal_position = mods - (100 - internal_position);
    }
    (internal_position, internal_passcode)
}


fn check (dir: &str, value: i32, position: i32, passcode: i32) -> (i32, i32) {
    if dir == "L" {
        return left(value, position, passcode);
    }
    right(value, position, passcode)
}

fn main() {

    // Create a non mutable string on the heap
    // We get back a Result object
    // us unwrap to get out the positive outcome
    // otherwise program will panic
    let contents = fs::read_to_string("../input.txt").unwrap();
        // .expect("fingers crossed it exists");

    // We have a String
    // this String type implements the split trait
    // so someone wrote some code for the String type
    // that means we can use it in a understandable way
    // Split takes a pattern
    // Returns an iterator over substrings of this string slice, separated by characters matched by a pattern
    // the first param is &self so maybe this where string slcie comes from
    let lines: Vec<(&str, i32)> = contents
        .split("\n")
        .filter(|line| !line.is_empty())
        .map(|s| {
            let (letter, number) = s.split_at(1);
            let num = number.parse::<i32>().unwrap();
            (letter, num)
        })
        .collect();


    let mut passcode = 0;
    let mut position = 50;

    for (a, b) in lines {
        // println!("passcode: {}, position: {}", passcode, position);
        let (new_pos, new_pass) = check(a, b, position, passcode);
        position = new_pos;
        passcode = new_pass;
        // println!("hey {a} {b}");
    }

    println!("final result passcode! = {}", passcode);
}
