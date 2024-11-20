import fs from "fs/promises";
import path from "path";

const usersFilePath = path.join(__dirname, "../database/users.json"); // Path to the users file

export const createUser = async (username: string, password: string): Promise<void> => {
    try {
        let users: Array<{ id: number; username: string; password: string; }> = [];
        try {
            const data = await fs.readFile(usersFilePath, "utf8");
            users = JSON.parse(data); // Parse the JSON data into an array
        } catch (err) {

            throw err;

        }

        const nextId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

        if (users.some(user => user.username === username)) {
            throw new Error(`User ${username} already exists.`);
        }

        users.push({ id: nextId, username, password });

        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf8");

        console.log(`User ${username} created successfully with ID: ${nextId}.`);
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

export const getUser = async (username: string): Promise<boolean> => {
    try {
        const data = await fs.readFile(usersFilePath, "utf8");
        const users: Array<{ username: string; password: string; }> = JSON.parse(data);

        return users.some(user => user.username === username);
    } catch (err) {
        throw new Error();

    }
};
export const getUserId = async (username: string): Promise<number | null> => {
    try {
        const data = await fs.readFile(usersFilePath, "utf8");
        const users: Array<{ id: number; username: string; password: string; }> = JSON.parse(data);

        const user = users.find(user => user.username === username);

        if (user) {
            console.log(user.id);
            console.log(user);
            return user.id;
        } else {
            return null;
        }
    } catch (err) {

        throw err;
    }
};
export const checkUser = async (username: string, password: string): Promise<boolean> => {
    try {
        const data = await fs.readFile(usersFilePath, "utf8");
        const users: Array<{ username: string; password: string; }> = JSON.parse(data);

        return users.some(user => user.username === username && user.password === password);
    } catch (err) {

        console.error("Error reading users file:", err);
        throw err;
    }
};
const policyFilePath = path.resolve(__dirname, '../database/policies.json');
export const create_policy = async (
    title: string,
    description: string,
    owner: string,
    date: Date,
    category: string
): Promise<void> => {
    try {
        let policies: Array<{ id: number; title: string; description: string; owner: string; date: string | null; vote: number; category: string; }> = [];
        try {
            const fileData = await fs.readFile(policyFilePath, 'utf-8');
            policies = JSON.parse(fileData); // Parse the existing policies
        } catch (err) {

            throw err;

        }

        const nextId = policies.length > 0 ? Math.max(...policies.map(policy => policy.id)) + 1 : 1;

        const newPolicy = {
            id: nextId,
            title,
            description,
            owner,
            date: isNaN(new Date(date).getTime()) ? null : new Date(date).toISOString(), // Convert Date to ISO string for serialization
            vote: 0,
            category,
        };

        policies.push(newPolicy);

        await fs.writeFile(policyFilePath, JSON.stringify(policies, null, 2), 'utf-8');

        console.log('Policy created:', newPolicy);
    } catch (error) {
        console.error('Error creating policy:', error);
        throw error;
    }
};

const voteFilePath = path.resolve(__dirname, '../database/uservote.json');

export const checkVoteDuplication = async (policyid: string, userid: string): Promise<boolean> => {
    try {

        const data = await fs.readFile(voteFilePath, "utf8");
        const votes: Array<{ userid: string; policyid: string; }> = JSON.parse(data);

        const existingVote = votes.some(vote => vote.userid === userid && vote.policyid === policyid);

        if (existingVote) {
            return false;
        } else {
            await insertVote(userid, policyid);
            return true;
        }
    } catch (err) {


        console.error("Votes file not found.");
        return false;
    }
};
const insertVote = async (userid: string, policyid: string): Promise<void> => {
    try {
        const data = await fs.readFile(voteFilePath, "utf8").catch(() => "[]");
        const votes: Array<{ userid: string; policyid: string; }> = JSON.parse(data);

        votes.push({ userid, policyid });

        await fs.writeFile(voteFilePath, JSON.stringify(votes, null, 2));

        console.log("Vote inserted:", { userid, policyid });
    } catch (err) {
        console.error("Error inserting vote:", err);
        throw err;
    }
};


export const getAllPolicies = async (): Promise<any[]> => {
    try {
        const fileData = await fs.readFile(policyFilePath, 'utf-8');

        const policies = JSON.parse(fileData);
        return policies;
    } catch (error) {
        if (error === 'ENOENT') {
            console.log('No policies found. Returning empty list.');
            return [];
        } else {
            console.error('Error fetching policies:', error);
            throw error;
        }
    }
};
export const update_upvote_policy = async (policyId: string): Promise<void> => {
    try {
        const fileData = await fs.readFile(policyFilePath, 'utf-8');
        const policies = JSON.parse(fileData);

        const policyIndex = policies.findIndex((policy: any) => policy.id === parseInt(policyId));

        if (policyIndex === -1) {
            throw new Error(`Policy with id ${policyId} not found.`);
        }

        policies[policyIndex].vote += 1;

        await fs.writeFile(policyFilePath, JSON.stringify(policies, null, 2), 'utf-8');

        console.log(`Policy with id ${policyId} upvoted successfully.`);
    } catch (error) {
        console.error('Error upvoting policy:', error);
        throw error;
    }
};
