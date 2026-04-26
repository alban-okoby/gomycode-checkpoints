

### Project Structure
```47-puniversity-db-system/
├── docker-compose.yml
├── init.sql
├── package.json
├── .env
├── app.js
└── database/
    └── db.js
```

## Detail of implementation

### STEP 1 & 2: Schema Design and Table Creation
```
-- Create Students table
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT CHECK (age > 17 AND age < 120),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Instructors table
CREATE TABLE Instructors (
    instructor_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE
);

-- Create Courses table
CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    credits INT CHECK (credits > 0 AND credits <= 6),
    instructor_id INT,
    FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
        ON DELETE SET NULL
);

-- Create Enrollments table (junction table for many-to-many relationship)
CREATE TABLE Enrollments (
    enrollment_id INT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade CHAR(2),
    enrollment_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
        ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
        ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, course_id),
    CHECK (grade IN ('A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', NULL))
);
```

### STEP 3: Insert Sample Data
```
-- Insert Students
INSERT INTO Students (student_id, name, email, age) VALUES
(1, 'Alice Johnson', 'alice.johnson@university.edu', 20),
(2, 'Bob Smith', 'bob.smith@university.edu', 22),
(3, 'Carol Davis', 'carol.davis@university.edu', 19),
(4, 'David Wilson', 'david.wilson@university.edu', 21);

-- Insert Instructors
INSERT INTO Instructors (instructor_id, name, department, email, hire_date) VALUES
(101, 'Dr. Sarah Parker', 'Computer Science', 'sarah.parker@university.edu', '2015-08-15'),
(102, 'Prof. James Brown', 'Mathematics', 'james.brown@university.edu', '2010-01-10'),
(103, 'Dr. Emily Chen', 'Physics', 'emily.chen@university.edu', '2018-09-01');

-- Insert Courses
INSERT INTO Courses (course_id, title, credits, instructor_id) VALUES
(201, 'Database Systems', 3, 101),
(202, 'Calculus I', 4, 102),
(203, 'Introduction to Physics', 3, 103),
(204, 'Data Structures', 3, 101);

-- Insert Enrollments
INSERT INTO Enrollments (enrollment_id, student_id, course_id, grade, enrollment_date) VALUES
(1, 1, 201, 'A', '2024-01-15'),  -- Alice in Database Systems
(2, 2, 201, 'B+', '2024-01-15'), -- Bob in Database Systems
(3, 1, 204, 'A-', '2024-01-16'), -- Alice in Data Structures
(4, 3, 202, 'B', '2024-01-14'),  -- Carol in Calculus I
(5, 4, 203, NULL, '2024-01-17'); -- David in Physics (no grade yet)
```
