use std::fs;

fn main() {

    let content = fs::read_to_string("../mock.txt").expect("lines to be read in");

    let content: Vec<Vec<&str>> = content
        .split("\n")
        .filter(|line| !line.is_empty())
        .map(|line| line.split_whitespace().collect())
        .collect();

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
