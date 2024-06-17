import express from 'express';
import { jobController } from '../controllers/index.js';

const jobRouter = express.Router();

//get list companies 
jobRouter.get("/", jobController.getAllJob);
jobRouter.get('/find', jobController.getJobs);

jobRouter.post('/apply/:jobId', async (req, res) => {
    const userId = req.body.userId; // Assuming userId is provided in the request body
    const jobId = req.params.jobId;

    try {
        const result = await jobController.applyForJob(userId, jobId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default jobRouter;