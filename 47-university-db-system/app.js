const db = require('./database/db'); 
// const chalk = require('chalk'); 
const Table = require('cli-table3');

class UniversitySystem {
    constructor() {
        this.db = db;
    }

    async initialize() {
        try {
            await this.db.connect();
            console.log('🎓 University Information System Started\n');
        } catch (error) {
            console.error('Failed to initialize:', error.message);
            process.exit(1);
        }
    }

    formatTable(data, title) {
        if (!data || data.length === 0) {
            console.log('\nNo results found\n');
            return;
        }

        const table = new Table({
            head: Object.keys(data[0]).map(key => key.toUpperCase()),
            style: { head: [], border: [] }
        });

        data.forEach(row => {
            table.push(Object.values(row));
        });

        console.log(`\n${title}`);
        console.log(table.toString());
        console.log(`Total records: ${data.length}\n`);
    }

    async getStudentsInCourse(courseTitle) {
        const query = `
            SELECT s.student_id, s.name, s.email, e.grade, e.enrollment_date
            FROM Students s
            JOIN Enrollments e ON s.student_id = e.student_id
            JOIN Courses c ON e.course_id = c.course_id
            WHERE c.title = ?
        `;
        return await this.db.query(query, [courseTitle]);
    }

    async getCoursesWithInstructors() {
        const query = `
            SELECT 
                c.course_id,
                c.title AS course_title,
                c.credits,
                COALESCE(i.name, 'No Instructor Assigned') AS instructor_name,
                i.department,
                COUNT(e.enrollment_id) AS enrolled_students
            FROM Courses c
            LEFT JOIN Instructors i ON c.instructor_id = i.instructor_id
            LEFT JOIN Enrollments e ON c.course_id = e.course_id
            GROUP BY c.course_id, c.title, c.credits, i.name, i.department
            ORDER BY c.course_id
        `;
        return await this.db.query(query);
    }

    async getUnenrolledStudents() {
        const query = `
            SELECT s.student_id, s.name, s.email, s.age
            FROM Students s
            LEFT JOIN Enrollments e ON s.student_id = e.student_id
            WHERE e.enrollment_id IS NULL
        `;
        return await this.db.query(query);
    }

    async updateStudentEmail(studentName, newEmail) {
        const query = 'UPDATE Students SET email = ? WHERE name = ?';
        const result = await this.db.query(query, [newEmail, studentName]);
        return result.affectedRows;
    }

    async deleteCourse(courseId) {
        const checkQuery = 'SELECT title FROM Courses WHERE course_id = ?';
        const course = await this.db.query(checkQuery, [courseId]);
        
        if (course.length === 0) {
            throw new Error(`Course with ID ${courseId} not found`);
        }

        console.log(`\nDeleting course: "${course[0].title}"`);
        
        const deleteQuery = 'DELETE FROM Courses WHERE course_id = ?';
        const result = await this.db.query(deleteQuery, [courseId]);
        
        return { affectedRows: result.affectedRows, courseName: course[0].title };
    }

    async getStudentGPA(studentId) {
        const query = `
            SELECT 
                s.name,
                ROUND(AVG(
                    CASE 
                        WHEN grade = 'A' THEN 4.0
                        WHEN grade = 'A-' THEN 3.7
                        WHEN grade = 'B+' THEN 3.3
                        WHEN grade = 'B' THEN 3.0
                        WHEN grade = 'B-' THEN 2.7
                        WHEN grade = 'C+' THEN 2.3
                        WHEN grade = 'C' THEN 2.0
                        WHEN grade = 'C-' THEN 1.7
                        WHEN grade = 'D' THEN 1.0
                        ELSE 0
                    END
                ), 2) AS gpa
            FROM Students s
            JOIN Enrollments e ON s.student_id = e.student_id
            WHERE s.student_id = ?
            GROUP BY s.student_id
        `;
        return await this.db.query(query, [studentId]);
    }

    async getCourseStatistics() {
        const query = `
            SELECT 
                c.title,
                COUNT(e.student_id) AS enrolled_students,
                COUNT(DISTINCT CASE WHEN e.grade IN ('A', 'A-', 'B+', 'B', 'B-') THEN e.student_id END) AS passing_students
            FROM Courses c
            LEFT JOIN Enrollments e ON c.course_id = e.course_id
            GROUP BY c.course_id
            HAVING enrolled_students > 0
            ORDER BY enrolled_students DESC
        `;
        return await this.db.query(query);
    }

    async runAllQueries() {
        console.log('\n' + '='.repeat(80));
        console.log('EXECUTING UNIVERSITY DATABASE QUERIES');
        console.log('='.repeat(80));

        try {
            const dbStudents = await this.getStudentsInCourse('Database Systems');
            this.formatTable(dbStudents, 'Students Enrolled in "Database Systems"');

            const coursesWithInstructors = await this.getCoursesWithInstructors();
            this.formatTable(coursesWithInstructors, 'All Courses with Instructors and Enrollment Counts');

            const unenrolledStudents = await this.getUnenrolledStudents();
            this.formatTable(unenrolledStudents, 'Students Not Enrolled in Any Course');

            console.log('\nUPDATE OPERATION');
            console.log('-'.repeat(40));
            const updateResult = await this.updateStudentEmail('John Smith', 'john.smith.updated@university.edu');
            console.log(`Updated email for John Smith. Rows affected: ${updateResult}`);

            const verifyEmail = await this.db.query("SELECT name, email FROM Students WHERE name = 'John Smith'");
            this.formatTable(verifyEmail, 'Verified Student Email After Update');

            console.log('\nDELETE OPERATION');
            console.log('-'.repeat(40));
            const deleteResult = await this.deleteCourse(2);
            console.log(`Successfully deleted course: ${deleteResult.courseName}`);

            const remainingCourses = await this.db.query("SELECT course_id, title, credits FROM Courses ORDER BY course_id");
            this.formatTable(remainingCourses, 'Remaining Courses After Deletion');

            console.log('\nBONUS: STUDENT GPA ANALYSIS');
            const studentGPA = await this.getStudentGPA(1);
            this.formatTable(studentGPA, 'GPA for Student ID 1 (John Smith)');

            const courseStats = await this.getCourseStatistics();
            this.formatTable(courseStats, 'Course Enrollment Statistics');

        } catch (error) {
            console.error('\nError executing queries:', error.message);
            throw error;
        }
    }

    async close() {
        await this.db.close();
    }
}

// Express server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

async function main() {
    const university = new UniversitySystem();
    
    try {
        await university.initialize();
        await university.runAllQueries();

        app.use(express.json());

        app.get('/api/students/course/:courseName', async (req, res) => {
            try {
                const students = await university.getStudentsInCourse(req.params.courseName);
                res.json(students);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        app.get('/api/courses', async (req, res) => {
            try {
                const courses = await university.getCoursesWithInstructors();
                res.json(courses);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        app.get('/api/students/unenrolled', async (req, res) => {
            try {
                const students = await university.getUnenrolledStudents();
                res.json(students);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        app.put('/api/students/email', async (req, res) => {
            const { name, email } = req.body;
            try {
                const result = await university.updateStudentEmail(name, email);
                res.json({ affectedRows: result });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        app.delete('/api/courses/:id', async (req, res) => {
            try {
                const result = await university.deleteCourse(req.params.id);
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        if (process.env.START_API === 'true') {
            app.listen(PORT, () => {
                console.log(`API Server running on http://localhost:${PORT}`);
                console.log('Available endpoints:');
                console.log('  GET  /api/students/course/:courseName');
                console.log('  GET  /api/courses');
                console.log('  GET  /api/students/unenrolled');
                console.log('  PUT  /api/students/email');
                console.log('  DELETE /api/courses/:id');
            });
        }

    } catch (error) {
        process.exit(1);
    }

    process.on('SIGINT', async () => {
        console.log('\nShutting down...');
        await university.close();
        process.exit(0);
    });
}

main().catch(console.error);