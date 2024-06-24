import express from 'express';
import { jobController } from '../controller/index.js';

const jobRouter = express.Router();

jobRouter.get('/', jobController.getAllJobs);

// GET jobs by recruiters ID /job?recruiterID=12345
jobRouter.get('/recruiter/:recruiterID', jobController.getJobsByRecruiterID);

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
