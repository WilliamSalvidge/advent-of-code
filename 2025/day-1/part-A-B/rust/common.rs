pub fn creator (left: fn(i32, i32, i32) -> (i32, i32), right: fn(i32, i32, i32) -> (i32, i32)) -> impl Fn(&str, i32, i32, i32) -> (i32, i32) {
    move |dir, val, pos, pass| {
        if dir == "L" {
            return left(val, pos, pass);
        }
        right(val, pos, pass)
    }
}
