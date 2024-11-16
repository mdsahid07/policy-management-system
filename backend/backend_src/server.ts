import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { loginController, signupController } from './controller';
import morgan from 'morgan';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.post('/login', loginController);
app.post('/signup', signupController);

app.listen(3000, () => console.log(`Server running on port 3000`));
