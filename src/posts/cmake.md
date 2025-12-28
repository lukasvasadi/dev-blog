---
title: CMake
description: Leverage CMake to automate the build process for C/C++ projects.
date: '2023-08-15'
image: /images/macbook-code.jpg
categories:
  - CMake
published: true
---

<script>
  import Heading from "../components/heading.svelte"
  import Tag from "../components/tag.svelte"  
</script>

<Heading str="Introduction" />

CMake is an open-source, cross-platform automation tool for generating C/C++ Makefiles, which can then be used to build the source. It has become the _de facto_ build system for the developer community as well as major companies, such as Qt and ST Microelectronics.

<Heading str="Installation" />

See below for platform-specific commands to install the CMake toolchain. The rest of the tutorial will use Unix-style commands, but these should be directly transferable to Windows systems. Note that each platform also requires a dedicated compiler for C/C++ applications.

**Windows (Chocolatey):**

```ps1
choco install cmake visualstudio2022buildtools
```

**macOS (Homebrew):**

```zsh
brew install cmake llvm
```

**Linux:**

```bash
sudo apt install make cmake gcc g++ gdb
```

<Heading str="Basics" />

CMake relies on a top-level file called `CMakeLists.txt`, which should be created in the same directory as the source. (It is good practice to separate source code and build files.) To demonstrate a CMake project, we can create a `HelloCMake` directory with a `build` subdirectory:

```bash
mkdir -p ~/HelloCMake/build
```

Create a `~/HelloCMake/main.cpp` file:

```cpp
#import <iostream>

using std::cout, std::endl;

int main() {
    cout << "Hey, CMake!" << endl;
    return 0;
}
```

Add a `CMakeLists.txt` file (use the CMake version output from `cmake --version`):

```cmake
cmake_minimum_required(VERSION 3.27.4)

project(hello)

add_executable(${PROJECT_NAME} main.cpp)
```

To generate the Makefile, which contains the recipe to build the source, run the `cmake` command and specify the locations of the `src` and `build` directories:

```bash
cmake -S ~/HelloCMake -B ~/HelloCMake/build
```

After running that command, the project folder should appear as follows:

```
├── build
│   ├── CMakeCache.txt
│   ├── CMakeFiles
│   ├── Makefile
│   └── cmake_install.cmake
├── CMakeLists.txt
└── main.cpp
```

Now run the `make` command inside the build folder:

```bash
cd ~/HelloCMake/build
make
```

At this point, if the build was successful, there will be an executable called `hello`, which can be run with `./hello`.

In addition to setting the CMake version requirements, project name, and source target, we can specify the project version and languages, as well as the C/C++ ISO standard. CMake also provides an install keyword to specify the executable target directory. This feature is especially helpful for Linux users who may want their program to be accessible from the command line. For example, the below CMake file will place our `hello` executable into the system `bin` folder:

```cmake
cmake_minimum_required(VERSION 3.27.4)

project(hello VERSION 1.0.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)

add_executable(${PROJECT_NAME} main.cpp)

install(TARGET hello DESTINATION bin)
```

With this configuration, we can run the `make install` command with root privileges to install the executable into `/usr/local/bin`:

```bash
sudo make install
```

Now we can run the application from anywhere in the file system:

```bash
hello
```

<Heading str="Libraries" />

Most projects use libraries for reusable source code. Often, these libraries should be placed in a dedicated subdirectory, such as is shown below with the library named `basicmath`:

```
├── build
│   ├── CMakeCache.txt
│   ├── CMakeFiles
│   ├── Makefile
│   └── cmake_install.cmake
├── lib
│   ├── basicmath
│   │   ├── include
│   │   │   └── basicmath.h
│   │   ├── src
│   │   │   ├── basicmath.cpp
│   │   │   └── CMakeLists.txt
│   │   └── CMakeLists.txt
│   └── CMakeLists.txt
├── CMakeLists.txt
└── main.cpp
```

Notice how each subdirectory of the library contains a `CMakeLists.txt` file. This is needed for nested source code directories, but most of these files will only contain one line to point to the next directory in the chain.

Below are the four `CMakeLists.txt` files listed from top to bottom in the directory nest. The high-level file contains most of the project information, including the target library details. The intermediary files contain one command to point to the relevant subdirectory, and the last contains the library definition as well as a pointer to the `include` directory will the header files.

```cmake
# adder/CMakeLists.txt
cmake_minimum_required(VERSION 3.27.4)

project(adder VERSION 1.0.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)

add_subdirectory(lib)

add_executable(${PROJECT_NAME} main.cpp)

target_link_libraries(adder PUBLIC BasicMath)
```

```cmake
# adder/lib/CMakeLists.txt
add_subdirectory(basicmath)
```

```cmake
# adder/lib/basicmath/CMakeLists.txt
add_subdirectory(src)
```

```cmake
# adder/lib/basicmath/src/CMakeLists.txt
add_library(BasicMath STATIC adder.cpp)
target_include_directories(BasicMath PUBLIC "../include")
```

Below is the source code for reference:

```cpp
/* basicmath.h */
#pragma once

namespace basicmath {
    int add(int a, int b);
    float add(float a, float b);
}
```

```cpp
/* basicmath.cpp */
#include "basicmath.h"

int basicmath::add(int a, int b) {
    return (a + b);
}

float basicmath::add(float a, float b) {
    return (a + b);
}
```

```cpp
/* main.cpp */
#include "basicmath.h"

using std::cout, std::endl;

int main() {
    cout << "2.5 + 2.5 = " << basicmath::add(2.5, 2.5) << endl;
    return 0;
}
```

To test this project configuration, execute the following commands, assuming that the build process has been completed at least once:

```bash
cd build
cmake --build .
make
./adder
```

Optionally, you can choose to only target the library during the build routine, which may help you pinpoint build errors:

```bash
cmake --build . --target basicmath
```

<Heading str="Variables" />

In CMake, variables can be defined in the top-level `CMakeLists.txt` file and accessed in all subdirectories. By convention, variable names are written in all caps. To create a variable, use the `set` function to define its name and value, separated by a space:

```cmake
set(LIBRARY_NAME BasicMath)
```

If we add this line to the top-level CMake file, then we can reference the variable name for our library in `adder/lib/basicmath/src/CMakeLists.txt`:

```cmake
# adder/CMakeLists.txt
cmake_minimum_required(VERSION 3.27.4)

project(adder VERSION 1.0.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)
set(LIBRARY_NAME BasicMath)

add_subdirectory(lib)

add_executable(${PROJECT_NAME} main.cpp)

target_link_libraries(adder PUBLIC BasicMath)
```

```cmake
# adder/lib/basicmath/src/CMakeLists.txt
add_library(${LIBRARY_NAME} STATIC adder.cpp)
target_include_directories(${LIBRARY_NAME} PUBLIC "../include")
```

There are also common CMake variables, such as `PROJECT_NAME` and `CMAKE_CXX_STANDARD`, that have already been defined. Some other common configuration variables include:

```cmake
set(CMAKE_CXX_STANDARD_REQUIRED ON)  # Force compiler to implement stated standard
set(CMAKE_CXX_EXTENSIONS        OFF) # Prevent non-standard language extensions
```

<Heading str="Options" />

CMake options are similar to variables, but only hold ON/OFF (True/False) values. Options defined in the CMake file can be used with conditional statements to control function execution, e.g., whether or not to compile the executable:

```cmake
# adder/CMakeLists.txt
cmake_minimum_required(VERSION 3.27.4)

project(adder VERSION 1.0.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD          17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS        OFF)
set(LIBRARY_NAME                BasicMath)

# include text hint
option(COMPILE_EXECUTABLE "Choose whether to compile executable" OFF)

add_subdirectory(lib)

if (COMPILE_EXECUTABLE)
    add_executable(${PROJECT_NAME} main.cpp)
else()
    # notify user in console during cmake configuration step
    message("Skipping executable compilation")
endif()

target_link_libraries(adder PUBLIC BasicMath)
```

Now, the option variable `COMPILE_EXECUTABLE` can be toggled in the console during the CMake configuration step:

```zsh
cd build
cmake .. -DCOMPILE_EXECUTABLE=ON
```

<Tag tagtype='warning' msg='Make sure not to include any space between the command line parameter (-D) and the option variable name.' />

<Heading str="Command line options" />

<Tag tagtype='info' msg='You may wish to remove the build directory before subsequent project configurations to guarantee that new changes take effect.' />

To recreate the build directory in Unix systems:

```zsh
rm -rf build
mkdir build
```

In Windows:

```ps1
Remove-Item -Recurse -Force build
New-Item -Path . -Name "build" -ItemType "directory"
```

Optionally, you can automate these steps in a Makefile:

```make
# adder/Makefile
prepare:
    rm -rf build
    mkdir build
```

To execute these commands:

```zsh
make prepare
```

### Generators

CMake generators are the build systems used under the hood. For Unix systems, which include Linux (GCC) and macOS (Clang), the default generator is Makefiles, while for Windows (MSVC) the default is Microsoft Visual Studio Solution. The project generator can be configured with the `-G` parameter:

Unix systems:

```zsh
cmake -S .. -B . -G "Unix Makefiles"
```

Windows:

```ps1
cmake -S .. -B . -G "Visual Studio 16 2019" # specify MSVC version
```

### Build types

CMake offers a few different build types, the two most common being `Debug` to `Release`. In `Release` mode, the compiler performs extra operations to optimize the build. To specify the build type:

```zsh
# inside build directory
cmake .. -DCMAKE_BUILD_TYPE=Release
```
