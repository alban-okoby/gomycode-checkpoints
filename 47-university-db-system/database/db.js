const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
    constructor() {
        this.pool = null;
    }

    async connect() {
        try {
            this.pool = mysql.createPool({
                host: process.env.DB_HOST || 'localhost',
                port: process.env.DB_PORT || 3307,
                user: process.env.DB_USER || 'university_user',
                password: process.env.DB_PASSWORD || 'university_pass',
                database: process.env.DB_NAME || 'university_db',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });

            // Test connection
            const connection = await this.pool.getConnection();
            console.log('Successfully connected to database');
            connection.release();
            return true;
        } catch (error) {
            console.error('Database connection failed:', error.message);
            throw error;
        }
    }

    async query(sql, params = []) {
        try {
            const [rows] = await this.pool.execute(sql, params);
            return rows;
        } catch (error) {
            console.error('Query execution error:', error.message);
            throw error;
        }
    }

    async getConnection() {
        return await this.pool.getConnection();
    }

    async close() {
        if (this.pool) {
            await this.pool.end();
            console.log('Database connection closed');
        }
    }
}

module.exports = new Database();