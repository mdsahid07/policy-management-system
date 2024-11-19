import sql from 'mssql';
import { connectDB } from '../Data_Layer/db_connection';

export const createUser = async (username: string, password: string) => {
    //console.log("mcall");
    const query = `INSERT INTO Users (username, password) VALUES (@username, @password)`;
    //console.log(query);
    const request = new sql.Request();
    request.input('username', sql.VarChar, username);
    request.input('password', sql.VarChar, password);
    await request.query(query);
};

export const getUser = async (username: string) => {
    const query = `SELECT * FROM Users WHERE username = @username`;
    const request = new sql.Request();
    request.input('username', sql.VarChar, username);
    const result = await request.query(query);
    return result.recordset.length > 0;
};

export const getUserId = async (username: string): Promise<number | null> => {
    const query = `SELECT * FROM Users WHERE username = @username`;
    const request = new sql.Request();
    request.input('username', sql.VarChar, username);
    const result = await request.query(query);
    if (result.recordset.length > 0) {
        console.log(result.recordset[0].id);
        console.log(result.recordset[0]);
        return result.recordset[0].id;
    }
    else return null;
};

export const checkUser = async (username: string, password: string) => {
    const query = `SELECT * FROM Users WHERE username = @username AND password=@password`;
    const request = new sql.Request();
    request.input('username', sql.VarChar, username);
    request.input('password', sql.VarChar, password);
    const result = await request.query(query);
    return result.recordset.length > 0;
};

export const create_policy = async (title: string, description: string, owner: string, date: Date, category: string) => {

    const query = `INSERT INTO Policies (title, description, owner, date, vote, category) VALUES 
        ('${title}', '${description}', '${owner}', '${date}', 0, '${category}')`;
    //console.log(query);
    const now = new Date();
    const request = new sql.Request();
    request.input('title', sql.VarChar, title);
    request.input('description', sql.VarChar, description);
    request.input('owner', sql.VarChar, owner);
    request.input('date', sql.Date, date);
    request.input('vote', sql.Int, 0);
    request.input('category', sql.VarChar, category);
    console.log(query);
    await request.query(query);
};
export const checkVoteDuplication = async (policyid: BigInt, userid: BigInt) => {
    const query = `SELECT * FROM UserVote WHERE userid = @userid AND policyid = @policyid`;
    const request = new sql.Request();
    request.input('userid', sql.BigInt, userid);
    request.input('policyid', sql.BigInt, policyid);
    console.log(query);
    const result = await request.query(query);
    if ((result.recordset.length > 0)) {
        return false;
    }
    else {
        insertVote(userid, policyid);
        return true;
    }

};
const insertVote = async (userid: BigInt, policyid: BigInt) => {
    const query = `INSERT INTO UserVote (userid, policyid) VALUES 
        ('${userid}', '${policyid}')`;
    //console.log(query);
    console.log(query);
    const request = new sql.Request();
    request.input('userid', sql.BigInt, userid);
    request.input('policyid', sql.BigInt, policyid);
    await request.query(query);
};
export const getAllPolicies = async () => {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM Policies');
    return result.recordset;
};
export const update_upvote_policy = async (policyId: BigInt) => {

    const query = `UPDATE Policies SET vote = vote + 1 WHERE id = ${policyId}`;
    //console.log(query);
    const now = new Date();
    const request = new sql.Request();
    request.input('id', sql.Int, policyId);
    await request.query(query);
};
export const update_downvote_policy = async (policyId: BigInt) => {
    const query = `UPDATE Policies SET vote = vote - 1 WHERE id = ${policyId}`;
    //console.log(query);
    const now = new Date();
    const request = new sql.Request();
    request.input('Id', sql.Int, policyId);
    await request.query(query);
};
