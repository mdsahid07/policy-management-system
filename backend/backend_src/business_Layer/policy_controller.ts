import express, { Request, RequestHandler, Response } from 'express';
import { checkVoteDuplication, create_policy, getAllPolicies, update_upvote_policy } from '../database/db_crud';

const router = express.Router();


export const getPolicies = async (req: Request, res: Response) => {
    try {
        const policies = await getAllPolicies();
        console.log(policies);
        res.json({ success: true, result: policies }); // Corrected object structure
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            result: 'Error fetching policies. Message: ' + error
        });
    }
};

// Add a new policy
// router.post('/', authenticate, async (req: Request, res: Response) => {
export const addPolicyController: RequestHandler<unknown, { success: boolean, result: string; }, { title: string, description: string, date: Date, category: string; }, unknown> = async (req, res, next) => {
    const { title, description, date, category } = req.body;
    const owner = (req as any).user.username;

    try {
        await create_policy(title, description, owner, date, category);
        res.json({ success: true, result: 'Policy added successfully..' });
    } catch (error) {
        res.json({ success: false, result: 'Error adding policy, Message: ' + error });
    }
};

// Upvote a policy
//router.post('/:id/upvote', authenticate, async (req: Request, res: Response) => {
export const upVotePolicy = async (req: Request, res: Response) => {
    try {

        //console.log(dataInfo.response);
        const { userid } = req.body;
        console.log(req.params.id);
        const chk = await checkVoteDuplication(req.params.id, userid);
        if (chk == false) {
            //console.log(ss);
            res.json({ success: false, message: 'Already voted' });
        }
        else {
            //console.log(ss);
            await update_upvote_policy(req.params.id);
            res.json({ success: true, message: 'Policy updated successfully.' });
        }

    } catch (error) {
        res.json({ success: false, message: 'Policy updated Error ' + error });
    }
};

export default router;
