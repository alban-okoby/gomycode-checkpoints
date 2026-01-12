# Library Management System (JavaScript – OOP Design)

A simplified **Library Management System** implemented in **JavaScript (ES6)** using **Object-Oriented Design principles** and **design patterns** such as **Singleton**, **Factory**, and **Observer**.

This project demonstrates clean architecture, modular design, and extensibility suitable for academic assignments, interviews, or learning system design.

---


### Run the project
```
npm run start
```

Test case
```
npm run test
```

## Features

- User management (Students & Teachers)
- Book management
- Borrow and return books
- Track borrowing transactions
- Overdue notifications (Observer Pattern)
- Clean, modular folder structure
- Scalable and maintainable design

---

## Design Patterns Used

### 1. Singleton Pattern
- **LibrarySystem**
- Ensures only one instance manages users, books, and transactions

### 2. Factory Pattern
- **UserFactory**
- Creates different user types (`Student`, `Teacher`) dynamically

### 3. Observer Pattern (Optional)
- **NotificationService**
- Notifies users when books are overdue

---

## Project Structure
```
smart-library-management-system/
│
├── src/
│   ├── core/
│   │   ├── LibrarySystem.js        # Singleton
│   │   └── NotificationService.js  # Observer
│   │
│   ├── users/
│   │   ├── User.js                 # Abstract base class
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   └── UserFactory.js          # Factory Pattern
│   │
│   ├── books/
│   │   └── Book.js
│   │
│   ├── transactions/
│   │   └── BorrowTransaction.js
│   │
│   ├── index.js                    # App entry point
│   │
│   └── utils/
│       └── constants.js            # Optional shared constants
│
├── test/
│   ├── LibrarySystem.test.js
│   └── UserFactory.test.js
│
├── package.json
└── README.md
```
