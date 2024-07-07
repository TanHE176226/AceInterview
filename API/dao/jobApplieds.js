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

const appliedForJob = async (jobId, applicantId, cvsId) => {
    try {
        // Validate inputs
        if (!jobId || !applicantId || !cvsId) {
            throw new Error('jobId, applicantId, and cvsId are required.');
        }

        // Check if the applicant has already applied for the job
        const existingApplication = await JobApplied.findOne({ jobID: jobId, applicantID: applicantId, cvsID: cvsId });
        if (existingApplication) {
            throw new Error('Applicant has already applied for this job.');
        }

        const jobApplied = new JobApplied({
            jobID: jobId,
            applicantID: applicantId,
            cvsID: cvsId,
            status: 1, // Assuming 1 for Pending status
        });

        await jobApplied.save();
        return jobApplied;
    } catch (error) {
        throw error;
    }
};

const getJobsAppliedByRecruiter = async(recruiterId) => {
    try {
        const jobsApplied = await JobApplied.find()
            .populate({
                path: 'jobID',
                match: { recruitersID: recruiterId },
                populate: { path: 'recruitersID' }
            })
            .populate('applicantID')
            .populate('cvsID');

        return jobsApplied.filter(jobApplied => jobApplied.jobID !== null);
    } catch (error) {
        throw new Error('Error getting jobs applied by recruiter: ' + error.message);
    }
}


export default {
    getAppliedJobsByApplicantId, appliedForJob, getJobsAppliedByRecruiter
};