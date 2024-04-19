import sqlite3 from 'sqlite3';

// Open the database
const db = new sqlite3.Database('./mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
    } else {
        console.log('Database connected!');
    }
});

// Function that is vulnerable to SQL Injection
function findUserByUsername(username: string): void {
    // Unsafe query: directly concatenates the input into the SQL string
    const query = `SELECT * FROM users WHERE username = '${username}'`;

    db.all(query, [], (error, rows) => {
        if (error) {
            console.error('Query error: ' + error.message);
        } else {
            console.log('User found:', rows);
        }
    });
}


findUserByUsername("admin");

// Always close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database: ' + err.message);
    } else {
        console.log('Database connection closed.');
    }
});
