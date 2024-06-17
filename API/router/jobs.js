import express from 'express';
import { jobController } from '../controllers/index.js';

const jobRouter = express.Router();

//get list companies 
jobRouter.get("/", jobController.getAllJob);
jobRouter.get('/find', jobController.getJobs);

jobRouter.post('/apply/:jobId', async (req, res) => {
    // Check if user is authenticated
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.userId;
    const jobId = req.params.jobId;

    try {
        const result = await jobController.applyForJob(userId, jobId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default jobRouter;