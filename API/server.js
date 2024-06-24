import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database.js';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';


import { User, Company, CV, Industry, JobApplied, Job } from './models/index.js'
import { companiesRouter, jobRouter, userRouter, cvRouter, industryRouter, jobAppliedRouter } from './router/index.js';
import cookieParser from 'cookie-parser';

dotenv.config();
// Định nghĩa 1 webserver
const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Kích hoạt middleware cho phép Express đọc json từ body của request
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(fileUpload({
    createParentPath: true
}));
// app.use('/uploads', express.static('uploads'));


//define uri couter
app.use('/company', companiesRouter);
app.use('/job', jobRouter);
app.use('/cv', cvRouter);
app.use('/user', userRouter);
app.use('/industry', industryRouter);
app.use('/appliedjobs', jobAppliedRouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    connectDB();
    console.log(`Webserver is running at http://localhost:${port}`);
})
