import Job from '../models/jobs.js';
import createError from 'http-errors';

const getAllJobs = async () => {
    try {
        const jobs = await Job.find({}).exec();
        return jobs;
    } catch (error) {
        throw createError(500, error.message);
    }
};

const getJobs = async (query) => {
    try {
        return await Job.find(query).populate('recruitersID').populate('industry');
    } catch (error) {
        throw createError(500, error.message);
    }
}

const getJobById = async (jobId) => {
    try {
        const job = await Job.findById(jobId).populate('recruitersID').populate('industry');
        if (!job) {
            throw createError(404, 'Job not found');
        }
        return job;
    } catch (error) {
        throw error;
    }
};

const createJob = async (jobData) => {
    try {
        const job = new Job(jobData);
        await job.save();
        return job;
    } catch (error) {
        throw createError(500, error.message);
    }
};

const updateJob = async (jobId, jobData) => {
    try {
        const job = await Job.findByIdAndUpdate(jobId, jobData, { new: true }).populate('recruitersID').populate('industry');
        if (!job) {
            throw createError(404, 'Job not found');
        }
        return job;
    } catch (error) {
        throw error;
    }
};

const deleteJob = async (jobId) => {
    try {
        const job = await Job.findByIdAndDelete(jobId);
        if (!job) {
            throw createError(404, 'Job not found');
        }
        return job;
    } catch (error) {
        throw error;
    }
};

const getAllPendingJobs = async () => {
    try {
        const pendingJobs = await Job.find({ status: 2 }).populate('recruitersID').populate('industry');
        return pendingJobs;
    } catch (error) {
        throw error;
    }
};

const approveJob = async (jobId) => {
    try {
        const job = await Job.findByIdAndUpdate(
            jobId,
            { status: 1 },
            { new: true }
        );
        if (!job) {
            throw createError(404, 'Job not found');
        }
        return job;
    } catch (error) {
        throw error;
    }
};

const rejectJob = async (jobId) => {
    try {
        const job = await Job.findByIdAndUpdate(
            jobId,
            { status: 0 },
            { new: true }
        );
        if (!job) {
            throw createError(404, 'Job not found');
        }
        return job;
    } catch (error) {
        throw error;
    }
};

export default {
    getAllJobs,
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    getAllPendingJobs,
    approveJob,
    rejectJob,
};
