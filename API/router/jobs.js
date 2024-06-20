import express from "express";
import { jobController } from "../controller/index.js";

const jobRouter = express.Router();

// Get all jobs
jobRouter.get('/', jobController.getAllJobs);

// Get all jobs with detail
jobRouter.get('/find', jobController.getJobs);

// Get all pending jobs
jobRouter.get('/pending', jobController.getPendingJobs);

// Get job details
jobRouter.get('/:jobId', jobController.getJobDetails);

// Approve Jobs
jobRouter.patch('/:jobId/approve', jobController.approveJob);

// Reject Jobs
jobRouter.patch('/:jobId/reject', jobController.rejectJob);

export default jobRouter;
