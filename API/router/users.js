import express from 'express';
import { userController } from "../controllers/index.js";

const userRouter = express.Router();

// Đăng ký người dùng
// authRouter.post('/register', authController.register);

// Đăng nhập người dùng
userRouter.post('/login', userController.login);

export default userRouter;
