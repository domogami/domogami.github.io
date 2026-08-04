---
title: "Differential Geometry"
tags:
- School
---
Section 1-19 of Rabin's Notes

[Last Lecture](https://app.notion.com/p/ff1ef464af3e4e54951b83da3a0434a4)

[Last TA OH](https://app.notion.com/p/91e3da2d1e454a18bdc28061f155db4f)

# Curves
A curve $\alpha(t) = [x(t),y(t),z(t)]$ a **curve's derivative** $\alpha(t) = [x(t),y(t),z(t)]$
**Length of a curve** $|\alpha'(t)|$ is the speed at a time t
Def: **Regular Curve** if $\alpha'(t) \neq 0\  \forall \ t$
### Parameterizations of Curves
**Ex:** A parabola $y=x^2 \in \mathbb{R}^2$ has parameterization $\alpha(t) = (t,t^2)$ or $\beta(t) = (t^3,t^6)$
$\implies \alpha'(t) = (1,2t)$ and $\beta'(t) = (3t^2,6t^5)$
Unit Speed Parametrization $\Longleftrightarrow$ parametrization by arc length
**Ex:** Circular Helix:

$$
\alpha(t)=(acost,asint,bt)\ |\ a>0 , a,b\in \mathbb{R}
$$

To convert to unit speed, compute velocity and then speed, then set $s(t)=\int_{0}^{t}|\alpha'(t)|du = \int_{0}^{t}\sqrt{a^2+b^2}du = t\sqrt{a^2+b^2}$ then replace t with s(t) to get

$$
\alpha(s) = (acos(\frac{s}{\sqrt{a^2+b^2}}),asin(\frac{s}{\sqrt{a^2+b^2}}),\frac{bs}{\sqrt{a^2+b^2}})
$$

### Cross Products
Note that the product rule holds for cross products

$$
[u(t)\times v(t)]' = u'(t)\times v(t) + u(t)\times v'(t)
$$

# Fernet Formulas
## Unit Speed

$$
\begin{aligned}
\alpha'(s) = T \\
\alpha''(s) = T'
\end{aligned}
$$

Curvature Function ($\kappa > 0$) for a unit speed curve is

$$
\kappa(s)=|T'(s)|
$$

If $\kappa \neq 0$ then we can say

$$
T'(s) = \kappa(s)N(s)
$$

Def: Osculating Plane - The plane spanned by T and N the tangent and normal vectors

$$
B(s) = T(s) \times N(s)
$$

Pf: T and B' are orthogonal. Start by taking the derivative of $0 = T \cdot B$

$$
0 = T' \cdot B + T \cdot B' = \kappa N \cdot B + T \cdot B' = T \cdot B' = 0
$$

Because B' is parallel to N:

$$
B'(s) = -\tau(s)N(s)
$$

Because $N = B \times T$

$$
N'=-\kappa T + \tau B
$$

### Fernet Formulas For Unit Speed

$$
\begin{aligned}
T' = \kappa N \\
N'=-\kappa T + \tau B \\
B' = -\tau N
\end{aligned}
$$

**Theorem:** $\kappa = 0 \ \Longleftrightarrow \alpha$ is a straight line
**Theorem:** $\tau = 0 \ \Longleftrightarrow \alpha$ lies in a plane
**Theorem:** $\tau = 0, \ \kappa\ = \frac{1}{R}\ \Longleftrightarrow \alpha$ is a circle

### The fundamental Theorem on Curves
**Theorem:** Given any smooth functions $\kappa(s) > 0$ and $\tau(s)$, there exists a regular, smooth unit-speed curve, $\alpha$ having $\kappa$ and $\tau$ as its curvature and torsion. This curve is unique in $\mathbb{R}^3$!

## Arbitrary Speed Curves
### Fernet Formulas for Arbitrary Speed Curves

$$
\begin{aligned}
T' = \kappa vN \\
N'=-\kappa vT + \tau vB \\
B' = -\tau vN
\end{aligned}
$$

Formulas to compute curvature $\kappa$ and torsion $\tau$

$$
\begin{aligned}
\kappa = \frac{|\alpha' \times \alpha''|}{v^3} \\
\tau = \frac{(\alpha' \times \alpha'')\cdot \alpha'''}{|\alpha' \times \alpha''|^2}
\end{aligned}
$$

# Surfaces
Definitions:
- **Regular** mapping $x: D \rightarrow \mathbb{R}^3 $ if $x_u \times x_v \neq 0\ \forall\ u, v\in D$
- **Coordinate Patch:** is a one-to-one mapping x of some open set D in $\mathbb{R}^2$ into $\mathbb{R}^3$
- **Surface:** A subset M of $\mathbb{R}^3$ such that each point of M has a neighborhood in M that is contained in the image of some patch
- **Atlas:** A collection of patches whose images cover all of M
- Curves with constant u on M are called Parallels
- Curves with constant v on M are called Meridians
### Implicit Function Theorem
If $f(x,y,z)$ is smooth and let $S = \{(x,y,z)\in \mathbb{R}^3: f(x,y,z) = 0\}$ if $p \in S$ is a point where $f_z \neq 0$, then there is a neighborhood D of p in which the set $S\ \cap\ D$ is a graph of a smooth function $z = g(x,y)$
### Important Corollary
A sufficient condition for S to be a surface is that $f_x, f_y, f_z$ do not vanish at any point of S
$\implies$ if we get $\nabla f = 0$ then something went wrong
# Curves and Tangent Vectors
The coordinate curves of a parameterized surface $x(u,v)$ are $x_u, x_v$ and together they span the tangent plane $T_p(M)$. We define the **Unit Normal Vector** as follows

$$
U= \frac{x_u \times x_v}{|x_u \times x_v|}
$$

Note: $x_u, x_v$ are not necessarily unit vectors and not necessarily orthogonal
### Directional Derivative
We say that $\nabla_v f$ is the derivative of f in the v direction
# Shape Operator

$$
S_p(v) = -\nabla_vU = -v_1U_u-v_2U_v
$$

If M is a plane then U is constant $\implies\ S_p(v) = 0$ for all v
If M is a sphere of radius $R$ then $S_p(v) = \frac{-v}{R}$
### Fundamental Theorem of Shape Operator
**Theorem:** $S_p$ is a self-adjoint linear operator from $T_p(M)$ to itself
**Corollary:**

$$
\begin{aligned}
S_p(x_u)\cdot x_v = U \cdot x_{uv} \\ S_p(x_u)\cdot x_u = U \cdot x_{uu} \\ S_p(x_v)\cdot x_v = U \cdot x_{vv}
\end{aligned}
$$

**Lemma:** For any curve $\alpha(t)$ in $M$, $\alpha'' \cdot U = S(\alpha')\cdot \alpha'$
If a curve has unit speed then the following is true by fernet formulas

$$
\alpha'' \cdot U = \kappa N \cdot U
$$

Def: For a unit speed curve in M, the **Normal Curvature** k(T) is:

$$
\kappa N \cdot U = S_p(T) \cdot T
$$

The Real EigenValues of $S_p$, $k_1 \geq k_2$ are the **Principal Curvatures** of M at P
They have the Eigenvectors $u_1, u_2$ called the **Principal Directions**
The number $K = k_1k_2 = det(S_p)$ is the **Gaussian Curvature**
The number $H = \frac{1}{2}(k_1+k_2)=\frac{1}{2} Tr(S_p)$ is the **Mean Curvature**
M is **Flat** if K = 0
M is **Minimal** if H = 0
If $k_1 = k_2$ then the point is **Umbilic**
If $T_\alpha$ is $u_1$ or $u_2$ at ever point then $\alpha$ is a **line of curvature**  or a **Principal Curve**
If $k_n(T_\alpha) = 0,\ \alpha$ is **Asymptotic**
Quantities that change sign if $U \rightarrow -U$: $S,\ k_i,\ H$
Note that $K$ stays the same
**Theorem:** If every point of a connected surface M is **umbilic** then M is part of a plane or sphere
### Curvature Formulas

$$
\begin{aligned}
S(x_u) = ax_u + bx_v \\
S(x_v) = cx_u + dx_v
\end{aligned}
$$

$$
\begin{aligned}
\Longrightarrow \left(\begin{array}{cc} a & b \\ c & d \end{array}\right)
\end{aligned}
$$

$$
\begin{aligned}
E = x_u \cdot x_u \\
F = x_u \cdot x_v \\
G = x_v \cdot x_v
\end{aligned}
$$

$$
\begin{aligned}
l = S(x_u) \cdot x_u = U \cdot x_{uu} \\
m = S(x_u) \cdot x_v = U \cdot x_{uv} \\
n = S(x_v) \cdot x_v = U \cdot x_{vv}
\end{aligned}
$$

$$
\begin{aligned}
S = \begin{bmatrix} a & b \\
d & e
\end{bmatrix} = \begin{bmatrix} E & F \\
F & G
\end{bmatrix}^{-1}\begin{bmatrix} l & m \\
m & n
\end{bmatrix}
\end{aligned}
$$

$$
K = \frac{ln-m^2}{EG-F^2}
$$

$$
H = \frac{Gl+En-2Fm}{2(EG-F^2}
$$

$$
k_1, k_2 = H \pm \sqrt{H^2-K}
$$

## Special Cases
### Monge Patch
${x}(u,v) = [u,v,f(u,v)]$

$$
E=1+f_x^2,\ F = f_xf_y,\ G = 1 + f_y^2
$$

Let $U = (-f_x,-f_y,1)/W$ where $W = \sqrt{1+f_x^2+f_y^2}$

$$
l = \frac{f_{xx}}{W},\ m = \frac{f_{xy}}{W},\ n = \frac{f_{yy}}{W}
$$

Gaussian and Mean Curvature

$$
K = \frac{f_{xx}f_{yy} - f_{xy}^2}{W},\ H = \frac{[(1+f_x^2)f_{yy}-2f_{x}f_{y}f_{xy} + (1 + f_y^2)f_{xx}]}{2W^3}
$$

### Surface of Revolution
$x(u,v) = [g(u), h(u)cosv,h(u)sinv]$

$$
E = (g')^2 + (h')^2,\ F = 0,\ G = h^2
$$

$$
l=\frac{g''h'-h''g'}{\sqrt{(g')^2+(h')^2}},\ m=0,\ n=\frac{hg'}{\sqrt{(g')^2+(h')^2}}
$$

$$
K=\frac{g'(g''h'-h''g')}{h[(g')^2+(h')^2]^2}
$$

If $(g')^2 + (h')^2 = 1$ then:

$$
K = -\frac{h''}{h},\ H = \frac{1}{2}[(g''h'-h''g')+\frac{g'}{h}
$$

If g(u) = u then

$$
K = -\frac{h''}{h[1+(h')^2]^2},\ H=\frac{1}{2}[\frac{-h''}{[1+(h')^2]^{3/2}}+\frac{1}{h[1+(h')^2]^{1/2}}]
$$

# Importance of the Metric

$$
\begin{aligned}
\left(\begin{array}{cc} E & F \\ F & G \end{array}\right),\ metrics\ \{\ E,F,G\ \}
\end{aligned}
$$

Letting

$$
\begin{aligned}
v=v_1x_u+v_2x_v \\
w=w_1x_u+w_2x_v \\
v \cdot w = v_1w_1E + (v_1w_2+v_2w_1)F + v_2w_2G \\
|v|^2 = Ev_1^2+2Fv_1v_2 + Gv_2^2 \\
\angle x_u, x_v \implies \theta=cos^{-1}(F/\sqrt{EG})
\end{aligned}
$$

With $\alpha(t) = x(u(t),v(t))$

$$
S=\int_a^b\sqrt{\alpha'\cdot\alpha'}dt = \int_a^b\sqrt{E(u')^2+2Fu'v'+G(v')^2}dt
$$

$$
|x_u\times x_v|^2 = |x_u|^2|x_v|^2sin^2\theta = |x_u|^2|x_v|^2(1-cos^2\theta) = EG-F^2
$$

$$
A = \int\int_{R}\sqrt{EG-F^2}dudv
$$

# Isometries

# Geodesics
We can split the acceleration of a curve, $C: \alpha(t) = x[u(t),v(t)]$ where the first term is the normal component of acceleration, $\alpha$ and the second component is the orthogonal projection of $\alpha$ onto the tangent plane to M at

$$
\alpha'' = (\alpha''\cdot U)U+\alpha''_{tan}
$$

For unit speed, $|\alpha''| = \kappa(t)$

# Formulas
### Fernet Formulas

$$
\begin{aligned}
T' = \kappa N \\
N'=-\kappa T + \tau B \\
B' = -\tau N
\end{aligned}
$$

$$
U= \frac{x_u \times x_v}{|x_u \times x_v|}
$$

$$
\begin{aligned}
T' = \kappa vN \\
N'=-\kappa vT + \tau vB \\
B' = -\tau vN
\end{aligned}
$$
