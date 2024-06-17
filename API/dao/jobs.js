import Job from '../models/jobs.js';
import createError from 'http-errors';

const getAllJob = async() =>{
    try {
        const jobs = await Job.find({}).exec();
        return jobs;
    } catch (error) {
        throw createError(500, error.message);
    }
}

const getJobs = async(query) => {
    try {
        return await Job.find(query).populate('recruitersID').populate('industry');
    } catch (error) {
        throw createError(500, error.message);
    }
}

const getJobByID = async (jobId) => {
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            throw new Error('Job not found');
        }
        return job;
    } catch (error) {
        throw error; // Re-throwing the error for centralized error handling
    }
}

export default {
    getAllJob, getJobs, getJobByID
}