// import sql from 'mssql';

// const config = {
//     user: 'sa',
//     password: '123456',
//     server: 'localhost',
//     database: 'StudentPolicy',
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//     },


// };

// export const connectDB = async () => {
//     try {
//         return await sql.connect(config);
//     } catch (error) {
//         console.log("Db Connection Error!!!!");
//         console.error('Database connection failed:', error);
//         throw error;
//     }
// };

import mysql from "mysql2/promise";
const connectDB = async () => {
    const db = await mysql.createPool({
        host: "localhost",    // Your MySQL host (e.g., localhost)
        user: "root",         // Your MySQL username
        password: "123456", // Your MySQL password
        database: "studentpolicy", // Your database name
    });
    return db; // Return the pool object
};

export default connectDB;
// const db = mysql.createPool({
//     host: "localhost",    // Replace with your MySQL host
//     user: "root",         // Replace with your MySQL username
//     password: "123456", // Replace with your MySQL password
//     database: "studentpolicy",  // Replace with your database name
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

// export default db;
