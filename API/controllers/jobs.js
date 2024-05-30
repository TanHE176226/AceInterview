import { jobDAO } from "../dao/index.js";

const getAllJob = async (req, res) => {
    try {
        const jobs = await jobDAO.getAllJob();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({error: error.toString()});
    }
}

export default {getAllJob}