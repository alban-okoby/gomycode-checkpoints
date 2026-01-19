# Introduction to Design Patterns and Procedural Programming

## Refactoring Challenge
The main challenge during the refactoring process was removing the reliance on **global variables**. In the original procedural version, the cart data was globally accessible, which made the implementation simple but risky. Any part of the program could modify the cart, increasing the likelihood of unintended side effects and bugs.

Transitioning to the Module Pattern required carefully deciding:
- Which data should remain **private**
- Which functions should be **exposed publicly**

This restructuring ensured that the internal cart state could no longer be modified directly from outside the module.

## Solution: Module Pattern
By encapsulating the shopping cart inside a **closure**, the Module Pattern provides:
- Protection of internal data
- A clearly defined public API
- Improved separation of concerns

This approach prevents accidental data modification and makes the codebase more predictable and robust.

## Benefits of Using a Design Pattern
Using a design pattern significantly improved the:
- **Readability** of the code
- **Maintainability** of the project
- **Testability** of individual components

It also makes future enhancements easier to implement. New features such as discounts, persistence (e.g., local storage), or checkout logic can be added without breaking existing functionality.

## When to Use Design Patterns
Design patterns are especially valuable as applications grow in size or complexity. While procedural programming may be sufficient for small scripts, it becomes harder to manage in larger projects.

A design pattern is the better choice when:
- Building reusable components
- Working on collaborative projects
- Developing applications that require long-term maintenance

## Conclusion
Design patterns promote consistency, reduce bugs, and encourage best practices. Refactoring the shopping cart using the Module Pattern results in cleaner, safer, and more scalable code, making it a strong approach for professional software development.

