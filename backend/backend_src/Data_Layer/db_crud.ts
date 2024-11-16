import { Request } from 'express';
import { createHmac, randomBytes } from 'crypto';
import sql from 'mssql';

export const createUser = async (username: string, password: string) => {

    const query = `INSERT INTO Users (username, password) VALUES (@username, @password)`;

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

export const checkUser = async (username: string, password: string) => {
    const query = `SELECT * FROM Users WHERE username = @username AND password=@password`;
    const request = new sql.Request();
    request.input('username', sql.VarChar, username);
    request.input('password', sql.VarChar, password);
    const result = await request.query(query);
    return result.recordset.length > 0;
};
