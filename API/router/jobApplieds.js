import express from 'express';
import { jobAppliedController } from '../controllers/index.js';

const jobAppliedRouter = express.Router();

jobAppliedRouter.get('/:applicantId', jobAppliedController.getAppliedJobs);

export default jobAppliedRouter;
