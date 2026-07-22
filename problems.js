/** Original contest-depth AMC practice bank for MAC (user-supplied very hard set). Not official MAA. */
const PROBLEMS = [
  {
    "id": "n10-01",
    "exam": "AMC 10",
    "year": 2010,
    "num": 10,
    "type": "Number Theory",
    "difficulty": 7,
    "q": "How many positive integers $n<1000$ satisfy $n^2+n+1\\equiv0\\pmod7$?",
    "a": [
      "143",
      "286",
      "429",
      "572",
      "715"
    ],
    "correct": 1,
    "solution": "The congruence holds iff $n\\equiv2$ or $4\\pmod7$. Among $1\\le n\\le999$ there are $143$ of each residue, totaling $286$.",
    "hints": [
      "Solve the quadratic congruence modulo $7$.",
      "Find the admissible residue classes.",
      "Count them up to $999$."
    ],
    "steps": [
      "$n\\equiv2,4\\pmod7$.",
      "$143+143=286$.",
      "Answer B."
    ],
    "alt": "Check choice B (286) against the given conditions."
  },
  {
    "id": "a10-01",
    "exam": "AMC 10",
    "year": 2011,
    "num": 11,
    "type": "Algebra",
    "difficulty": 8,
    "q": "Positive integers $a,b,c$ satisfy $a+b+c=30$ and $ab+bc+ca=275$. Find the largest possible value of $abc$.",
    "a": [
      "720",
      "750",
      "780",
      "800",
      "840"
    ],
    "correct": 1,
    "solution": "The numbers are roots of $t^3-30t^2+275t-k=0$. From $\\sum a^2=350$ and casework on positive integers one finds the only triple $\\{5,10,15\\}$, so $abc=750$.",
    "hints": [
      "Compute $\\sum a^2$ from the elementary sums.",
      "Search positive integer triples with that sum and square-sum.",
      "Read off the product."
    ],
    "steps": [
      "Only $\\{5,10,15\\}$.",
      "Product $750$.",
      "Answer B."
    ],
    "alt": "Check choice B (750) against the given conditions."
  },
  {
    "id": "c10-01",
    "exam": "AMC 10",
    "year": 2012,
    "num": 12,
    "type": "Combinatorics",
    "difficulty": 8,
    "q": "How many ordered triples of positive integers $(a,b,c)$ satisfy $abc=720$ and $a<b<c$?",
    "a": [
      "36",
      "40",
      "42",
      "45",
      "48"
    ],
    "correct": 2,
    "solution": "Enumerating factorizations of $720=2^4\\cdot3^2\\cdot5$ with $a<b<c$ yields $42$ triples.",
    "hints": [
      "Factorize $720$.",
      "List factor triples in increasing order.",
      "Count them."
    ],
    "steps": [
      "$42$ triples.",
      "Answer C."
    ],
    "alt": "Check choice C (42) against the given conditions."
  },
  {
    "id": "n10-02",
    "exam": "AMC 10",
    "year": 2013,
    "num": 13,
    "type": "Number Theory",
    "difficulty": 8,
    "q": "A sequence is defined by $a_1=1$ and $a_{n+1}=a_n+\\gcd(a_n,n)$. Find $a_{50}$.",
    "a": [
      "49",
      "50",
      "51",
      "52",
      "55"
    ],
    "correct": 2,
    "solution": "Computing the recurrence step by step gives $a_{50}=51$.",
    "hints": [
      "Compute successive terms.",
      "Track the gcd increments.",
      "Read $a_{50}$."
    ],
    "steps": [
      "$a_{50}=51$.",
      "Answer C."
    ],
    "alt": "Check choice C (51) against the given conditions."
  },
  {
    "id": "c10-02",
    "exam": "AMC 10",
    "year": 2014,
    "num": 14,
    "type": "Combinatorics",
    "difficulty": 8,
    "q": "How many six-digit positive integers have six distinct digits and are divisible by $9$?",
    "a": [
      "13680",
      "15120",
      "15600",
      "16800",
      "18144"
    ],
    "correct": 2,
    "solution": "Digit sum must be divisible by $9$. Counting $6$-subsets of digits with that sum and arranging with nonzero leading digit yields $15600$.",
    "hints": [
      "Use the divisibility-by-$9$ digit-sum rule.",
      "Case on whether $0$ is included.",
      "Arrange the digits."
    ],
    "steps": [
      "$15600$ such numbers.",
      "Answer C."
    ],
    "alt": "Check choice C (15600) against the given conditions."
  },
  {
    "id": "p10-01",
    "exam": "AMC 10",
    "year": 2015,
    "num": 15,
    "type": "Probability",
    "difficulty": 9,
    "q": "A fair coin is flipped repeatedly until either HHT or THH first appears. Find the probability that HHT appears first.",
    "a": [
      "\\dfrac{1}{4}",
      "\\dfrac{1}{3}",
      "\\dfrac{2}{5}",
      "\\dfrac{1}{2}",
      "\\dfrac{2}{3}"
    ],
    "correct": 0,
    "solution": "First-step analysis on suffix states shows that from a trailing T one can never produce HHT before THH, and the probability from the empty state is $\\frac14$.",
    "hints": [
      "Set up Markov states on the current suffix.",
      "Solve the resulting linear system.",
      "Evaluate from the start state."
    ],
    "steps": [
      "Probability $\\frac14$.",
      "Answer A."
    ],
    "alt": "Check choice A (\\dfrac{1}{4}) against the given conditions."
  },
  {
    "id": "g10-01",
    "exam": "AMC 10",
    "year": 2016,
    "num": 16,
    "type": "Geometry",
    "difficulty": 8,
    "q": "A triangle has side lengths $13,14,15$. Let $I$ be its incenter and $O$ its circumcenter. Find $OI^2$.",
    "a": [
      "\\dfrac{65}{64}",
      "\\dfrac{65}{32}",
      "1",
      "\\dfrac{17}{16}",
      "\\dfrac{33}{32}"
    ],
    "correct": 0,
    "solution": "Area $84$, semiperimeter $21$, so $r=4$ and $R=\\frac{65}{8}$. Euler's formula $OI^2=R(R-2r)$ gives $\\frac{65}{8}\\cdot\\frac{1}{8}=\\frac{65}{64}$.",
    "hints": [
      "Compute $r$ and $R$.",
      "Apply Euler's distance formula.",
      "Simplify."
    ],
    "steps": [
      "$R=65/8$, $r=4$.",
      "$OI^2=65/64$.",
      "Answer A."
    ],
    "alt": "Check choice A (\\dfrac{65}{64}) against the given conditions."
  },
  {
    "id": "n10-03",
    "exam": "AMC 10",
    "year": 2017,
    "num": 17,
    "type": "Number Theory",
    "difficulty": 7,
    "q": "How many integers $n$ with $1\\le n\\le2026$ satisfy $n^2\\equiv1\\pmod{24}$?",
    "a": [
      "672",
      "673",
      "674",
      "675",
      "676"
    ],
    "correct": 3,
    "solution": "The congruence holds precisely for $n\\equiv1,5,7,11,13,17,19,23\\pmod{24}$. Counting in the given range yields $675$.",
    "hints": [
      "Characterize solutions modulo $24$.",
      "Count complete residue blocks.",
      "Handle the remainder."
    ],
    "steps": [
      "Eight residues mod $24$.",
      "Total $675$.",
      "Answer D."
    ],
    "alt": "Check choice D (675) against the given conditions."
  },
  {
    "id": "p10-02",
    "exam": "AMC 10",
    "year": 2018,
    "num": 18,
    "type": "Probability",
    "difficulty": 8,
    "q": "A regular hexagon has six vertices. Three distinct vertices are chosen randomly. Given that they form an isosceles triangle, find the probability that they form an equilateral triangle.",
    "a": [
      "\\dfrac{1}{10}",
      "\\dfrac{1}{8}",
      "\\dfrac{1}{5}",
      "\\dfrac{1}{4}",
      "\\dfrac{1}{3}"
    ],
    "correct": 3,
    "solution": "Of the $\\binom{6}{3}=20$ triples, $8$ form isosceles triangles and $2$ are equilateral, so the conditional probability is $\\frac28=\\frac14$.",
    "hints": [
      "Classify triangles formed by hexagon vertices.",
      "Count isosceles and equilateral.",
      "Divide."
    ],
    "steps": [
      "$2/8=1/4$.",
      "Answer D."
    ],
    "alt": "Check choice D (\\dfrac{1}{4}) against the given conditions."
  },
  {
    "id": "a10-02",
    "exam": "AMC 10",
    "year": 2019,
    "num": 19,
    "type": "Algebra",
    "difficulty": 7,
    "q": "Find the number of ordered pairs of positive integers $(x,y)$ satisfying $\\dfrac1x+\\dfrac1y=\\dfrac1{24}$.",
    "a": [
      "18",
      "20",
      "21",
      "24",
      "32"
    ],
    "correct": 2,
    "solution": "Clearing yields $(x-24)(y-24)=576$. Positive $x,y$ correspond to the $21$ positive divisors of $576$.",
    "hints": [
      "Clear denominators and factor.",
      "Count positive divisors of $576$.",
      "Each gives an ordered pair."
    ],
    "steps": [
      "$21$ pairs.",
      "Answer C."
    ],
    "alt": "Check choice C (21) against the given conditions."
  },
  {
    "id": "c10-03",
    "exam": "AMC 10",
    "year": 2020,
    "num": 20,
    "type": "Combinatorics",
    "difficulty": 8,
    "q": "A $5\\times5$ grid of unit squares is given. How many rectangles formed by grid lines have area divisible by $6$?",
    "a": [
      "30",
      "36",
      "40",
      "45",
      "48"
    ],
    "correct": 1,
    "solution": "Rectangles of width $w$ and height $h$ ($1\\le w,h\\le5$) occur in $(6-w)(6-h)$ positions. Summing over $wh$ divisible by $6$ gives $36$.",
    "hints": [
      "Parametrize by width and height.",
      "Impose $6\\mid wh$.",
      "Sum the position counts."
    ],
    "steps": [
      "Total $36$.",
      "Answer B."
    ],
    "alt": "Check choice B (36) against the given conditions."
  },
  {
    "id": "n10-04",
    "exam": "AMC 10",
    "year": 2021,
    "num": 21,
    "type": "Number Theory",
    "difficulty": 8,
    "q": "Positive integers $a$ and $b$ satisfy $a^2-b^2=2025$. How many ordered pairs $(a,b)$ are possible?",
    "a": [
      "5",
      "6",
      "7",
      "8",
      "9"
    ],
    "correct": 2,
    "solution": "Factor $(a-b)(a+b)=2025$ with both factors positive of the same parity and $a>b\\ge1$. There are $7$ such pairs.",
    "hints": [
      "Factor as a difference of squares.",
      "Impose parity and positivity.",
      "Count factor pairs."
    ],
    "steps": [
      "$7$ pairs.",
      "Answer C."
    ],
    "alt": "Check choice C (7) against the given conditions."
  },
  {
    "id": "c10-04",
    "exam": "AMC 10",
    "year": 2022,
    "num": 22,
    "type": "Combinatorics",
    "difficulty": 7,
    "q": "How many four-element subsets of $\\{1,2,\\ldots,12\\}$ contain no two consecutive integers?",
    "a": [
      "120",
      "126",
      "132",
      "140",
      "165"
    ],
    "correct": 1,
    "solution": "The standard change of variables $b_i=a_i-i+1$ yields $\\binom{9}{4}=126$.",
    "hints": [
      "Map to an unrestricted $4$-subset.",
      "Apply the shift $a_i\\mapsto a_i-i+1$.",
      "Compute the binomial coefficient."
    ],
    "steps": [
      "$\\binom{9}{4}=126$.",
      "Answer B."
    ],
    "alt": "Check choice B (126) against the given conditions."
  },
  {
    "id": "a10-03",
    "exam": "AMC 10",
    "year": 2023,
    "num": 23,
    "type": "Algebra",
    "difficulty": 7,
    "q": "Let $x+\\dfrac1x=4$. Find $x^6+\\dfrac1{x^6}$.",
    "a": [
      "724",
      "1940",
      "2702",
      "2888",
      "3362"
    ],
    "correct": 2,
    "solution": "With $u_n=x^n+x^{-n}$ one has $u_1=4$, $u_2=14$, and $u_n=4u_{n-1}-u_{n-2}$, so $u_6=2702$.",
    "hints": [
      "Set up the recurrence for $x^n+x^{-n}$.",
      "Compute successive terms.",
      "Read $u_6$."
    ],
    "steps": [
      "$u_6=2702$.",
      "Answer C."
    ],
    "alt": "Check choice C (2702) against the given conditions."
  },
  {
    "id": "n10-05",
    "exam": "AMC 10",
    "year": 2024,
    "num": 24,
    "type": "Number Theory",
    "difficulty": 8,
    "q": "How many integers between $1$ and $10{,}000$, inclusive, have exactly nine positive divisors?",
    "a": [
      "28",
      "30",
      "32",
      "34",
      "36"
    ],
    "correct": 2,
    "solution": "Exactly nine divisors means $n=p^8$ or $n=(pq)^2$. Counting both forms up to $10^4$ yields $32$.",
    "hints": [
      "Use the divisor-function forms for $d(n)=9$.",
      "Count prime eighth powers.",
      "Count squares of products of two distinct primes."
    ],
    "steps": [
      "$32$ such integers.",
      "Answer C."
    ],
    "alt": "Check choice C (32) against the given conditions."
  },
  {
    "id": "g10-02",
    "exam": "AMC 10",
    "year": 2010,
    "num": 25,
    "type": "Geometry",
    "difficulty": 7,
    "q": "A point $P$ lies inside an equilateral triangle of side $18$. Its perpendicular distances from two sides are $3$ and $5$. Find its distance from the third side.",
    "a": [
      "9\\sqrt{3}-8",
      "9\\sqrt{3}-6",
      "6\\sqrt{3}",
      "8",
      "9"
    ],
    "correct": 0,
    "solution": "By Viviani's theorem the distances to the three sides sum to the altitude $9\\sqrt{3}$. Hence the third distance is $9\\sqrt{3}-8$.",
    "hints": [
      "Recall Viviani for equilateral triangles.",
      "Compute the altitude.",
      "Subtract $3+5$."
    ],
    "steps": [
      "Altitude $9\\sqrt{3}$.",
      "Third distance $9\\sqrt{3}-8$.",
      "Answer A."
    ],
    "alt": "Check choice A (9\\sqrt{3}-8) against the given conditions."
  },
  {
    "id": "c10-05",
    "exam": "AMC 10",
    "year": 2011,
    "num": 10,
    "type": "Combinatorics",
    "difficulty": 9,
    "q": "How many permutations of the letters in MATHEMATICS have no two vowels adjacent?",
    "a": [
      "1008000",
      "1058400",
      "1123200",
      "1209600",
      "1260000"
    ],
    "correct": 1,
    "solution": "Consonants M,M,T,T,H,C,S can be placed in $\\frac{7!}{2!2!}$ ways, creating $8$ slots for the vowels A,A,E,I. Choose and fill slots: $\\binom{8}{4}\\frac{4!}{2!}$. Product $1058400$.",
    "hints": [
      "Place the consonants first.",
      "Choose slots for vowels.",
      "Account for repeated letters."
    ],
    "steps": [
      "$1058400$ permutations.",
      "Answer B."
    ],
    "alt": "Check choice B (1058400) against the given conditions."
  },
  {
    "id": "g10-03",
    "exam": "AMC 10",
    "year": 2012,
    "num": 11,
    "type": "Geometry",
    "difficulty": 8,
    "q": "A right triangle has integer side lengths and area $210$. What is the smallest possible length of its hypotenuse?",
    "a": [
      "29",
      "37",
      "53",
      "65",
      "75"
    ],
    "correct": 0,
    "solution": "The legs $(20,21)$ give hypotenuse $29$ and area $210$, which is minimal among the integer possibilities.",
    "hints": [
      "List factor pairs of $420=ab$.",
      "Require $a^2+b^2$ a square.",
      "Minimize the hypotenuse."
    ],
    "steps": [
      "Legs $20,21$.",
      "Hypotenuse $29$.",
      "Answer A."
    ],
    "alt": "Check choice A (29) against the given conditions."
  },
  {
    "id": "n10-06",
    "exam": "AMC 10",
    "year": 2013,
    "num": 12,
    "type": "Number Theory",
    "difficulty": 8,
    "q": "Find the smallest positive integer $n$ such that $2^n\\equiv1\\pmod{31}$ and $3^n\\equiv1\\pmod{13}$.",
    "a": [
      "5",
      "12",
      "15",
      "30",
      "60"
    ],
    "correct": 2,
    "solution": "The order of $2$ mod $31$ is $5$ and the order of $3$ mod $13$ is $3$, so the least such $n$ is $\\mathrm{lcm}(5,3)=15$.",
    "hints": [
      "Compute each multiplicative order.",
      "Take the least common multiple.",
      "Verify."
    ],
    "steps": [
      "$\\mathrm{lcm}(5,3)=15$.",
      "Answer C."
    ],
    "alt": "Check choice C (15) against the given conditions."
  },
  {
    "id": "p10-03",
    "exam": "AMC 10",
    "year": 2014,
    "num": 13,
    "type": "Probability",
    "difficulty": 8,
    "q": "A bag contains $5$ red, $6$ blue, and $7$ green balls. Four balls are selected without replacement. Find the probability that exactly two colors are represented.",
    "a": [
      "\\dfrac{143}{306}",
      "\\dfrac{1}{2}",
      "\\dfrac{155}{306}",
      "\\dfrac{2}{3}",
      "\\dfrac{175}{306}"
    ],
    "correct": 0,
    "solution": "Favorable selections from the three color-pairs total $1430$ and $\\binom{18}{4}=3060$, so the probability is $\\frac{143}{306}$.",
    "hints": [
      "Count selections using exactly two colors.",
      "Divide by $\\binom{18}{4}$.",
      "Simplify."
    ],
    "steps": [
      "$1430/3060=143/306$.",
      "Answer A."
    ],
    "alt": "Check choice A (\\dfrac{143}{306}) against the given conditions."
  },
  {
    "id": "n10-07",
    "exam": "AMC 10",
    "year": 2015,
    "num": 14,
    "type": "Number Theory",
    "difficulty": 7,
    "q": "How many positive divisors $d$ of $2^{12}3^{8}5^{6}$ are perfect sixth powers?",
    "a": [
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "correct": 2,
    "solution": "Exponents in a sixth-power divisor must be multiples of $6$: $3$ choices for the power of $2$, $2$ for $3$, and $2$ for $5$, totaling $12$.",
    "hints": [
      "Write the prime factorization of a sixth power.",
      "Bound each exponent.",
      "Multiply the counts."
    ],
    "steps": [
      "$3\\cdot2\\cdot2=12$.",
      "Answer C."
    ],
    "alt": "Check choice C (12) against the given conditions."
  },
  {
    "id": "a10-04",
    "exam": "AMC 10",
    "year": 2016,
    "num": 15,
    "type": "Algebra",
    "difficulty": 6,
    "q": "The roots of $x^3-7x^2+14x-8=0$ are $a,b,c$. Find $a^2+b^2+c^2$.",
    "a": [
      "15",
      "19",
      "21",
      "25",
      "35"
    ],
    "correct": 2,
    "solution": "$a^2+b^2+c^2=(a+b+c)^2-2(ab+bc+ca)=49-28=21$.",
    "hints": [
      "Use the identity for the sum of squares.",
      "Apply Vieta.",
      "Compute."
    ],
    "steps": [
      "$49-28=21$.",
      "Answer C."
    ],
    "alt": "Check choice C (21) against the given conditions."
  },
  {
    "id": "c10-06",
    "exam": "AMC 10",
    "year": 2017,
    "num": 16,
    "type": "Combinatorics",
    "difficulty": 8,
    "q": "How many ways can $10$ identical candies be distributed among $4$ children if every child receives at least one candy and no child receives more than $4$?",
    "a": [
      "40",
      "44",
      "48",
      "52",
      "56"
    ],
    "correct": 1,
    "solution": "Stars-and-bars with upper bounds (or direct enumeration) yields $44$ solutions in positive integers $\\le4$ summing to $10$.",
    "hints": [
      "Impose lower and upper bounds.",
      "Enumerate or inclusion-exclude.",
      "Count."
    ],
    "steps": [
      "$44$ ways.",
      "Answer B."
    ],
    "alt": "Check choice B (44) against the given conditions."
  },
  {
    "id": "g10-04",
    "exam": "AMC 10",
    "year": 2018,
    "num": 17,
    "type": "Geometry",
    "difficulty": 8,
    "q": "A circle of radius $4$ is tangent internally to a circle of radius $10$. A chord of the larger circle is tangent to the smaller circle. Find the length of that chord (the one lying between the centers' line).",
    "a": [
      "4\\sqrt{6}",
      "6\\sqrt{3}",
      "8\\sqrt{3}",
      "8\\sqrt{6}",
      "10\\sqrt{2}"
    ],
    "correct": 3,
    "solution": "Centers are $6$ apart. The chord perpendicular to the line of centers at distance $2$ from the large center has half-length $\\sqrt{10^2-2^2}=\\sqrt{96}$, so full length $8\\sqrt{6}$.",
    "hints": [
      "Place the centers on a line.",
      "Find the distance from the large center to the chord.",
      "Apply Pythagoras."
    ],
    "steps": [
      "Half-chord $\\sqrt{96}$.",
      "Length $8\\sqrt{6}$.",
      "Answer D."
    ],
    "alt": "Check choice D (8\\sqrt{6}) against the given conditions."
  },
  {
    "id": "n10-08",
    "exam": "AMC 10",
    "year": 2019,
    "num": 18,
    "type": "Number Theory",
    "difficulty": 7,
    "q": "How many integers $n$, $1\\le n\\le1000$, satisfy $\\gcd(n,840)=1$?",
    "a": [
      "192",
      "228",
      "256",
      "288",
      "320"
    ],
    "correct": 1,
    "solution": "Direct count of integers up to $1000$ coprime to $840=2^3\\cdot3\\cdot5\\cdot7$ yields $228$.",
    "hints": [
      "Factor $840$.",
      "Use inclusion-exclusion / sieve.",
      "Count up to $1000$."
    ],
    "steps": [
      "$228$ integers.",
      "Answer B."
    ],
    "alt": "Check choice B (228) against the given conditions."
  },
  {
    "id": "c10-07",
    "exam": "AMC 10",
    "year": 2020,
    "num": 19,
    "type": "Combinatorics",
    "difficulty": 7,
    "q": "Find the number of triples of nonnegative integers $(x,y,z)$ satisfying $x+2y+3z=30$.",
    "a": [
      "80",
      "91",
      "96",
      "108",
      "120"
    ],
    "correct": 1,
    "solution": "Iterating over admissible nonnegative $z$ and $y$ produces $91$ solutions.",
    "hints": [
      "Iterate over $z$.",
      "For each $z$, iterate over $y$.",
      "Count nonnegative $x$."
    ],
    "steps": [
      "Loop over $z$ then $y$.",
      "Count.",
      "$91$."
    ],
    "alt": "Check choice B (91) against the given conditions."
  },
  {
    "id": "g10-05",
    "exam": "AMC 10",
    "year": 2021,
    "num": 20,
    "type": "Geometry",
    "difficulty": 8,
    "q": "A regular octagon has side length $2$. Find the square of the length of its longest diagonal.",
    "a": [
      "16+8\\sqrt{2}",
      "20+8\\sqrt{2}",
      "24+8\\sqrt{2}",
      "16+4\\sqrt{2}",
      "32"
    ],
    "correct": 0,
    "solution": "The longest diagonal is the diameter $2R$ with $R=1/\\sin(\\pi/8)$, and $(2R)^2=16/(2-\\sqrt{2})=16+8\\sqrt{2}$.",
    "hints": [
      "Express the circumradius from the side.",
      "Double it for the diameter.",
      "Square and rationalize."
    ],
    "steps": [
      "$(2R)^2=16+8\\sqrt{2}$.",
      "Answer A."
    ],
    "alt": "Check choice A (16+8\\sqrt{2}) against the given conditions."
  },
  {
    "id": "n10-09",
    "exam": "AMC 10",
    "year": 2022,
    "num": 21,
    "type": "Number Theory",
    "difficulty": 7,
    "q": "How many $5$-digit palindromes are divisible by $9$?",
    "a": [
      "100",
      "111",
      "120",
      "900",
      "1000"
    ],
    "correct": 0,
    "solution": "A palindrome $abcba$ has digit sum $2a+2b+c$. Counting $a\\in1..9$, $b,c\\in0..9$ with $9\\mid(2a+2b+c)$ yields $100$.",
    "hints": [
      "Write the palindrome form.",
      "Impose the digit-sum condition.",
      "Count."
    ],
    "steps": [
      "$100$ palindromes.",
      "Answer A."
    ],
    "alt": "Check choice A (100) against the given conditions."
  },
  {
    "id": "a10-05",
    "exam": "AMC 10",
    "year": 2023,
    "num": 22,
    "type": "Algebra",
    "difficulty": 7,
    "q": "A sequence satisfies $a_{n+2}=3a_{n+1}-2a_n$ with $a_1=1$ and $a_2=4$. Find $a_{10}$.",
    "a": [
      "1024",
      "1534",
      "1536",
      "2046",
      "2048"
    ],
    "correct": 1,
    "solution": "The closed form is $a_n=-2+3\\cdot2^{n-1}$, so $a_{10}=-2+3\\cdot512=1534$.",
    "hints": [
      "Solve the linear recurrence.",
      "Fit the initial conditions.",
      "Evaluate at $n=10$."
    ],
    "steps": [
      "$a_{10}=1534$.",
      "Answer B."
    ],
    "alt": "Check choice B (1534) against the given conditions."
  },
  {
    "id": "c10-08",
    "exam": "AMC 10",
    "year": 2024,
    "num": 23,
    "type": "Combinatorics",
    "difficulty": 6,
    "q": "How many subsets of $\\{1,2,\\ldots,10\\}$ have an even sum?",
    "a": [
      "256",
      "512",
      "1023",
      "1024",
      "2048"
    ],
    "correct": 1,
    "solution": "Exactly half of the $2^{10}$ subsets have even sum (pair complements by toggling $1$), so $512$.",
    "hints": [
      "Pair subsets by a fixed element.",
      "Note even/odd sums split evenly.",
      "Compute $2^{9}$."
    ],
    "steps": [
      "$512$ subsets.",
      "Answer B."
    ],
    "alt": "Check choice B (512) against the given conditions."
  },
  {
    "id": "n10-10",
    "exam": "AMC 10",
    "year": 2010,
    "num": 24,
    "type": "Number Theory",
    "difficulty": 7,
    "q": "Find the remainder when $1!+2!+\\cdots+100!$ is divided by $12$.",
    "a": [
      "0",
      "1",
      "3",
      "6",
      "9"
    ],
    "correct": 4,
    "solution": "For $n\\ge6$, $n!\\equiv0\\pmod{12}$. The remainder equals that of $1!+\\cdots+5!=153\\equiv9\\pmod{12}$.",
    "hints": [
      "Observe large factorials vanish mod $12$.",
      "Sum the small factorials.",
      "Reduce."
    ],
    "steps": [
      "Remainder $9$.",
      "Answer E."
    ],
    "alt": "Check choice E (9) against the given conditions."
  },
  {
    "id": "g10-06",
    "exam": "AMC 10",
    "year": 2011,
    "num": 25,
    "type": "Geometry",
    "difficulty": 8,
    "q": "A triangle has medians of lengths $9,12,15$. Find its area.",
    "a": [
      "48",
      "54",
      "72",
      "84",
      "96"
    ],
    "correct": 2,
    "solution": "The medians themselves form a right triangle of area $54$. The area of the original triangle is $\\frac43$ of that, namely $72$.",
    "hints": [
      "Use the median-area formula.",
      "Note $9,12,15$ is right.",
      "Multiply by $\\frac43$."
    ],
    "steps": [
      "Area $72$.",
      "Answer C."
    ],
    "alt": "Check choice C (72) against the given conditions."
  },
  {
    "id": "n10-11",
    "exam": "AMC 10",
    "year": 2012,
    "num": 10,
    "type": "Number Theory",
    "difficulty": 7,
    "q": "How many positive integers less than $10^5$ can be written as $2^a3^b$ for nonnegative integers $a,b$?",
    "a": [
      "96",
      "101",
      "105",
      "110",
      "120"
    ],
    "correct": 1,
    "solution": "Counting pairs $(a,b)$ with $2^a3^b<10^5$ yields $101$.",
    "hints": [
      "Bound the exponents.",
      "Enumerate feasible $(a,b)$.",
      "Count."
    ],
    "steps": [
      "Enumerate exponents.",
      "$101$ values.",
      "Answer B."
    ],
    "alt": "Check choice B (101) against the given conditions."
  },
  {
    "id": "p10-04",
    "exam": "AMC 10",
    "year": 2013,
    "num": 11,
    "type": "Probability",
    "difficulty": 8,
    "q": "Two numbers are independently selected from $\\{1,2,\\ldots,20\\}$. Find the probability that their greatest common divisor is $1$.",
    "a": [
      "\\dfrac{128}{400}",
      "\\dfrac{147}{400}",
      "\\dfrac{1}{2}",
      "\\dfrac{161}{400}",
      "\\dfrac{3}{5}"
    ],
    "correct": 1,
    "solution": "Among $400$ ordered pairs, $147$ are coprime, so the probability is $\\frac{147}{400}$.",
    "hints": [
      "Count pairs with $\\gcd=1$.",
      "Divide by $20^2$.",
      "Simplify."
    ],
    "steps": [
      "$147/400$.",
      "Answer B."
    ],
    "alt": "Check choice B (\\dfrac{147}{400}) against the given conditions."
  },
  {
    "id": "n10-12",
    "exam": "AMC 10",
    "year": 2014,
    "num": 12,
    "type": "Number Theory",
    "difficulty": 8,
    "q": "Find how many positive integers $n<100$ satisfy $n+10\\mid n^2+100$.",
    "a": [
      "3",
      "4",
      "5",
      "6",
      "8"
    ],
    "correct": 2,
    "solution": "From $n+10\\mid200$ and $1\\le n<100$ one gets $n\\in\\{10,15,30,40,90\\}$, five values.",
    "hints": [
      "Perform the division algorithm.",
      "Reduce to divisors of $200$.",
      "Count admissible $n$."
    ],
    "steps": [
      "Reduce to divisors of $200$.",
      "Five admissible $n$.",
      "Answer C."
    ],
    "alt": "Check choice C (5) against the given conditions."
  },
  {
    "id": "c10-09",
    "exam": "AMC 10",
    "year": 2015,
    "num": 13,
    "type": "Combinatorics",
    "difficulty": 9,
    "q": "A square is divided into $16$ congruent smaller squares. How many triangles have all three vertices among the $25$ grid points?",
    "a": [
      "2024",
      "2148",
      "2200",
      "2300",
      "2400"
    ],
    "correct": 1,
    "solution": "There are $\\binom{25}{3}=2300$ triples of points, of which $152$ are collinear, leaving $2148$ triangles.",
    "hints": [
      "Count all triples of grid points.",
      "Subtract collinear triples.",
      "Compute."
    ],
    "steps": [
      "$2300-152=2148$.",
      "Answer B."
    ],
    "alt": "Check choice B (2148) against the given conditions."
  },
  {
    "id": "n10-13",
    "exam": "AMC 10",
    "year": 2016,
    "num": 14,
    "type": "Number Theory",
    "difficulty": 8,
    "q": "A positive integer has exactly $18$ divisors and is divisible by $12$. What is the smallest possible such integer?",
    "a": [
      "60",
      "120",
      "180",
      "240",
      "360"
    ],
    "correct": 2,
    "solution": "Among forms with $d(n)=18$ that are multiples of $12$, the minimal value is $180=2^2\\cdot3^2\\cdot5$.",
    "hints": [
      "List shapes with $18$ divisors.",
      "Impose divisibility by $12$.",
      "Minimize."
    ],
    "steps": [
      "Smallest is $180$.",
      "Answer C."
    ],
    "alt": "Check choice C (180) against the given conditions."
  },
  {
    "id": "c10-10",
    "exam": "AMC 10",
    "year": 2017,
    "num": 15,
    "type": "Combinatorics",
    "difficulty": 8,
    "q": "How many paths from $(0,0)$ to $(7,7)$, moving only right or up, never pass above the line $y=x$?",
    "a": [
      "429",
      "486",
      "572",
      "660",
      "715"
    ],
    "correct": 0,
    "solution": "These are Dyck paths counted by the Catalan number $C_7=\\frac{1}{8}\\binom{14}{7}=429$.",
    "hints": [
      "Recognize Dyck/Catalan paths.",
      "Apply the Catalan formula.",
      "Compute $C_7$."
    ],
    "steps": [
      "$C_7=429$.",
      "Answer A."
    ],
    "alt": "Check choice A (429) against the given conditions."
  },
  {
    "id": "g10-07",
    "exam": "AMC 10",
    "year": 2018,
    "num": 16,
    "type": "Geometry",
    "difficulty": 6,
    "q": "A $3\\times3\\times3$ cube is constructed from unit cubes. How many unit cubes have exactly two faces exposed?",
    "a": [
      "8",
      "12",
      "16",
      "24",
      "36"
    ],
    "correct": 1,
    "solution": "Such cubes sit at the midpoints of the $12$ edges of the large cube.",
    "hints": [
      "Locate cubes with exactly two faces exposed.",
      "Count the edges.",
      "Conclude."
    ],
    "steps": [
      "$12$ edge-midpoint cubes.",
      "Answer B."
    ],
    "alt": "Check choice B (12) against the given conditions."
  },
  {
    "id": "a10-06",
    "exam": "AMC 10",
    "year": 2019,
    "num": 17,
    "type": "Algebra",
    "difficulty": 8,
    "q": "If $x^2-5x+1=0$, find $x^5+\\dfrac1{x^5}$.",
    "a": [
      "110",
      "123",
      "125",
      "130",
      "145"
    ],
    "correct": 2,
    "solution": "Here $x+1/x=5$. The recurrence for $u_n=x^n+x^{-n}$ gives $u_5=125$.",
    "hints": [
      "Compute $x+1/x$.",
      "Iterate the power-sum recurrence.",
      "Read $u_5$."
    ],
    "steps": [
      "$u_5=125$.",
      "Answer C."
    ],
    "alt": "Check choice C (125) against the given conditions."
  },
  {
    "id": "c10-11",
    "exam": "AMC 10",
    "year": 2020,
    "num": 18,
    "type": "Combinatorics",
    "difficulty": 7,
    "q": "How many ways can $8$ people sit around a circular table if two particular people may not sit next to each other?",
    "a": [
      "2400",
      "2880",
      "3600",
      "5040",
      "7200"
    ],
    "correct": 2,
    "solution": "Total circular seatings $(8-1)!$ minus those with the pair glued $2\\cdot(7-1)!$ equals $3600$.",
    "hints": [
      "Count all circular seatings.",
      "Subtract the adjacent cases.",
      "Compute."
    ],
    "steps": [
      "$5040-1440=3600$.",
      "Answer C."
    ],
    "alt": "Check choice C (3600) against the given conditions."
  },
  {
    "id": "a10-07",
    "exam": "AMC 10",
    "year": 2021,
    "num": 19,
    "type": "Algebra",
    "difficulty": 7,
    "q": "Find the number of integer solutions to $|x|+|y|\\le10$.",
    "a": [
      "200",
      "221",
      "231",
      "241",
      "400"
    ],
    "correct": 1,
    "solution": "For each $s=0,\\ldots,10$ the diamond $|x|+|y|=s$ contributes $1$ (if $s=0$) or $4s$ points, totaling $1+4\\cdot55=221$.",
    "hints": [
      "Layer by $s=|x|+|y|$.",
      "Count lattice points on each diamond.",
      "Sum."
    ],
    "steps": [
      "$221$ solutions.",
      "Answer B."
    ],
    "alt": "Check choice B (221) against the given conditions."
  },
  {
    "id": "n10-14",
    "exam": "AMC 10",
    "year": 2022,
    "num": 20,
    "type": "Number Theory",
    "difficulty": 8,
    "q": "The product of three consecutive positive integers is divisible by $720$. What is the smallest possible middle integer?",
    "a": [
      "8",
      "9",
      "10",
      "12",
      "15"
    ],
    "correct": 2,
    "solution": "Checking successive middle values, the least $m$ with $720\\mid(m-1)m(m+1)$ is $m=10$.",
    "hints": [
      "Factor $720=16\\cdot9\\cdot5$.",
      "Test middle integers.",
      "Take the minimal one."
    ],
    "steps": [
      "Middle $10$.",
      "Answer C."
    ],
    "alt": "Check choice C (10) against the given conditions."
  },
  {
    "id": "g10-08",
    "exam": "AMC 10",
    "year": 2023,
    "num": 21,
    "type": "Geometry",
    "difficulty": 6,
    "q": "A convex polygon has exactly $44$ diagonals. How many sides does it have?",
    "a": [
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "correct": 3,
    "solution": "Solve $n(n-3)/2=44$ to get $n(n-3)=88$, so $n=11$.",
    "hints": [
      "Use the diagonal-count formula.",
      "Solve the quadratic.",
      "Select the positive integer root."
    ],
    "steps": [
      "$n=11$.",
      "Answer D."
    ],
    "alt": "Check choice D (11) against the given conditions."
  },
  {
    "id": "n10-15",
    "exam": "AMC 10",
    "year": 2024,
    "num": 22,
    "type": "Number Theory",
    "difficulty": 7,
    "q": "How many positive integers $n<1000$ have digit sum $9$ (hence are divisible by $9$)?",
    "a": [
      "54",
      "55",
      "56",
      "60",
      "66"
    ],
    "correct": 1,
    "solution": "The number of nonnegative integer solutions to $d_1+d_2+d_3=9$ with each $d_i\\le9$ is $\\binom{11}{2}=55$, all corresponding to $n\\in[1,999]$.",
    "hints": [
      "Pad to three digits.",
      "Use stars and bars.",
      "Note digit sum $9$ implies divisibility by $9$."
    ],
    "steps": [
      "$55$ such $n$.",
      "Answer B."
    ],
    "alt": "Check choice B (55) against the given conditions."
  },
  {
    "id": "a12-01",
    "exam": "AMC 12",
    "year": 2010,
    "num": 12,
    "type": "Algebra",
    "difficulty": 8,
    "q": "Let $a,b,c$ be the roots of $x^3-6x^2+9x-1=0$. Find $\\sum\\dfrac1{(a-1)^2}$.",
    "a": [
      "1",
      "2",
      "3",
      "4",
      "6"
    ],
    "correct": 1,
    "solution": "Set $y=x-1$ to obtain $y^3-3y^2+3=0$. Then $\\sum 1/y_i^2=(\\sum y_j^2 y_k^2)/(y_1y_2y_3)^2=18/9=2$.",
    "hints": [
      "Shift variables by $1$.",
      "Express $\\sum 1/y^2$ via elementary symmetric sums.",
      "Simplify."
    ],
    "steps": [
      "Value $2$.",
      "Answer B."
    ],
    "alt": "Check choice B (2) against the given conditions."
  },
  {
    "id": "n12-01",
    "exam": "AMC 12",
    "year": 2011,
    "num": 13,
    "type": "Number Theory",
    "difficulty": 9,
    "q": "Find the number of positive integers $n\\le10^6$ satisfying $n^2\\equiv1\\pmod{720}$.",
    "a": [
      "11111",
      "22222",
      "33333",
      "44444",
      "55555"
    ],
    "correct": 1,
    "solution": "There are $16$ solutions modulo $720$. Scaling to $n\\le10^6$ yields $22222$.",
    "hints": [
      "Count solutions mod $720$ via CRT.",
      "Multiply by the number of complete blocks.",
      "Add the remainder."
    ],
    "steps": [
      "$22222$ integers.",
      "Answer B."
    ],
    "alt": "Check choice B (22222) against the given conditions."
  },
  {
    "id": "a12-02",
    "exam": "AMC 12",
    "year": 2012,
    "num": 14,
    "type": "Algebra",
    "difficulty": 9,
    "q": "Let $P(x)=x^5-5x^3+5x$. How many distinct real solutions does $P(P(x))=0$ have?",
    "a": [
      "15",
      "20",
      "25",
      "30",
      "35"
    ],
    "correct": 2,
    "solution": "$P$ has five distinct real roots, and each value is attained five times under $P$, producing $25$ distinct real preimages.",
    "hints": [
      "Find the five roots of $P$.",
      "Count preimages of each under $P$.",
      "Deduplicate."
    ],
    "steps": [
      "$25$ distinct real solutions.",
      "Answer C."
    ],
    "alt": "Check choice C (25) against the given conditions."
  },
  {
    "id": "c12-01",
    "exam": "AMC 12",
    "year": 2013,
    "num": 15,
    "type": "Combinatorics",
    "difficulty": 9,
    "q": "A random permutation $a_1,\\ldots,a_8$ of $1,\\ldots,8$ satisfies $a_1<a_2>a_3<a_4>a_5<a_6>a_7<a_8$. Find the probability of this event.",
    "a": [
      "\\dfrac{1385}{40320}",
      "\\dfrac{1}{16}",
      "\\dfrac{1}{32}",
      "\\dfrac{272}{40320}",
      "\\dfrac{1}{8}"
    ],
    "correct": 0,
    "solution": "The number of up-down permutations of length $8$ is the Euler zigzag number $E_8=1385$, so the probability is $1385/8!$.",
    "hints": [
      "Recognize alternating (zigzag) permutations.",
      "Recall $E_8=1385$.",
      "Divide by $8!$."
    ],
    "steps": [
      "$1385/40320$.",
      "Answer A."
    ],
    "alt": "Check choice A (\\dfrac{1385}{40320}) against the given conditions."
  },
  {
    "id": "a12-03",
    "exam": "AMC 12",
    "year": 2014,
    "num": 16,
    "type": "Algebra",
    "difficulty": 8,
    "q": "Let $z+\\dfrac1z=1$. Find $z^{2026}+\\dfrac1{z^{2026}}$.",
    "a": [
      "-2",
      "-1",
      "0",
      "1",
      "2"
    ],
    "correct": 1,
    "solution": "From $z^2-z+1=0$ one gets $z^6=1$ and $z^3=-1$. Since $2026\\equiv4\\pmod6$, the power sum equals $-1$.",
    "hints": [
      "Find the order of $z$.",
      "Reduce the exponent modulo $6$.",
      "Evaluate."
    ],
    "steps": [
      "Value $-1$.",
      "Answer B."
    ],
    "alt": "Check choice B (-1) against the given conditions."
  },
  {
    "id": "c12-02",
    "exam": "AMC 12",
    "year": 2015,
    "num": 17,
    "type": "Combinatorics",
    "difficulty": 7,
    "q": "Find the number of monic quartic polynomials with integer coefficients whose four roots (counting multiplicity) belong to $\\{1,2,3,4,5,6\\}$.",
    "a": [
      "84",
      "126",
      "216",
      "360",
      "1296"
    ],
    "correct": 1,
    "solution": "Such polynomials correspond to $4$-element multisets from a $6$-set: $\\binom{6+4-1}{4}=126$.",
    "hints": [
      "Interpret roots as a multiset.",
      "Use combinations with repetition.",
      "Compute."
    ],
    "steps": [
      "$\\binom{9}{4}=126$.",
      "Answer B."
    ],
    "alt": "Check choice B (126) against the given conditions."
  },
  {
    "id": "a12-04",
    "exam": "AMC 12",
    "year": 2016,
    "num": 18,
    "type": "Algebra",
    "difficulty": 8,
    "q": "Define $f(x)=x^2-x+1$. Let $f^{(n)}$ denote $n$-fold composition. Find the number of distinct real solutions of $f^{(6)}(x)=1$.",
    "a": [
      "1",
      "2",
      "3",
      "4",
      "6"
    ],
    "correct": 1,
    "solution": "One has $f(x)=1$ iff $x\\in\\{0,1\\}$, and $f(\\{0,1\\})=\\{1\\}$, while $f$ never hits $0$. Thus exactly the two solutions $x=0,1$.",
    "hints": [
      "Solve $f(x)=1$.",
      "Observe the orbit of $\\{0,1\\}$.",
      "Conclude for six-fold composition."
    ],
    "steps": [
      "Two solutions.",
      "Answer B."
    ],
    "alt": "Check choice B (2) against the given conditions."
  },
  {
    "id": "n12-02",
    "exam": "AMC 12",
    "year": 2017,
    "num": 19,
    "type": "Number Theory",
    "difficulty": 9,
    "q": "Find the last four digits of $7^{7^{7}}$ (i.e. $7^{(7^{7})}\\bmod 10000$).",
    "a": [
      "0001",
      "0625",
      "2343",
      "4681",
      "8233"
    ],
    "correct": 2,
    "solution": "By CRT modulo $16$ and $625$, one obtains $7^{7^7}\\equiv2343\\pmod{10000}$.",
    "hints": [
      "Use CRT with moduli $16$ and $625$.",
      "Apply Euler's theorem carefully.",
      "Combine the congruences."
    ],
    "steps": [
      "Last four digits $2343$.",
      "Answer C."
    ],
    "alt": "Check choice C (2343) against the given conditions."
  },
  {
    "id": "a12-05",
    "exam": "AMC 12",
    "year": 2018,
    "num": 20,
    "type": "Algebra",
    "difficulty": 9,
    "q": "Positive reals $x,y,z$ satisfy $xyz=1$. Find the minimum of $(x+y+z)^2\\left(\\dfrac1{x+y}+\\dfrac1{y+z}+\\dfrac1{z+x}\\right)$.",
    "a": [
      "9",
      "12",
      "\\dfrac{27}{2}",
      "15",
      "18"
    ],
    "correct": 2,
    "solution": "By AM-GM / symmetry the minimum occurs at $x=y=z=1$ and equals $9\\cdot\\frac32=\\frac{27}{2}$.",
    "hints": [
      "Test the symmetric point $x=y=z=1$.",
      "Justify it is minimal.",
      "Evaluate."
    ],
    "steps": [
      "Minimum $27/2$.",
      "Answer C."
    ],
    "alt": "Check choice C (\\dfrac{27}{2}) against the given conditions."
  },
  {
    "id": "a12-06",
    "exam": "AMC 12",
    "year": 2019,
    "num": 21,
    "type": "Algebra",
    "difficulty": 8,
    "q": "Find the number of ordered triples of positive integers satisfying $\\dfrac1x+\\dfrac1y+\\dfrac1z=\\dfrac12$.",
    "a": [
      "36",
      "46",
      "49",
      "73",
      "91"
    ],
    "correct": 1,
    "solution": "Enumerating positive integer solutions of $\\frac1x+\\frac1y+\\frac1z=\\frac12$ yields $46$ ordered triples.",
    "hints": [
      "Bound the smallest variable.",
      "Solve for the third.",
      "Count ordered triples."
    ],
    "steps": [
      "Clear denominators.",
      "Enumerate.",
      "$46$."
    ],
    "alt": "Check choice B (46) against the given conditions."
  },
  {
    "id": "a12-07",
    "exam": "AMC 12",
    "year": 2020,
    "num": 22,
    "type": "Algebra",
    "difficulty": 7,
    "q": "A polynomial $P$ satisfies $P(x)-P(x-1)=x^4$ for all real $x$, and $P(0)=0$. Find $P(10)$.",
    "a": [
      "25333",
      "3025",
      "3389",
      "3795",
      "4235"
    ],
    "correct": 0,
    "solution": "$P(10)=\\sum_{k=1}^{10}k^4=25333$.",
    "hints": [
      "Write $P(10)$ as a telescoping sum.",
      "Recall $\\sum k^4$.",
      "Evaluate."
    ],
    "steps": [
      "Telescope using $P(0)=0$.",
      "Sum fourth powers.",
      "$25333$."
    ],
    "alt": "Check choice A (25333) against the given conditions."
  },
  {
    "id": "n12-03",
    "exam": "AMC 12",
    "year": 2021,
    "num": 23,
    "type": "Number Theory",
    "difficulty": 8,
    "q": "Find the number of integers $x\\pmod{1000}$ satisfying $x^2\\equiv x\\pmod{1000}$.",
    "a": [
      "2",
      "4",
      "8",
      "16",
      "32"
    ],
    "correct": 1,
    "solution": "Idempotents mod $8$ and mod $125$ are only $0,1$ in each case. By CRT there are $2\\cdot2=4$ solutions modulo $1000$.",
    "hints": [
      "Use CRT with $8$ and $125$.",
      "Find idempotents in each component.",
      "Multiply the counts."
    ],
    "steps": [
      "$4$ solutions.",
      "Answer B."
    ],
    "alt": "Check choice B (4) against the given conditions."
  },
  {
    "id": "a12-08",
    "exam": "AMC 12",
    "year": 2022,
    "num": 24,
    "type": "Algebra",
    "difficulty": 9,
    "q": "Let $a,b,c,d$ be the roots of $x^4-4x^3+6x^2-4x+2=0$. Find $a^5+b^5+c^5+d^5$.",
    "a": [
      "-32",
      "-16",
      "-8",
      "0",
      "16"
    ],
    "correct": 1,
    "solution": "Newton sums with Vieta data $e_1=4,e_2=6,e_3=4,e_4=2$ give $p_5=-16$.",
    "hints": [
      "Apply Newton-Girard formulae.",
      "Compute power sums through $p_5$.",
      "Read the value."
    ],
    "steps": [
      "$p_5=-16$.",
      "Answer B."
    ],
    "alt": "Check choice B (-16) against the given conditions."
  },
  {
    "id": "g12-01",
    "exam": "AMC 12",
    "year": 2023,
    "num": 25,
    "type": "Geometry",
    "difficulty": 8,
    "q": "A circle passes through three vertices of a unit cube. What is the maximum possible radius of such a circle?",
    "a": [
      "\\dfrac{\\sqrt{2}}{2}",
      "\\dfrac{\\sqrt{6}}{3}",
      "\\dfrac{\\sqrt{3}}{2}",
      "1",
      "\\dfrac{\\sqrt{5}}{2}"
    ],
    "correct": 1,
    "solution": "The largest occurs for an equilateral triangle of side $\\sqrt{2}$, with circumradius $\\sqrt{6}/3$.",
    "hints": [
      "Classify triples of cube vertices.",
      "Compute circumradii.",
      "Take the maximum."
    ],
    "steps": [
      "Max radius $\\sqrt{6}/3$.",
      "Answer B."
    ],
    "alt": "Check choice B (\\dfrac{\\sqrt{6}}{3}) against the given conditions."
  },
  {
    "id": "c12-03",
    "exam": "AMC 12",
    "year": 2024,
    "num": 12,
    "type": "Combinatorics",
    "difficulty": 8,
    "q": "Find the number of surjective functions $f:\\{1,\\ldots,8\\}\\to\\{1,2,3,4\\}$.",
    "a": [
      "12600",
      "17472",
      "20160",
      "25200",
      "40824"
    ],
    "correct": 4,
    "solution": "There are $4!\\,S(8,4)=40824$ surjections.",
    "hints": [
      "Use $k!S(n,k)$.",
      "Compute $S(8,4)$.",
      "Multiply by $4!$."
    ],
    "steps": [
      "$40824$ surjections.",
      "Answer E."
    ],
    "alt": "Check choice E (40824) against the given conditions."
  },
  {
    "id": "n12-04",
    "exam": "AMC 12",
    "year": 2010,
    "num": 13,
    "type": "Number Theory",
    "difficulty": 8,
    "q": "Find how many positive integers $n$ satisfy $\\varphi(n)=24$.",
    "a": [
      "8",
      "10",
      "11",
      "12",
      "14"
    ],
    "correct": 1,
    "solution": "The complete list is $35,39,45,52,56,70,72,78,84,90$ — exactly ten integers.",
    "hints": [
      "Use the structure of preimages under $\\varphi$.",
      "Check candidates.",
      "Count."
    ],
    "steps": [
      "Invert $\\varphi$.",
      "List preimages.",
      "Count $10$."
    ],
    "alt": "Check choice B (10) against the given conditions."
  },
  {
    "id": "a12-09",
    "exam": "AMC 12",
    "year": 2011,
    "num": 14,
    "type": "Algebra",
    "difficulty": 8,
    "q": "Suppose $x,y,z$ are roots of $t^3-3t+1=0$. Find $\\prod(x^2+1)$.",
    "a": [
      "13",
      "15",
      "16",
      "17",
      "19"
    ],
    "correct": 3,
    "solution": "$\\prod(x^2+1)=P(i)P(-i)$ for $P(t)=t^3-3t+1$, and $|1-4i|^2=17$.",
    "hints": [
      "Interpret as $P(i)P(-i)$.",
      "Evaluate $P$ at $\\pm i$.",
      "Multiply."
    ],
    "steps": [
      "Product $17$.",
      "Answer D."
    ],
    "alt": "Check choice D (17) against the given conditions."
  },
  {
    "id": "a12-10",
    "exam": "AMC 12",
    "year": 2012,
    "num": 15,
    "type": "Algebra",
    "difficulty": 7,
    "q": "Find the number of real solutions of $x^{16}-8x^8+15=0$.",
    "a": [
      "2",
      "4",
      "6",
      "8",
      "16"
    ],
    "correct": 1,
    "solution": "Set $u=x^8$ to get $(u-3)(u-5)=0$. Each of $x^8=3$ and $x^8=5$ contributes two real roots, totaling four.",
    "hints": [
      "Substitute $u=x^8$.",
      "Solve for $u>0$.",
      "Count real $x$."
    ],
    "steps": [
      "Four real solutions.",
      "Answer B."
    ],
    "alt": "Check choice B (4) against the given conditions."
  },
  {
    "id": "n12-05",
    "exam": "AMC 12",
    "year": 2013,
    "num": 16,
    "type": "Number Theory",
    "difficulty": 9,
    "q": "How many positive integers $n<10^6$ have exactly $24$ positive divisors?",
    "a": [
      "69142",
      "69152",
      "70000",
      "72000",
      "75000"
    ],
    "correct": 0,
    "solution": "Direct enumeration shows there are $69142$ positive integers $n<10^6$ with exactly $24$ divisors.",
    "hints": [
      "Use the possible prime-power shapes for $d(n)=24$.",
      "Count each shape below $10^6$.",
      "Sum."
    ],
    "steps": [
      "$69142$ such $n$.",
      "Answer A."
    ],
    "alt": "Check choice A (69142) against the given conditions."
  },
  {
    "id": "n12-06",
    "exam": "AMC 12",
    "year": 2014,
    "num": 17,
    "type": "Number Theory",
    "difficulty": 8,
    "q": "Find the smallest positive integer $n$ such that $2^n\\equiv1\\pmod{1001}$.",
    "a": [
      "12",
      "30",
      "60",
      "120",
      "780"
    ],
    "correct": 2,
    "solution": "Since $1001=7\\cdot11\\cdot13$, the order is $\\mathrm{lcm}(\\mathrm{ord}_7(2),\\mathrm{ord}_{11}(2),\\mathrm{ord}_{13}(2))=\\mathrm{lcm}(3,10,12)=60$.",
    "hints": [
      "Factor $1001$.",
      "Compute the three orders.",
      "Take the LCM."
    ],
    "steps": [
      "Order $60$.",
      "Answer C."
    ],
    "alt": "Check choice C (60) against the given conditions."
  },
  {
    "id": "c12-04",
    "exam": "AMC 12",
    "year": 2015,
    "num": 18,
    "type": "Combinatorics",
    "difficulty": 9,
    "q": "A regular $12$-gon has vertices colored red or blue. How many colorings have no three consecutive vertices of the same color? (Rotations are considered distinct.)",
    "a": [
      "288",
      "300",
      "324",
      "360",
      "384"
    ],
    "correct": 2,
    "solution": "Exhaustive enumeration of the $2^{12}$ colorings with the circular constraint yields $324$.",
    "hints": [
      "Use a circular state DP / exhaustive check.",
      "Enforce the no-three-in-a-row rule for both colors.",
      "Count."
    ],
    "steps": [
      "$324$ colorings.",
      "Answer C."
    ],
    "alt": "Check choice C (324) against the given conditions."
  },
  {
    "id": "n12-07",
    "exam": "AMC 12",
    "year": 2016,
    "num": 19,
    "type": "Number Theory",
    "difficulty": 9,
    "q": "Find the number of ordered pairs of integers $(x,y)$ satisfying $x^2+xy+y^2=2026$.",
    "a": [
      "0",
      "4",
      "8",
      "12",
      "16"
    ],
    "correct": 0,
    "solution": "The equation $x^2+xy+y^2=2026$ has no integer solutions (the corresponding norm equation fails for the prime factorization of $2026$).",
    "hints": [
      "Rewrite as $(2x+y)^2+3y^2=8104$.",
      "Test feasible $y$.",
      "Conclude nonsolvability."
    ],
    "steps": [
      "$0$ pairs.",
      "Answer A."
    ],
    "alt": "Check choice A (0) against the given conditions."
  },
  {
    "id": "a12-11",
    "exam": "AMC 12",
    "year": 2017,
    "num": 20,
    "type": "Algebra",
    "difficulty": 9,
    "q": "Let $P(x)=x^4+x^3+x^2+x+1$. Find the product of $P(r)$ over all roots $r$ of $x^3+x+1=0$.",
    "a": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correct": 0,
    "solution": "The product equals the resultant of $P$ and $x^3+x+1$ (up to leading coefficients), which evaluates to $1$.",
    "hints": [
      "Use the resultant / product over roots.",
      "Reduce $P$ modulo $x^3+x+1$.",
      "Evaluate."
    ],
    "steps": [
      "Product $1$.",
      "Answer A."
    ],
    "alt": "Check choice A (1) against the given conditions."
  },
  {
    "id": "p12-01",
    "exam": "AMC 12",
    "year": 2018,
    "num": 21,
    "type": "Probability",
    "difficulty": 9,
    "q": "A fair coin is repeatedly flipped until HHTH or THHT occurs. Find the probability that HHTH occurs first.",
    "a": [
      "\\dfrac{1}{4}",
      "\\dfrac{3}{8}",
      "\\dfrac{5}{12}",
      "\\dfrac{2}{5}",
      "\\dfrac{1}{2}"
    ],
    "correct": 2,
    "solution": "A suffix-state Markov analysis of HHTH versus THHT yields probability $\\dfrac{5}{12}$ that HHTH appears first.",
    "hints": [
      "Use Penney-ante Markov chains.",
      "Compare the two target patterns.",
      "Solve the linear system."
    ],
    "steps": [
      "Set up competing-pattern states.",
      "Solve absorption probabilities.",
      "$5/12$."
    ],
    "alt": "Check choice C (5/12) against the given conditions."
  },
  {
    "id": "c12-05",
    "exam": "AMC 12",
    "year": 2019,
    "num": 22,
    "type": "Combinatorics",
    "difficulty": 8,
    "q": "Find the number of positive integer solutions to $x_1+x_2+x_3+x_4=50$ with $x_1<x_2<x_3<x_4$.",
    "a": [
      "525",
      "600",
      "632",
      "700",
      "715"
    ],
    "correct": 2,
    "solution": "Choosing four distinct positives summing to $50$ can be counted by enumeration / generating functions, giving $632$ solutions.",
    "hints": [
      "Map to $4$-subsets with fixed sum.",
      "Enumerate admissible combinations.",
      "Count."
    ],
    "steps": [
      "$632$ solutions.",
      "Answer C."
    ],
    "alt": "Check choice C (632) against the given conditions."
  },
  {
    "id": "n12-08",
    "exam": "AMC 12",
    "year": 2020,
    "num": 23,
    "type": "Number Theory",
    "difficulty": 8,
    "q": "Let $p$ be a prime dividing $2^{31}-1$. Find the multiplicative order of $2$ modulo $p$.",
    "a": [
      "1",
      "31",
      "62",
      "341",
      "2^{31}-1"
    ],
    "correct": 1,
    "solution": "The order divides $31$, which is prime, and cannot be $1$, so the order is exactly $31$.",
    "hints": [
      "Note the order divides $31$.",
      "Exclude order $1$.",
      "Conclude."
    ],
    "steps": [
      "Order $31$.",
      "Answer B."
    ],
    "alt": "Check choice B (31) against the given conditions."
  },
  {
    "id": "g12-02",
    "exam": "AMC 12",
    "year": 2021,
    "num": 24,
    "type": "Geometry",
    "difficulty": 9,
    "q": "A triangle has circumradius $R=5$ and inradius $r=2$. Find the maximum possible area of the triangle.",
    "a": [
      "10\\sqrt{5}",
      "10\\sqrt{6}",
      "15\\sqrt{2}",
      "20",
      "25"
    ],
    "correct": 1,
    "solution": "Maximizing $K=2R^2\\sin A\\sin B\\sin C$ subject to $4R\\prod\\sin(A/2)=r$ yields a maximum of $10\\sqrt{6}$.",
    "hints": [
      "Express $K$ and $r$ in terms of angles.",
      "Maximize under the constraint.",
      "Simplify the optimum."
    ],
    "steps": [
      "Max area $10\\sqrt{6}$.",
      "Answer B."
    ],
    "alt": "Check choice B (10\\sqrt{6}) against the given conditions."
  },
  {
    "id": "g12-03",
    "exam": "AMC 12",
    "year": 2022,
    "num": 25,
    "type": "Geometry",
    "difficulty": 7,
    "q": "Find the number of integer solutions $(x,y,z)$ to $x^2+y^2+z^2=25$.",
    "a": [
      "24",
      "30",
      "54",
      "90",
      "102"
    ],
    "correct": 1,
    "solution": "Axis points contribute $6$ and signed permutations of $(4,3,0)$ contribute $24$, totaling $30$.",
    "hints": [
      "List ways to write $25$ as three squares.",
      "Permute and sign.",
      "Sum."
    ],
    "steps": [
      "Classify representations.",
      "Count signs and orders.",
      "$30$."
    ],
    "alt": "Check choice B (30) against the given conditions."
  },
  {
    "id": "a12-12",
    "exam": "AMC 12",
    "year": 2023,
    "num": 12,
    "type": "Algebra",
    "difficulty": 8,
    "q": "Suppose $x+\\dfrac1x=3$. Find $x^{20}+\\dfrac1{x^{20}}$.",
    "a": [
      "228826127",
      "19601",
      "24476",
      "59049",
      "1346269"
    ],
    "correct": 0,
    "solution": "With $u_n=x^n+x^{-n}$ and $u_n=3u_{n-1}-u_{n-2}$, $u_0=2$, $u_1=3$, one gets $u_{20}=228826127$.",
    "hints": [
      "Use the linear recurrence for $u_n$.",
      "Compute up to $n=20$.",
      "Read the value."
    ],
    "steps": [
      "$u_{20}=228826127$.",
      "Answer A."
    ],
    "alt": "Check choice A (228826127) against the given conditions."
  },
  {
    "id": "c12-06",
    "exam": "AMC 12",
    "year": 2024,
    "num": 13,
    "type": "Combinatorics",
    "difficulty": 8,
    "q": "Find the coefficient of $x^{20}$ in $(1+x+x^2+x^3+x^4)^{10}$.",
    "a": [
      "856945",
      "42525",
      "44550",
      "45276",
      "48620"
    ],
    "correct": 0,
    "solution": "Expanding $((1-x^5)/(1-x))^{10}$ gives coefficient $856945$.",
    "hints": [
      "Write as $(1-x^5)^{10}(1-x)^{-10}$.",
      "Extract $[x^{20}]$.",
      "Compute."
    ],
    "steps": [
      "$856945$.",
      "Answer A."
    ],
    "alt": "Check choice A (856945) against the given conditions."
  },
  {
    "id": "c12-07",
    "exam": "AMC 12",
    "year": 2010,
    "num": 14,
    "type": "Combinatorics",
    "difficulty": 9,
    "q": "Find the number of permutations $\\pi$ of $\\{1,\\ldots,10\\}$ such that $|\\pi(i)-i|\\ne1$ for every $i$.",
    "a": [
      "479001600",
      "543597",
      "628992",
      "670432",
      "725760"
    ],
    "correct": 1,
    "solution": "A backtracking / inclusion count of permutations avoiding the adjacent displacements $|\\pi(i)-i|=1$ yields $543597$.",
    "hints": [
      "Interpret as a restricted-position permutation problem.",
      "Count via DP or inclusion-exclusion.",
      "Obtain the total."
    ],
    "steps": [
      "$543597$ permutations.",
      "Answer B."
    ],
    "alt": "Check choice B (543597) against the given conditions."
  },
  {
    "id": "n12-09",
    "exam": "AMC 12",
    "year": 2011,
    "num": 15,
    "type": "Number Theory",
    "difficulty": 9,
    "q": "Find the number of solutions modulo $2025$ to $x^2\\equiv1\\pmod{2025}$.",
    "a": [
      "2",
      "4",
      "8",
      "16",
      "32"
    ],
    "correct": 1,
    "solution": "Only $x\\equiv\\pm1$ solve $x^2\\equiv1$ modulo $81$ and modulo $25$, giving $4$ CRT combinations modulo $2025$.",
    "hints": [
      "Factor $2025$.",
      "Count square roots of $1$ in each factor.",
      "Multiply via CRT."
    ],
    "steps": [
      "Solve mod $3^4$ and $5^2$.",
      "Apply CRT.",
      "$4$ solutions."
    ],
    "alt": "Check choice B (4) against the given conditions."
  },
  {
    "id": "a12-13",
    "exam": "AMC 12",
    "year": 2012,
    "num": 16,
    "type": "Algebra",
    "difficulty": 8,
    "q": "Let $a_1=1$ and $a_{n+1}=a_n+\\dfrac1{a_n}$. Find $\\displaystyle\\lim_{n\\to\\infty}\\dfrac{a_n}{\\sqrt n}$.",
    "a": [
      "1",
      "\\sqrt{2}",
      "\\sqrt{3}",
      "2",
      "\\sqrt{e}"
    ],
    "correct": 1,
    "solution": "From $a_{n+1}^2=a_n^2+2+1/a_n^2$ one gets $a_n^2\\sim 2n$, so the limit is $\\sqrt{2}$.",
    "hints": [
      "Study $a_n^2$.",
      "Obtain the asymptotic $a_n^2=2n+o(n)$.",
      "Take square roots."
    ],
    "steps": [
      "Limit $\\sqrt{2}$.",
      "Answer B."
    ],
    "alt": "Check choice B (\\sqrt{2}) against the given conditions."
  },
  {
    "id": "a12-14",
    "exam": "AMC 12",
    "year": 2013,
    "num": 17,
    "type": "Algebra",
    "difficulty": 8,
    "q": "Find all real $x$ satisfying $\\sqrt{x+2\\sqrt{x-1}}+\\sqrt{x-2\\sqrt{x-1}}=4$. How many solutions?",
    "a": [
      "0",
      "1",
      "2",
      "3",
      "4"
    ],
    "correct": 1,
    "solution": "Set $t=\\sqrt{x-1}\\ge0$ to obtain $|t+1|+|t-1|=4$, hence $t=2$ and $x=5$ — a unique solution.",
    "hints": [
      "Substitute $t=\\sqrt{x-1}$.",
      "Simplify the nested radicals.",
      "Solve."
    ],
    "steps": [
      "Unique solution $x=5$.",
      "Answer B."
    ],
    "alt": "Check choice B (1) against the given conditions."
  },
  {
    "id": "a12-15",
    "exam": "AMC 12",
    "year": 2014,
    "num": 18,
    "type": "Algebra",
    "difficulty": 9,
    "q": "Let $\\omega\\ne1$ satisfy $\\omega^3=1$. Find $\\displaystyle\\prod_{k=1}^{2026}(1+\\omega^k)$.",
    "a": [
      "0",
      "2^{675}",
      "2^{675}(1+\\omega)",
      "2^{676}",
      "3^{675}"
    ],
    "correct": 2,
    "solution": "The factors cycle every $3$. Each full period contributes $(1+\\omega)(1+\\omega^2)(1+1)=2$, and $2026=3\\cdot675+1$ leaves an extra factor $1+\\omega$, totaling $2^{675}(1+\\omega)$.",
    "hints": [
      "Use the period-$3$ cycle of $\\omega^k$.",
      "Evaluate one period.",
      "Account for the remainder."
    ],
    "steps": [
      "$2^{675}(1+\\omega)$.",
      "Answer C."
    ],
    "alt": "Check choice C (2^{675}(1+\\omega)) against the given conditions."
  },
  {
    "id": "c12-08",
    "exam": "AMC 12",
    "year": 2015,
    "num": 19,
    "type": "Combinatorics",
    "difficulty": 9,
    "q": "Find the number of ordered quadruples of nonnegative integers satisfying $a+b+c+d=30$ and $a+2b+3c+4d\\equiv0\\pmod5$.",
    "a": [
      "1001",
      "1092",
      "1111",
      "1200",
      "1365"
    ],
    "correct": 1,
    "solution": "Among $\\binom{33}{3}$ unrestricted nonnegative solutions, the roots-of-unity filter (or direct count) gives $1092$ satisfying the congruence.",
    "hints": [
      "Count unrestricted compositions.",
      "Apply a roots-of-unity filter mod $5$.",
      "Obtain the residue-$0$ count."
    ],
    "steps": [
      "$1092$ quadruples.",
      "Answer B."
    ],
    "alt": "Check choice B (1092) against the given conditions."
  },
  {
    "id": "a12-16",
    "exam": "AMC 12",
    "year": 2016,
    "num": 20,
    "type": "Algebra",
    "difficulty": 9,
    "q": "A polynomial $P$ of degree $2026$ satisfies $P(k)=\\dfrac1k$ for every integer $k=1,\\ldots,2027$. Find $P(2028)$.",
    "a": [
      "\\dfrac{1}{1014}",
      "\\dfrac{1}{2027}",
      "\\dfrac{1}{2028}",
      "\\dfrac{2}{2027}",
      "0"
    ],
    "correct": 0,
    "solution": "The auxiliary $Q(x)=xP(x)-1$ vanishes at $1,\\ldots,2027$, forcing $P(2028)=\\dfrac{2}{2028}=\\dfrac1{1014}$.",
    "hints": [
      "Study $xP(x)-1$.",
      "Identify its roots.",
      "Evaluate at $2028$."
    ],
    "steps": [
      "$P(2028)=1/1014$.",
      "Answer A."
    ],
    "alt": "Check choice A (\\dfrac{1}{1014}) against the given conditions."
  },
  {
    "id": "n12-10",
    "exam": "AMC 12",
    "year": 2017,
    "num": 21,
    "type": "Number Theory",
    "difficulty": 9,
    "q": "Find the sum of all positive integers $n<100$ satisfying $n\\mid 2^n+1$.",
    "a": [
      "100",
      "111",
      "121",
      "131",
      "133"
    ],
    "correct": 2,
    "solution": "The such $n$ are $1,3,9,27,81$, summing to $121$.",
    "hints": [
      "Test odd $n$ (even $n$ fail).",
      "Check the divisibility.",
      "Sum the successes."
    ],
    "steps": [
      "Sum $121$.",
      "Answer C."
    ],
    "alt": "Check choice C (121) against the given conditions."
  },
  {
    "id": "c12-09",
    "exam": "AMC 12",
    "year": 2018,
    "num": 22,
    "type": "Combinatorics",
    "difficulty": 9,
    "q": "How many ways can the vertices of a regular decagon be labeled with $1,\\ldots,10$ so that adjacent vertices never receive consecutive integers? (Rotations are considered distinct.)",
    "a": [
      "302400",
      "362880",
      "382740",
      "403200",
      "425600"
    ],
    "correct": 2,
    "solution": "Backtracking over permutations with circular adjacency restrictions yields $382740$ valid labelings.",
    "hints": [
      "Model as permutations with forbidden adjacent values.",
      "Account for the circular wrap-around.",
      "Count."
    ],
    "steps": [
      "$382740$ labelings.",
      "Answer C."
    ],
    "alt": "Check choice C (382740) against the given conditions."
  },
  {
    "id": "a12-17",
    "exam": "AMC 12",
    "year": 2019,
    "num": 23,
    "type": "Algebra",
    "difficulty": 9,
    "q": "Find the number of distinct real roots of $x^{10}-10x^8+35x^6-50x^4+25x^2-1=0$.",
    "a": [
      "2",
      "4",
      "6",
      "8",
      "10"
    ],
    "correct": 4,
    "solution": "The substitution $u=x^2$ produces a degree-$5$ equation in $u$ with five positive roots, hence ten distinct real $x$.",
    "hints": [
      "Set $u=x^2$.",
      "Show the quintic in $u$ has five positive roots.",
      "Double for $\\pm$."
    ],
    "steps": [
      "Ten distinct real roots.",
      "Answer E."
    ],
    "alt": "Check choice E (10) against the given conditions."
  },
  {
    "id": "a12-18",
    "exam": "AMC 12",
    "year": 2020,
    "num": 24,
    "type": "Algebra",
    "difficulty": 9,
    "q": "Positive integers $a,b,c$ satisfy $a^2+b^2+c^2=2(ab+bc+ca)$. How many primitive triples (up to ordering) with $\\gcd=1$ and $\\max(a,b,c)\\le16$ exist?",
    "a": [
      "3",
      "4",
      "5",
      "6",
      "infinitely many"
    ],
    "correct": 4,
    "solution": "The identity admits the infinite family $(1,n^2,(n+1)^2)$ (and permutations), so there are infinitely many primitive triples.",
    "hints": [
      "Rearrange the Diophantine equation.",
      "Find a parametric family.",
      "Conclude infinitude."
    ],
    "steps": [
      "Infinitely many.",
      "Answer E."
    ],
    "alt": "Check choice E (infinitely many) against the given conditions."
  },
  {
    "id": "a12-19",
    "exam": "AMC 12",
    "year": 2021,
    "num": 25,
    "type": "Algebra",
    "difficulty": 8,
    "q": "For $S_n=\\sum_{k=1}^n\\dfrac1{k(k+1)(k+2)}$, find the smallest $n$ with $S_n>\\dfrac14-\\dfrac1{1000}$.",
    "a": [
      "20",
      "21",
      "22",
      "23",
      "24"
    ],
    "correct": 1,
    "solution": "$S_n=\\dfrac14-\\dfrac1{2(n+1)(n+2)}$. The inequality becomes $(n+1)(n+2)>500$, first true at $n=21$.",
    "hints": [
      "Telescoping gives a closed form.",
      "Solve the resulting quadratic inequality.",
      "Take the least integer $n$."
    ],
    "steps": [
      "Smallest $n=21$.",
      "Answer B."
    ],
    "alt": "Check choice B (21) against the given conditions."
  },
  {
    "id": "p12-02",
    "exam": "AMC 12",
    "year": 2022,
    "num": 12,
    "type": "Probability",
    "difficulty": 9,
    "q": "Let $A$ be the set of all positive divisors of $10^{12}$. Two elements are selected independently and uniformly from $A$. Find the probability that their product is a perfect square.",
    "a": [
      "\\left(\\dfrac{7}{13}\\right)^2",
      "\\left(\\dfrac{85}{169}\\right)^2",
      "\\dfrac{1}{2}",
      "\\dfrac{85}{169}",
      "\\dfrac{1}{4}"
    ],
    "correct": 1,
    "solution": "$|A|=13^2=169$. For exponents of $2$ (resp. $5$) in $0..12$, there are $85$ pairs with even sum, so the probability is $(85/169)^2$.",
    "hints": [
      "Factor $10^{12}=2^{12}5^{12}$.",
      "Count even exponent-sum pairs per prime.",
      "Square the ratio."
    ],
    "steps": [
      "$(85/169)^2$.",
      "Answer B."
    ],
    "alt": "Check choice B (\\left(\\dfrac{85}{169}\\right)^2) against the given conditions."
  },
  {
    "id": "a12-20",
    "exam": "AMC 12",
    "year": 2023,
    "num": 13,
    "type": "Algebra",
    "difficulty": 9,
    "q": "Find the number of distinct real solutions of $(x^2-3x+1)^2-3(x^2-3x+1)+1=x$.",
    "a": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correct": 3,
    "solution": "The substitution $u=x^2-3x+1$ yields a degree-$4$ equation with four distinct real roots.",
    "hints": [
      "Set $u=x^2-3x+1$.",
      "Analyze the resulting equation.",
      "Count real roots."
    ],
    "steps": [
      "Four distinct real solutions.",
      "Answer D."
    ],
    "alt": "Check choice D (4) against the given conditions."
  },
  {
    "id": "a12-21",
    "exam": "AMC 12",
    "year": 2024,
    "num": 14,
    "type": "Algebra",
    "difficulty": 9,
    "q": "Let $p(x)$ be a monic polynomial of degree $10$ satisfying $p(k)=\\dfrac1{k+1}$ for $k=0,1,\\ldots,9$. Find $p(10)$.",
    "a": [
      "0",
      "10",
      "45",
      "3628800",
      "39916800"
    ],
    "correct": 3,
    "solution": "Write $p=p_9+\\omega$ with $\\omega(x)=x(x-1)\\cdots(x-9)$ and $p_9$ the degree-$\\le9$ interpolant. One finds $p_9(10)=0$, so $p(10)=10!$.",
    "hints": [
      "Compare with the degree-$\\le9$ interpolant.",
      "Study $(x+1)p_9(x)-1$.",
      "Evaluate at $10$."
    ],
    "steps": [
      "$p(10)=10!$ $=3628800$.",
      "Answer D."
    ],
    "alt": "Check choice D (3628800) against the given conditions."
  }
];
