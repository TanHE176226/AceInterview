import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database.js';
import cors from 'cors';
import { User, Company, CV, Industry, JobApplied, Job } from './models/index.js'

//import router
import { companiesRouter } from './router/index.js';
import { jobRouter } from './router/index.js';
import { userRouter } from './router/index.js';
import { cvRouter } from './router/index.js';
<<<<<<< HEAD
import { jobAppliedRouter } from './router/index.js';
=======
import cookieParser from 'cookie-parser';
>>>>>>> 6cd253b17eb6d2a89978ac36f9f9a3053686415f

dotenv.config();
// Định nghĩa 1 webserver
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Kích hoạt middleware cho phép Express đọc json từ body của request
app.use(express.json());
app.use(cors(corsOptions));

//define uri couter
app.use('/companies', companiesRouter);
app.use('/jobs', jobRouter);
app.use('/auth', userRouter);
app.use('/cv', cvRouter);
<<<<<<< HEAD
app.use('/appliedjobs', jobAppliedRouter);
=======
app.use(cookieParser());

//app.use('/user', userRouter);
>>>>>>> 6cd253b17eb6d2a89978ac36f9f9a3053686415f

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    connectDB();
    console.log(`Webserver is running at http://localhost:${port}`);
})