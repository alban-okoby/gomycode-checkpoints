# Unfamiliar Data Structures & Algorithms

This document outlines data structures and algorithms I am currently not fully confident with. It includes a brief summary of my understanding, the challenges I'm facing, and the steps I plan to take for mastery.

---

## 1. Splay Tree

**Understanding:**  
I understand that splay trees are self-adjusting binary search trees where recently accessed elements are moved to the root using tree rotations (zig, zig-zig, zig-zag). This improves access times for frequently accessed nodes over time.

**Challenge:**  
The idea of amortized time complexity is harder to grasp intuitively. The rotation operations (especially the combinations) feel abstract without hands-on implementation.

**Goal:**  
- Implement a basic Splay Tree in Python or Java.
- Visualize the splaying process for different operations: `insert`, `delete`, `search`.
- Compare performance with AVL and Red-Black Trees for access-heavy workloads.

---

## 2. Trie (Prefix Tree)

**Understanding:**  
Tries are used for efficient retrieval of strings, especially in problems like autocomplete, dictionary lookups, and IP routing. Each node represents a character in a word.

**Challenge:**  
- Managing memory efficiently when many nodes have only one child.
- Deleting words and handling shared prefixes can be tricky and error-prone.

**Goal:**  
- Build a Trie that supports `insert`, `search`, and `delete`.
- Experiment with optimization strategies like storing nodes in arrays vs. hash maps.
- Explore compressed tries (Radix Trees) to save space.

---

## 3. Union-Find / Disjoint Set Union (DSU)

**Understanding:**  
Used to manage a collection of disjoint sets and perform operations like `find` (identify set of an element) and `union` (merge two sets). Common in Kruskal's MST algorithm and network connectivity problems.

* Challenge:**  
- Path compression and union by rank are powerful, but their effect on time complexity is subtle and best understood with examples.
- Debugging recursive implementations of `find` can be hard.

**Goal:**  
- Implement DSU with and without optimizations.
- Use it to solve real problems: connected components, Kruskal’s MST, etc.
- Visualize how the tree structures change with each operation.

---

## 4. Radix Sort

**Understanding:**  
Radix Sort is a non-comparative integer sorting algorithm that sorts numbers digit by digit starting from the least significant digit (LSD) or most significant digit (MSD), using a stable intermediate sort like counting sort.

**Challenge:**  
- Harder to visualize compared to comparison-based sorts.
- Handling negatives, variable-length numbers, or strings increases complexity.
- Stability is critical at every digit level, which isn’t intuitive initially.

**Goal:**  
- Implement LSD-based Radix Sort for integers.
- Extend it to sort strings or floating-point numbers.
- Compare with Quick Sort and Merge Sort in different scenarios.

---

## Next Steps

- Revisit [Visualgo.net](https://visualgo.net/en) for visual practice.
- Code each data structure/algorithm from scratch.
- Solve 2–3 problems from LeetCode/GeeksforGeeks involving each topic.
- Document findings and common pitfalls.

---

📚 *Learning is a journey*

Have happy learning, Alban 🐱‍👤
