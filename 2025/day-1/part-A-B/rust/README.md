Keeping this simple and not using cargo

```rs
mod helper_a;
```
in main.rs 

when we compile with `rustc main.rs` the compiler will look up helper_a.rs and make check function available.

use pub fn to make it public

use namespace of module to use function helper_a::check

In rust modules are not bound to files like JS
