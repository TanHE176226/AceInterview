import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database.js';
import cors from 'cors';
import { User, Company, CV, Industry, JobApplied, Job } from './models/index.js'

// Import router
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

// Define URI counter
app.use('/company', companiesRouter);
app.use('/job', jobRouter);
app.use('/cv', cvRouter);
app.use('/user', userRouter);
app.use('/industry', industryRouter);

// Bổ sung các dòng sau để tích hợp VNPay
import { createPaymentUrl, vnpayReturn } from './controller/checkoutController.js'; // Import các chức năng từ checkoutController.js

// Sử dụng các chức năng từ checkoutController.js cho các endpoint thanh toán
app.post('/create_payment_url', createPaymentUrl); // Định nghĩa endpoint để tạo URL thanh toán
app.get('/vnpay_return', vnpayReturn); // Định nghĩa endpoint để xử lý khi người dùng trở về từ VNPay

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    connectDB();
    console.log(`Webserver is running at http://localhost:${port}`);
})
