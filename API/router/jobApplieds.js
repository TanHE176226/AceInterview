import express from 'express';
import { jobAppliedController } from '../controller/index.js';

const jobAppliedRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Job Applied
 *   description: API endpoints for job applications
 */

/**
 * @swagger
 * /appliedjobs/{applicantId}:
 *   get:
 *     summary: Get applied jobs for a specific applicant
 *     description: Retrieve a list of job applications for a specific applicant.
 *     parameters:
 *       - in: path
 *         name: applicantId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the applicant
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
jobAppliedRouter.get('/:applicantId', jobAppliedController.getAppliedJobs);

/**
 * @swagger
 * /appliedjobs/apply:
 *   post:
 *     summary: Apply for a job
 *     description: Create a new job application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobApplication'
 *     responses:
 *       201:
 *         description: Job application created successfully
 *       400:
 *         description: Invalid request payload
 *       500:
 *         description: Internal server error
 */
jobAppliedRouter.post('/apply', jobAppliedController.applyForJob);

/**
 * @swagger
 * /appliedjobs/accept:
 *   patch:
 *     summary: Accept a job application
 *     description: Accept a job application by updating its status to "Accept".
 *     responses:
 *       200:
 *         description: Job application accepted successfully
 *       400:
 *         description: Invalid request payload
 *       500:
 *         description: Internal server error
 */
jobAppliedRouter.patch('/accept', jobAppliedController.acceptCV);

/**
 * @swagger
 * /appliedjobs/reject:
 *   patch:
 *     summary: Reject a job application
 *     description: Reject a job application by updating its status to "Reject".
 *     responses:
 *       200:
 *         description: Job application rejected successfully
 *       400:
 *         description: Invalid request payload
 *       500:
 *         description: Internal server error
 */
jobAppliedRouter.patch('/reject', jobAppliedController.rejectCV);

export default jobAppliedRouter;