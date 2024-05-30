import express from 'express';
import { jobController } from '../controllers/index.js';

const jobRouter = express.Router();

//get list companies 
jobRouter.get("/", jobController.getAllJob);

export default jobRouter;