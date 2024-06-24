import { jobAppliedDAO } from '../dao/index.js';
import mongoose from 'mongoose';
import { jobDAO } from "../dao/index.js";
import { userDAO } from "../dao/index.js";


const getAppliedJobs = async (req, res) => {
    const { applicantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicantId)) {
        return res.status(400).json({ message: 'Invalid applicant ID' });
    }

    try {
        const appliedJobs = await jobAppliedDAO.getAppliedJobsByApplicantId(applicantId);
        res.status(200).json(appliedJobs);
    } catch (error) {
        console.error('Error fetching applied jobs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const applyForJob = async (req, res) => {
    try {
        const { jobId, applicantId } = req.body;

        // Validate job ID and applicant ID
        const job = await jobDAO.getJobByID(jobId);
        if (!job) {
            return res.status(404).json({ message: 'job not found' });
        }

        const user = await userDAO.getUserById(applicantId);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });

        }

        //use DAO to create new JobApplied entry
        const jobApplied = await jobAppliedDAO.appliedForJob(jobId, applicantId);
        res.status(200).json({ message: 'Job application successful', jobApplied });
    } catch (error) {
        if (error.message === 'Applicant has already applied for this job.') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export default {
    getAppliedJobs, applyForJob
};
