import express from 'express';
import { userController } from "../controller/index.js";
import authJWT from '../middleware/authJWT.js';

const userRouter = express.Router();

// Get list of users (applicants, recruiters)
userRouter.get("/", authJWT.authenticationToken, authJWT.isRecruiter, userController.getAllUsers);

// Đăng nhập người dùng
userRouter.post('/login', userController.login);

userRouter.post('/register', userController.register);
userRouter.post('/regis-recruiter', userController.registerRecruiter);

userRouter.delete("/logout", userController.deleteRefreshTokes);

userRouter.post("/token", userController.getNewAccessTokens);

userRouter.put('/:id', userController.updateProfile);
// Get all recruiters
userRouter.get('/recruiters', userController.getAllRecruiters);

// Get invalidated recruiters
userRouter.get('/invalidated-recruiters', userController.getInvalidatedRecruiters);

// Get user detail
userRouter.get("/:userId", userController.getUserDetails);

// Active/Deactive user
userRouter.patch("/:userId/deactive", userController.deactivateUser);
userRouter.patch("/:userId/active", userController.activateUser);
userRouter.post('/regis-recruiter', userController.registerRecruiter);
userRouter.patch('/:userId/choose-company', userController.chooseCompany);

export default userRouter;
