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
        const jobId = await Job.findById(jobId);
        if(!jobId) {
            throw createError(404, 'User not found');
        }
        return jobId;
    } catch (error) {
        throw error;
    }
}

export default {
    getAllJob, getJobs, getJobByID
}