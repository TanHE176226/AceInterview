import express from 'express';
import { userController } from "../controllers/index.js";
import authJWT from '../middleware/authJWT.js';
import refreshTokens from '../controllers/users.js';

const userRouter = express.Router();

// Get list of users (applicants, recruiters)
userRouter.get("/", authJWT.authenticationToken, authJWT.isRecruiter, userController.getAllUsers);

// Đăng nhập người dùng
userRouter.post('/login', userController.login);

userRouter.post('/register', userController.register);
userRouter.post('/regis-recruiter', userController.registerRecruiter);

userRouter.delete("/logout", userController.deleteRefreshTokes);

userRouter.post("/token", userController.getNewAccessTokens);

export default userRouter;
