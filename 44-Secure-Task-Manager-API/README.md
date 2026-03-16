# Backend Development : Advanced Node.js and Express.js

This repository contains examples of using `Express api`

### 1. Google OAuth
You get these from Google Cloud Console.
Steps:
- Go to Google Cloud Console
- Create a project
- Enable Google OAuth API
- Create OAuth Client ID
- Add redirect URI:
http://localhost:5000/api/auth/google/callback

Then copy:
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET


### 2. Create .env file 
Inside it remplace `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` values

### 3. Run the project
``` 
npm i && node app.js
```

### Project Structure
```
44-secure-task-manager-api
│
├── controllers
│   ├── authController.js
│   └── taskController.js
│
├── middleware
│   ├── verifyToken.js
│   ├── catchAsync.js
│   └── errorMiddleware.js
│
├── models
│   ├── User.js
│   └── Task.js
│
├── routes
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── utils
│   └── AppError.js
│
├── config
│   └── passport.js
│
├── server.js
└── .env
```

### API Endpoints 
##### Authentication
```
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/google
GET  /api/auth/google/callback
```

##### Tasks (Protected)
```
POST /api/tasks
GET /api/tasks
DELETE /api/tasks/:id
```

##### Security Implemented
- Helmet → secure HTTP headers
- Rate limiting → prevent brute-force login
- XSS protection → sanitize user input
- MongoDB sanitize → prevent NoSQL injection
- HTTP-only cookies → secure JWT storage
- Protected routes with verifyToken
- Centralized error handling