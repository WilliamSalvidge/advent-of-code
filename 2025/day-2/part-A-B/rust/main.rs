// mod setup;
// mod main_a;
use std::fs;

/*
fn rattle (start: i32, end: i32, mut score: i32) -> i32 {
   while  
}

fn a (input: Vec<Vec<&str>>)
*/
fn main() {
    let contents = fs::read_to_string("../test.txt").unwrap();

    let values: Vec<Vec<i32>> = contents
        .split(",")
        .filter(|line| !line.is_empty())
        .map(|value| value.trim().split("-").map(|inner| inner.parse::<i32>().unwrap()).collect())
        .collect();
   
    for value in values {
        let mut a = 1;
        for part in value {
            println!("{}, {}", part, a);
            a = a + 1;
        }
    }

    // let res_a = main_a::work();

    // println!("res for a is {}", a);
}
