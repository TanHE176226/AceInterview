import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database.js';
import cors from 'cors';
import { User, Company, CV, Industry, JobApplied, Job } from './models/index.js'
import { companiesRouter, jobRouter, userRouter, cvRouter, industryRouter } from './router/index.js';
import cookieParser from 'cookie-parser';

dotenv.config();
// Định nghĩa 1 webserver
const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Kích hoạt middleware cho phép Express đọc json từ body của request
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//define uri couter
app.use('/company', companiesRouter);
app.use('/job', jobRouter);
app.use('/cv', cvRouter);
app.use('/user', userRouter);
app.use('/industry', industryRouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    connectDB();
    console.log(`Webserver is running at http://localhost:${port}`);
})
