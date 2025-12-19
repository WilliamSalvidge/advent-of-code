
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

pub fn check_a () -> impl Fn(&str, i32, i32, i32) -> (i32, i32) {
    crate::common::creator(left, right)
}

pub fn check (dir: &str, value: i32, position: i32, passcode: i32) -> (i32, i32) {
    if dir == "L" {
        return left(value, position, passcode);
    }
    right(value, position, passcode)
}


