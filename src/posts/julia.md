---
title: Computational data science with Julia
description: Experience the zen of Python with the performance of C
date: '2023-10-10'
image: https://upload.wikimedia.org/wikipedia/commons/d/db/Julia1.1.1.jpg
categories:
  - JuliaLang
published: false
---

![Julia REPL](https://upload.wikimedia.org/wikipedia/commons/d/db/Julia1.1.1.jpg)

<script>
  import Heading from "../components/heading.svelte"
</script>

<Heading str="Introduction" />

Julia is a modern programming language released in 2011. It has been developed and maintained by researchers at MIT. Being a modern language, Julia has learned from its predecessors and combines some of the best features of low-level languages (performance) and high-level languages (elegance, simple syntax). Specifically, Julia was designed to address the common "two language" problem, where software is typically prototyped in a high-level language, such as Python, for fast development and then later translated to a low-level language, such as C++, for performance.

To install Julia on the local machine:

#### Windows

```ps1
choco install julia
```

#### macOS

```zsh
brew install julia
```

#### Linux (Debian derivatives)

```bash
sudo apt install julia
```

<Heading str="REPL and package manager" />

Julia provides a read-event-print loop (REPL) as an interactive shell to test simple expressions, run scripts, and manage packages. After downloading Julia, you can start the REPL with the `julia` command in the terminal. Inside this new prompt, you can either evaluate expressions or access the package manager with `]`. To exit the package manager, press backspace or CTRL+C; to exit the REPL environment, execute the `exit()` command.

### Package management

Similar to Python, Julia provides virtual environments to sandbox packages for a specific project.

<Heading str="Basic commands and syntax" />

```julia
?println
```

```julia
# Single line comment
#=
    Multi-line
    comment!
=#
```

```julia
∇ = "Unicode variables!"
```

```julia
println("Hello!")
typeof(Int64)

# string interpolation
name = "Julia"
println("Hello, $name")

x = 3
println("x + 1 = $(x + 1)")
```

By default, Julia functions return the value produced on the last line of the function definition.

```julia
function f(x)
    x^2 # return x^2 is also valid declarative syntax
end
```

```julia
f(x) = x^2
```

Similar to Python and JavaScript, Julia supports "anonymous" (lambda) functions.

```julia
(first, last) -> println("Welcome, $first $last")
x -> x^2
```

However, unlike those other languages, Julia allows developers to bind a name to anonumous functions, so that it can be referenced later:

```julia
welcome = (first, last) -> println("Welcome, $first $last")
f = x -> x^2
```
