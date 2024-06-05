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
            query.location = location;
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