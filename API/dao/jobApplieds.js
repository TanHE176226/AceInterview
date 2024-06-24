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

const appliedForJob = async (jobId, applicantId) => {
    try {
        if (!jobId || !applicantId) {
            throw new Error('jobId and applicantId are required.');
        }

        // Check if the applicant has already applied for the job
        const existingApplication = await JobApplied.findOne({ jobID: jobId, applicantID: applicantId });
        if (existingApplication) {
            throw new Error('Applicant has already applied for this job.');
        }

        const jobApplied = new JobApplied({
            jobID: jobId,
            applicantID: applicantId,
            status: 1, // Status set to Pending
        });

        await jobApplied.save();
        return jobApplied;
    } catch (error) {
        throw error;
    }
};

export default {
    getAppliedJobsByApplicantId, appliedForJob
};
