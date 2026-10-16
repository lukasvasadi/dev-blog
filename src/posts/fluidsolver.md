---
title: O₂ transport and cell shear stress in a media perfusion chamber
description: Experiment with a custom fluidic solver written in Julia.
date: '2026-10-01'
categories:
  - Fluids
  - Julia
published: true
---

<script>
  import Tag from "../components/Tag.svelte"
  import Iconlist from "../components/Iconlist.svelte"
</script>

## Motivation

For some time, I've wanted to change the purpose of this blog to focus on scientific computing. The advent of agentic tooling has, at least in my opinion, reduced the need for basic programming tutorials. However, these tools can be also be used to assist learning and prototyping.

For many years, I've wanted to learn computational fluid simulation with the Julia programming language. This post will attempt to describe the computation of O₂ transport and shear stress on a cell monolayer in a media perfusion chamber. Some core concepts discussed are _Stokes flow_, _advection-diffusion_, and _wall shear_.

## Introduction

## Solution

### 1. Define initial conditions

First, we start by defining the initial conditions in a keyword struct, with all dimensional inputs reported in SI units. This includes parameters for geometry (`L`, `H`, `W`), flow rate (`Q`), fluid (medium) properties (`μ`, `ρ`, `D`), inlet O₂ (`c_in`), and kinetics (`q_max`, `K_m`). The default parameters describe a 10 mm × 0.5 mm × 5 mm chamber perfused with culture medium at 10 µL/min over a dense monolayer. The uptake parameters are order-of-magnitude estimates (~1e-16 mol/cell/s × ~2e9 cells/m²); replace them with measured OCR and cell density for your line.

```julia
Base.@kwdef struct ChamberParams
    L::Float64 = 10e-3        # chamber length [m]
    H::Float64 = 0.5e-3       # chamber height [m]
    W::Float64 = 5e-3         # chamber width, out of plane [m] (converts Q to mean velocity)
    Q::Float64 = 10e-9 / 60   # volumetric flow rate [m³/s] (10 µL/min)
    μ::Float64 = 0.78e-3      # medium viscosity at 37 °C [Pa·s]
    ρ::Float64 = 1000.0       # medium density [kg/m³]
    D::Float64 = 3.0e-9       # O₂ diffusivity in medium at 37 °C [m²/s]
    c_in::Float64 = 0.2       # inlet O₂, air-saturated medium at 37 °C [mol/m³ = mM]
    q_max::Float64 = 2e-7     # max areal O₂ uptake of the monolayer [mol/m²/s]
    K_m::Float64 = 5e-3       # Michaelis–Menten constant for O₂ [mol/m³] (~5 µM)
end
```

<Tag>

Note that each field in the struct is annotated with a specific type, e.g., `::Float64`. This gives the struct a concrete memory layout at compile-time. The struct is also immutable, meaning that copies must be created to change field values.

</Tag>

### 2. Compute dimensionless forms

```julia
function groups(p::ChamberParams)
    U = p.Q / (p.W * p.H)
    (U=U, ℓ=p.L / p.H, Re=p.ρ * U * p.H / p.μ, Pe=U * p.H / p.D,
     Da=p.q_max * p.H / (p.D * p.c_in), κ=p.K_m / p.c_in)
end
```

```julia
function solve_transport(model, uh, Pe, Da, κ; c0=nothing, supg=true)
    reffe = ReferenceFE(lagrangian, Float64, 1)
    V = TestFESpace(model, reffe; conformity=:H1, dirichlet_tags=["inlet"])
    C = TrialFESpace(V, 1.0)

    Ω = Triangulation(model)
    dΩ = Measure(Ω, 4)
    dΓ = Measure(BoundaryTriangulation(model; tags="floor"), 4)

    β = Pe * uh
    h = CellField(sqrt.(collect(get_cell_measure(Ω))), Ω)
    τ = supg ? ((hk, u) -> supg_tau(hk, u, Pe)) ∘ (h, uh) : CellField(0.0, Ω)

    uptake(c) = mm(c, κ)
    duptake(c) = dmm(c, κ)

    # With Q1 elements on (mapped) rectangles Δc ≡ 0 per cell, so dropping the diffusion
    # term from the SUPG residual keeps the stabilization consistent.
    res(c, w) = ∫(w * (β ⋅ ∇(c)) + ∇(w) ⋅ ∇(c) + τ * (β ⋅ ∇(w)) * (β ⋅ ∇(c)))dΩ +
                ∫(Da * w * (uptake ∘ c))dΓ
    jac(c, dc, w) = ∫(w * (β ⋅ ∇(dc)) + ∇(w) ⋅ ∇(dc) + τ * (β ⋅ ∇(w)) * (β ⋅ ∇(dc)))dΩ +
                    ∫(Da * w * (duptake ∘ c) * dc)dΓ

    op = FEOperator(res, jac, C, V)
    nls = NLSolver(LUSolver(); method=:newton, linesearch=BackTracking(),
                   iterations=50, ftol=1e-10, show_trace=false)
    ch0 = c0 === nothing ? interpolate_everywhere(1.0, C) :
          FEFunction(C, copy(get_free_dof_values(c0)))
    ch, _ = solve!(ch0, FESolver(nls), op)
    return ch
end
```

```lean
-- 1. General Programming: Define a recursive factorial function
def factorial : Nat → Nat
  | 0     => 1
  | n + 1 => (n + 1) * factorial n
```
