import express from "express";
import { userController } from "..//controller/index.js";

const userRouter = express.Router();

// Get list of users (applicants, recruiters)
userRouter.get("/", userController.getAllUsers);

// Get user detail
userRouter.get("/:userId", userController.getUserDetails);

// Active/Deactive user
userRouter.patch("/:userId/deactive", userController.deactivateUser);
userRouter.patch("/:userId/active", userController.activateUser);

// Get all recruiter
userRouter.get('/recruiters', userController.getAllRecruiters);

// Validate Recruiter
userRouter.get('/invalidated-recruiters', userController.getInvalidatedRecruiters);
userRouter.patch('/recruiters/:userId/validate', userController.validateRecruiter);

export default userRouter;