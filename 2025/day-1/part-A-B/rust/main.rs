use std::fs;

mod helper_a;
mod helper_b;
mod common;

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

    let mut passcode_b = 0;
    let mut position_b = 50;

    let mut passcode_a = 0;
    let mut position_a = 50;

    let check_a = helper_a::check_a();

    for (a, b) in lines {
        // println!("passcode: {}, position: {}", passcode, position);
        let (new_pos, new_pass) = helper_a::check(a, b, position, passcode);
        position = new_pos;
        passcode = new_pass;
        // println!("hey {a} {b}");
        let (new_pos_b, new_pass_b) = helper_b::check(a, b, position_b, passcode_b);
        position_b = new_pos_b;
        passcode_b = new_pass_b;

        let (new_pos_a, new_pass_a) = check_a(a, b, position_a, passcode_a);

        position_a = new_pos_a;
        passcode_a = new_pass_a;
    }

    println!("final result A passcode! = {}", passcode);
    println!("final result B passcode! = {}", passcode_b);
    println!("final result A passcode! = {}", passcode_a);
}
