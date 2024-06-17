import { jobDAO } from "../dao/index.js";

const getAllJob = async (req, res) => {
    try {
        const jobs = await jobDAO.getAllJob();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const getJobs = async (req, res) => {
    try {
        const { title, industry, typeOfWork, status, location, minSalary, maxSalary, experience } = req.query;

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
            query['location.city'] = { $regex: location, $options: 'i' }; // Use $regex for case-insensitive search
        }
        if (experience) {
            query.experience = experience;
        }
        if (minSalary) {
            query.salary = { ...query.salary, $gte: minSalary };
        }
        if (maxSalary) {
            query.salary = { ...query.salary, $lte: maxSalary };
        }

        const jobs = await jobDAO.getJobs(query);
        res.status(200).json(jobs);

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const applyForJob = async (userId, jobId) => {
    try {
        const job = await jobDAO.getJobByID(jobId);
        if (!job) {
            throw new Error('Job not found');
        }

        // Check if the user has already applied for this job
        if (job.applicants.includes(userId)) {
            throw new Error('You have already applied for this job');
        }

        // Add the user to the job's list of applicants
        job.applicants.push(userId);

        // Update the numberOfApplicants field
        job.numberOfApplicants = job.applicants.length;

        // Save the updated job
        await jobDAO.updateJob(jobId, { applicants: job.applicants, numberOfApplicants: job.numberOfApplicants });
    
        return { success: true, message: 'Job application submitted successfully' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


export default { getAllJob, getJobs, applyForJob }