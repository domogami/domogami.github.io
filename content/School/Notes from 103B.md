---
title: "Abstract Algebra 2"
tags:
- School
---
# 🔑 Key

---

---
Blue - Definitions
Red - Important Remark / Forumla
Green - Exercise for reader
# ✍️ Acronyms
---
WTS - Want To Show
RHS - Right Hand Side
LHS - Left Hand Side
St. - Such that
FTA - Fundamental Theorem of Algebra

# 📚 Review
### Monoid
A monoid has two properties,
- ${\bf{Associative}}: x\cdot (y\cdot z) = (x\cdot y)\cdot z$
- ${\bf{Identity / Neutral\ Element}}: \exists\ e \in G: x\cdot e\ = e\cdot x \ =\ x$
Adding a third property
- ${\bf{Inverse}}: \forall\ x \in G\ \exists \ y \in G:\ x\cdot y = y\cdot x =\ e$
- ($y = x^{-1}$)
### Groups
A Group is a Monoid with Inverses
### Abelian Group
A group with Communativity is an Abelian Group
- ${\bf{Commutativity}}: \forall x,y\in G: x\cdot y = y\cdot x$
**Examples:**
- $(\mathbb{Z}, +)$ - **Abelian Group**
- $(\mathbb{Z}, \cdot)$ - **Monoid** (Abelian Monoid because $n\cdot m = m \cdot n$)
- 0 is not invertible
- $(\mathbb{Z}_n, +_{mod(n)})$ = \{0, 1, ..., n - 1\} - **Abelian Group**
- $(\mathbb{Z}_n, \cdot_{mod(n)})$ - **Monoid**
- $(\mathbb{R}, +)$ - **Abelian Group**
- $(\mathbb{R}, \cdot)$ - **Monoid**
- $(M_n(\mathbb{R}), + )$ - **Abelian Group**
-

$$
\begin{aligned}
\begin{pmatrix}
    2 & 0\\
    1 & -1
\end{pmatrix} +
\begin{pmatrix}
    3 & 1\\
    0 & 1
\end{pmatrix} =
\begin{pmatrix}
    5 & 1\\
    1 & 0
\end{pmatrix}
\end{aligned}
$$

- Identity Element is the 0 matrix
- Inverse - make each element in matrix negative
- $(M_n(\mathbb{R}), \cdot )$ - **Monoid**
-

$$
\begin{aligned}
\begin{pmatrix}
    2 & 0\\
    1 & -1
\end{pmatrix} \cdot
\begin{pmatrix}
    3 & 1\\
    0 & 1
\end{pmatrix} =
\begin{pmatrix}
    6 & 2\\
    3 & 0
\end{pmatrix}
\end{aligned}
$$

- Identity Element is the identity matrix
- $(f:\mathbb{R}\rightarrow\mathbb{R}, +)$ - **Abelian Group**
- $(f+g)(x) = f(x) + g(x)$
- $(f:\mathbb{R}\rightarrow\mathbb{R}, \cdot)$ - **Monoid**
- $(f\cdot g)(x) = f(x)g(x)$
- Identity Element: $f(x)=1$
- $f(x)=0$ is not invertable
- Invertible elements have no roots (do not intersect x axis)
- $(f:\mathbb{R}\rightarrow\mathbb{R}, \circ)$ - Monoid
- Not invertible, $f(x) = x^2$ is not invertible (Must be bijective)
# 💍 Rings
A **ring** is a set $(R, +, \cdot)$ with operations +, ⋅ such that
1. $(R, +)$ Abelian Group
2. $(R, \cdot)$ Monoid
3.

$$
\begin{aligned}
{\bf{Distributivity}}:\ \forall x,y,z\in R: x\cdot(y+z) = x\cdot y+x\cdot z \\ (x+y)\cdot z = x\cdot z + y\cdot z
\end{aligned}
$$

A ring is called **commutative** if $\forall x,y\in R: x\cdot y = y \cdot x$, $(R,\cdot)$ is a commutative monoid
- Matrix Multiplication / Addition is a non Communative Ring
- Continuous Functions form a communative ring
- Function Composition is not a ring
### Subring Test
A subset $S \subseteq R$ is a subring if it is closed under $+,\cdot$ and
- $(S, +)$ is a subgroup of $(R,+)$
- S is closed under subtraction $(x,y\in S \implies x-y\in S)$
- $(S, \cdot)$ is a submonoid of $(R,\cdot)$
- S is closed under multiplication $(x,y\in S \implies x\cdot y \in S)$
- $1 \in S$
**Properties inherited to subrings**
1. Commutativity
2. Domain (no zero-divisors)
Being a field / division ring is **not** inherited
**Remark:** We also know $0 \in S$. Since $1 \in S$, so $-1 \in S$
**Example:**
1. $\mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}$ are subrings!
2. $Z_n = \{0,1,\cdots, n-1\} \subset \mathbb{Z}=\{\cdots,\ -1,\ 0,\ 1, \cdots \}$
$0-1 = -1 \notin \mathbb{Z}_n$ not a subring
3. $\mathbb{Z}[\sqrt{2}] = \{a+b\sqrt{2}\ |\ a, b \in \mathbb{Z} \} \subset \mathbb{R}$
Subring test: $1=1+0\sqrt2 \in \mathbb{Z}[\sqrt2]$
Multiplication: $(a+b\sqrt2)(c+d\sqrt2) = ac+ad\sqrt2+b\sqrt2c+ b\sqrt2\cdot d\sqrt2 = (ac+2bd)+(ad+bc)\sqrt2 \in \mathbb{Z}[\sqrt2]$
Subtraction: $(a+b\sqrt2)-(c+d\sqrt2)=(a-c)+(b-d)\sqrt2 \in Z[\sqrt2]$
$\therefore \mathbb{Z}[\sqrt2] \subset \mathbb{R}$ it is a subring!
4. $\mathbb{Z}[i] = \{\ a+bi\ |\ a,b\in\mathbb{Z}\} \subset \mathbb{C}$ - Gaussian Integers (subring)

$$
\begin{aligned}
\begin{matrix}
& \mathbb{C}  & \\
/ & & \backslash \\
| & & \mathbb{R} \\
| & & | \\
\mathbb{Z}[i] & &\mathbb{Z}[\sqrt2] \\
\backslash & & / \\
&\mathbb{Z} &

\end{matrix}
\end{aligned}
$$

Remark: “lines are transitive” in this diagram, namely, if $S\subseteq R$ is a subring and $T\subseteq S$ is a subring, then $T \subseteq R$ is a subring
1.

$$
\begin{aligned}
UT_n(\mathbb{R}) = \begin{pmatrix}
* & \cdots & \cdots & * \\
0 & \ddots & \ddots & \vdots\\
\vdots & \ddots & \ddots & \vdots\\
 0 & \cdots & 0 & *
\end{pmatrix} \subset M_n(\mathbb{R})
\end{aligned}
$$

 is a subring
2. $B(\mathbb{R}) \{f: \mathbb{R} \rightarrow \mathbb{R}$ bounded continuous functions$\}= {}\subset C(\mathbb{R}) = \{f: \mathbb{R} \rightarrow \mathbb{R}$ continous functions$\}$
### Polynomial Rings
“Polynomial Ring over R” $\Longleftrightarrow \ R[x]$
$R[x] = \{r_0+r_1x+r_2x^2+\cdots+r_nx^n\ |\ r_0,\cdots,r_n\in \mathbb{R}\}$
**Polynomial Addition Formula**

$$
\begin{aligned}
r_0+r_1x+\cdots+r_nx^n \\
s_0+s_1x+\cdots+s_mx^m \\
\implies (r_0+r_1x+\cdots+r_nx^n )+(s_0+s_1x+\cdots+s_mx^m) \\
= (r_0+s_0)+(r_1+s_1)x+\cdots+(r_n+s_n)x^n+s_{n+1}x^{n+1}+\cdots+s_mx^m
\end{aligned}
$$

**Polynomial Multiplication Formula**

$$
\begin{aligned}
p(x)=\sum_{i=0}^n r_ix^i=r_0+r_1x+\cdots+r_nx^n \\
q(x)=\sum_{j=0}^m s_jx^j=rs_0+s_1x+\cdots+s_mx^m \\
p(x)\cdot q(x)=(r_0+r_1x+\cdots+r_nx^n )\cdot(s_0+s_1x+\cdots+s_mx^m) \\
= r_0+s_0+(r_1s_0+r_0s_1)x+(r_0s_2+r_1s_1+r_2s_0)x^2+\cdots \\
= (\sum_{i=0}^n r_ix^i)(\sum_{j=0}^m s_jx^j)\\
= \sum_{d=0}^{n+m}(\sum_{i+j=d}r_is_j)x^d)
\end{aligned}
$$

**Remark:** $(R[x], +, \cdot)$ is a ring (assuming R is an arbitary ring)
**Remark:** A ring is communitive if $x\cdot y = y \cdot x \ \forall \ x,y$
- $\mathbb{Z},\ \mathbb{Q},\ \mathbb{R},\ \mathbb{C}$ - Commutative Rings
- $M_2(\mathbb{R})$ - Non Commutative
When is $R[x]$ commutative? ⇒ if $R[x]$ is commutative then R is, conversely, if R is commutative then $R[x]$ is commutative
Using the formula for polynomial multiplication, we find that

$$
\begin{aligned}
p(x)\cdot q(x) = q(x)\cdot p(x) \\
\sum_{d=0}^{n+m}(\sum_{i+j=d}r_is_j)x^d) = \sum_{d=0}^{n+m}(\sum_{j+i=d}s_jr_i)x^d)
\end{aligned}
$$

Therefore, $R\ is \ Commutative\ \Longleftrightarrow\ R[x]\ is\ Commutative$
**Remark:** Is $\mathbb{R}[x] \subset C(\mathbb{R})$ a subring? ⇒ No, $e^x, sin(x), \cdots \in C(\mathbb{R})$ but $\notin \mathbb{R}[x]$
**Remark:** $R[x]$ is defined for an arbitary ring R. We can have a ring, $\mathbb{Z} \rightarrow \mathbb{Z}[x] \rightarrow (\mathbb{Z}[x])[y] = \mathbb{Z}[x,y]$ . Which gives us a polynomial of y with coefficents from x or vice versa.
### Direct Sums
Suppose that $R,S$ are rings. Define the direct sum $R \oplus S:$

$$
R \oplus S = \{(r,s)\ |\ r\in R, s\in S\}
$$

**Addition:**

$$
(r_1,\ s_1)+(r_2,\ s_2) = (r_1+_Rr_2,\ s_1+_Ss_2)
$$

**Multiplication:**

$$
(r_1,\ s_1)\cdot(r_2,\ s_2) = (r_1\cdot_Rr_2,\ s_1\cdot_Ss_2)
$$

$0_{R\oplus S}=(0_R,\ 0_S),\ 1_{R\oplus S}=(1_R,\ 1_S)$
Examples:
1. $M_2(\mathbb{R}) \oplus \mathbb{Z}[x]$
2. $\mathbb{Z}_2 \oplus \mathbb{Z}_3$
3. $\mathbb{Z} \oplus \mathbb{Z}$
4. $R_1 \oplus R_2 \oplus \cdots \oplus R_n$ ← Iterative direct sum
**Remarks on Direct Sums:**
1. If $R_1 \subseteq S_1, R_2 \subseteq S_2$ are subrings, then $R_1 \oplus R_2 \subseteq S_1 \oplus S_2$ is a subring
2. $R \oplus S \ is \ commutative \Longleftrightarrow\ R,\ S\ are\ commutative$
3. $\{\ (r,r)\ |\ r\in R\ \}\subset R\oplus R$ is a subring
**Ring Proofs**
$r\cdot 0=r\cdot(0+0)=r\cdot0+r\cdot 0 \implies 0=r\cdot 0$
### Commutativity
**Recall:** R is commutative if $\forall\ r,s \in R,\ r\cdot s = s\cdot r$
**Remark:** If R is commutative and $S \subseteq R$ is a subring, then S is also cummutative. In particular, $\mathbb{C}, \mathbb{R}, \mathbb{Q}, \mathbb{Z}, \mathbb{Z}[\sqrt2], \mathbb{Q}[i]$ are all commutative
**Example:** $\mathbb{R} \oplus \mathbb{Z}_7$ is commutative whereas $\mathbb{Q} \oplus M_2(\mathbb{C})$ is not
**Definition:** Let R be a ring. The center of R is:

$$
Z(R) =\{\ r\in R\ |\ \forall\ x \in R, r\cdot x=x\cdot r\ \}
$$

In other words, Z(R) is the set of elements in R that commute with any other element of R.
Remark:
1. We always have $0,1 \in Z(R)$ this is because

$$
\begin{aligned}
1\cdot r = r \cdot 1 = r\\ 0\cdot r = r \cdot 0 = 0
\end{aligned}
$$

2. If $r,s\in Z(R)$ then $r-s\in Z(R)$
Pf. Let $x\in R$ be arbitary, we need to show that $(r-s)\cdot x = x \cdot (r-s)$
But, $(r-s)\cdot r = r \cdot x - s \cdot x = x \cdot r - x \cdot S = x \cdot (r-s)$ so, $r-s\in Z(R)$
3. If $r,s \in Z(R)$ then $r\cdot s \in Z(R)$
Pf. Let $x\in R$ be arbitary, we need to show that $(r \cdot s)\cdot r = x \cdot (r\cdot s)$
Indeed,
$(r\cdot s) \cdot x$
$=r\cdot (s\cdot x)$ ← Associativity of $\cdot$
$= r \cdot (x\cdot s)$ ← $s \in Z(R),\ s\cdot x=x\cdot s$
$= (r \cdot x) \cdot s$ ← Associativity of $\cdot$
$= (x\cdot r) \cdot s$ ← $r \in Z(R),\ r\cdot x=x\cdot r$
$=x\cdot(r\cdot s)$← Associativity of $\cdot$
**Corollary:** $Z(R)\subseteq R$ (the center) is a subring
**Examples:**
1. If R is commutative then $Z(R) = R$
2. $R=M_n(\mathbb{C})$,
then

$$
\begin{aligned}
Z(R) = \{\begin{pmatrix}
\alpha & \cdots & 0 \\
\vdots & \ddots & \vdots \\
0& \cdots & \alpha \\
\end{pmatrix}|\ \alpha \in \mathbb{C}\}
\end{aligned}
$$

3. If $R= M_n(S),$ (where S is another ring), then

$$
\begin{aligned}
Z(R)=\{\begin{pmatrix}
\alpha & \cdots & 0 \\
\vdots & \ddots & \vdots \\
0& \cdots & \alpha \\
\end{pmatrix}|\ \alpha \in Z(S)\}
\end{aligned}
$$

4. $Z(R[x])=(Z(R))[x]$ ← The center of a polynomial ring is a polynomial ring over the center of R
5. $Z(R\oplus S)=Z(R)\oplus Z(S)$ ← The center of the direct sum of two wrings is the direct sum of the centers
## Units
Let R be a ring. The set of units in R is:

$$
U(R)=R^x=\{a\in R\ |\ \exists\ b \in R:\ ab=ba=1\}
$$

Where $a$ and $b$ are units or invertible elements. We denote $b=a^{-1}$ or $b$ is the inverse of $a$
**Remark:**
1. $U(R) \subseteq R$
2. $1\in U(R)$ since $1\cdot 1 = 1\cdot 1 = 1$
3. $0\notin U(R)$ since $0 \cdot b = b\cdot 0 = 0 \neq 1$
4. If $a\in U(R)$ then $a^{-1}$ is unique:
if $ab_1=b_1a=1$ and $ab_2=b_2a=1$ then:
$b_1=b_1(ab_2)=b_2ab_2=(b_1a)b_2=b_2$
5. One must be careful, it is possible that $ab=1$ but $a$ is not a unit
**Proposition:** $(U(R),\cdot)$ is a group
**Proof:** First, let us show that $U(R)$ is closed under ⋅
If $a_1,a_2 \in U(R)$
Then:
$(a_1a_2)(a_2^{-1}a_1^{-1})=a_1(a_2a_2^{-1})a_1^{-1}=a_1a_1^{-1}=1$
$(a_2^{-1}a_1^{-1})(a_1a_2)=a_2^{-1}(a_1^{-1}a_1)a_2=a_2^{-1}a_2=1$
$\implies a_1a_2$ is a unit $((a_1a_2)^{-1}=a_2^{-1}a_1^{-1})$
Neutral Element ( Identity element ) is $1 \in U(R)$ by the above remark
If $a\in U(R)$ then, by the definition of a unit, there exits an $a^{-1}\in R$ such that $aa^{-1}=a^{-1}a=1$ but it follows that $a^{-1}\in U(R)\ \  ((a^{-1})^{-1})=a)$
Therefore $(U(R),\ \cdot)$ is a group. (Associativity of ⋅is ensured by the fact that R is a ring, hence $(R,\cdot)$ is associative.
**Examples:**
1. $R=\mathbb{R}, \mathbb{C}, \mathbb{Q}$
$R^x=R\backslash \{0\}$

$$
\begin{aligned}
\mathbb{R}^x=\mathbb{R}\backslash\{0\} \\
\mathbb{C}^x=\mathbb{C}\backslash\{0\} \\
\mathbb{Q}^x=\mathbb{Q}\backslash\{0\}
\end{aligned}
$$

1. $R= \mathbb{Z}$ (What are the units in the ring of integers)
$R^x= \{±1\}$
$\mathbb{Z} \subset \mathbb{Q}$ ← (Every nonzero element of $\mathbb{Z}$ is invertible in $\mathbb{Q}$)
(For example, $2\in\mathbb{Z}$, not invertible within $\mathbb{Z}$ because $\frac{1}{2} \notin \mathbb{Z}$. However, if we think of $2\in \mathbb{Q}$, it is invertible within $\mathbb{Q}$ because $\frac{1}{2} \in \mathbb{Q}$)
1. $R = \mathbb{Z}_n = \{0,1,\cdots, n-1\}$ ← What are the units of the integers mod n
$R^x =\{x\in \mathbb{Z}_n |\ \exists\ xy=1_{mod\ n}\}$
Exactly the coprime to n residues:
$R^x=\mathbb{Z}_n^x=\{\ 1\leq a \leq n-1\ |\ gcd(a,n)= 1\ \}$
The cardinality of $\mathbb{Z}_n^x$ is $\phi(n)$ ← Eulers totient function

$n=6$
$\mathbb{Z}_6= \{\ 0, 1 ,2 ,3, 4,5\ \} \implies \mathbb{Z}_6^x=\{\ 1,\ 5 \}$

$n=7$
$\mathbb{Z}_7= \{\ 0, 1 ,2 ,3, 4,5,6\ \} \implies \mathbb{Z}_7^x=\{\ 1,2,3,4,5,6 \}$

**Remark:** (From 103A):
$\mathbb{Z}_n^x=\mathbb{Z}_n\backslash \{0\} \Longleftrightarrow$  $n$ is prime
The units of the Integers mod n is equal to the integers up to n excluding zero if n is a prime number
**Question:** How to invert mod n?
$17^{-1}(mod\ 48)=\ ?$
$17,\ 48$ are coprime
$(48,17) = (17, \mathbf{14} ) = (14, 3)=(3,2)=(2,1)$
$48=2\cdot 17 +14$ ← $\mathbf{14}$ is the “Residue”
$17=1\cdot 14 +\mathbf{3}$
$14=4\cdot 3 + \mathbf{2}$
$3=1\cdot 2 + \mathbf{1}$ ← Once we have 1, we now invert
$1=3-2= 3-(14-4\cdot3)=-14+5\cdot 3=-14+5(17-14)=-6\cdot14+5\cdot 17=-6\cdot (48-2\cdot 17)+5\cdot 17=-6\cdot 48+17\cdot 17$
So, $17\cdot 17 = 1(mod\ 48)$ so, $17^{-1}=17$ in $\mathbb{Z}_{48}$
2. $R=M_n(\mathbb{R})$
$R^x=\{A\in M_n(\mathbb{R})\ |\ \exists\ B \in M_n(\mathbb{R}):\ AB=BA=I_n\ \}$ ← invertible matrices
$=\{\ A\in M_n(\mathbb{R})\ |\ det(A) \neq 0\ \} =\ GL_n(\mathbb{R})$
3. $R=\mathbb{Z}[i]=\{\ a+bi\ |\ a,b\in Z\ \}$
$\mathbb{Z}[i]^x=\ ?$
$=\{a+bi\ |\ \exists\ c,d \in \mathbb{Z}:\ (a+bi)(c+di)=1 \Leftrightarrow (a-bi)(c-di)=1\}$
Using: $a+bi \rightarrow\ a-bi$ or, $\bar{z}\bar{w} =\bar{z}\cdot \bar{w}$
$(a+bi)(a-bi)(c+di)(c-di)=1\cdot 1 =1$
$= (a^2+b^2)\cdot (c^2+d^2)= 1$ ← $(a^2+b^2)\in \mathbb{Z}$, $(c^2+d^2)\in \mathbb{Z}$
So,
$a^2+b^2=1 \Longleftrightarrow a=0,\ b=\pm 1$ or $a=\pm1,\ b=0$
$c^2+d^2=1 \Longleftrightarrow c=0,\ d=\pm 1$ or $c=\pm1,\ d=0$
For conclusion, $\mathbb{Z}[i]^x=\{\pm1, \pm i\}$
**Definition:** A ring is called a division ring if $R^x=R\backslash \{0\}$
There are inverses for every element $\in R$ except 0
**Definition:** A commutative division ring is called a field
In other words, a field is a system $(R,0,1,\pm,\cdot, \div)$ with “all reasonable axioms” where we can divide except for $x\div 0$
**Examples:**
$\mathbb{Q}, \mathbb{R}, \mathbb{C}\ -$ Fields
$\mathbb{Z}_p -$ Field (p prime)
$\mathbb{Z},\ \mathbb{Z}[i], \mathbb{Z}_6, \cdots$ not fields
$\mathbb{H}-$ division ring that is not a field
**Remark:**
$U(R\oplus S) = U(R) \times U(S)$
In other words, $(r,s)\in R\oplus S$ is a unit (in $R\oplus S$) iff $r\in U(R)$ and $s\in U(S)$
**Proof:**
$(\Rightarrow)$
If $(r,s) \in U(R \oplus S)$ then, $\exists\ (r',s') \in R\oplus S:$
$(r,s)(r',s')=(r's')(r,s)=(1_R, 1_S) \in R \oplus S$
$\Leftrightarrow \ rr'= r'r=1_R,\ ss'=s's=1_S$
$(\Leftarrow)$
Exercise: (if $r\in U(R),\ s\in U(S)$ then $(r,s) \in U(R\oplus S)$)
**Example:** How many units are there in $\mathbb{Z}_7 \oplus \mathbb{Z}_8$ ?
$U(\mathbb{Z}_7 \oplus Z_8) = U(\mathbb{Z}_7)\times U(\mathbb{Z}_8) = 6\times 4 = 24$ units
**Definition:** An element $a\in R$ is a zero-divisor if there exists $b\in R$ such that $ab=0$ or $ba= 0$
**Examples:**
1. In $\mathbb{Z}_6,$

$$
\begin{aligned}
2\cdot 3=0,\\ 4\cdot 3 = 0
\end{aligned}
$$

2, 3, 4 are zero divisors and 1, 5 are units
2. In $M_2(\mathbb{R}),$

$$
\begin{aligned}
\begin{pmatrix}
0&0\\1&0
\end{pmatrix}
\begin{pmatrix}
0&1\\0&0
\end{pmatrix}=
\begin{pmatrix}
0&0\\0&0
\end{pmatrix}
\end{aligned}
$$

$$
\begin{aligned}
\begin{pmatrix}
0&1\\0&0
\end{pmatrix}
\begin{pmatrix}
0&0\\1&0
\end{pmatrix}
=
\begin{pmatrix}
1&0\\0&0
\end{pmatrix}
\end{aligned}
$$

**Proposition:** If $a\in U(R),$ then $a$ is not a zero divisor
**Proof:**
Assume on the contrary that $a \in U(R)$ yet a zero divisor. So: $\exists\ b \in R$ such that
Case 1: $ab=0\ \implies b=a^{-1}ab=a^{-1}\cdot 0 =0$
Case 2: $ba =0 \ \implies b=baa^{-1}=0\cdot a^{-1}= 0$
In any case, $b=0$, a contradiction
**Note:** Units are never zero divisors
**Remark:** In general, there might be elements that are neither units nor zero divisors
**Note:** Units are generators in $\mathbb{Z}_n$
## Domains
**Definition:** A ring R is a domain if it has no zero divisors. R is an integral domain if it is a communative domain
**Examples:**
1. $\mathbb{Z}$ is an integral domain
2. If R is a division ring then it is a domain
(Because in a division ring, non-zero elements are units, but we saw that units cannot be zero-divisors!)
1. If R is a field then it is an integral domain

$$
\begin{aligned}
\begin{matrix}
Field & \implies & Integral\ Domain \\ \Downarrow & & \Downarrow \\ Division Ring & \implies & Domain
\end{matrix}
\end{aligned}
$$

### Properties of Domains
1. Domains are “canellative”
If $ab=ac,\ a\neq0  \implies b=c$
**Proof:**
Suppose that $ab=ac,\ a\neq 0$ in a domain. Then, $a(b-c)=ab-ac=0$. In a domain, if a product of two elements is 0 then one of them must be 0. Since $a\neq 0$, it follows that $b-c=0$. Namely, $b=c$
**Remark:** If your ring is not a domain, do not expect it to be cancellative
In $\mathbb{Z}_6$, $3\cdot 2 =3 \cdot 4$ but $3\neq 4$
**Proof:** Suppose R is a domain $S \subseteq R$ subring
Let $a,b \in S$ be non-zero, let us prove that $ab\neq 0$. But $a,b\in R$ are non-zero, and R is a domain, so $ab \neq 0$
If in addition R is commutative, then so is S
**Remark:** A subring of a field need not be a field
Ex. Not a field → $\mathbb{Z} \subset R$ ← Field
**Corollary:** $\mathbb{Z}, \mathbb{Z}[{\sqrt2}], \mathbb{Z}[{i}], \cdots \subset \mathbb{C}$ therefore they are integral domains
**Proposition:** If R is a domain then $R[x]$ is also a domain
(And if R is an integral domain then so is $R[x]$
**Corollary:** If F is a field then $F[x]$ is an integral  domain.
Moreover, $F[x,y],\ F[x,y,z],\cdots$ are integral domains
**Remark:** Any subring of a field is an integral domain and conversely, if R is an integral domain then it is a subring of a field
Ex. $\mathbb{Z} \subset \mathbb{Q},\ \mathbb{Z}[i] \subset \mathbb{Q}[i], \cdots$
**Remark:** Any subring of a division ring is a domain. It is tempting to conjugate that any domain is a subring of a division ring. But that’s not true!
# ➡️ Homomorphisms
## Homomorphism
**Definition:** A homomorphism is a “Structure-Preserving Map”

Group Homomorphism:

$$
\begin{aligned}
f:G\rightarrow H \\
f(g_1\cdot g_2)=f(g_1)\cdot f(g_2)
\end{aligned}
$$

(It follows that $f(e_G)=e_H$, identity mapped to identity)
**Example:** 
$f:\mathbb{Z} \rightarrow \mathbb{Z}_n$
Addition group of integers → $(\{0,1,\cdots, n-1, +_{mod\ n}\})$
$f(a) = a_{(mod\ n)}$
**Definition:** A function $f:R\rightarrow S$ (where $R$ and $S$ are rings) is a ring homomorphism if:
1. $f(r_1+_Rr_2)=f(r_1)+_Sf(r_2) \ \forall\ r_1,r_2 \in R$
(Namely, $f$ is a group homomorphism $f:(R,+)\rightarrow(s,+)$)
2. $f(r_1\cdot_Rr_2)=f(r_1)\cdot_Sf(r_2)\ \forall\ r_1,r_2\in R$
3. $f(1_R)=1_S$
**Remark:** It is guarenteed that if $f:R\rightarrow S$ is a ring homomoprhism, then $f(0_R) =0_S$
**Examples:**
1. For any ring R, the **identity map
**

$$
\begin{aligned}
id_R: R\rightarrow R\\
\ \ \ \ \ \ \ \ \ \ r\mapsto r
\end{aligned}
$$

 is a ring homomorphism
2. If $S\subseteq R$ is a subring, then the inclusion map:

$$
\begin{aligned}
i_S:S\rightarrow R \\
\ \ \ \ \ \ \ s\mapsto s
\end{aligned}
$$

is a ring homomorphism. E.g.,

$$
\begin{aligned}
f:Q\rightarrow R \\
\ f(\alpha)\mapsto \alpha
\end{aligned}
$$

3.

$$
\begin{aligned}
f: \mathbb{Z} \rightarrow \mathbb{Z}_n = \{0, 1, \cdots, n-1\}\\
f(a) = a_{(mod\ n)}
\end{aligned}
$$

- $f(a+b)=f(a)+f(b)$
-

$$
\begin{aligned}
f(a\cdot b) = f(a) \cdot f(b):\\ \  (a\cdot b)_{mod\ n} = a_{mod\ n}\cdot b_{mod\ n}
\end{aligned}
$$

- $f(1)=1$

$$
\begin{aligned}
E.g.\ f: \mathbb{Z}\rightarrow\mathbb{Z}_7, \ (12\cdot 13)_{\mod 7} \\
\implies 12_{\mod7}\cdot 13_{\mod7})\\\implies 156\mod\ 7 = 30 \mod 7 \\ \implies 2 = 2
\end{aligned}
$$

1. A non-example: $f: \mathbb{Z}\rightarrow \mathbb{Z}\oplus\mathbb{Z}$ by $f(a)=(a,0)$
$f$ is $+$- preserving, $\cdot$ - preserving, but not a ring homomorphism since $f(1)=(1,0)\neq (1,1)$, a violation of the 3rd axiom
2.

$$
\begin{aligned}
f:\mathbb{C}\rightarrow M_2(\mathbb{R}) \\
f(a+bi)=
\begin{pmatrix}
a & b \\
-b & a
\end{pmatrix}
\end{aligned}
$$

$$
\begin{aligned}
f(2-3i)=\begin{pmatrix}2&-3\\3&2\end{pmatrix}
\end{aligned}
$$

 $f((a_1+b_1i)+_{complex}(a_2+b_2i))=f(a_1+b_1i)+_{matrix\ mult}f(a_2+b_2i)$
$f((a_1a_2-b_1b_2)+(a_1b_2+b_1a_2)i)$

$$
\begin{aligned}
\implies \begin{pmatrix}
a_1a_2-b_1b_2 & a_1b_2+b_1a_2\\
-(a_1b_2+b_1a_2) & a_1a_2-b_1b_2
\end{pmatrix}
\end{aligned}
$$

vs 2x2 matrix multiplication

$$
\begin{aligned}
\begin{pmatrix}
a_1 & b_1\\
-b_1 & a_1
\end{pmatrix}\begin{pmatrix}
a_2 & b_2\\
-b_2 & a_2
\end{pmatrix}=\begin{pmatrix}
a_1a_2-b_1b_2 & a_1b_2+b_1a_2\\
-b_1a_2-a_1b_2 & -b_1b_2+a_1a_2
\end{pmatrix}
\end{aligned}
$$

As we can see they both yield the same result

$$
\begin{aligned}
f(1)=1_{M_2(\mathbb{R})}=\begin{pmatrix}
1 & 0 \\
0 & 1
\end{pmatrix}
\end{aligned}
$$

Indeed, $1+0i$ →

$$
\begin{aligned}
f(1) = \begin{pmatrix}
1 & 0 \\
0 & 1
\end{pmatrix}
\end{aligned}
$$

3. Let R be a ring $f:R[x]\rightarrow R$
Polynomial Ring over R → R
$f(a_0+a_1x+\cdots + a_nx^n)=a_0$
That’s always a ring homomorphism (Exercise: Check)
**Definition:** A ring homomorphism $f:R\rightarrow S$
1. Injective homo/monomorphism if
$f(r_1)=f(r_2)\ \forall\ r_1,r_2\in R \implies\ r_1=r_2$ ← (1:1)
2. Surjective homo/monomorphism if
$\forall\ s\in S: \exists\ r\in R:\ f(r) =s$ ← (Onto)
3. Isomorphism: Injective + Surjective ← (Bijective)
**Examples:**

1.

$$
\begin{aligned}
f: \mathbb{Z}\rightarrow \mathbb{Z}_n\\
f(a)=a_{\mod n}
\end{aligned}
$$

Surjective
Not Injective because

$$
\begin{aligned}
f(1)=f(n+1)\\
f(0)=f(n)
\end{aligned}
$$

1.

$$
\begin{aligned}
f:\mathbb{C}\rightarrow M_2(\mathbb{R})\\
f(a+bi)=\begin{pmatrix}a&b\\-b &a\end{pmatrix}
\end{aligned}
$$

$f(a_1+b_1i)=f(a_2+b_2i)$

$$
\begin{aligned}
\begin{pmatrix}
a_1 & b_1\\
-b_1 & a_1
\end{pmatrix}
=
\begin{pmatrix}
a_2 & b_2\\
-b_2 & a_2
\end{pmatrix} \\ \implies a_1=a_2,  b_1=b_2 \implies a_1+b_1i=a_2+b_2i
\end{aligned}
$$

Injective
Not Surjective because

$$
\begin{aligned}
\begin{pmatrix}
1 & 1\\
1 & 1
\end{pmatrix}
\end{aligned}
$$

 does not have a source under $f$

1. $f:\mathbb{Z} \rightarrow \mathbb{Z}_2[x]$
$f(a)=a_{\mod 2}$

Not Injective 2 and 4 both mapped to 0
Not Surjective x doesn’t have a souce

1. For any ring $R$,
$id_R: R\rightarrow R$ ← an isomorphism
(Call an isomorphsim from a ring to itself “automorphism”)
2. $f:\mathbb{C} \rightarrow \mathbb{C}$
$f(a+bi)=a-bi$ aka “complex conjugation” is a ring/field automorphism
## Ring Homomorphisms

$f:R\rightarrow S:$

$$
\begin{aligned}
f(r_1+r_2)=f(r_1)+f(r_2)\\
f(r_1\cdot_R r_2)=f(r_1)\cdot_S f(r_2)\\
f(1_R)=1_S
\end{aligned}
$$

**Remark - Basic Properties of Homomorphsims:**
1. $f(0_R)=0_S,\ f(1_R)=1_S$
2. $f(-r)=-f(r)$
3.

$$
\begin{aligned}
f(r^n)=f(r)^n = \\
f(r\cdot r\cdot \cdots \cdot r)=f(r)\cdot \cdots \cdot f(r)
\end{aligned}
$$

 ← n times
Recall that a ring homomorphism which is injective and surjective (namely bijective) is called an isomorphsim.
**Defintion:** Two rings $R,S$ are isomorphic to each other if there is an isomorphsim $f:R\rightarrow S$ Denoted $R\cong S$
**Remark:**
1. If $f:R \rightarrow S$ is an isomorphism, then the inverse function: $f^{-1}: S\rightarrow R$ is also an isomorphism
2. If $f:R\rightarrow S,\ g: S\rightarrow T$ are isomorphic ($R,S,T$ rings)
Then, $g\circ f: R\rightarrow T$ is $g \circ f(r)=g(f(r))$
Proof:
\>$(g\circ f)(r_1+r_2)=g(f(r_1+r_2))=g(f(r_1)+f(r_2))=g(f(r_n))+g(f(r_2))=(g\circ f)(r_1)+(g \circ f)(r_2)$
\> Multiplication is very similar
\>$(g\circ f)(1_R)=g(f(1_R))=g(1_S)=1_T$
3. Every ring is isomorphic to itself (find an iso)
Properties of rings, preserved under isomorphisms
**Examples:**
- Cardinality
- Commutativity
- Being a domain, field, division ring
- Having isomorphic addition groups
- Having isomorphic groups of units
(if $R\cong S$ then $R^x \cong S^x$)
- Existence of an element $x\neq0$ for which $x^2=0$
(If $f:R\rightarrow S$ is an isomorphism and $0\neq x \neq R$ such that $x^2 =0$, then $0 \neq f(x)\in S$ and $f(x)^2=f(x^2)=f(0)=0$)
**Remark:** An example of a function that preserves $+,\cdot$ but not 1 (therefore not a homomorphism):

$$
\begin{aligned}
f: \mathbb{Z}\oplus \mathbb{Z} \rightarrow \mathbb{Z} \oplus \mathbb{Z} \\
\ \ \ \ \ f((a,b))=(0,b)
\end{aligned}
$$

**Examples:**
1. $\mathbb{Z}_6 \cong \mathbb{Z}_8$? ←(No, different cardinalities)
2. $\mathbb{Q} \cong \mathbb{R}$? ←(No, different cardinalities - $\mathbb{Q}$ is countable, $\mathbb{R}$ is uncountable)
3. $\mathbb{Z} \cong \mathbb{Q}$? (No, $\mathbb{Q}$ is a field but $\mathbb{Z}$ is not)
4. $M_2(\mathbb{R})\cong \mathbb{C} \oplus \mathbb{C}$? (No, LHS is not commutative but RHS is commutative)
$\mathbb{C} \oplus \mathbb{C}$ ← not a domain $(0,1)\cdot (1,0) = (0,0)$ there are zero-divisors
**Remark:** The direct sum of two rings is never a domain
5. $\mathbb{Z}\cong \mathbb{Z} \oplus \mathbb{Z}$? ← No,  $\mathbb{Z}$ is a domain but $\mathbb{Z} \oplus \mathbb{Z}$ is not
6. $\mathbb{Z} \oplus \mathbb{Z} \cong \mathbb{Z}\oplus \mathbb{Z}\oplus \mathbb{Z}$ ← No, calculating the units for both sides, we see that the units are not the same
$U(\mathbb{Z} \oplus \mathbb{Z}) = U(\mathbb{Z}) \oplus U(\mathbb{Z}) = 4$
$U(\mathbb{Z} \oplus \mathbb{Z} \oplus \mathbb{Z}) = U(\mathbb{Z}) \oplus U(\mathbb{Z})\oplus U(\mathbb{Z}) = 8$
7. $\mathbb{R}\cong \mathbb{C}$? ← No, suppose we had $f:\mathbb{C}\rightarrow \mathbb{R}$ iso
$f(i)^2=f(i^2)=f(-1)=-f(1)=-1$
So, there is a real number $f(i)$ whose square is $-1$. That is false.
8. $\mathbb{Z}[i] \cong \mathbb{Z}[\sqrt2]$? (hint: use hw 2)
9. $\mathbb{Z}_{15}\cong \mathbb{Z}_5\oplus\mathbb{Z}_3$ ← (yes, isomorphic because of Chinese remainder theorem)
**Definition:** Chinese Remainder Theorem - If $n, m$ are coprime numbers $(n,m>1)$ then $\mathbb{Z}_{nm}\cong \mathbb{Z}_n \oplus \mathbb{Z}_m$
($\mathbb{Z}_{24}\not\cong \mathbb{Z}_2 \oplus \mathbb{Z}_{12}$) because $2,12$ are not coprime
Shift back to homomorphisms, not necessarily isomorphic
Let $f:R\rightarrow S$ be a ring homomorphism
$Im(f)=\{s\in S\ |\ \exists\ r \in R: f(r)=s\} \subseteq S$
$Ker(f)=\{r\in R\ |\ f(r)=0_S \} \subseteq R$
**Remark:**
- $Im(f) \subseteq S$ is a subring of $S$
- $Ker(f) \subseteq R$ is closed under $+, \cdot$ but is not a subring
( If $1_R\in Ker(f),$ then $f(1_R)=0_S$, but $f(1_R)=1_S,$ we obtain $1_S=0_S$, impossible!)
**Remark:**** **
A ring homomorphism is surjective $\Longleftrightarrow$** **$Im(F)=S$
A ring homomorphism is injective $\Longleftrightarrow Ker(f)=\{0_R\}$
**Proof:**
($\Rightarrow$) Suppose $f:R\rightarrow S$ is an injective homomorphism. Obviously, $f(0_R)=0_S$ so $0_R\in Ker(f)$. Suppose that $0\neq r\in R$, if $r\in Ker(f)$ then: $f(r)=0_S=f(0_R),$ contradicting injectivity. Therefore $Ker(f)=\{0_R\}$
($\Leftarrow$) Suppose $Ker(f)=\{0_R\},$ let us prove that f is injective
Suppose $f(r_1)=f(r_2),$ let us show $r_1=r_2$ $f(r_1)=f(r_2)\implies f(r_1)-f(r_2)=0_S \implies f(r_1-r_2)=0_S\implies r_1-r_2 \in Ker(f)=\{0_R\}$ so, $r_1-r_2 = 0_R\implies r_1=r_2$
**Exercise:**

$$
\begin{aligned}
f: \mathbb{R} \oplus \mathbb{R} \rightarrow M_2(\mathbb{R}) \\
f((a,b))=\begin{pmatrix}
2a-b & -2a+tb \\
a-b & -a+2b
\end{pmatrix}
\end{aligned}
$$

This is a ring homomorphism
Calculate $Ker(f)$ and deduce whether f is injective or not

$$
\begin{aligned}
f: \mathbb{Z}_{15}\rightarrow \mathbb{Z}_5 \\
f(a)=a_{\mod 5}
\end{aligned}
$$

this is a ring, calculate $Ker(f)$
### Injective / Surjective
A ring homomorphism $f:R\rightarrow S$ is surjective if $Im(f) =S$ (Namely if every $s\in S$ has a source)
A ring homomorphism $f:R\rightarrow S$ is injective if it is $1:1$, equivalently if $Ker(f) = \{0_R\}$ or $\{r\in R\ |\ f(r)=0_S\}$
**Example:**
Let $f:\mathbb{C} \rightarrow M_2(\mathbb{R})$ be given by

$$
\begin{aligned}
f(a+bi)=\begin{pmatrix}
a-3b & -2b \\
5b & a+ 3b
\end{pmatrix}
\end{aligned}
$$

This is indeed a ring homomorphism. Is it injective?
**Solution:** Calculate $ker(f)$

$$
\begin{aligned}
\lbrace a+bi\ |\
\begin{pmatrix}
a-3b & -2b \\
5b & a+3b
\end{pmatrix}
=0_{M_2(\mathbb{R})}
 \rbrace
\end{aligned}
$$

$$
\begin{aligned}
\implies \begin{matrix}
a-3b = 0 \implies \underline{a=0} \\
-2b = 0 \implies \underline{b = 0}\\
5b=0 \\
a+3b = 0

\end{matrix}
\end{aligned}
$$

$\implies$ Therefore the only complex number $a+bi$ which is mapped to 0 is 0
$\implies ker(f) = \{0\}$, thus, $f$ is injective
F is not surjective:
1.

$$
\begin{aligned}
\begin{pmatrix}0&0\\1&0\end{pmatrix}\notin Im(f)
\end{aligned}
$$

Otherwise

$$
\begin{aligned}
\begin{pmatrix}0&0\\1&0\end{pmatrix} = \begin{pmatrix}a-3b & -2b \\ 5b & a+3b\end{pmatrix}\implies \begin{matrix}b=0\\ b= \frac{1}{5}\end{matrix}\implies contradiction
\end{aligned}
$$

2. $f$ is injective, so if $f$ is surjective, then it is not an isomorphism. But, $\mathbb{C}\not\cong M_2(\mathbb{R})$, $\mathbb{C}$ is commutative, $M_2(\mathbb{R})$ is not.

# 🇨🇳 Chinese Remainder Theorem (CRT)
**Theorem:** If $n,m > 1$ are coprime numbers, then: $\mathbb{Z}_{nm}\cong \mathbb{Z}_n \oplus \mathbb{Z}_m$ (a ring isomorphism)
**Remark:** For example, $\mathbb{Z}_{15}\cong \mathbb{Z}_3 \oplus \mathbb{Z}_5$, but $\mathbb{Z}_{120}\cong \mathbb{Z}_{10} \oplus \mathbb{Z}_{12}$, as 10 and 12 are not coprime
**Proof:** Suppose that $n,m>1$ are coprime.
Define a function:
$f:\mathbb{Z}_{nm} \rightarrow \mathbb{Z}_n \oplus \mathbb{Z}_m$ by $f(a) = (a_{(mod\ n)}, a_{(mod\ m)})\ \forall\ a\in \mathbb{Z}_{nm}$
This is a ring homomorphism:
$f(1)=1,\ f(a+b)=f(a)+f(b),\ f(ab)=f(a)f(b)$ Exercise: Verify
**Proof:** Let us show that f is surjective
Pick $s \in \mathbb{Z}_n,\ t \in \mathbb{Z}_m$. We aim to show that $(s,t)\in Im(f),$ namely, that there is $x\in \mathbb{Z}_{nm}$
For which $f(x)=(s,t)=(x_{mod\ n}, x_{mod\ m})$
Namely:

$$
\begin{aligned}
\begin{matrix}
x=s(mod\ n)\\
x=t(mod\ m)
\end{matrix}
\end{aligned}
$$

Since $n, m$ are coprime, by the Euclidean Algorithm. There is a linear combination:
$un+vm=1\ |\ u,v\in \mathbb{Z}$
(For example, 5,7 are coprime we have a linear combination $3\cdot 5+(-2)\cdot 7 = 1$)
Consider $x=t\cdot un+s\cdot vm \in \mathbb{Z}$, (consider $x_{(mod\ nm)}$)
We claim that $x\equiv s_{(mod\ n)},\ x\equiv t_{(mod\ m)}$
$x_{(mod n)}\equiv tun+svm_{(mod\ n)}$ ← $tun=0$
$\equiv svm_{(mod\ n)} \equiv s\cdot (1-un)_{(mod\ n)} \equiv s-sun_{(mod\ n)}$ ← $sun=0$
$\equiv s_{(mod\ n)}$
$x_{(mod m)}\equiv tun+svm_{(mod\ m)}$ ← $svm=0$
$\equiv tun_{(mod\ m)} \equiv t\cdot (1-vm)_{(mod\ m)} \equiv t-tvm_{(mod\ m)}$ ← $tvm=0$
$\equiv t_{(mod\ m)}$
Therefore, $x\equiv s_{(mod\ n)}$, $x\equiv t_{(mod\ m)}$ as required.
It follows that $f:\mathbb{Z}_{nm} \rightarrow \mathbb{Z}_{n} \oplus \mathbb{Z}_{m}$ is a surjective ring homomorphism
Since $|\mathbb{Z}_{nm}| = n\cdot m = |\mathbb{Z}_{n}\oplus \mathbb{Z}_{m}|,$ and f is surjective, it is in fact bijective.
Hence, $f$ is a ring homomorphism $\ \square$
**Example:**
Find $x\in \mathbb{Z}_{35}$ such that $x\equiv 3_{(mod\ 5)}, x\equiv 6_{(mod\ 7)}$
Step 1: Find a linear combination
$35=7\cdot 5$  ← 7 and 5 are coprime
$u\cdot 7+ v\cdot 5 = 1\ | u=3,\ v=-2$ ← Linear Combination
$(7,5)=(5,2)=(2,1)$
$x=t\cdot un + s\cdot vm=3\cdot (-2)\cdot 7+6\cdot 3 \cdot 5=-42+90=48_{(mod\ 35)}=13=x$
$13_{(mod\ 5)} \equiv3$
$13_{(mod\ 7)} \equiv 6$
**Application:** How many units are there in $\mathbb{Z}_{35}$?
$5,\ 7$ are coprime $\implies \mathbb{Z}_{35}\cong \mathbb{Z}_{5} \oplus \mathbb{Z}_{7}$

But that means that $\mathbb{Z}_{35}^x \cong (\mathbb{Z}_{5}\oplus \mathbb{Z}_{7})^x=\mathbb{Z}_{5}^x\oplus \mathbb{Z}_{7}^x=4\cdot 6 = 24$
**Recall:** Units in $\mathbb{Z}_n$ are exactly residues that are coprime with n
**Notation:** $\phi(n) =$ number of residues mod n which are coprime with n
**Recall:**
If $f: R\rightarrow S$ is a ring homomorphism, then:
- $\text{Im} f = \{s\in S:\exists r\in R: f(r)=s\} \subseteq S$
- $\text{ker} f =\{r\in R: f(r)=0_s\}\subseteq R$
 $f$ is injective (one-to-one) $\Longleftrightarrow$ $\ker f=\{0_R\}$
$f$ is surjective (onto) $\Longleftrightarrow$ $\text{Im} f= S$
## Properties of Im, kernel of $f$
1. $\text{Im} f\subseteq S$ is a subring
2. $\ker f\subseteq R$
1. is an additive subgroup
2. contains $0_R$
3. $\forall x\in \ker f, r\in R, xr, rx\in\ker f$
4. $1_R\not\in\ker f$
# ◀️ Ideals
**Definition:** 
A subset $I\vartriangleleft R$ of a ring is called an **ideal** if:
1. It is an additive subgroup of $R$ (it contains 0 and is closed under $\pm$)
2. $I$ is closed under multiplication by an arbitrary element of $R$.

$$
\begin{aligned}
\forall x\in I, r\in R,\\ rx,xr\in I
\end{aligned}
$$

1. It is a proper subset since $1_R\not\in I$
1. If $1\in I$ then $\forall\ r \in R, r= r\cdot 1 \in I\implies R = I$
$R$ is not an ideal of itself, it is an “improper ideal”
Examples:
1. $f:\mathbb{Z}\rightarrow\mathbb{Z}$
 $a\mapsto a\pmod n$
$\ker f =\{a\in\mathbb{Z}:a\equiv0\pmod n\}=\{...,-2n, -n,0,n,2n,...\}= n\mathbb{Z}$
$f$ is an ideal
What do ideals of $\mathbb{Z}$ look like?
Any $I\vartriangleleft \mathbb{Z}$ is an additive subgroup of $(\mathbb{Z},+)$ and is cyclic: $m\mathbb{Z}$ for some integer $m$
2. Let $F$ be a field.
$f:F[x]\rightarrow F$
$f(p(x))=p(0)=a_0+a_1(0)+a_2(0)^2+\cdots+a_n(0)^n=a_0$
Then $f$ is a ring homomoprhism.
$\ker f =\{p(x)\in F[x]:p(x)=a_1x+a_2x^2+\cdots+a_nx^n\}$, the set where the leading coefficient is equal to 0.
Given $\alpha\in F,$
$f:F[x]\rightarrow F$
$f(p(x))=p(\alpha)$
If $\alpha=1,$
$f(p(x))=\sum_{k=0}^na_k$, the sum of all coefficients.
$\ker f=\{p(x)\in F[x]:p(\alpha)=0\}$
3. $f:\mathbb{Z}[i]\rightarrow\mathbb{Z}_5$
$f(a+bi)=(a+2b)\pmod 5$
**Exercise**: Verify $f$ is a ring homomorphism. Is there a homomorphism $g:\mathbb{Z}[i]\rightarrow\mathbb{Z}_7$? (more difficu
$\ker f=\{a+bi:a,b\in\mathbb{Z}:a+2b\equiv0\pmod 5\}$ (equivalently $a\equiv3b\pmod 5)$
For example, $4+3i\in\ker f$
4. Suppose $F$ is a field.
What are the ideals of $F$?
$\{0_F\}\vartriangleleft F$
Let $I\vartriangleleft F$ be an ideal of a field.
If $0\not=x\in I.$ Then, $x^{-1}\in I$.
But then $x^{-1}x=1\in I$ which is a contradiction.
Thus, $\{0_F\}$ is the only ideal of a field.
**Corollary:**
If $I\vartriangleleft R$, then $I$ contains no units.
**Exercise:**
If $F$ is a field, then the only ideal of $M_n(F) \text{ is } \{0\}$
For the rest of the lecture, $R$ is a commutative ring.
(some of this can be found in section 5.4 of the textbook)
**Definition:**
Let $S\subseteq R$ be a subset.
The ideal **generated** by $S$,  denoted $\langle\ S\ \rangle \vartriangleleft R,$ is

$$
\boxed{\langle\ S\ \rangle = \left\{ \sum_{i=1}^m r_is_i:r_i\in R,s_i \in S\right\}}
$$

**Exercise:**
Prove $\langle\ S\ \rangle \vartriangleleft R$ is an ideal (but possibly improper)
**Remark:**
$<S>$ is the smallest ideal of $R$ that contains $S$.
If $J\vartriangleleft R, S\subseteq J\Rightarrow I\subseteq J$
**Examples:**
1. Ideals of $\mathbb{Z}$ are of the form $\{a\in\mathbb{Z}:a\equiv0\pmod m\}=\{xn:x\in \mathbb{Z}\}=<n>$
2. $<6,10>\vartriangleleft \mathbb{Z}$
$<6,10>=\{r_1\cdot6+r_2\cdot10:r_1,r_2\in\mathbb{Z}\}\subseteq<2>$ since all the elements are even numbers
We want to show that $<2>\subseteq<6,10>$ by showing $2\in<6,10>$
$2=(-3)(6)+(2)(10)\in<6,10>$
Thus, $<6,10>=<2>$
In general for $\mathbb{Z}$,
$<a,b>=<\gcd(a,b)>$
**Exercise**: Prove it
3. $F[x]$
$\{p(x)\in F[x]:\text{ zero constant term}\}=\langle\ x\ \rangle=\{p(x)\cdot x:p(x)\in F[x]\}$
**Summary:**
Ideal: $I \triangleleft R$
- Additive subgroup
- Closed under multiplication with arbitrary elements of R
- Proper
Ideal generated by a set
$S\subseteq R$ - subset

$$
\langle\ S\ \rangle = \left\{ \sum_{i=1}^m r_is_i:r_i\in R,s_i \in S\right\}
$$

Examples:
1. $\langle\ 2\ \rangle \triangleleft \mathbb{Z} = \{\ r\cdot 2\ |\ r\in \mathbb{Z}\ \}= 2\mathbb{Z} = \{\text{ Even Integers }\}$
2. $\langle\ n\ \rangle \triangleleft \mathbb{Z} \text{ is } n\mathbb{Z} = \{\text{ all integers divisible by n}\}$
3. $\langle\ 6,\ 8\ \rangle \triangleleft \mathbb{Z} = \{r_1\cdot 6 +r_2\cdot 8\ |\ r_1,r_2 \in \mathbb{Z}\ \} = \langle\ 2\ \rangle$
4. $\langle\ n,\ m\ \rangle = \langle\  \text{gcd}(n,m)\ \rangle$
5. If $n,m$ are coprime, $\langle\ n, m\ \rangle = \mathbb{Z}$ ← “Improper Ideal”
6. $\langle\ x\ \rangle \triangleleft F[x] = \{\ f(x)\cdot x\ |\ f(x)\in F[x]\ \}=\{\text{ polynomials with free term 0}\}=\{\ \text{ker }(F[x]\to F\ |\ x=0)\}$
## Principal Ideal
Definition:** **An ideal $I \triangleleft R$ is principal if it is generated by a single element (R is assumed to be a commutative ring)

$$
I=\langle\ r\ \rangle=\{a\cdot r\ |\ a\in R\ \}=R\cdot r
$$

**Proposition:** Suppose that $\langle\ r\ \rangle=\langle\ s\ \rangle$ in $R$. Then, $r=s\cdot u$ where $u\in R^x$. Conversely, if $r,s\in R \text{ and } r=s\cdot u \text{ for } u\in R^x,\text{ then } \langle\ r\ \rangle =\langle\ s \rangle$
**Examples:** (Prop):
1. $\langle\ 2\ \rangle = \langle\ -2\ \rangle \text{ in } \mathbb{Z}$ ($-1$ is the only $\neq 1$ element in $\mathbb{Z}$ )
2. In $\mathbb{Z_6}:$ $\langle \ 2 \ \rangle = \{\ 0,\ 2,\ 4\ \} = \langle\ 4\ \rangle = \{\ 0,\ 4,\ 2\ \}$
3. In $\mathbb{R}[x],\ \langle\ 2x+1\ \rangle = \langle\ -x-\frac{1}{2}\ \rangle \implies (2x+1)=-2(-x-\frac{1}{2})$ is a unit in $\mathbb{R}[x]$
**Proof:** (of proposition):
Suppose $r,s\in R$ and $r=u\cdot s$ for $u\in R ^x$. Let us prove $\langle\ r\ \rangle = \langle\ s\ \rangle$. Recall that $\langle\ S\ \rangle$ is the smallest ideal containing S.
Thus,

$$
\begin{aligned}
\begin{cases}
\text{ if } r\in \langle\ s \ \rangle\implies \langle\ r\ \rangle \subseteq \langle\ s\ \rangle \\
\text{ if } s\in \langle\ r \ \rangle\implies \langle\ s\ \rangle \subseteq \langle\ r\ \rangle
\end{cases} \\
\implies \text{It suffices to show: } r\in \langle\ s\ \rangle,s\in \langle\ r\ \rangle \\
\implies r=u\cdot s \in \langle\ s\ \rangle=\{a\cdot s:\ a\in R\} \\
s=u^{-1}r\in \langle\ r\ \rangle,\text{ hence }\langle\ s\ \rangle=\langle\ r\ \rangle
\end{aligned}
$$

**Proof of Converse:**
Suppose that $r,s\in R \ st. \langle\ r\ \rangle =\langle\ s\ \rangle$. $r\in \langle\ r\ \rangle=\langle\ s\ \rangle=\{\ a\cdot s \in r\ \}$
Thus, $\exists \ a\ st.\ r=a\cdot s$.
Similarly,

$$
\begin{aligned}
\exists\ b\in R\ st.\ s=b\cdot r\\
r=a\cdot s=a\cdot b \cdot r\\
(1- a \cdot b)\ r=0
\end{aligned}
$$

Since $R$ has no zero divisors and $r\neq 0$, then $1-ab=0\implies ab=1$
Thus, $a\in R^x$ Hence $r=a\cdot s$ for $a\in R^x$
**Definition:** A ring is a principal integral domain (PID) if it is an integral domain if every ideal is a principal
**Examples:**
1. $\mathbb{Z}$. Every ideal of $\mathbb Z$ is an additive subgroup. Subgroups of $(\mathbb Z, +)$ are cyclic $\implies \langle\ n\ \rangle = n\mathbb Z$. So, $\{\ \text{ideals of }\mathbb Z\ \}=\{\ n\mathbb Z: n\in \mathbb Z \ \}$
2. Any field is a PID
**Note:** The only ideal of a field is $\{\ 0\ \}$ which is clearly principal
**Non-Example:**
$\mathbb Z [x]$ is an integral domain
WTS: $\exists$ ideal that is not principal
Take $I \triangleleft \mathbb Z[x]$ to be $I = \langle\ 2,\ x\ \rangle \triangleleft \mathbb{Z}[x]$
$\langle\ 2,\ x\ \rangle=\{\ f(x)\cdot2+g(x)\cdot x\ |\ f,g\in \mathbb{Z}[x]\ \}$
Show $I$ isn’t principal
Assume to the contrary that $\langle\ 2,\ x\ \rangle=\langle\ g(x)\ \rangle\ |\ g(x)\in \mathbb{Z}[x]$
$2=h_1(x)g(x)$ for some $h_1(x)\in \mathbb{Z}[x]$
So degree of $g=0,\ g(x)=n,$ a constant
Also, $x=h_2(x)g(x) = h_2(x)\ n \implies deg(h_2)\leq 1$
$h_2(x)=a+bx \implies x=an+bnx \implies an=0, \ bn=1 \implies n=\pm 1$
$\implies \langle \ g(x)\ \rangle = \mathbb{Z}[x]$
$1=p(x)\cdot 2 + q(x)\cdot x \implies 1$ is even
Free term $p(x)$ is even and Free term $q(x)$ is zero
This is a Contradiction so we conclude that $\langle\ 2,\ x\ \rangle$ is not principal
$F[x]$, F is a field, is always a PID

- $\mathbb{Z}[i]-\text{PID}$
- $\mathbb{Z}[\sqrt2]-\text{PID}$

- $\mathbb{Z}[\sqrt{-2}]-\text{PID}$
- $\mathbb{Z}[\sqrt{-5}]-\text{Not a PID}$

Ideal is principal:

$$
\begin{aligned}
I=\langle\ r\ \rangle=\{a\cdot r\ |\ a\in R\ \}=R\cdot r\\
(\ \langle\ 3\ \rangle\triangleleft \mathbb{Z}, \langle\ 3\ \rangle=\{\ a\cdot 3\ |\ a\in \mathbb{Z}\ \}=\mathbb{Z}\cdot 3 = 3\ )
\end{aligned}
$$

**Definition:** PID - Integral domain in which every ideal is principal
Examples of PID: $\mathbb{Z},\ \mathbb{Z}[i],\ F-\text{Field}$
Non-Examples of PID: $\mathbb{Z}[x], \mathbb{Z}[\sqrt{-5}], ...$
Let R be a commutative ring (integral domain)
**Definition:** For $r,s\in R$, then $r\ |\ s$ $(\text{r divides s})$ if $\exists\ a\in R\ st.\ s=a\cdot r$
**Examples:**
1. In $\mathbb{Z}$, $3|6$
2. In $R[x],\ x-1\ |\ x^3-1$
Exercise: If $f,g\in F[x]\text{ and } f\ |\ g$ then $deg(f)\leq deg(g) \text{ (converse false)}$
In an integral domain R,
1. $r\ |\ s \iff \langle\ s\ \rangle \subseteq \langle\ r\ \rangle$
2. $\langle\ r\ \rangle=\langle\ s\ \rangle\iff r=u\cdot s \text{ for } u\in R^x$
**Remark:** In an integral domain R:
1. $r\ |\ s \iff \langle\ s\ \rangle \subseteq\ \langle\ r\ \rangle$
2. $\left\langle \ r\  \right\rangle = \langle \ s\ \rangle \iff r=u\cdot s \text{ for some }u\in R^x$
### Division Algorithm for $F[x]$
Let $f(x),g(x)\in F[x]$, then $\exists\ q(x), r(x) \in F[x]\ st: f(x)=q(x)g(x)+r(x)$ and either $r(x)=0$ or $deg(r)<deg(g)$
**Proof:**
Let $f(x)=\sum_{i=0}^na_ix^i,\ g(x)=\sum_{j=0}^mb_jx^j$
So $deg(f)=n\text{ and } deg(g)=m\ st.\ a_n\neq 0, b_m\neq 0$
Case 1: $n<m: (\text{base case})$
Take $q(x)=0,\ r(x)=f$
Then $f=q\cdot g+r=0+r$
$deg(r)=deg(f)=n<m=deg(g)$
Case 2: $n\geq m:$
Perform induction on n

$$
\begin{aligned}
\text{Take }q(x)=\frac{a_n}{b_m}x^{n-m},\text{ Then:}\\ q(x)g(x)=\frac{a_n}{b_m}x^{n-m}\cdot \sum_{i=0}^mb_ix^i=\sum_{i=0}^{m}\frac{a_nb_i}{b_m}x^{i+n-m} \\= \frac{a_m\cdot \cancel{b_m}}{\cancel{b_m}}x^{m+n-m}=a_nx^n+\text{ lower deg polynomial }
\end{aligned}
$$

Now, $f(x)-q(x)g(x)=\sum{a_ix^i}-a_nx^n+\sum c_ix^i = a_nx^n+...$
So $deg[f(x)-q(x)g(x)]\leq n-1$
By inductive hypothesis
$f-q\cdot g=h\cdot g+r$ for $h,r\in F[x]$ and either $r=0\text{ or } deg(r)<deg(g)$
So $f=(h+q)\cdot g+r$
**Example:**
Divide $x^7+2x+1$ by $x^2+1$ (with residue) over $\mathbb{R}$

$$
\begin{aligned}
\begin{array}{r}
x^5-x^3+x\phantom{} \\
x^2+1{\overline{\smash{\big)}\,x^7+2x+1}} \\
\underline{-(x^7+x^5)} \phantom{111}\\
-x^5+2x+1\phantom{} \\
\underline{-(x^5+x^3)}\phantom{111} \\
-x^3+2x+1\\
\underline{x^3+x\phantom{1111}}\\
r(x)\longrightarrow x+1

\end{array}
\end{aligned}
$$

$\implies x^7 +2x +1 = (x^5-x^3+x)\underbrace{(x^2+1)}_{\text{deg = 2}} + \underbrace{(x+1)}_{\text{deg = 1}}$
**Theorem:** $F[x]$ ($F$ is a field) is a PID
**Proof:**
Let $0\neq I \rhd F[x]$
Pick $0\neq f\in I$ of lowest possible degree
Since $f\in I, \left\langle \ f\  \right\rangle\subseteq I$
WTS $I=\left\langle \ f\  \right\rangle$
Let $g\in I,$ then by the divison algorithm,
$\exists\ q,r\in F[x]\ st.\ g(x)=q(x)f(x)+r(x)$
Either $r(x)=0$ or $deg(r)<deg(f)$
$r(x)=\underbrace{g(x)}_{\in I}-q(x)\underbrace{f(x)}_{\in I} \in I$
Then, $r(x)$ must equal 0 because $f$ was of lowest possible degree in $I$ so $deg(r)<deg(f)$ which is impossible.
Then, $g(x)=q(x)\cdot f(x)\in \left\langle \ f\  \right\rangle$
Therefore, $I\subseteq \left\langle \ f\  \right\rangle$ so $I \in \left\langle \ f\  \right\rangle$. In particular, $I$ is principal
**Corollary:**
$\{\text{ Ideals of } F[x]\ \} \xleftrightarrow{1:1} \{\text{ monic polynomial of } F[x]\ \}$
Every ideal is a principal and we can normalize its highest term, multiplying it by a unit scalar
$\left\langle \ f\  \right\rangle=\left\langle \ g\  \right\rangle,\ f,g \text{ monic } \implies f=g$
$F[x]$ is a PID if every ideal is generated by a single element
$I \rhd F[x]$
$I = \left\langle \ f(x)\  \right\rangle=F[x]\cdot f(x)=\left\{\ g(x)\cdot f(x) \mid g(x)\in F[x]\ \right\}$
**Example:**
$\left\langle \ x^2+1\  \right\rangle \rhd \mathbb{R}[x] \to \left\langle \ x^2+1\  \right\rangle = \{\ g(x)\cdot (x^2+1)\mid g(x)\in \mathbb{R}[x]\ \}$
$\underbrace{x^4-1}_{=\ q(x)(x^2+1)+r(x)}\in \left\langle \ x^2+1\  \right\rangle=(x^2-1)(x^2+1)$
$\left\langle \ f\  \right\rangle= \left\langle \ g\  \right\rangle \iff f=u\cdot g\mid u\in F[x]^x$
$F[x]^x=F \backslash \{0\} \implies p(x)\cdot q(x)=1$
**Corollary:** Every Ideal $I\rhd F[x]$ is $I=\left\langle \ f(x)\  \right\rangle$ where $f(x)$ is monic: $f(x)=x^n+a_{n-1}x^{n-1}+\cdots + a_0$
Moreover, if $f,g$ are monic polynomials then $\left\langle \ f\  \right\rangle=\left\langle \ g\  \right\rangle \iff f=g$
Note: Must assume $f,g$ are monic because $\left\langle \ x^2+1\  \right\rangle = \left\langle \ -2x^2-2\  \right\rangle$
$\{\ \text{Ideas in }F[x]\ \} \xleftrightarrow{1:1}\{\ \text{non-constant monic polynomnial}\ \}$
$\left\langle \ f\  \right\rangle \longleftrightarrow f$
**Question:** Why Ideals?
- $f:R\to S \implies ker(f)\lhd R$
- $I\lhd R\to \exists\  \underbrace{\pi: R\to R/I}_{ker(\pi)=I}$
### Quotient Rings
Let $R$ be a ring, $I\lhd R$. Define the quotient ring $R/I$

$$
\begin{aligned}
\boxed{R / I=\{\ r+I\mid r\in R\}}\\
r+I:\{\ r+\alpha\mid \alpha \in I\ \}=\{\ x\in R\mid x-r\in I\ \}
\end{aligned}
$$

**Example:**

$R=\mathbb{Z}$

$I=3\mathbb{Z}$

$$
\begin{aligned}
R/I = \mathbb{Z}/3\mathbb{Z}=\{\ a+3\mathbb{Z}: a\in \mathbb{Z}\ \} \\ = 0+3\mathbb{Z}= \{\cdots, -6,-3,0,3,6,\cdots \}
\\ = 1+3\mathbb{Z}= \{\cdots, -5,-2,1,4,7,\cdots \} \\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \vdots
\end{aligned}
$$

**Remark:**
$r+I=s+I\iff r-s\in I$
$2+3\mathbb{Z}=5+3\mathbb{Z} \iff 5-2 = 3 \in 3\mathbb{Z}$
### Making R / I a Ring
Addition:
$\underbrace{(r+I)+(s+I)}_{\text{addition of cosets}}=\underbrace{(r+s)}_{\text{addition in the ring}}+I$
$(2+3\mathbb{Z})+(2+3\mathbb{Z})=(2+2)+3\mathbb{Z} = 4+3\mathbb{Z} = 1+3\mathbb{Z}$
Multiplication:
$(r+I)\cdot (s+I)=r\cdot s+I$
$(2+3\mathbb{Z})\cdot (2+3\mathbb{Z})=4+3\mathbb{Z}=1+3\mathbb{Z}$
Well Defined?

$$
\begin{aligned}
(2+3\mathbb{Z})=(-7+3\mathbb{Z})=(14+3\mathbb{Z})\\
(-7+3\mathbb{Z})+(14+3\mathbb{Z})=(7+3\mathbb{Z})=(1+3\mathbb{Z})\\
(-7+3\mathbb{Z})\cdot (14+3\mathbb{Z})=(-98+3\mathbb{Z})=(1+3\mathbb{Z})
\end{aligned}
$$

\*Need to show this is always true
**Claim:** Addition and Multiplication on $R/I$ are well defined
WTS:
**Proof:**
Suppose that  $r+I,\ s+I\in R/I$
Assume that $r+I=r'+I,s+I=s'+I$
WTS: $(r+s)+I=(r'+s')+I\iff (r+s)-(r'+s')\in I$
$(r+s)-(r'+s') = \underbrace{(r-r')}_{\in I}+\underbrace{(s-s')}_{\in I}$ since $r+I=r'+I,\ s+I=s'+I$
Μultiplication:
Suppose that $r+I=r'+I, s+I=s'+I\in R/I$
$(r+I)\cdot (s+I)=(r'+I)\cdot (s'+I)\iff rs+I=r's'+I$
WTS: $r\cdot s - r'\cdot s'\in I$
$r'-r=\alpha \in I$
$s'-s=\beta \in I$
$\implies rs-r's'=rs-(r+\alpha)(s+\beta)= \underbrace{-r\beta}_{\in I}-\underbrace{\alpha s}_{\in I}-\underbrace{\alpha\beta}_{\in I}\in I$
So, multiplication and addition are well-defined
### Zero Element
$0+I=I$
$(0+I)+(r+I)=(0+r)+I=r+ I$
$0+I$ is the zero coset
$1+ I$ is the unity coset
$(1+I)\cdot (r+I)=(1\cdot r)+I=r+I$
Exercise: Show ring axioms hold in $R/I$
There is a surjective ring homomorphism

$$
\begin{aligned}
\pi:R\to R/I\\
\pi(r)=r+I
\end{aligned}
$$

Exercise: Show that $\pi$ is a surjective ring homomorphism and find $ker(\pi)$ (which should be $I$)
Given $I\rhd R \to R/I=\{\ r+I: r\in R\ \}$ is a quotient ring,
$0_{R/I}=I$, $1_{R/I}=1+I$
**Recall:** $r+I=s+I\iff r-s\in I$

$$
\begin{aligned}
\pi: R\to R/I \\
\pi(r)=r+I
\end{aligned}
$$

$\pi$ is a surjective homomorphism where $ker(\pi)=I$
**Remark:** If $R$ is a finite $R$, then $\underbrace{|I| \mid |R|}_{\text{Legrange theorem}}$ and $|R/I| = \frac{|R|}{|I|}$
**Examples:**
1. $R=\mathbb{Z}, I=3\mathbb{Z}$ , $\bar x$ means coset of $x, x+I$
$R/I=\mathbb{Z}/3\mathbb{Z} = \{\ \bar 0, \bar 1, \bar 2\ \}$ is a complete set of distinct coset representations

$$
\begin{aligned}
\def\arraystretch{1.5}
   \begin{array}{c|c|c|c}
   \cdot & \bar 0 & \bar 1 & \bar 2 \\
   \hline
   \bar 0 & \bar 0 & \bar 0 & \bar 0 \\
   \hline
   \bar 1 & \bar 0 & \bar 1 & \bar 2 \\
   \hline
   \bar 2 & \bar 0 & \bar 2 & \bar 1
\end{array}
\end{aligned}
$$

$$
\begin{aligned}
\def\arraystretch{1.5}
   \begin{array}{c|c|c|c}
   + & \bar 0 & \bar 1 & \bar 2 \\
   \hline
   \bar 0 & \bar 0 & \bar 1 & \bar 2 \\
   \hline
   \bar 1 & \bar 1 & \bar 2 &  \bar 0\\
   \hline
   \bar 2 & \bar 2 & \bar 0 & \bar 1
\end{array}
\end{aligned}
$$

1. $F[x]/\left\langle \ f(x)\  \right\rangle=\{\ \overline{ h(x)}: deg(h)<deg(f)\ \}$
Claim: this is a complete set of distinct cosets
**Proof:**
Fix a coset in $F[x]/\left\langle \ f(x)\  \right\rangle$ and pick any eleemnt in it, $g(x)$
By the division algorithm $g(x)=q(x)f(x)+r(x)$, where $r(x)=0$ or $deg(r)<deg(f)$
Now, $\bar g = \overline{q\cdot f +r} = \underbrace{\overline{qf}}_{=\ 0 \text{ b/c } qf\in \left\langle f \right\rangle} + \overline r \implies \bar g = \bar r$
WTS: They are distinct cosets
Suppose $h_1,h_2$ have degree smaller than f
If $\overline{h_1}=\overline{h_2}\implies h_1=h_2$ (Claim)
But, $deg(h_1(x)-h_2(x)) < deg(f)$ ← Exercise: prove this
However, $h_1(x)-h_2(x)= q(x)f(x)\implies h_1-h_2=0$
Because $deg(LHS)<deg(RHS)$
So, $h_1(x)=h_2(x)$ $\square$
**Remark:** In $F[x],\ deg(f(x)\pm g(x))\leq max\{\ deg(f),\ deg(g)\ \}$
$deg(f(x)\cdot g(x) ) \geq deg(f)+deg(g)$
Unless $f$ is $0$ or $g$ is $0$
2a. $F=\mathbb{Z}_2 = \{\ 0, 1\ \}$

$$
\begin{aligned}
\begin{rcases}
\mathbb{Z}_2[x]/\left\langle \ x^2+x+1\  \right\rangle= \{\ \bar 0, \bar 1,\bar x, \overline{x+1}\ \} \\
\mathbb{Z}_2[x]/\left\langle \ x^2+1\  \right\rangle= \{\ \bar 0, \bar 1,\bar x, \overline{x+1}\ \}
\end{rcases}
\end{aligned}
$$

Symbolically, they are the same, but cosets are different

Exercise: write addition and multiplication tables for these rings. Conclude their additive groups are isomorphic to $\mathbb{Z}_2 \times \mathbb{Z}_2$. Conclude that $\mathbb{Z}_2[x]/\left\langle \ x^2+x+1\  \right\rangle$ is a field and $\mathbb{Z}_2[x]/\left\langle \ x^2+1\  \right\rangle$ is not a field
How to determine the ring structure of $R/I$
## 1st Isomorphism Theorem
Suppose $f: R\to S$ is a ring homomorphism
Then, $R/\underbrace{kerf}_{Ideal of R} \cong \underbrace{Imf}_{\text{Subring of } S}$

$$
\boxed{\text{First Isomorphic thm: } R/kerf\cong Imf}
$$

Proof:
Define a homomorphism $g: R/ker(f)\to Im(f)$
$g(r+ker(f))= f(r)\in Im(f)$
First, show g is well defined
If $\bar r = \bar s,$ then

$$
g(\bar r ) = f(r)\text{ and }
g(\bar s) = f(s)
$$

$r-s\in ker(f)$
So, $r=s+\alpha$ for $\alpha \in ker(f)$
$f(r)=f(s+\alpha)= f(s)+f(\alpha)=f(s)$
Second, show g is a ring homomorphism ← Exercise
Next, show g is surjective

$$
\begin{aligned}
\begin{matrix}
R& \rightarrow {R/ker(f)}\xrightarrow{\text{\textasciitilde} g} & Im(f) \subseteq S\\
& & \\
R & \xrightarrow{f} & Im(f) \subseteq S
\end{matrix}
\end{aligned}
$$

Let $s \in Im(f),$ then $\exists \ r\in R\ s=f(r)$
So $g(\bar r)= f(r) = s$
So $g\in Im(g)$
Finally, we show $g$ is injective.

$$
\begin{aligned}
ker(g) = \{\ r+ker(f): g(r+ker(f))=0\ \} \\
= \{\ r+ker(f): f(r)=0 \ \} \\
= \{\ r+ker(f): r\in ker(f) \ \} =\ \{\ ker(f)\ \}
\end{aligned}
$$

So, $g$ in injective $\square$
**Example:**
1. $\mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}_n$
$f:\mathbb{Z}\rightarrow \mathbb{Z}_n,$ ← f surjective ring homomorphism $f(a)=a(mod\ n)$
st. $ker(f)=n\mathbb{Z}$
By 1st isomorphism theorem
$\mathbb{Z}/\underbrace{ker(f)}_{n\mathbb{Z}} \cong \underbrace{Im(f)}_{\mathbb{Z}_n}$
2. $F[x]/\left\langle \ x- \alpha \  \right\rangle \cong F$ ← $\alpha \in F$
Find a surjective ring homomorphism $f:F[x] \rightarrow F$
S.t. $ker(f) = \left\langle \ x-\alpha \  \right\rangle$
Conclude by 1st isomorphism theorem that $F[x]/\left\langle \ x-\alpha \  \right\rangle$ is isomorphic to $F$
**Examples:**
$F=\mathbb Q ,\ f(x)=x^2-2$
$\mathbb Q [x] / \left\langle \ x^2-2\  \right\rangle=\{\ \overline{a+bx}: a,b\in \mathbb Q\ \}$
How to determine the structure of $R/I$ ?
1st Isomorphism Theorem

$$
\begin{aligned}
F: R\to S\\ R/ker(s)\cong Im(f)
\end{aligned}
$$

Claim: $\mathbb Q [x] / \left\langle \ x^2-1 \  \right\rangle \cong \mathbb Q [\sqrt 2] \subseteq \mathbb{R}$
Lemma: Let $0\neq I \lhd F[x]$
Then, $I = \left\langle \ f(x)\  \right\rangle\iff f(x)\in I$ is of minimum degree
$f: \mathbb Q [x] \to \mathbb Q [\sqrt 2]$
$f$ is surjective and $ker(f) = \left\langle \ x^2 -2\  \right\rangle \overbrace\implies^{\text{1st Iso Thm}} \mathbb Q [x]/\left\langle x^2 -2 \right\rangle\cong \mathbb Q [\sqrt 2]$
$f(p(x))=p(\sqrt 2)$
$f(x^2 -2)= (\sqrt2)^2 -2=0$
**Example:**
$\mathbb{R} [x] / \left\langle \ x^2 +1\  \right\rangle\cong \mathbb C$
$f: \mathbb{R} [x]/\left\langle \ x^2 +1\  \right\rangle\to \mathbb C$
$f(p(x))=p(i)$
Ex. $f(-1+2x+3x^2-\frac{1}{\sqrt 2}x^3 )= -1 +2i+3i^2-\frac{1}{\sqrt2 }i^3=-4+(2+\frac{1}{\sqrt2}) i$
$ker(f) =$ (use the lemma!)
Exercise: Find ker(f)
$\mathbb{R}[x]/\left\langle \ x^2-1\  \right\rangle\cong \mathbb{R}\oplus \mathbb{R}$
When is $R/I$ a field?
1. If $R$ is commutative, then so is $R/I$
(Exercise: Give an example of a homomorphism R st. $R/I$ is commutative)
2. When is every element of $R/I$ a unit?
### Maximal Ideal
**Definition:** We say $I \rhd  R$ is a maximal ideal if there is no proper ideal strictly containing $I$
Equivalently, $I\subseteq J \lhd R\implies I=J$
**Example:** 
F - Field $\implies \{\ 0\ \} \lhd f$ is maximal
Suppose that $\{\ 0\ \} \subseteq I \lhd F$
If $\exists\ 0 \neq x \in J$, then $1 = x^{-1}\cdot x \in J \to J$ is improper
It follows that $\{\ 0\ \}$ is maximal
**Theorem:** If $R$ is a commutative ring and $I \rhd R$
$R/I$ is a field $\iff I$ is a maximal  ideal
$I$ is maximal if $\forall \ I \subseteq J \lhd R\implies I = J$
Note: Proof in lecture 18/19 will add later
**Example:**
$R=\mathbb{Z}$, every ideal takes the form $\underbrace{n\mathbb{Z}}_{n\neq 1}$, $n\in \mathbb{Z}_{\geq 0}$
If $n$ is not prime, then it has a proper factor $1< m<n$.
Then, $n=k\cdot m,\ k\in \mathbb{Z}$
So $n\mathbb{Z}\subset m\mathbb{Z},$ (proper subset because $m$ is not divisible by $n$ $\implies n\mathbb{Z}$ is not maximal
Equivalently, if $n\mathbb{Z} \lhd \mathbb{Z}$ is maximal then $n$ is prime
Conversely, if $n=p$ is prime, then
$\implies \mathbb{Z}/p\mathbb{Z}\cong \mathbb{Z}_p \text{ is a field}$
$\implies \mathbb{Z}/p\mathbb{Z}\ \text{ is a field}$
$\implies p\mathbb{Z}\lhd \mathbb{Z} \text{ is maximal}$
In $\mathbb{Z},$ $n\mathbb{Z} \lhd \mathbb{Z} \text{ is maximal } \iff \mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}_n \text{ is a field }\iff n\text{ is prime}$
**Example:**
$R=\mathbb{Z}_6$ Lattice of proper ideals

$$
\begin{aligned}
\{\ 0, 3\ \}=\begin{matrix}
& \mathbb{Z}_6 &  \\
\phantom{111}\diagup& &\diagdown\phantom{111} \\
\left\langle \ 3\  \right\rangle &  & \left\langle \ 2\  \right\rangle \\
 \phantom{111}\diagdown& &\diagup  \phantom{111}\\
& \{\ 0\ \}&
\end{matrix}= \{\ 0, 2,4\ \}
\end{aligned}
$$

$\left\langle \ 2\  \right\rangle, \left\langle \ 3\  \right\rangle\lhd \mathbb{Z}_6 \text{ are maximal }$

$$
\begin{aligned}
\begin{rcases}
\mathbb{Z}_6/\left\langle \ 2\  \right\rangle\cong \mathbb{Z}_2 \\
\mathbb{Z}_6/\left\langle \ 3\  \right\rangle\cong \mathbb{Z}_3
\end{rcases} \text{ 1st Isomorphism Theorem}
\end{aligned}
$$

**Example:**
$R=\mathbb{Z}_2\oplus \mathbb{Z}_2= \{\ (0,0),\ (1,0),\ (0,1),\ (1,1)\ \}$

$$
\begin{aligned}
\text{Lattice of add subgroups}\\
\begin{matrix}
& \mathbb{Z}_2\oplus \mathbb{Z}_2 &  \\
\phantom{111}\diagup& |&\diagdown\phantom{111} \\
\left\langle \ (1,0)\  \right\rangle & \left\langle \ (1,1)\  \right\rangle & \left\langle \ (0,1)\  \right\rangle \\
 \phantom{111}\diagdown&| &\diagup  \phantom{111}\\
& \{\ 0\ \}&
\end{matrix}
\end{aligned}
$$

$$
\begin{aligned}
\text{Lattice of Proper Ideals}\\
\begin{matrix}
& \mathbb{Z}_2\oplus \mathbb{Z}_2 &  \\
\phantom{111}\diagup& &\diagdown\phantom{111} \\
\left\langle \ (1,0)\  \right\rangle &  & \left\langle \ (0,1)\  \right\rangle \\
 \phantom{111}\diagdown& &\diagup  \phantom{111}\\
& \{\ 0\ \}&
\end{matrix}
\end{aligned}
$$

**Example:**
$R=\mathbb{Z}$

$$
\text{Lattice of Proper Ideals}
$$

![[proper_ideals.png]]
$F[x],\ F$ is a field, is a PID.
What are the maximal ideals?
What are the fields obtained as quotient / homomorphic images of $F[x]$?
$I\rhd F[x],$ then $I=\left\langle \ f(x)\  \right\rangle$
**Remark:**
1. $\left\langle \ f(x)\  \right\rangle= F[x]\iff f(x) \text{ is a unit} \iff f(x)\text{ is a non-zero scalar}$
2. $\left\langle \ f(x)\  \right\rangle= \left\langle \ g(x)\  \right\rangle \iff f(x)=u\cdot g(x)\text{ for } u\in F[x]^x \iff f(x)=\alpha \cdot g(x) \text{ for } \alpha \neq 0 \text{ scalar}$
3.

$$
\begin{aligned}
\left\langle \ f(x)\  \right\rangle \subseteq \left\langle \ g(x)\  \right\rangle\iff g(x) \mid f(x),\\ \text{ namely }\exists\ q(x) \in F[x]:f(x)=q(x)\cdot g(x)
\end{aligned}
$$

# ➗ Irreducibility
**Definition:** We say that $f(x)\neq \text{ scalar } \in F[x]$ is irreducible if for any $g(x)\in F[x]$ such that $g(x)\mid f(x),$ either $g(x)=\alpha$ is scalar or $g(x)=\alpha \cdot f(x)$ for a scalar $\alpha \neq 0$
**Definiton:** $g(x) \text{ divides } f(x),\ g(x) \mid f(x) \text{ if } \exists \ q(x)\in F[x]\ st. \ f(x)=g(x)\cdot q(x)$
We say $g(x)$ is a proper divisor of $f(x)$ if $g(x)\mid f(x)$ and $g(x)\neq \text{scalar and }g(x)\neq \alpha \cdot f(x),\ \alpha \in \mathbb{R}$
**Example:**
$f(x)=x^2 -1 \in \mathbb{R}[x]$
- $\underbrace{(\frac{1}{2}x^2+\frac{1}{2})}_{g}\underbrace{(-2)}_h=\underbrace{x^2-1}_f$ $g,h$ are not proper ideals
- $x^2 -1=\underbrace{(x-1)}_p\underbrace{(x-1)}_q$ $p,\ q$ are proper divisors
**Remark:** $g\mid f$ is a proper divisor $\iff 0<\text{deg(g)}< \text{deg(f)}$
**Proof:**
$\impliedby 0 <\text{deg(g)} <\text{deg(f)}\implies g\neq \alpha \cdot f\text{ as } (\alpha \cdot f)=\text{deg(f)}$
$\implies \text{deg(g)} > 0$ ← $g$ is a proper divisor
If $\text{deg(g)=deg(f)},$ then$f(x)=g(x)\cdot q(x)\implies \text{deg(q(x))}=0 \implies q(x)=\alpha \in \mathbb{R}$
This is a contradiction since $g$ is a proper divisor $\square$
**Dictionary:**
$I=\left\langle \ f(x) \  \right\rangle\lhd F[x],\ J=\left\langle \ g(x)\  \right\rangle\lhd F[x]$

$$
\begin{aligned}
\text{Dictionary} \\
\def\arraystretch{1.7}
   \begin{array}{c | c}
   I\rhd R & F[x] \\ \hline
   I=0 & f(x)=0  \\
   \hline
   I=R & f(x) \text{ is a non-zero scalar} \\
\hline
   I\lhd R\text{ (proper) } & \text{ deg( f(x) ) > 0} \\
\hline
 I\subseteq J & g(x) \mid f(x) \\
\hline
   I= J & g(x) =\alpha \cdot f(x),\alpha \in \mathbb{R},\alpha \neq 0 \\
\hline
   I\subset J & g(x) \mid f(x)\text{, but }g(x)\neq \alpha \cdot f(x) \\
\hline
   I\subset J \lhd R \text{ (proper) } & g(x) \mid f(x),g(x)\neq \alpha \cdot f(x), g(x)\text{ not a scalar }\\ &\iff g(x) \text{ is a proper divisor of } f(x) \\
\hline
   I\lhd R \text{ (maximal) } & f(x)\text{ has no proper divisors (irreducible)} \\
\end{array}
\end{aligned}
$$

**Corollary:**
TFAE: $(0\neq f(x)\in F[x]$
1. $f(x)$ is irreducible
2. $f(x)$ has no divisors $g(x)\mid f(x)$ of $0<\text{deg(g)}<\text{deg(f)}$
3. $\left\langle \ f(x)\  \right\rangle\lhd F[x]$ is maximal
4. $F[x]/\left\langle \ f(x)\  \right\rangle$ is a field
**Example:**
Over any field $F$, any linear polynomial $f(x)=ax+b,\ a\neq 0$ is irreducible
If $g(x)\mid f(x),\ \deg g \leq \deg f = 1$ so $\deg g = \{ 0, 1 \}$, so it cannot be proper
Also, $F[x]/\left\langle \ ax+b\  \right\rangle\cong F$
$1^{st}$ Isomorphism Theorem:

$$
\begin{aligned}
\phi: F[x]\to F \\ \phi(f(x))= f(-\frac{b}{a})
\end{aligned}
$$

A surjective ring homomorphism with $\ker \phi = \left\langle \ ax+b\  \right\rangle= \braket{\ x- (-\frac{b}{a})}$
**Theorem:**
Let $f(x)\in F[x], \alpha \in F,$ Then, $f(\alpha )=0\iff x-\alpha \mid f(x)$
**Proof:**
$\impliedby x-\alpha \mid f(x), \text{ then } \exists\ q(x) \in F[x]\ st. f(x)=q(x)(x-\alpha)$
So, $f(\alpha)=q(\alpha )(\alpha -\alpha ) =0$ so, $\alpha$ is a root of $f$
$\implies$ Suppose $f(\alpha ) = 0$, $\exists\ q,r\in F[x] \ st. \ f(x)=q(x)(x-\alpha )+r(x) \implies \deg(r)<\deg(x-\alpha )=1,$ so $r(x)=\beta$ a scalar
Substitute $x=\alpha$
$0=f(\alpha)=q(\alpha)(\alpha -\alpha)+\beta \implies\beta = 0 \implies f(x)=q(x)(x-\alpha)$
Thus, $(x-\alpha ) \mid f(x)$ $\square$
**Example:**
$f(x)=x^3-2z+1\in \mathbb{R}[x]$
$f(1)=0$
$x^3-2x+1=(x^2+x-1)(x-1)$
**Corollary:**
If $f(x)$ is a polynomial of degree $> 1$ and $f(x)$ has a root in $F$ then $f(x)$ is not irreducible. Equivalently, if $f$ is irreducible with $\deg(f)>1,$ then $f$ has no roots.
Warning! The converse is not true (in general)
$f(x)=x^4 +3x^2+2$ has no roots over $\mathbb{R}$ but it is reducible. $f(x)=(x^2+1)(x^2-2)$
**Corollary:**
Let $f(x)\in F[x]$ st. $\deg f=n$, then $f$ has at most $n$ roots
**Proof:**
Induction on $n$
Base Case: $n=1$
$f(x) = ax+b,\ a\neq 0$
$ax+b\iff x=-\frac{b}{a}$ so there is $1$ root
Inductive step:
$\deg f = m+1$
If $f$ has no roots, trivial
Suppose $f(\alpha)=0,$ then $f(x)= q(x)(x-\alpha)$
$\deg q = m$ so $q(x)$ has at most $m$ roots.
Let $\beta \in F$ be an arbitary root of $f$
$0= f(\beta)=\underbrace{q(\beta)}_{\in \ F} \underbrace{(\beta - \alpha )}_{\in\ F}$ so
Either

$$
\begin{aligned}
\begin{cases}
\ q(\beta)=0 \\
\ \beta - \alpha = 0
\end{cases}
\end{aligned}
$$

Thus, there are at most $m+1$ roots $\square$
**Lemma:**
If $f(x)\in F[x] \ st.\ f(x)$ is non constant $\deg f(x)\leq 3$ then $f$ has a root $\iff f$ is not irreducible
**Example:**
$f(x)=x^2 +x+1\in \mathbb{R}[x]$
$deg(f)=2$
$\Delta = b^2 -4ac = -3 < 0 \implies f$ has no roots
$f$ has no roots in $\mathbb{R}$ but it has roots in $\mathbb C$
$F$ - Field
$F[x] / \left\langle \ f(x)\  \right\rangle$ is a field $\iff f(x)$ is irreducible, $f(x)$ cannot be written as $f(x)=g(x)h(x)$
$x+1=(\frac{1}{2}x+\frac{1}{2})\cdot 2$ in $\mathbb{R}$ is not proper
**Recall:**
- Linear polynomials are always irreducible
- If $f(x)$ of $\deg f > 1$ and $\exists \ \alpha \in F: f(\alpha) = 0\implies f(x) \text{ is reducible }$
- If $\deg f\in \{\ 2, 3\ \}$, then $f$ irreducible $\iff f$ has no roots in $F$.
Not necessarily true for $\deg f \geq 4$
**Remark:**
Being irreducible depends on the field.
$x^2 +1$ is irreducible in $\mathbb{R} [x]$ but is reducible in $\mathbb{C}[x]$
**Examples:**
1. $x^2+x+1$ in $\mathbb{Z}_2[x]$
$\deg f=2,\ f(0) = 1, f(2)=1$ so irreducible
2. $x^2 +x+1$ in $\mathbb{Z}_3[x]$
$f(0)=1,\ f(1)=0\implies x\cdot 1 \mid f(x)$

$$
\begin{aligned}
\begin{array}{r}
x+2\phantom{1111} \\
x-1{\overline{\smash{\big)}\,x^2+x+1}} \\
\underline{-(x^2-x)} \phantom{111}\\
2x+1\phantom{} \\
\underline{-(2x-2)}\phantom{} \\
3\\
3_{mod\ 3}=0
\end{array}
\end{aligned}
$$

So, $x^2 +x+1 = (x+2)^2$
3. $x^2 +2x+1 \text{ in } \mathbb{Z}_3$ ← Exercise
4. $f(x)=x^4+x^2 +x+1\text{ in } \mathbb{Z}_3$ ← Exam Question?
Has no roots but $\deg f = 4$ so may still be reducible ← $f=g\cdot h$

$$
\begin{aligned}
\text{Possible Degrees}\\
\begin{rcases}
\cancel{(1)(3)} \\
(2)(2) \\
\cancel{(3)(1)} \\
\end{rcases}\implies (1)(3),\ (3)(1)
\end{aligned}
$$

 Impossible because f has no roots
It remains to check if $f=g\cdot h$ with $\deg g,h=2$
$x^4+x^2+x+1=(a_1x^2+b_1x+c_1)(a_2x^2+b_2x+c_2)$
$= \underbrace{a_1a_2}_{=\ 1}x^4+(\cdots)x^3+\cdots$
$= (x^2+b_1x+c_1)(x^2+b_2x+c_2)$

$$
=x^4+\underbrace{(b_1+b_2)}_{=\ 0}x^3+
\underbrace{(c_2+b_1b_2+c_1)}_{=\ 1}x^2+
\underbrace{(b_1c_2+c_1b_2)}_{=\ 1}x+
\underbrace{c_1c_2}_{=\ 1}
$$

$\implies b_1=b_2,\ c_2=\frac{1}{c_1}$
$= (x^2+bx+c)(x^2-bx+\frac{1}{c})$
$= x^4+(c-b^2+\frac{1}{c})x^2+(\frac{b}{c}-cb)+1$

$$
\begin{aligned}
\begin{cases}
c-b^2+\frac{1}{c}=1 \implies \\
\frac{b}{c}-cb=1\implies \left( b = \cfrac{1}{\cfrac{1}{c}-c}\right),\ c\neq 0,1,2

\end{cases}
\end{aligned}
$$

So there is no solution. Thus, $f$ is irreducible
1. $x^4+1$ in $\mathbb Q[x]$
$f=g\cdot h\implies \text{possible degrees: (1)(3), (2)(2), (3)(1)}$
Check if $f$ has a root
$x^2 +1\geq 1$, so $f$ has no real roots
So, $\deg g,h =2$
$x^4+1=(x^2+ax+b)(x^2+cx+d)$
$= x^4 + \underbrace{(c+a)}_{=\ 0}x^3+\underbrace{(d+ad+b)}_{=\ 0}x^2 +\underbrace{(ad+bc)}_{=\ 0}x+\underbrace{bd}_{=\ 1}$

$$
\begin{aligned}
\begin{cases}
\frac{1}{b}-a^2+b=0 \\
a\cdot \frac{1}{b}-ba=0

\end{cases} \implies a=0 \implies \frac{1}{b}=0 \\
\implies 1+b^2=0 \implies b=\frac{1}{b} \\
\implies \frac{1}{b}-a^2+b=0 \implies 2b-a^2=0 \\
\implies a^2=2b \implies a^2=-2 \text{ or } a^2 = 2 \\
\implies \text{ Impossible in }\mathbb Q
\end{aligned}
$$

Thus, $x^4 + 1$ is irreducible over $\mathbb Q$
However, $x^4+1$ is reducible over $\mathbb{R}$
$a=\sqrt2, b=1$, $(x^2+\sqrt 2x+1)(x^2-\sqrt 2x+1)=x^4+1$
**Note:** a polynomial has a linear factor $\iff$ it has a root
Which polynomials are reducible over $\mathbb C?$
## Fundamental Theorem of Algebra
If $f(x)\in \mathbb C [x]$ and $f$ is non-constant, then $f$ has $f(x)$ has a complex root
**Corollary:**
1. $f(x)\in \mathbb C[x] \text{ is irreducible } \iff f(x)\text{ is linear}$
**Proof:**
$\impliedby \text{ always true}$
$\implies \text{By FTA, } \exists\ \alpha \in \mathbb C:f(\alpha ) = 0$ and we know an irreducible polynomial cannot have a root unless it is linear
2. If $f(x)\in \mathbb C[x], f$ is non-constant, $\deg f = n$, then:
$f(x)=c(x\alpha_1)(x-\alpha_2)\cdots(x-\alpha_n)\text{ for some } c_1\alpha _1, \cdots c_n\alpha_n\in \mathbb C$
**Example:**
$f(x)=x^3-1 \in \mathbb{R}[x]$ has a real root but it doesn’t split into 3 linear factors
$x^3-1=(x-1)(x^2+x+1)$
**Proof:**
Induction on $n$
Base case, $n=1$:
$f(x)=ax+b=\underbrace a_ c(x-(-\frac{b}{\underbrace{c}_\alpha}))$
Inductive Step:
$\deg f= n+1$
By FTA, $\exists$ root of f, call it $\alpha _{n+1} \in \mathbb C$
So, $f(\alpha _{n+1})=0\text{ and } x-\alpha_{n+1} \mid f(x)$
Thus, $\exists\ g(x)\in \mathbb C [x]\ st.\ f(x)=g(x)(x-\alpha_{n+1})$
Then, $\deg g = n$ and by the inductive hypothesis $g(x)=c(x-\alpha_1)\cdots(x-\alpha_{n+1})$ because $f(x)=c(x-\alpha_1)\cdots(x-\alpha_n)(x-\alpha_{n+1})$
**Corollary:**
A polynomial over $\mathbb C[x]$ is irreducible $\iff$ it is linear
**Theorem:**
Let $f(x)\in \mathbb{R}[x]$ and $f$ is non-constant, Then, $f(x)=c(x-\beta_1)\cdots (x-\beta_x)\underbrace{q_1(x)\cdots q_m(x)}_{\text{polynomials of deg 2}}$
So, irreducible polynomials over $\mathbb{R}$ have $\deg \in \{\ 1,2 \ \}$
Reminder: For $z\in \mathbb C$, if $z=x+iy,$ then $\bar z=x-iy$ and $\overline{z_1+z_2}= \bar z_1+\bar z_2,\ \overline{z_1z_2}=\bar z_1\bar z_2$
$z=\bar z \iff z=x$
**Proof:**
Let $f(x)=a_nx^n+\cdots +a_1x+a_0\in \mathbb{R}[x],\ n\geq 1$
In particular, $f(x)\in \mathbb C [x]$
By corollary of FTA,
$f(x)=c(x-\alpha_1)\cdots(x-\alpha_n)$
$\alpha_1,\cdots,\alpha_n\in \mathbb C, C\in \mathbb{R}$ for any $\alpha_i \in \mathbb C$
$f(\alpha_i)=0=a_n\alpha_i^n+\cdots + a_i\alpha _i+a_0$
Applying Conjugation,

$$
\begin{aligned}
0=\bar 0= \overline{a_n\alpha_i^n+\cdots +a_i\alpha_i +a_0}\\
=\bar{a_n}\bar \alpha _i^n+\cdots +\bar a_1\bar \alpha _i+\bar a_0 \\
=a_n\bar \alpha_i^n+\cdots +a_1\bar \alpha_i+a_0=f(\overline \alpha_i)
\end{aligned}
$$

So, if $f(\alpha_i)=0,$ then $f(\bar \alpha_i)=0$
We know $f(x)=a_n(x-\alpha_1)\cdots(x-\alpha_n)\in \mathbb C$
$\forall \ 1\leq i\leq n,$ $\exists\ j\ st.\ \alpha_j=\overline \alpha_j$
Either $i=j \implies a_i\in \mathbb{R}$
or $i\neq j\implies \alpha_i =\overline \alpha _j$

$$
f(x)=a_n\underbrace{(x-\beta_1)\cdots(x-\beta_k)}_{\in\ \mathbb{R}}\underbrace{(x-\overline \gamma_1)\cdots(x-\gamma_m)(x-\overline \gamma_m)}_{\in \ \mathbb C}
$$

For every $1\leq i \leq m$,
$(x-\gamma_i)(x-\overline\gamma_i)=x^2-\underbrace{(\gamma_i+\overline\gamma_i)}_{\in\ R}+\underbrace{\gamma_i\overline \gamma_i}_{\in\ \mathbb{R}}=q_i(x) \square$
**Example:**
$f(x)=x^4-x^2+1\in \mathbb{R}[x]$
Let $t=x^2$
$t^2-t+1\implies t=\frac{1}{2}\pm \frac{\sqrt 3}{2}i$
Over $\mathbb C,$ $f(x)=(x^2-(\frac{1}{2}+\frac{\sqrt3}{2}i))(x^2-(\frac{1}{2}-\frac{\sqrt3}{2}i))$
$\sqrt{\frac{1}{2}+\frac{\sqrt3}{2}i}$ ← Convert to polar using $r e^{i\theta}\ r=1, \ \theta =\frac{\pi}{3}$
$=\pm e^{\frac{\pi}{6}i}$
$\sqrt{\frac{1}{2}-\frac{\sqrt3}{2}}=\pm e^{-\frac{\pi}{6}i}$

$$
\begin{aligned}
f(x)=(x-e^{\frac{\pi}{6}i})(x+e^{\frac{\pi}{6}i})(x-e^{-\frac{\pi}{6}i})(x+e^{-\frac{\pi}{6}i})\\
=(x-e^{\frac{\pi}{6}i})(x-e^{-\frac{\pi}{6}i})(x+e^{\frac{\pi}{6}i})(x+e^{-\frac{\pi}{6}i})\\
=(x^2-(e^{\frac{\pi}{6}i}+e^{-\frac{\pi}{6}i})x+1)(x^2+(e^{\frac{\pi}{6}i}+e^{-\frac{\pi}{6}i})x+1)\\
=(x^2-2\cos\frac{\pi}6x+1)(x^2+2\cos\frac{\pi}6x+1)\\
=(x^2-\sqrt 3x+1)(x^2+\sqrt 3x+1)
\end{aligned}
$$

# ↔️ Field Extensions
Over $\mathbb C$, $p(x)=c(x-\alpha_1)\cdots(x-\alpha_n)$
Definition: A field extension is $\phi:F\to K$ where $\phi$ is an injective ring homomorphism and $F\subseteq K$
Exercise: If F is a field and $\phi$ is any ring homomorphism, then $\phi$ is injective
**Examples:**
1. $\mathbb Q\subseteq \mathbb{R}$
2. $\mathbb{R} \subseteq \mathbb C$
3. $\mathbb Q \subseteq \mathbb Q[\sqrt 2]$
4. If $F$ is a field and $f(x)$ is an irreducible polynomial then $\underbrace{F[x]/f(x)}_{\text{field}} = \{\ \overline{h(x)}: \deg h < \deg f\ \}$

$$
\begin{aligned}
\phi: F \to F[x]/\left\langle \ f(x)\  \right\rangle \\
\phi(a)=\overline a = a+\left\langle \  f(x)\  \right\rangle
\end{aligned}
$$

$\phi$ is an injective ring homomorphism
5. $F=\mathbb Q,\ f(x)=x^2-2$
$\phi:\mathbb Q\to \underbrace{\mathbb Q[x]/\left\langle \ x^2-2\  \right\rangle}_k=\{\ \overline{a+bx}:\ a,b\in \mathbb Q\ \}$
$\phi(a)=\bar a$
Consider $f(\lambda)=\lambda ^2-2$
$f(\lambda)\in \mathbb Q[\lambda],f(\lambda)$ is irreducible
But, $f(\lambda)\in K[\lambda]$ irreducible and has a root
$\mathbb Q[x]/\left\langle \ x^2-2\  \right\rangle=K\cong\mathbb Q[\sqrt 2]$
$\psi:Q[x]\to \mathbb Q[\sqrt 2]$
$\psi(p(x))=p(\sqrt2)$
$(\overline x)^2-\overline 2= \overline x\cdot \overline x-\overline 2 = \overline{x^2-2} = \overline 0$
So, if $f(\lambda)$ is irreducible then in the field $K=F[x]/\left\langle \ f(x)\  \right\rangle$ $,\ f(\lambda)$ has a root $\overline x$
$\lambda ^2 -2$ factorization over $K$
$\lambda ^2 -2=(\lambda-\overline x)(\lambda +\overline x) = (\lambda-\sqrt 2)(\lambda +\sqrt x)$
6. $\mathbb Q[ \sqrt[3]{2}]=\{\ a+b\sqrt[3]{2} +c\sqrt[3]{4}:a,b,c\in \mathbb Q\ \}\subseteq \mathbb{R}$ is a field
$\mathbb Q[\sqrt[3]{2}]\cong \mathbb Q[x]/\left\langle \ x^3-2\  \right\rangle$
**Proof:**
Using the $1^{\text{st}}$ Isomorphism Theorem,

$$
\begin{aligned}
\phi:\mathbb Q[x]\to \mathbb Q[\sqrt[3]{2}]\\
\phi(p(x))=p(\sqrt[3]{2})
\end{aligned}
$$

$x^3-2\in \ker \phi$
$\left\langle \ x^3-2\  \right\rangle\subseteq \ker \phi$
Claim: they are equal
Notice that $\sqrt[3]{2} \notin \mathbb Q$ so $x^3-2$ has no roots in $\mathbb Q$.
It is of $\deg 3$, thus it is irreducible
Consequently, $\left\langle \ x^3-2\  \right\rangle$ is maximal
Hence, $\left\langle \ x^3-2\  \right\rangle =\ker \phi$
So, $\mathbb Q[x]/\left\langle \ x^3-2\  \right\rangle =\mathbb Q[x]/\ker \phi \cong Im \phi = \mathbb Q[\sqrt[3]{2}]$
$f(\lambda)=\lambda ^3 -2$ irreducible over $\mathbb Q$ but it is reducible over $K$ because it has a root
$\implies \lambda - \sqrt[3]{2}\mid \lambda ^2-2$ over $K$

$$
\begin{aligned}
\begin{array}{r}
\lambda^2+\sqrt[3]2\lambda\phantom{11111111111} \\
\lambda-\sqrt[3]2\phantom{1}{\overline{\smash{\big)}\,\lambda^3-2\phantom{11111111111111}}} \\
\underline{-(\lambda^3-\sqrt[3]2\lambda^2)} \phantom{1111111111}\\
\sqrt[3]2\lambda^2-2\phantom{1111-1} \\
\underline{-(\sqrt[3]2\lambda^2-\sqrt[3]4\lambda)}\phantom{1111} \\
\sqrt[3]4\lambda-2\phantom{-11}\\
\underline{\sqrt[3]4\lambda-\sqrt[3]4 \sqrt[3]4\phantom{}}\\
0

\end{array}
\end{aligned}
$$

We have a factorization over $K$
$\lambda ^3-2=(\lambda -\sqrt[3]{2})(\lambda^2+\sqrt[3]{2}\lambda +\sqrt[3]4)$
$\mathbb Q\to \mathbb Q[x]/\left\langle \ x^3-2\  \right\rangle \cong K\to L=K[y]/\underbrace{\left\langle \ y^2+\sqrt[3]2+\sqrt[3]4\  \right\rangle}_{\text{irreducible over }K}$
$(\lambda -\sqrt[3]2)(\lambda^2+\sqrt[3]2+\sqrt[3]4)$

**Theorem:**
Let $f$ be a polynomial over $F$, then $\exists$ field $F\to K$ st. over $K,\ f(\lambda)=c(\lambda-\alpha_1)\cdots (\lambda-\alpha_n)$ splits
In $L,\ \lambda ^3 -2$ splits
---
Field Extension: $\phi \to K,$ $K$ extends F

$$
\begin{aligned}
K=F\to K \\ \phantom{00111}\phi \mapsto \overline \phi
\end{aligned}
$$

Recall from Linear Algebra:
$F-\text{ Field}$
$V-\text{ Vector Space}$: abelian group with scalar multiples
$\underbrace{\alpha}_{\in F} \cdot \underbrace{v}_{\in V} \in V$
An important case:
If $F\to K$ is a field extension, then $K$ becomes an $F-\text{Vector Space}$
Given, $\alpha \in F,\ v\in K$ define scalar multiple by
$\alpha \cdot v \colonequals \phi(\underbrace{\alpha}_{\in\ K})\cdot \underbrace{v}_{\in\ K}\in K$
**Examples:**
1. $F=\mathbb{R},\ k=\mathbb C,\ \mathbb{R} \subset \mathbb C$ is a field extension
$\mathbb C$ is a vector space over $\mathbb R,$ $\mathbb C$ has vectors while $\mathbb{R}$ has scalars
$1+i\in \mathbb C,\ -\frac{1}{2} \subset \mathbb{R}$
$(\frac{1}2 )(1+i)= -\frac{1}2 -\frac{1}2 i \in \mathbb C$
2. $F-\text{Field}$, $f(x)\in F[x]$ is irreducible
$K=F[x]/\left\langle \ f(x)\  \right\rangle$

$$
\begin{aligned}
\phi: F\to K\\ \phantom{111} \alpha \mapsto\alpha +\left\langle \ f(x)\  \right\rangle= \overline \alpha
\end{aligned}
$$

$\underbrace{\alpha}_{\in \ F} \cdot \underbrace{\overline{p(x)}}_{\in\ K} = \alpha p(x) \in K$
For instance:
$F=\mathbb{Z}_3,\ f(x)=x^2+1$
$K=\mathbb{Z}_3[x]/\left\langle \ x^2+1\  \right\rangle=\{\ \bar 0, \bar 1,\bar 2, \bar x,\overline{x+1},\overline{x+2},\overline{2x},\overline{2x+1},\overline{2x+2}\ \}$
$\underbrace{2}_{\in\ \mathbb{Z}_3}\cdot \underbrace{\overline{2x+1}}_{4\equiv 1(\text{mod }3)}=\overline{2(2x+1)}=\overline{x+2}$
**Recall:**
If $V$ is a vector space over a field $F$, then it has a basis $B$. ($B$ is linearly independent and it spans $V$).
If $|B|<\infin,\ \dim_F V=|B|$
$B=\{\ e_1,\cdots ,e_n\ \},$ then every $v\in V$ can be uniquely represented as $v=\alpha _1e_1+\cdots +\alpha _n e_n,$ $\alpha _i\in F$
There is a bijective correspondence

$$
\begin{aligned}
V\longleftrightarrow F\\
v\longleftrightarrow  (\alpha_1,\cdots, \alpha_n)
\end{aligned}
$$

**Examples:**
1. $\mathbb{R}\subset \mathbb C$
$B=\{\ 1,i\ \}\implies \dim_\mathbb{R} \mathbb C=2$

$$
\begin{aligned}
\mathbb C \xleftrightarrow{1:1}\mathbb{R}^2\\
a+bi\longleftrightarrow (a,b)
\end{aligned}
$$

2. $F-\text{Finite Field, } V-\text{Vector Space over } F$
$\dim_F V=n$
$V\xleftrightarrow{1:1} F^n$
$|V|=|F^n|=|F|^n$
If $|F|=q,$ then $|F^n|=q^n=|V|$
### Characteristics of a Field
$F-\text{Field}$
$1=1_F$
$1,1+1,1+1+1,\cdots$
If all these elements are distinct, then $\text{char}(F)=0$
$\text{char}(\mathbb Q)=0$
$\text{char}(\mathbb R)=0$
$\mathbb{Z}_3=\{\ 0,1,2\ \}$
$\text{char} (F)=\min\ \{\ r\in \mathbb N:1_F+\cdots+1_F=0_F \}$
So, $\text{char}(\mathbb{Z}_p)=p$
$\mathbb{Z}_3[x]/\left\langle \ x^2+1\  \right\rangle=K$
$1_F=\overline 1,\ \overline 1,\  \overline 1+\overline 1=\overline 2,\ \overline 1+\overline 1+\overline 1=\overline 0$, $\text{char}(K)=3$
If $F$ is a field with $\text{char}(F)=p,\ p\neq 0,$ then it is an extension of $\mathbb{Z}_p$
Namely, there is a homomorphism

$$
\begin{aligned}
\phi: \mathbb{Z}_p\to F\\ \phi(0)=0_F,\phi(1)=1_F,\phi(2)=1_F+1_F, \\ \phi(p-1)=1_F+\underbrace{\cdots}_{p-1}+1_F
\end{aligned}
$$

Does not work unless $\text{char}(F)=p,$
$F=\mathbb{R},\ \phi:\mathbb{Z}_3 \not\to \mathbb{R},\ \phi(0)=0,\ \phi(1)=1,\ \phi(2)=2$
$3=1+2=\phi(1)+\phi(2)=\phi(1+2)=\phi(3)=\phi(0)=0$
Suppose that $F$ is a finite field.
$\text{char}(F)\neq 0$
$\underbrace{1_F+\cdots+1_F}_{m}=\underbrace{1_F+\cdots+1_F}_{m+r}\implies \underbrace{1_F+\cdots+1_F}_{r}=0_F$
So finite fields have characteristic $>0$ and prime
**Proposition:**
F is a field, either $\text{char}(F)=0 or \text{char}(F)=p,\text{prime}$
**Proof:**
Suppose $\text{char}(F)=r>0$,
Assume to the contrary that $r$ is composite, $r=m_1\cdot m_2$
$(\underbrace{1_F+\cdots+1_F}_{m_1})\cdot(\underbrace{1_F+\cdots+1_F}_{m_2})= \underbrace{1_F+\cdots+1_F}_{m_1\cdot m_2}=0_F$
Since $F$ is a field, it has no zero-divisors
So either $\underbrace{1_F+\cdots + 1_F}_{m_1}=0_F$ or $\underbrace{1_F+\cdots + 1_F}_{m_2}=0_F$
Contradiction in either case becasue $m_1, m_2 < r.\ \  \square$
**Summary:**
1. $F\text{ finite}\implies \text{char}(F)\neq 0$
2. $\text{char}(F)\text{ is } 0 \text{ or }p, \text{ prime }$
3. If $\text{char}(F)=p,\ \mathbb{Z}_p\to F$
$F$ finite field $\implies \mathbb{Z}_p\to F$ for $\text{char}(F)=p$
So, $F$ is a vector space over $\mathbb{Z}_p$
Since $F$ is finite, $\dim_{\mathbb{Z}_p}F=n<\infin$
$F\xleftrightarrow{1:1}\mathbb{Z}_p$
$|F|=|\mathbb{Z}_p^n|=p^n$
**Corollary:**
If $F$ is a finite field, then $|F|=p^n$ for $p$ prime
**Reminder:** If F is a finite field, then $|F|=p^n$, $p=\text{ char} (F)$ (prime), $n\in N$
( Idea: $\mathbb{Z}_p\to F,\ F$ is a $\mathbb{Z}_p-$ vector space so $|F|=|\mathbb{Z}_p^n|=p^n$
$\text{char }(F)= \text{min}\{\ r\mid 1_F\ \underbrace{+\cdots +}_r\  1_F=0_F\}$
Goal: If $p$ - prime, $n\in \mathbb{N}$ then $\exists\ F$ - field, $|F|=p^n$
**Lemma:** If $F$ is a field, $\text{char} (F)=p$ (\>0) then,
$\forall a,b\in F:$

$$
\begin{aligned}
\begin{cases}
(a\cdot b)^{p^i}= a^{p^i}\cdot b^{p^i} \\
(a+ b)^{p^i}= a^{p^i}+ b^{p^i}
\end{cases}
\end{aligned}
$$

In other words,

$$
\begin{aligned}
\phi:F\to F \\ \phi(a)=a^p
\end{aligned}
$$

 is a ring homomorphism. (Frobenius endomorphism
**Proof:**
1. EZ
2. $i=1: (a\cdot b)^{p^i}=^? a^{p^i}\cdot b^{p^i}$

$$
\begin{aligned}
(a\cdot b)^{p^i}= \sum_{k=0}^p \begin{pmatrix}p\\k\end{pmatrix}a^kb^{p-k}
\end{aligned}
$$

Claim: If $0<k<p$ then

$$
\begin{aligned}
\begin{pmatrix}p\\k\end{pmatrix}=0_{mod\ p}
\end{aligned}
$$

 (divisible by p)
**Example:**
Proof of claim:

$$
\begin{aligned}
\begin{pmatrix}p\\k\end{pmatrix}= \frac{p!}{k!(p-k)!},\ k=0,p\ : k,p-k<p
\end{aligned}
$$

, So, $p$ does not factor the denominator! (p is prime and $k!(p-k)!$ is a product of numbers $< p$. But $p\mid p'$, so $p\mid \frac{p!}{k!(p-k)!}$
Proof of Lemma:

$$
\begin{aligned}
(a\cdot b)^{p}= \sum_{k=0}^p \begin{pmatrix}p\\k\end{pmatrix}a^kb^{p-k}=\begin{pmatrix}p\\0\end{pmatrix}a^0b^{p-0}+\begin{pmatrix}p\\p\end{pmatrix} a^pb^{p-p}=a^p+b^p
\end{aligned}
$$

More completely, we proved that $(a+b)^p=a^p+b^p+ \underbrace{p\cdot f(a,b)}_{f(a,b)\cdot (1_F+\cdots + 1_F)}$ ← a polynomial in $a,b$
General $i$: induction,
$i+1: (a+b)^{p^{i+1}}= ((a+b)^{p^i})^p= (a^{p^i}+b^{p^i})^p= A^p+B^p=(a^{p^i})^p+(b^{p^i})^p= a^{p^{i+1}}+b^{p^{i+1}}$
Proposition: Let $K$ be a field, $\text{char(K)}=p$
Let $n\geq 1$ then $\{\ x\in K \mid x^{p^n}=x\ \}\subseteq K$ is a subring. Moreover, it is a field
**Exercise:** Prove that this is a subring
Pick $x\in S, x\neq 0$ We know that $x^{p^n}= x\implies x^{p^n}-x=0\implies x\cdot (x^{p^n-1}-1)=0$
But K is a field $\implies$ no zero divisors s.t. $x\neq 0\implies p^{p^n-1}=1 \implies \underbrace{x^{p^n-2}}_{\text{inverse of x}}\cdot x = x^{p^n-1}= 1\ \square$
Strategy:
$p^n$
- $\mathbb{Z}_p,\ f(x)=x^{p^n}-x$
- $\exists\ \mathbb{Z}_p \to \underbrace{K}_{\text{Field}}$ : $f(x) = (x-\alpha_n)\cdot (x-\alpha_{p^n})$ (aka splitting field)
- $S=\{\ x\in k\mid x^{p^n}=x\ \}\subseteq K$. By the proposition, $S$ is a field. Aim, $|S|=p^n$
1. $|S|\leq p^n$, notice that the elements of S are roots of $f(x)=x^{p^n}=x$ in the field $K$
Therefore, $f(x)$ has at most $\underbrace{p^n}_{\text{deg(f)}}$ roots, so $|S|\leq p^n$
1. $|S|\geq p^n$, $S=\{\ \alpha_n, \cdots , \alpha _{p^n}\ \}$ - roots of $f(x)=(x-\alpha_1)\cdots (x-\alpha _n)$ in K, but we need to show that they are all distinct.
**Definition:** (derivative)

$$
\boxed {f(x)=a_nx^n+\cdots+a_nx+a_0\implies f'(x)=na_nx^{n-1} + \cdots+2a_2x+a_1}
$$

**Example:** 
$F=\mathbb{Z}_3$
$f(x)=2x^5+x^3+2x\implies f'(x)=\underbrace{10x^5}_1+\underbrace{3x^2}_0+2=\underline{x^5+2}$
### Leibniz Rule
$(f(x)g(x))'=f'(x)g(x)+f(x)g'(x)$
This is still true over any field with the formal definition
### Multiple Factors and Derivatives
If $g(x)^2 \mid f(x)$ then $g(x)\mid f'(x),\ (f,g\in F[x])$
Proof: Write $f(x)=g(x)^2\cdot h(x)$ for some $h\in F[x],$ so by Leibniz rule,

$$
\begin{aligned}
f'(x)=(g(x)^2\cdot h(x))'=\underbrace{(g(x)^2)}'h(x)+g(x)^2\cdot h'(x) \\
= g(x)(2g'(x)h(x)+g(x)h'(x))
\end{aligned}
$$

So, $g(x) \mid f'(x)$
**Corollary:**
If $(x-\alpha )^2 \mid f(x)$ then $x-\alpha \mid f'(x)$
$(((x-\alpha)^2)'=2x-2\alpha = 2(x-\alpha )$
We aimed to prove $f(x)= x^{p^n}-x= (x-\alpha_n)\cdots (x-\alpha _{p^n})$ has $p^n$ distinct roots in K, that is, $\{\ \alpha_n,\cdots , \alpha _{p^n}\ \}$ are distinct.
If $\alpha _i=\alpha _j\ (i\neq j)$ then, $(x-\alpha _i)^2 \mid f(x)$
By the corollary, $x-\alpha _i \mid f'(x)$
$f(x)= x^{p^n}-x \implies f'(x)=\underbrace{p^n}_{0 \text{ b/c char(K)=p }}x^{p^n-1}-1 = -1$
So, $x-\alpha_i \mid -1$ is impossible
So, all roots are distinct,
Consequently, $S=\{\ x\in K \mid x^{p^n}-x\ \} \subseteq K$ is a field of size $p^n$
$1_F+\cdots+1_F=0_F$
$x+\cdots+x=x\cdot (1_F+\cdots+ 1_F) = x\cdot 0_F = 0_F$
### Properties of Finite Fields
Let $F$ be a field
1. $|F|=p^n,\ p=\text{char}(F),\ p \text{ prime}$
2. $\forall\  p \text{ prime},\ n\geq 1, \exists\ \text{field} \ |F|=p^n$
3. If $F$ and $K$ are fields $st.\ |F|=|K|=p,\ F\cong K$
4. $|F^x|=p^n-1,$ abelian group
5. $F^x$ is a cyclic group
$F^x\cong \mathbb{Z}_{p^n-1}$
6. $|F|=p^n\ \forall\ x\in F^x,\ x^{p^n-1}=1$
By Lagrange Theorem, $\text{ord}(x) \mid |F^x|$ so, $x^{p^n-1}= x^{|F^x|}=1$
7. $\forall\ x\in F,\ x^{p^n}=x$
8. $F\subseteq\ K, F$ is a subfield of $K$
$|F|=p^n,\ |K|=p^m,\text{ and } n\mid m$
$K$ is a vector space over $F$
There is no subfield of size $8$ over a field of size $16$ because $8=2^3,\ 16=2^4,\ 3 \not| \ 4$
9. $|K|=p^m,\ n\mid m,$ then $F=\{\ x\in K:x^{p^n}=x\ \}$ is a subfield of $K,\ |F|=p^n$
### Fermat’s Little Theorem
$\forall\ a\in \mathbb{Z},\ a^p=a(\text{mod } p)$
**Examples:**
How many roots does $x^7-1$ have in $F:$
1. $|F|=27\implies |F^x|=26$
$\text{ord}_{F^x}(x)\in \{\ 1,7\ \}, \ 7\not |\ 26,$ so $x=1$, only $1$ root
2. $|F|=8\implies |F^x|=7$
$7\mid 7 ,$ so we have $7$ roots
# 🔐 Applications
## **Diffie–Hellman Protocol**
$F- \text{Finite Field}$
$g\in F^x$
$n=\text{ord}_{F^x}(g)$

$$
\begin{aligned}
\begin{matrix}
\text{Alice} & \xrightleftarrows[g^Y]{g^X} & \text{Bob} \\
\\
1\leq X\leq n-1 && 1\leq Y\leq n-1

\end{matrix}
\end{aligned}
$$

### Subgroup Attack
For $a\in \mathbb{N}$

$$
\begin{aligned}
\begin{matrix}
\text{Alice} & \xrightleftarrows[(g^Y)^a]{g^X} &\text{Eve} &\xrightleftarrows[g^Y]{(g^X)^a}  & \text{Bob} \\
\Downarrow&&&&\Downarrow\\
K=g^{axy}&&&&K=g^{axy}
\end{matrix}
\end{aligned}
$$

Take $a\in \mathbb{N}:\ a\mid n,\ \frac{n}a$ is “small”
Now, $K=K=g^{axy}=(g^a)^{xy}$
$\text{ord}_{F^x}(g^a)=\frac{\text{ord}_{F^x}(g)^n}{\gcd(\text{ord}_{F^x}a)}= \frac{n}{\gcd(n,m)}=\frac{n}{a}$← small number
Therefore, $|\left\langle \ g^n\  \right\rangle|= \frac{n}{a}$ and $K\in \left\langle \ g^n\  \right\rangle$
So, Eve can apply brute force to recover $K$
**Solution:** Take $g\in F^x\ st.\ \text{ord}(g)=n$ is prime
**Examples:**
$\mathbb{Z}_{73}=F\implies |F|^x=72,\ F^x\cong \mathbb{Z}_{72},$ $\ n=72,\ a=36,24,\cdots,\ \frac{n}a = 2,3,\cdots$
$F=\mathbb{Z}_{83}$
$|F^x|=83-1=82= 2\cdot 41$
$g\in F^x$ where the order is $41$
## Error-Correcting Codes
Assume we are sending a message
$s=(s_0,\cdots , s_{n-1}) \in \mathbb{Z}_2^n$
Possible Solution: Send the message multiple times
This solution is highly inefficient because we are sending n bits of information multiple times.
A more efficient solution:

$$
\begin{aligned}
\begin{matrix}
s\in \mathbb{Z}_2^n &&s'+\text{error} \\
\Downarrow && \Downarrow\\
s'\in \mathbb{Z}_2^{n+r}&&s
\end{matrix}
\end{aligned}
$$

### Errors and Hamming Distance
$x,y\in \mathbb{Z}_2^n$
$d(x,y)=$ # of entries which are distinct on $x$ vs $y$
Example:

$$
\begin{aligned}
x=\begin{pmatrix} 1\\1\\0\\1\\0 \end{pmatrix},\ y=\begin{pmatrix} 1\\0\\0\\1\\1 \end{pmatrix}\implies d(x,y)=2
\end{aligned}
$$

The hamming distance between $x$ and $y$ is 2 because they differ in two locations in the second position and the last position
**Code:** $C\subseteq \mathbb{Z}_2^n$, a subspace
We say that $C$ s an $[n,k]$ - code $\implies k=\dim_{\mathbb{Z}_2}C$
$|C|=2^n$
**Encoding:** 

$$
\underbrace{\mathbb{Z}_2^k}_{\text{original message}}\to C\subseteq \underbrace{\mathbb{Z}_2^n}_{\text{encoded message}}
$$

$M\in M_{n,k}(\mathbb{Z}_2)$
Encode: $s\mapsto M_s$
- If $\forall\ x\neq y\in C,\ d(x,y) \geq d,$ then the code can correct at least $\frac{d}2$ errors
Cycle Code: $C\leq \mathbb{Z}_2^n$  a code such that if some code in C, then any cyclic shift is also in C

$$
\begin{aligned}
\begin{pmatrix} c_0\\\vdots\\ c_{n-1} \end{pmatrix}\in C\implies\begin{pmatrix} c_i\\c_{i+1}\\\vdots\\ c_{n-1}\\c_0\\ \vdots\\ c_{i-1} \end{pmatrix}\in C
\end{aligned}
$$

**Question:** How can we create cyclic codes?
Consider the polynomial ring:
$\mathbb{Z}_2[x]/\left\langle \ x^n-1\  \right\rangle=\{ \overline{c_0+c_1x \cdots +c_{n-1}x^{n-1}} \mid c_0,\cdots,c_{n-1}\in \mathbb{Z}_2\} \longleftrightarrow \mathbb{Z}_2^n$

$$
\mathbb{Z}_2[x]/\left\langle \ x^n-1\  \right\rangle=\{\  \overline{c_0+c_1x \cdots +c_{n-1}x^{n-1}} \mid c_0,\cdots,c_{n-1}\in \mathbb{Z}_2\ \} \longleftrightarrow \mathbb{Z}_2^n
$$

$$
\begin{aligned}
\overline{c_0+c_1x+\cdots +c_{n-1}}\xleftrightarrow{1:1}\begin{pmatrix}c_0\\ \vdots\\ c_{n-1}\end{pmatrix}
\end{aligned}
$$

**Theorem:**
$C\leq \mathbb{Z}_2^n$ is a cyclic code $\iff \left\langle \ g(x)\  \right\rangle\lhd \mathbb{Z}_2[x]/\left\langle \ x^n-1\  \right\rangle$
We call $g(x)$ the generating polynomial of $C$
**Question:** How do we find, $g(x)\in \mathbb{Z}_2[x]$ such that $C$ is a “good” code?
Firstly, notice that the whole process can be formed when $\mathbb{Z}_2$ is replaced by any field $K$
$\mathbb{Z}_2\to K,\ |K|=2^r$
$K-\text{finite field}$
$\gamma = K^x$ $\implies \text{ord}_{k^x}(\gamma)=q-1$
**Example:**
$K=\mathbb{Z}_2[x]/\left\langle \ x^3+x+1\  \right\rangle$
$\overline x \in K$
$\overline {x^{\phantom{1}}}, \overline {x^2}, \overline {x^3} = \overline{x+1}$
$\overline {x^4}=\overline{x^2+x},\  \overline {x^5}=\overline{x^2+x+1}$
$\overline {x ^6}=\overline{x^2+1},\  \overline {x^7}=\overline1$
### **Bose–Chaudhuri–Hocquenghem (1960)**
**Theorem:**  Suppose that $K$ is a finite field, $|K|=q$
If $\gamma \in K^x$ of $\text{ord}_{K^x}(\gamma)=n,\ \gcd(\underbrace{n}_{\text{odd}},q)=1$ $\text{ord}_{K^x}(\gamma)=n,\ \gcd(n,q)=1$
$|K|=2^r$
$q(x)\in K[x]$ such that $g(\gamma)=g(\gamma^2)=\cdots=g(\gamma^{d-1})=0$
Then, $\left\langle \ g(x)\  \right\rangle\subseteq K[x]/\left\langle \ x^n-1\  \right\rangle$ is a cyclic code which corrects at least $\frac{d}2$ errors
Note: For a code over $\mathbb{Z}_2,$ replace each $\alpha \in K$ by a length $r$ vector over $\mathbb{Z}_2$
