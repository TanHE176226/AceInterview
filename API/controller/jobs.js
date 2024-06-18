import { jobDAO } from "../dao/index.js";
import { userDAO } from "../dao/index.js";

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
            query['location.commune'] = { $regex: location, $options: 'i' }; // Use $regex for case-insensitive search
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




export default { getAllJob, getJobs }