use std::fs;

fn safe_a(nums: &Vec<Vec<i32>>, index: i32) -> bool {
    if index >= (nums.len() as i32) {
        return true;
    }
    true
}

fn main() {
    let content = fs::read_to_string("../mock.txt").expect("lines to be read in");

    let content: Vec<Vec<i32>> = content
        .split("\n")
        .filter(|line| !line.is_empty())
        .map(|line| {
            line.split_whitespace()
                .map(|unit| unit.parse::<i32>().unwrap())
                .collect()
        })
        .collect();

    let res_a = safe_a(&content, 1);
    /*
    for cont in content {
        for x in cont {
        println!("{}", x);
        }
    }
    */
    let _ = content.iter().for_each(|x| {
        x.iter().for_each(|y| {
            println!("{}", y);
        });
    });
}
