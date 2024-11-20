import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { loginController, signupController } from './business_Layer/auth_controller';
import { addPolicyController, getPolicies, upVotePolicy } from './business_Layer/policy_controller';
import morgan from 'morgan';
import connectDB from './Data_Layer/db_connection';
import { authenticate } from './business_Layer/middleware';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//app.post('/policies', policyRoutes);
app.get('/policies', getPolicies);
app.post('/addPolicy', authenticate, addPolicyController);
app.post('/:id/upvote', authenticate, upVotePolicy);
app.post('/signin', loginController);
app.post('/signup', signupController);

//app.listen(3000, () => console.log(`Server running on port 3000`));

// connectDB()
//     .then(() => {
//         app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
//     })
//     .catch((error) => console.error('Failed to start server:', error));
app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});
