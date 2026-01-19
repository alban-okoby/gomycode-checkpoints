# CleanKart: Refactor & Iterate an Online Shopping Cart

## Summary Report

## 1. What Changes Were Made and Why

The codebase was refactored iteratively to improve **readability**, **maintainability**, and **scalability**.  
Initial refactoring focused on:
- Renaming variables for clarity
- Extracting reusable functions
- Removing duplicated logic

Later iterations introduced **design patterns** to address structural issues such as rigid discount logic, tight coupling between components, and complex object creation.

---

## 2. Clean Code Principles Applied

The following clean code principles were applied throughout the refactoring process:

- Meaningful naming
- Single Responsibility Principle (SRP)
- Separation of concerns
- Small, focused functions
- Avoidance of global state
- Consistent formatting and structure

---

## 3. How Design Patterns Improved the Design

Several design patterns were introduced to enhance flexibility and maintainability:

- **Strategy Pattern**  
  Enabled flexible discount calculations without modifying cart logic.

- **Observer Pattern**  
  Allowed real-time notifications while keeping system components loosely coupled.

- **Builder Pattern**  
  Simplified the creation of complex product objects and improved overall readability.

---

## 4. Why Iterative Refactoring Matters

Refactoring in small, incremental steps ensured the system remained functional throughout development.  
This Agile-like approach:
- Reduces risk
- Continuously improves code quality
- Allows design patterns to be introduced only when they are truly needed
