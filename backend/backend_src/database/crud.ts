import fs from "fs/promises";
import path from "path";

const usersFilePath = path.join(__dirname, "./users.json"); // Path to the users file

export const createUser = async (username: string, password: string): Promise<void> => {
    try {
        // Read the existing users file (if it exists)
        let users: Array<{ username: string; password: string; }> = [];
        try {
            const data = await fs.readFile(usersFilePath, "utf8");
            users = JSON.parse(data); // Parse the JSON data into an array
        } catch (err) {
            throw new Error(); // Ignore file not found errors
        }

        // Check if the username already exists
        if (users.some(user => user.username === username)) {
            throw new Error(`User ${username} already exists.`);
        }

        // Add the new user to the array
        users.push({ username, password });

        // Save the updated users array back to the file
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf8");

        console.log(`User ${username} created successfully.`);
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

export const getUser = async (username: string): Promise<boolean> => {
    try {
        // Read the users file (if it exists)
        const data = await fs.readFile(usersFilePath, "utf8");
        const users: Array<{ username: string; password: string; }> = JSON.parse(data);

        // Check if a user with the given username exists
        return users.some(user => user.username === username);
    } catch (err) {
        throw new Error();

    }
};
export const getUserId = async (username: string): Promise<number | null> => {
    try {
        // Read the users file (if it exists)
        const data = await fs.readFile(usersFilePath, "utf8");
        const users: Array<{ id: number; username: string; password: string; }> = JSON.parse(data);

        // Find the user by username
        const user = users.find(user => user.username === username);

        if (user) {
            console.log(user.id); // Log the user's ID
            console.log(user);    // Log the full user object
            return user.id;       // Return the user's ID
        } else {
            return null;          // Return null if the user is not found
        }
    } catch (err) {

        throw err; // Rethrow for higher-level handling if needed
    }
};
export const checkUser = async (username: string, password: string): Promise<boolean> => {
    try {
        // Read the users file (if it exists)
        const data = await fs.readFile(usersFilePath, "utf8");
        const users: Array<{ username: string; password: string; }> = JSON.parse(data);

        // Check if a user with the given username and password exists
        return users.some(user => user.username === username && user.password === password);
    } catch (err) {

        console.error("Error reading users file:", err);
        throw err; // Rethrow for higher-level handling if needed
    }
};
const policyFilePath = path.resolve(__dirname, 'policies.json');
export const create_policy = async (
    title: string,
    description: string,
    owner: string,
    date: Date,
    category: string
): Promise<void> => {
    // Define the file path for storing policies
    //const filePath = path.resolve(__dirname, 'policies.json');

    try {
        // Read the existing file (if it exists)
        let policies = [];
        try {
            const fileData = await fs.readFile(policyFilePath, 'utf-8');
            policies = JSON.parse(fileData);
        } catch (err) {

            throw err; // Ignore "file not found" errors but throw others

        }

        // Add the new policy to the policies array
        const newPolicy = {
            title,
            description,
            owner,
            date: date.toISOString(), // Convert Date to ISO string for serialization
            vote: 0,
            category,
        };
        policies.push(newPolicy);

        // Write the updated policies array back to the file
        await fs.writeFile(policyFilePath, JSON.stringify(policies, null, 2), 'utf-8');

        console.log('Policy created:', newPolicy);
    } catch (error) {
        console.error('Error creating policy:', error);
        throw error; // Optionally rethrow the error for higher-level handling
    }
};

const voteFilePath = path.resolve(__dirname, 'uservote.json');

export const checkVoteDuplication = async (policyid: string, userid: string): Promise<boolean> => {
    try {
        // Read the votes file (if it exists)
        const data = await fs.readFile(voteFilePath, "utf8");
        const votes: Array<{ userid: string; policyid: string; }> = JSON.parse(data);

        // Check if the user has already voted for the given policy
        const existingVote = votes.some(vote => vote.userid === userid && vote.policyid === policyid);

        if (existingVote) {
            return false; // Return false if the user already voted
        } else {
            // Insert the new vote if not already voted
            await insertVote(userid, policyid);
            return true; // Return true if the vote was successfully inserted
        }
    } catch (err) {

        // File doesn't exist, no votes to check
        console.error("Votes file not found.");
        return false;

        console.error("Error reading votes file:", err);
        throw err; // Rethrow for higher-level handling if needed
    }
};
const insertVote = async (userid: string, policyid: string): Promise<void> => {
    try {
        // Read the existing votes from the file
        const data = await fs.readFile(voteFilePath, "utf8").catch(() => "[]");
        const votes: Array<{ userid: string; policyid: string; }> = JSON.parse(data);

        // Add the new vote
        votes.push({ userid, policyid });

        // Write the updated votes back to the file
        await fs.writeFile(voteFilePath, JSON.stringify(votes, null, 2));

        console.log("Vote inserted:", { userid, policyid });
    } catch (err) {
        console.error("Error inserting vote:", err);
        throw err; // Rethrow for higher-level handling if needed
    }
};


export const getAllPolicies = async (): Promise<any[]> => {
    try {
        // Read the policies from the file
        const fileData = await fs.readFile(policyFilePath, 'utf-8');

        // Parse and return the JSON data
        const policies = JSON.parse(fileData);
        return policies;
    } catch (error) {
        if (error === 'ENOENT') {
            // If the file doesn't exist, return an empty array
            console.log('No policies found. Returning empty list.');
            return [];
        } else {
            console.error('Error fetching policies:', error);
            throw error; // Rethrow other errors for handling
        }
    }
};
export const update_upvote_policy = async (policyId: string): Promise<void> => {
    try {
        // Read the policies from the file
        const fileData = await fs.readFile(policyFilePath, 'utf-8');
        const policies = JSON.parse(fileData);

        // Find the policy with the matching ID
        const policyIndex = policies.findIndex((policy: any) => policy.id === parseInt(policyId));

        if (policyIndex === -1) {
            throw new Error(`Policy with id ${policyId} not found.`);
        }

        // Increment the vote count
        policies[policyIndex].vote += 1;

        // Write the updated policies back to the file
        await fs.writeFile(policyFilePath, JSON.stringify(policies, null, 2), 'utf-8');

        console.log(`Policy with id ${policyId} upvoted successfully.`);
    } catch (error) {
        console.error('Error upvoting policy:', error);
        throw error; // Optionally rethrow the error for higher-level handling
    }
};
