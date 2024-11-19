import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sql from 'mssql';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration
const dbConfig = {
    user: 'your_username',
    password: 'your_password',
    server: 'your_server',
    database: 'your_database',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Middleware to authenticate user via JWT
const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { userId: string; userName: string; };
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

// Get all rules
app.get('/rules', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Rules');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add a new rule
app.post('/rules', authenticate, async (req: any, res) => {
    const { title, description } = req.body;
    const { userId, userName } = req.user;

    try {
        const pool = await sql.connect(dbConfig);
        await pool
            .request()
            .input('Title', sql.NVarChar, title)
            .input('Description', sql.NVarChar, description)
            .input('UserId', sql.NVarChar, userId)
            .input('UserName', sql.NVarChar, userName)
            .query('INSERT INTO Rules (Title, Description, UserId, UserName) VALUES (@Title, @Description, @UserId, @UserName)');
        res.status(201).send('Rule created successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});

// Upvote a rule
app.post('/rules/:id/upvote', authenticate, async (req: any, res) => {
    const ruleId = req.params.id;
    const { userId } = req.user;

    try {
        const pool = await sql.connect(dbConfig);

        // Check if the user has already voted
        const checkVote = await pool
            .request()
            .input('UserId', sql.NVarChar, userId)
            .input('RuleId', sql.Int, ruleId)
            .query('SELECT * FROM UserVotes WHERE UserId = @UserId AND RuleId = @RuleId');

        if (checkVote.recordset.length > 0) {
            return res.status(400).json({ message: 'You can only upvote once' });
        }

        // Increment vote count
        await pool.request().input('RuleId', sql.Int, ruleId).query('UPDATE Rules SET Vote = Vote + 1 WHERE Id = @RuleId');

        // Record the user's vote
        await pool
            .request()
            .input('UserId', sql.NVarChar, userId)
            .input('RuleId', sql.Int, ruleId)
            .query('INSERT INTO UserVotes (UserId, RuleId) VALUES (@UserId, @RuleId)');

        res.status(200).send('Upvoted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
//app.listen(4000, () => console.log('Server running on port 4000'));
