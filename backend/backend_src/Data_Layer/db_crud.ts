// import sql from 'mssql';
// import { connectDB } from '../Data_Layer/db_connection';
import { RowDataPacket } from 'mysql2/promise';
import connectDB from '../Data_Layer/db_connection';

interface User {
    id?: number;
    username: string;
    password: string;
}

export const createUser = async (username: string, password: string): Promise<void> => {
    // Hash the password before storing it
    //const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    const db = await connectDB();
    // MySQL query to insert a new user with a hashed password
    const query = "INSERT INTO Users (username, password) VALUES (?, ?)";

    // Execute the query with username and hashed password as parameters
    await db.execute(query, [username, password]);

    console.log(`User ${username} created successfully.`);
};
// Get all users
export const getUser = async (username: string): Promise<boolean> => {
    const db = await connectDB();
    const query = "SELECT * FROM users WHERE username = ?";
    const [rows] = await db.execute(query, [username]);
    return (rows as any[]).length > 0;
};



export const getUserId = async (username: string): Promise<number | null> => {
    const db = await connectDB();
    const query = "SELECT id FROM users WHERE username = ?";
    const [rows]: any = await db.execute(query, [username]); // Type assertion here

    // Check if rows is an array and has at least one row
    if (Array.isArray(rows) && rows.length > 0) {
        console.log(rows[0].id); // Log the ID of the first result
        console.log(rows[0]);    // Log the full user object
        return rows[0].id;       // Return the ID
    } else {
        return null;             // Return null if no user is found
    }
};

export const checkUser = async (username: string, password: string): Promise<boolean> => {
    const db = await connectDB();
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    const [rows] = await db.execute(query, [username, password]);

    // Ensure 'rows' is an array and check if it has any results
    return (rows as RowDataPacket[]).length > 0; // Cast 'rows' to RowDataPacket[] and check length
};

export const create_policy = async (title: string, description: string, owner: string, date: Date, category: string): Promise<void> => {
    const query = `INSERT INTO policies (title, description, owner, date, vote, category) VALUES (?, ?, ?, ?, ?, ?)`;
    const db = await connectDB();
    // Prepare the values to be inserted
    const values = [title, description, owner, date, 0, category];

    // Execute the query with the parameterized values
    await db.execute(query, values);

    console.log("Policy created:", { title, description, owner, date, category });
};

export const checkVoteDuplication = async (policyid: bigint, userid: bigint): Promise<boolean> => {
    // Use parameterized query for MySQL
    const query = "SELECT * FROM UserVote WHERE userid = ? AND policyid = ?";
    const db = await connectDB();
    // Execute the query with the parameters
    const [rows] = await db.execute(query, [userid, policyid]);

    // Cast rows to RowDataPacket[] to allow access to length
    if ((rows as RowDataPacket[]).length > 0) {
        return false; // Return false if the user already voted
    } else {
        // If no matching vote, call insertVote function to insert the new vote
        await insertVote(userid, policyid);
        return true; // Return true if the vote was successfully inserted
    }
};

const insertVote = async (userid: bigint, policyid: bigint): Promise<void> => {
    // MySQL query to insert vote data
    const query = "INSERT INTO UserVote (userid, policyid) VALUES (?, ?)";
    const db = await connectDB();
    // Execute the query with parameters to avoid SQL injection
    await db.execute(query, [userid, policyid]);

    console.log("Vote inserted:", { userid, policyid });
};

export const getAllPolicies = async () => {
    // MySQL query to get all policies
    const query = "SELECT * FROM Policies";
    const db = await connectDB();
    // Execute the query
    const [rows] = await db.execute(query);

    return rows; // Return the rows (result set) from the query
};

export const update_upvote_policy = async (policyId: string): Promise<void> => {
    // MySQL query to update the vote count
    const query = "UPDATE Policies SET vote = vote + 1 WHERE id = ?";
    const db = await connectDB();
    // Execute the query with the policyId as a parameter
    await db.execute(query, [policyId]);

    console.log(`Policy with id ${policyId} upvoted successfully.`);
};

