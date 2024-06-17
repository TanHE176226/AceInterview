import JobApplied from '../models/jobApplieds.js';

const getAppliedJobsByApplicantId = async (applicantId) => {
    try {
        const appliedJobs = await JobApplied.find({ applicantID: applicantId })
            .populate('jobID')
            .populate('applicantID');
        return appliedJobs;
    } catch (error) {
        throw error;
    }
};

export default {
    getAppliedJobsByApplicantId
};
