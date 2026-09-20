---
title: Conceptualizing a viewer for scientific imaging
description: Considerations for developing a high-performance image viewer.
date: '2026-01-07'
image: jameswebb-deep-space.jpeg
categories:
  - Qt QRhi
  - GPU rendering
published: false
---

<script>
  import Heading from "../components/Heading.svelte"
</script>

![James Webb Telescope deep space](../lib/images/jameswebb-deep-space.jpeg)

<Heading str="Introduction" />

Imaging remains one of our primary means to explore the world, encompassing both the macro- and micro-scales. As a complement to the advancements in sensor technology, modern image processing techniques, coupled with machine learning pattern recognition, have enabled quantitative analysis. Alongside these developments, open-source technologies have promoted widespread distribution of scientific imaging research tools. One such example is [Napari](https://napari.org/stable/), a multidimensional image viewer written as a Qt for Python application. Being one of the design decisions, users are able to leverage the enormous Python ecosystem of scientific tools, including numpy, scipy, pillow, etc.

Indeed, Python has become the _de facto_ programming language for scientific computing and machine learning. It is my personal language of choice for general computing tasks, especially those centered on automation. Python is also a popular language for desktop application development, being a first-class supported language for the Qt framework, which is a powerful UI development platform for desktop and embedded systems.

<Heading str="Leveraging the latest advancements in GPU technology" />

Qt Quick uses “hardware-accelerated” (GPU) rendering techniques for UI elements. Internally, Qt Quick uses QRhi (Qt Rendering Hardware Interface) as a low-level, cross-graphics-API abstraction for GPU rendering. Put simply, QRhi is a Qt-specific abstraction to unify modern graphics APIs, i.e., Vulkan, Metal, and Direct3D. As application developers, using QRhi allows us to create platform agnostic renderers.

<Heading str="QRhi background" />

Qt initially relied on OpenGL for its hardware-accelerated graphics rendering. However, the graphics landscape has changed dramatically over the past 10 years, introducing new platform-specific libraries like Direct3D and Metal, as well as Vulkan, the platform-agnostic successor to OpenGL. Each of these APIs harness the low-level functionalities of modern GPUs at the cost of less abstraction to application developers. Qt developed QRhi as a means to provide a common graphics API that acts as a low-level abstraction over Direct3D, Metal, and Vulkan.

### References

- [Get started with QRhi by basysKom](https://www.basyskom.de/en/hello-rhi-how-to-get-started-with-qt-rhi/)

### Important QRhi development concepts

- <code>QRhi</code>: Main class object that manages connection to underlying graphics library (Vulkan, Metal, Direct3D)
- <code>QRhiSwapChain</code>: Manages connection between graphics API and window surface for frame rendering
- <code>QRhiTexture</code>/<code>QRhiBuffer</code>: Manages GPU resources like textures and vertex data
- <code>QRhiShader</code>/<code>QRhiGraphicsPipeline</code>: Defines shader rendering (vertex/fragment) and control flow logic
- <code>QRhiVertexInputLayout</code>: Describes the structure and layout of vertex data, such as positions and UVs
- <code>QRhiResourceUpdateBatch</code>: Transfers data from CPU to GPU memory space

The rendering pipeline, <code>QRhiGraphicsPipeline</code>, provides handling instructions for the buffer data, including vertex data structure and shader stages as well as rendering result target. Each rendering pass occurs between <code>beginPass()</code> and <code>endPass()</code>. A <code>QRhiCommandBuffer</code> is created to collect rendering commands for batch transfer to the GPU.

<Heading str="Application architecture" />

### Steps to building a modern image viewer

1. Design an intuitive user interface with QML
2. Build a backend image rendering pipeline with QRhi
3. Create a shared memory space for the application and a Python script
4. Coordinate image data manipulation with rendering via semaphores
