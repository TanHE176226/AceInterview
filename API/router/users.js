import express from 'express';
import { userController } from "../controllers/index.js";
import authJWT from '../middleware/authJWT.js';

const userRouter = express.Router();

// Đăng ký người dùng
// authRouter.post('/register', authController.register);

// Get list of users (applicants, recruiters)
userRouter.get("/", authJWT.authenticationToken, authJWT.isRecruiter, userController.getAllUsers);

// Đăng nhập người dùng
userRouter.post('/login', userController.login);

userRouter.post('/register', userController.register);

export default userRouter;
