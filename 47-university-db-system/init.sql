-- Create Database
CREATE DATABASE IF NOT EXISTS university_db;
USE university_db;

-- Create Students Table
CREATE TABLE IF NOT EXISTS Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT CHECK (age > 17 AND age < 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Instructors Table
CREATE TABLE IF NOT EXISTS Instructors (
    instructor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Courses Table
CREATE TABLE IF NOT EXISTS Courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) UNIQUE NOT NULL,
    credits INT CHECK (credits > 0 AND credits <= 6),
    instructor_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
        ON DELETE SET NULL
);

-- Create Enrollments Table
CREATE TABLE IF NOT EXISTS Enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade CHAR(2) CHECK (grade IN ('A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'W')),
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
        ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
        ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, course_id)
);

-- Insert Sample Data - Students
INSERT INTO Students (name, email, age) VALUES
('John Smith', 'john.smith@university.edu', 20),
('Emma Johnson', 'emma.johnson@university.edu', 22),
('Michael Brown', 'michael.brown@university.edu', 19),
('Sarah Wilson', 'sarah.wilson@university.edu', 21),
('David Lee', 'david.lee@university.edu', 23);

-- Insert Sample Data - Instructors
INSERT INTO Instructors (name, department, email) VALUES
('Dr. Robert Chen', 'Computer Science', 'robert.chen@university.edu'),
('Prof. Maria Garcia', 'Mathematics', 'maria.garcia@university.edu'),
('Dr. James Williams', 'Physics', 'james.williams@university.edu');

-- Insert Sample Data - Courses
INSERT INTO Courses (title, credits, instructor_id) VALUES
('Database Systems', 3, 1),
('Data Structures', 4, 1),
('Calculus I', 3, 2),
('Linear Algebra', 3, 2),
('Quantum Physics', 4, 3),
('Classical Mechanics', 3, 3);

-- Insert Sample Data - Enrollments
INSERT INTO Enrollments (student_id, course_id, grade) VALUES
(1, 1, 'A'),    -- John Smith in Database Systems
(2, 1, 'B+'),   -- Emma Johnson in Database Systems
(3, 2, 'A-'),   -- Michael Brown in Data Structures
(1, 3, 'B'),    -- John Smith in Calculus I
(4, 4, 'A'),    -- Sarah Wilson in Linear Algebra
(5, 5, 'B+'),   -- David Lee in Quantum Physics
(2, 6, 'A-');   -- Emma Johnson in Classical Mechanics