---
title: Accelerated computing with CUDA and Python
description: Enhance data science with rapid parallel processing.
date: '2023-8-31'
image: /images/nvidia-gpu.jpg
categories:
  - NVIDIA
  - CUDA
  - Numba
published: false
---

<script>
  import Tag from "../components/tag.svelte"
</script>

![NVIDIA graphics cards](/images/nvidia-gpu.jpg)

## <a id="introduction">Introduction</a>

CUDA is a C/C++ API that allows developers to access the GPU for accelerated computing. For Python, the most performant option to target the GPU is the `pyCUDA` library, which exposes the entire CUDA API, but requires writing C code in docstrings. An attractive alternative is using the `Numba` library, which provides a **_just-in-time_** compiling function decorator. This allows the optimization of certain functions that handle data processing without changing the entire program, and without mixing C source code.

### Requirements

- NVIDIA GPU with CUDA support
- Python &geq;3.4
- NumPy &geq;1.10

## <a id="compiling-for-the-cpu">Compiling for the CPU</a>

In addition to compiling Python functions for the GPU, by default, Numba targets the CPU.

```python
from numba import jit
import math

@jit
def hypot(x, y):
    # Implementation from https://en.wikipedia.org/wiki/Hypot
    x = abs(x)
    y = abs(y)
    t = min(x, y)
    x = max(x, y)
    t = t / x
    return x * math.sqrt(1+t*t)
```

<Tag msg='Depending on the GPU, the performance of calculations with <code>float32</code> and <code>float64</code> data types can be significantly different. If the calculation does not require 64-bit precision, NVIDIA recommends using <code>float32</code>. (Most modern operating systems default the value of floating point numbers to 64-bit!)' />
