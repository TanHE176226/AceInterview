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

const acceptCV = async (jobID, applicantID) => {
    try {
        if (!jobID || !applicantID) {
            throw new Error('jobID and applicantID are required.');
        }

        const result = await JobApplied.findOneAndUpdate(
            { jobID: jobID, applicantID: applicantID },
            { $set: { status: 1 } },
            { new: true }
        );

        if (!result) {
            throw new Error('No matching document found.');
        }

        return result;
    } catch (error) {
        throw error;
    }
};

const rejectCV = async (jobID, applicantID) => {
    try {
        if (!jobID || !applicantID) {
            throw new Error('jobID and applicantID are required.');
        }

        const result = await JobApplied.findOneAndUpdate(
            { jobID: jobID, applicantID: applicantID },
            { $set: { status: 0 } },
            { new: true }
        );

        if (!result) {
            throw new Error('No matching document found.');
        }

        return result;
    } catch (error) {
        throw error;
    }
};

export default {
    getAppliedJobsByApplicantId,
    appliedForJob,
    acceptCV,
    rejectCV
};
