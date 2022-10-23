---
layout: post
title: Rust - Invoking Closures in a Struct
description: An explanation why and how to invoke closures in a struct
categories: [programming, rust]
---

Closures are very neat and are similar to Javascript's arrow functions or anonymous 
functions in other languages. The neat thing about closures is the 
ability to capture the environment or take 
a snapshot of the state of the environment within its scope (i.e. the environment outside the closure but 
within the scope it is defined in).

```rust
let x: i32 = 5;
let foo = || x;
println!("value of foo is {}", foo()); //prints 5
```
<caption><small><b>Caption:</b> An example of a closure where the value of x is captured in the closure so the value of x does not need to be passed when invoking the closure</small></caption>

During last week's session on learning Rust with a group of students, we went over [Chapter 13 of the Rust Programming Language](https://doc.rust-lang.org/book/ch13-00-functional-features.html), 
talking about Closures and Iterators in Rust and a particular line caught my attention: `let v = (self.calculation)(arg);`. The full code is available below.
```rust
impl<T> Cacher<T>
where
    T: Fn(u32) -> u32,
{
    fn new(calculation: T) -> Cacher<T> {
        Cacher {
            calculation,
            value: None,
        }
    }

    fn value(&mut self, arg: u32) -> u32 {
        match self.value {
            Some(v) => v,
            None => {
                let v = (self.calculation)(arg); //<-- Why brackets around self.calculation?
                self.value = Some(v);
                v
            }
        }
    }
}
```

What caught my attention was the fact the identifier/symbol storing the  closure had to be enclosed with in the parenthesis `()`. 
Why does a closure inside a `struct` require the brackets to be enclosed when calling a method does 
not require the brackets to enclose the method symbol/identifier to be invoked. Normally one would know whether a function/method 
is being invoked based on if there is an argument list (a pair of brackets) after the identifier (e.g. `printf` would be the 
identifier and `("hello")` would be the argument list in a typical invocation of a function). I had a very weird thought that 
it might have to do with pointers and operation precedence as typically seen when working with function pointers in C 
 but that was quickly thrown out of the window because methods worked as normal.

The answer is actually quite obvious if one thinks about it more carefully. However, being the impatient person I am, I googled the answer 
and found [Rust's Discourse has a good answer for this](https://users.rust-lang.org/t/calling-function-in-struct-field-requires-extra-parenthesis/14214/2). 
The key to the question is to consider what is the difference between a field and a method. A method is a function that is a member of the struct while a field 
is a variable member of the struct. A variable isn't supposed to be invokable but rather store a value. Therefore, one could 
have a method and field with the same name because they exist in two different namespace. The extra parenthesis needed to invoke a closure stored as a member of 
a struct tells the compiler that we wish to treat the member as an invokable function. A very silly and terrible example is to have a **method i** and **field i** where 
the **method i** calculates the current while the **field i** is a closure that prints `i` is part of the imaginary/complex plane/axis. Hence why engineers use the 
symbol `j` to denote complex or imaginary instead of `i` used by Mathematicians.

```rust
struct Circuit<T>
where
    T: Fn() -> String,
{
    i: T,
    r: f32,
    v: f32 
}

impl<T> Circuit<T>
where
    T: Fn() -> String,
{
    fn new(f: T, r: f32, v: f32) -> Circuit<T> {
        Circuit {
            i: f,
            r: r,
            v: v
        }
    }
    
    fn i(&self) -> f32 {
        // i = v/r from Ohm's Law
        self.v / self.r
    }
}

fn main() {
    let f = || String::from("i is along the complex axis that is perpendicular to the real");
    let sci = Circuit::new(f, 10.0, 4.0);
    println!("to access closure: {}", (sci.i)());
    println!("to access method: {}", sci.i());
}
```
**Output:**
```
to access closure: i is along the complex axis that is perpendicular to the real
to access method: 0.4
```

## Summary
To invoke a closure inside a struct, you need to enclose the field with braclets (i.e. `(self.drive)()` or `(car.drive)()`) 
to differentiate between a method or a field. You can have a field and method share the same name as they exist in two 
different namespace.
