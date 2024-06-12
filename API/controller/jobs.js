import { jobDAO } from "../dao/index.js";

const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobDAO.getAllJobs();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

const getJobDetails = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await jobDAO.getJobById(jobId);
        res.status(200).json(job);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const getPendingJobs = async (req, res) => {
    try {
        const pendingJobs = await jobDAO.getAllPendingJobs();
        res.status(200).json(pendingJobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const approveJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const approvedJob = await jobDAO.approveJob(jobId);
        res.status(200).json(approvedJob);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const rejectJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const rejectedJob = await jobDAO.rejectJob(jobId);
        res.status(200).json(rejectedJob);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

export default {
    getAllJobs,
    getJobDetails,
    getPendingJobs,
    approveJob,
    rejectJob,
};