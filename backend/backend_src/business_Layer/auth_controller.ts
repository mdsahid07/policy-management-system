//import { RequestHandler } from 'express';
import express, { RequestHandler, Request, Response } from 'express';
import { hashPassword } from '../node_crypto';
import { checkUser, createUser, getUser, getUserId } from '../Data_Layer/db_crud';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//const users: { username: string; password: string; }[] = [];

dotenv.config();
const router = express.Router();
const secretKey = 'sahidmiuaugentryid618670';
////Sign Up Controller
export const signupController: RequestHandler<unknown, { success: boolean, result: string; }, { username: string; password: string; }, unknown> = async (req, res, next) => {

    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    if (!username || !password) {
        res.json({ success: false, result: 'UserName and Password are Required..' });
    }
    else if (await getUser(username)) {
        res.json({ success: false, result: 'User already exists!!! please try with different name' });
    }
    else {
        await createUser(username, hashedPassword);
        res.json({ success: true, result: 'Sign up successfully...' });
    }

};

//// login Controller
export const loginController: RequestHandler<unknown, { success: boolean, result: string; }, { username: string; password: string; }, unknown> = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = hashPassword(password);
        if (! await checkUser(username, hashedPassword)) {
            res.json({ success: false, result: 'Username or password is invalid !!!' });
        }
        const userid = await getUserId(username);
        console.log(userid);

        //const token = Buffer.from(username).toString('base64');
        const token = await jwt.sign({ username: username }, secretKey as string, { expiresIn: '1h', });
        console.log(token);
        res.json({ success: true, result: token + '!!!@#$' + userid });
    }
    catch (error) {
        console.log(error);
    }
};

export default router;

