

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


### STEP 4: Query Execution
```
-- Query 1: Retrieve all students enrolled in "Database Systems"
SELECT s.student_id, s.name, s.email, e.grade
FROM Students s
JOIN Enrollments e ON s.student_id = e.student_id
JOIN Courses c ON e.course_id = c.course_id
WHERE c.title = 'Database Systems';

-- Query 2: List all courses along with the names of their instructors
SELECT c.course_id, c.title, c.credits, 
       COALESCE(i.name, 'No Instructor Assigned') AS instructor_name,
       i.department
FROM Courses c
LEFT JOIN Instructors i ON c.instructor_id = i.instructor_id
ORDER BY c.course_id;

-- Query 3: Find students who are not enrolled in any course
SELECT s.student_id, s.name, s.email, s.age
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
WHERE e.enrollment_id IS NULL;

-- Query 4: Update email address of a student
-- Update Bob Smith's email
UPDATE Students 
SET email = 'bob.smith.new@university.edu'
WHERE name = 'Bob Smith';

-- Verify the update
SELECT * FROM Students WHERE name = 'Bob Smith';

-- Query 5: Delete a course by its ID
-- Delete course_id 203 (Introduction to Physics)
-- First, check what will be affected
SELECT c.title, COUNT(e.student_id) as enrolled_students
FROM Courses c
LEFT JOIN Enrollments e ON c.course_id = e.course_id
WHERE c.course_id = 203
GROUP BY c.title;

-- Perform the deletion
DELETE FROM Courses WHERE course_id = 203;

-- Verify deletion
SELECT * FROM Courses WHERE course_id = 203;
SELECT * FROM Enrollments WHERE course_id = 203; -- Should be empty or no results

-- ============================================
-- Additional Verification Queries
-- ============================================

-- View all students with their course enrollments
SELECT s.name AS student_name, c.title AS course_title, e.grade
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
LEFT JOIN Courses c ON e.course_id = c.course_id
ORDER BY s.name, c.title;

-- View all courses with instructor assignments
SELECT c.title AS course, i.name AS instructor, i.department
FROM Courses c
LEFT JOIN Instructors i ON c.instructor_id = i.instructor_id
ORDER BY c.title;
```

## Database Schema Design

### Entity-Relationship Model
The database consists of four main tables:
- **Students**: Stores student information
- **Instructors**: Stores instructor information  
- **Courses**: Stores course information with instructor assignment
- **Enrollments**: Junction table handling many-to-many relationship between Students and Courses

### Table Structures

#### Students Table
| Column | Type | Constraints |
|--------|------|-------------|
| student_id | INT | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(100) | UNIQUE, NOT NULL |
| age | INT | CHECK (age > 17 AND age < 120) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

#### Instructors Table
| Column | Type | Constraints |
|--------|------|-------------|
| instructor_id | INT | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| department | VARCHAR(100) | NOT NULL |
| email | VARCHAR(100) | UNIQUE |
| hire_date | DATE | |

#### Courses Table
| Column | Type | Constraints |
|--------|------|-------------|
| course_id | INT | PRIMARY KEY |
| title | VARCHAR(200) | NOT NULL |
| credits | INT | CHECK (credits > 0 AND credits <= 6) |
| instructor_id | INT | FOREIGN KEY REFERENCES Instructors(instructor_id) ON DELETE SET NULL |

#### Enrollments Table
| Column | Type | Constraints |
|--------|------|-------------|
| enrollment_id | INT | PRIMARY KEY |
| student_id | INT | FOREIGN KEY REFERENCES Students(student_id) ON DELETE CASCADE |
| course_id | INT | FOREIGN KEY REFERENCES Courses(course_id) ON DELETE CASCADE |
| grade | CHAR(2) | CHECK (grade IN ('A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', NULL)) |
| enrollment_date | DATE | DEFAULT CURRENT_DATE |
| | | UNIQUE KEY (student_id, course_id) |

## Normalization (Up to 3NF)

### 1NF (First Normal Form)
- **Each table has atomic values** (no repeating groups)
  - All columns contain indivisible values
  - No arrays or multiple values in a single cell
- **Each row is uniquely identifiable by primary key**
  - Every table has a designated primary key
  - No duplicate rows exist in any table

**Example of 1NF Compliance:**
- The Enrollments table avoids storing multiple courses as a comma-separated list in Students table
- Each enrollment is stored as a separate row

### 2NF (Second Normal Form)
- **All non-key attributes depend on the whole primary key**
  - Removes partial dependencies that occur in tables with composite primary keys
- **The Enrollments table handles the many-to-many relationship** between Students and Courses
  - student_id and course_id together form a composite key in concept (implemented with UNIQUE constraint)
  - grade depends on the combination of both student and course

**Example of 2NF Compliance:**
- Instead of storing course information multiple times in a Student-Course table, we separate it into Courses table
- Student name depends only on student_id, not on course_id

### 3NF (Third Normal Form)
- **No transitive dependencies**
  - Non-key columns depend only on the primary key, not on other non-key columns
- **Courses table references Instructors via instructor_id (foreign key)** instead of storing instructor details directly
  - course_id → instructor_id → instructor_name would be a transitive dependency
  - By storing only instructor_id, we avoid this transitive dependency

**Example of 3NF Compliance:**
- Courses table doesn't store instructor_name or instructor_department
- To get instructor details, we JOIN with Instructors table using instructor_id

## Key Features

### Primary Keys
- Each table has a clear, single-column primary key (except conceptual composite key in Enrollments)
- Primary keys are indexed for fast lookups
- student_id, instructor_id, course_id, enrollment_id serve as unique identifiers

### Foreign Keys
- Proper relationships between tables with referential integrity
- **Students ↔ Enrollments**: One-to-many relationship
- **Courses ↔ Enrollments**: One-to-many relationship  
- **Instructors ↔ Courses**: One-to-many relationship
- Foreign key constraints prevent orphaned records

### Constraints

| Constraint Type | Implementation | Purpose |
|----------------|----------------|---------|
| **NOT NULL** | `name VARCHAR(100) NOT NULL` | Ensures required fields have values |
| **CHECK** | `age INT CHECK (age > 17)` | Validates age is at least 18 |
| **CHECK** | `credits INT CHECK (credits > 0 AND credits <= 6)` | Ensures course credits are valid |
| **CHECK** | `grade CHAR(2) CHECK (grade IN (...))` | Limits grades to valid values |
| **UNIQUE** | `email VARCHAR(100) UNIQUE` | Prevents duplicate email addresses |
| **UNIQUE** | `UNIQUE KEY (student_id, course_id)` | Prevents duplicate enrollments |
| **ON DELETE CASCADE** | Enrollments and Courses | Automatically deletes child records |
| **ON DELETE SET NULL** | Courses to Instructors | Preserves course data if instructor deleted |

### Referential Integrity Actions

#### ON DELETE CASCADE
Used on Enrollments table foreign keys:
```sql
FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE
FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE
