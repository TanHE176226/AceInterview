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

export default {
    getAllJob
}