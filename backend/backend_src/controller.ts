import { RequestHandler } from 'express';
import { hashPassword } from './node_crypto';
const users: { username: string; password: string; }[] = [];

//Sign Up Controller
export const signupController: RequestHandler<unknown, { success: boolean, result: string; }, { username: string; password: string; }, unknown> = (req, res, next) => {

    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);

    if (users.find((e) => e.username === username)) {
        res.json({ success: false, result: 'User already exists!!! please try with different name' });
    }
    users.push({ username, password: hashedPassword });
    res.json({ success: true, result: 'Sign up successfully...' });
};

// login Controller
export const loginController: RequestHandler<unknown, { success: boolean, result: string; }, { username: string; password: string; }, unknown> = (req, res, next) => {
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    const user = users.find(
        (e) => e.username === username && e.password === hashedPassword
    );

    if (!user) {
        res.json({ success: false, result: 'Username or password is invalid !!!' });
    }
    const token = Buffer.from(username).toString('base64');
    res.json({ success: true, result: token });
};

