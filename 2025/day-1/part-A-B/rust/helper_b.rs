fn left(value: i32, mut position: i32, mut passcode: i32) -> (i32, i32) {
    let mods = value % 100;
    let result = position - mods;
    let floor = value / 100;
    if result == 0 {
        position = result;
        passcode = passcode + 1 + floor;
        return (position, passcode);
    }
    if result > 0 {
        position = result;
        passcode = passcode + floor;
        return (position, passcode);
    }
    if position == 0 {
        passcode = passcode + floor;    
    } else {
        passcode = passcode + floor + 1;
    }
    position = 100 + result;
    (position, passcode)
}

fn right(value: i32, mut position: i32, mut passcode: i32) -> (i32, i32) {
    let mods = value % 100;
    let result = position + mods;
    let floor = value / 100;
    if result == 100 {
        position = 0;
        passcode = passcode + 1 + floor;
        return (position, passcode);
    }
    if result < 100 {
        position = result;
        passcode = passcode + floor;
        return (position, passcode);
    }
    if position == 0 {
        passcode = passcode + floor;    
    } else {
        passcode = passcode + floor + 1;
    }
    position = mods - (100 - position);
    (position, passcode)
}

pub fn check (dir: &str, value: i32, position: i32, passcode: i32) -> (i32, i32) {
    if dir == "L" {
        return left(value, position, passcode);
    }
    right(value, position, passcode)
}


