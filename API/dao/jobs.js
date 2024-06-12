import Job from '../models/jobs.js';
import createError from 'http-errors';

const getAllJobs = async () => {
    try {
        const jobs = await Job.find({}).populate('recruitersID').populate('industry');
        return jobs;
    } catch (error) {
        throw error;
    }
};

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
    getJobById,
    getAllPendingJobs,
    approveJob,
    rejectJob,
}