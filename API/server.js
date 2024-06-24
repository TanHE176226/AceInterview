import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database.js';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';


import { User, Company, CV, Industry, JobApplied, Job } from './models/index.js'

//import router
import { companiesRouter } from './router/index.js';
import { jobRouter } from './router/index.js';
import { userRouter } from './router/index.js';
import { cvRouter } from './router/index.js';
import { jobAppliedRouter } from './router/index.js';


dotenv.config();
// Định nghĩa 1 webserver
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
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

app.use(fileUpload({
    createParentPath: true
}));
// app.use('/uploads', express.static('uploads'));


//define uri couter
app.use('/company', companiesRouter);
app.use('/job', jobRouter);
app.use('/user', userRouter);
app.use('/cv', cvRouter);
app.use('/appliedjobs', jobAppliedRouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    connectDB();
    console.log(`Webserver is running at http://localhost:${port}`);
})