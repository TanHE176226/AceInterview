import express from 'express';
import { jobAppliedController } from '../controller/index.js';

const jobAppliedRouter = express.Router();

jobAppliedRouter.get('/:applicantId', jobAppliedController.getAppliedJobs);
jobAppliedRouter.post('/apply', jobAppliedController.applyForJob);

export default jobAppliedRouter;
