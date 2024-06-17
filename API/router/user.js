import express from "express";
import { userController } from "../controller/index.js";
import authJWT from "../middleware/authJWT.js";

const userRouter = express.Router();

// Get list of users (applicants, recruiters)
userRouter.get("/", authJWT.isAdmin, userController.getAllUsers);

// Get all recruiters
userRouter.get('/recruiters', userController.getAllRecruiters);

// Get invalidated recruiters
userRouter.get('/invalidated-recruiters', userController.getInvalidatedRecruiters);

// Get user detail
userRouter.get("/:userId", userController.getUserDetails);

// Active/Deactive user
userRouter.patch("/:userId/deactive", userController.deactivateUser);
userRouter.patch("/:userId/active", userController.activateUser);

// Validate Recruiter
userRouter.patch('/recruiters/:userId/validate', userController.validateRecruiter);

export default userRouter;