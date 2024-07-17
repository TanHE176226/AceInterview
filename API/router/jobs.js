import express from 'express';
import { jobController } from '../controller/index.js';

const jobRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API endpoints for managing jobs
 */

/**
 * @swagger
 * /job:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Successfully retrieved all jobs
 */
jobRouter.get('/', jobController.getAllJobs);

/**
 * @swagger
 * /job/recruiter/{recruiterID}:
 *   get:
 *     summary: Get jobs by recruiter ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: recruiterID
 *         required: true
 *         schema:
 *           type: string
 *         description: Recruiter ID
 *     responses:
 *       200:
 *         description: Successfully retrieved jobs by recruiter ID
 */
jobRouter.get('/recruiter/:recruiterID', jobController.getJobsByRecruiterID);

/**
 * @swagger
 * /job/find:
 *   get:
 *     summary: Get all jobs with details
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Successfully retrieved all jobs with details
 */
jobRouter.get('/find', jobController.getJobs);

/**
 * @swagger
 * /job/pending:
 *   get:
 *     summary: Get all pending jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Successfully retrieved all pending jobs
 */
jobRouter.get('/pending', jobController.getPendingJobs);

/**
 * @swagger
 * /job/{jobId}:
 *   get:
 *     summary: Get job details
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Successfully retrieved job details
 */
jobRouter.get('/:jobId', jobController.getJobDetails);

/**
 * @swagger
 * /job/{jobId}/approve:
 *   patch:
 *     summary: Approve a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Successfully approved the job
 */
jobRouter.patch('/:jobId/approve', jobController.approveJob);

/**
 * @swagger
 * /job/{jobId}/reject:
 *   patch:
 *     summary: Reject a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Successfully rejected the job
 */
jobRouter.patch('/:jobId/reject', jobController.rejectJob);

export default jobRouter;