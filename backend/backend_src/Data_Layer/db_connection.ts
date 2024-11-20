import { Pool } from "pg"; // Import the PostgreSQL Pool class

const connectDB = async () => {
    const db = new Pool({
        host: "postgresql://root:91utkAfYlTxt4nBecM7B9tCCu0RN5iam@dpg-csui6d1u0jms73apvl8g-a/studentpolicy",    // Your PostgreSQL host (e.g., localhost)
        user: "root",     // Your PostgreSQL username
        password: "91utkAfYlTxt4nBecM7B9tCCu0RN5iam",   // Your PostgreSQL password
        database: "studentpolicy", // Your database name
        port: 5432,           // Default PostgreSQL port
    });

    // Test the connection
    await db.connect();
    console.log("Connected to PostgreSQL database!");

    return db; // Return the pool object
};

export default connectDB;