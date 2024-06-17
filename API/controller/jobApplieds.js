import { jobAppliedDAO } from '../dao/index.js';
import mongoose from 'mongoose';


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


export default {
    getAppliedJobs
};
