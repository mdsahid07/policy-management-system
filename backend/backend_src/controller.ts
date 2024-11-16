import { RequestHandler } from 'express';
import { hashPassword } from './node_crypto';
import { checkUser, createUser, getUser } from './Data_Layer/db_crud';
//const users: { username: string; password: string; }[] = [];

//Sign Up Controller
export const signupController: RequestHandler<unknown, { success: boolean, result: string; }, { username: string; password: string; }, unknown> = async (req, res, next) => {

    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    if (!username || !password) {
        res.json({ success: false, result: 'UserName and Password are Required..' });
    }
    if (await getUser(username)) {
        res.json({ success: false, result: 'User already exists!!! please try with different name' });
    }
    await createUser(username, hashedPassword);
    res.json({ success: true, result: 'Sign up successfully...' });
};

// login Controller
export const loginController: RequestHandler<unknown, { success: boolean, result: string; }, { username: string; password: string; }, unknown> = (req, res, next) => {
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    if (!checkUser(username, hashedPassword)) {
        res.json({ success: false, result: 'Username or password is invalid !!!' });
    }
    const token = Buffer.from(username).toString('base64');
    res.json({ success: true, result: token });
};

