# Node.js To-Do List API (Core Modules Only)

A simple but functional **RESTful To-Do List backend** built using **only Node.js core modules**.  
No frameworks. No database. All data is stored **in memory**.

This project demonstrates:
- RESTful routing in raw Node.js
- Handling HTTP methods manually
- Parsing and validating request data
- Sending proper HTTP status codes
- Preventing duplicate resources

---

## Run the project
```
npm start
``` 
OR
```
node server.js 
``` 
## Features

- Create, read, update, and delete todos (CRUD)
- In-memory data storage using an array
- Unique todo titles (no duplicates allowed)
- Proper HTTP status codes
- JSON request and response handling

---

## Tech Stack

- **Node.js (core modules only)**
  - `http`
  - `url`

---

## Todo Model

Each todo has the following structure:

```json
{
  "id": 1,
  "title": "Learn Node.js",
  "completed": false
}
