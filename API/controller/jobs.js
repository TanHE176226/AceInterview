import { jobDAO } from "../dao/index.js";

const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobDAO.getAllJobs();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const getJobs = async (req, res) => {
    try {
        const { title, industry, typeOfWork, status, location, minSalary, maxSalary } = req.query;

        const query = {};

        if (title) {
            query.title = new RegExp(title, 'i');
        }

        if (industry) {
            query.industry = industry;
        }
        if (typeOfWork) {
            query.typeOfWork = typeOfWork;
        }
        if (status) {
            query.status = status;
        }
        if (location) {
            query['location.comune'] = { $regex: location, $options: 'i' }; // Use $regex for case-insensitive search
        }
        if (experience) {
            query.experience = experience;
        }
        query.$or = [
            {
                $and: [
                    { minSalary: { $gte: Number(minSalary) } },
                    { minSalary: { $lte: Number(maxSalary) } }
                ]
            },
            {
                $and: [
                    { minSalary: { $lte: Number(minSalary) } },
                    { maxSalary: { $gte: Number(minSalary) } }
                ]
            }
        ];

        const jobs = await jobDAO.getJobs(query);
        res.status(200).json(jobs);

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const getJobDetails = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await jobDAO.getJobById(jobId);
        res.status(200).json(job);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const createJob = async (req, res) => {
    try {
        const jobData = req.body;
        const job = await jobDAO.createJob(jobData);
        res.status(201).json(job);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const jobData = req.body;
        const job = await jobDAO.updateJob(jobId, jobData);
        res.status(200).json(job);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await jobDAO.deleteJob(jobId);
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
    getJobs,
    getJobDetails,
    createJob,
    updateJob,
    deleteJob,
    getPendingJobs,
    approveJob,
    rejectJob,
};
