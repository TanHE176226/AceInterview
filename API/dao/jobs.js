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

export default {
    getAllJob, getJobs
}