import express from "express";
import { jobController } from "../controller/index.js";

const jobRouter = express.Router();

// Get all jobs
jobRouter.get('/', jobController.getAllJobs);

// Get jobs with query parameters
jobRouter.get('/find', jobController.getJobs);

// Get a job by ID
jobRouter.get('/:jobId', jobController.getJobDetails);

// Create a new job
jobRouter.post('/', jobController.createJob);

// Update a job by ID
jobRouter.put('/:jobId', jobController.updateJob);

// Delete a job by ID
jobRouter.delete('/:jobId', jobController.deleteJob);

// Get all pending jobs
jobRouter.get('/pending', jobController.getPendingJobs);

// Approve a job by ID
jobRouter.patch('/:jobId/approve', jobController.approveJob);

// Reject a job by ID
jobRouter.patch('/:jobId/reject', jobController.rejectJob);

export default jobRouter;
