import { jobAppliedDAO } from "../dao/index.js";
import mongoose from "mongoose";
import { jobDAO } from "../dao/index.js";
import { userDAO } from "../dao/index.js";
import { cvDAO } from "../dao/index.js";

const getAppliedJobs = async (req, res) => {
  const { applicantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(applicantId)) {
    return res.status(400).json({ message: "Invalid applicant ID" });
  }

  try {
    const appliedJobs = await jobAppliedDAO.getAppliedJobsByApplicantId(
      applicantId
    );
    res.status(200).json(appliedJobs);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const applyForJob = async (req, res) => {
  try {
    const { jobId, applicantId, cvsId } = req.body;

    // Validate request body parameters
    if (!jobId || !applicantId || !cvsId) {
      return res.status(400).json({ message: "jobId, applicantId, and cvsId are required." });
    }

    // Validate job ID
    const job = await jobDAO.getJobById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Validate applicant ID
    const user = await userDAO.getUserById(applicantId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate CV ID
    const cvs = await cvDAO.findById(cvsId);
    if (!cvs) {
      return res.status(404).json({ message: "CV not found" });
    }

    // Use DAO to create new JobApplied entry
    const jobApplied = await jobAppliedDAO.appliedForJob(jobId, applicantId, cvsId);
    return res.status(200).json({ success: true, message: "Job application successful", jobApplied });
  } catch (error) {
    if (error.message === "Applicant has already applied for this job.") {
      return res.status(409).json({ message: error.message }); // 409 Conflict
    }
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getJobsAppliedByRecruiter = async (req, res) => {
  try {
    const recruiterId = req.params.recruiterId;
    const jobsApplied = await jobAppliedDAO.getJobsAppliedByRecruiter(recruiterId);
    res.status(200).json(jobsApplied);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobApplication = async (req, res) => {
  try {
    const jobID = req.params.jobID;
    const jobId = await jobAppliedDAO.getJobApplicationByJobID(jobID);
    if (!jobId || jobId.length === 0) {
      return res.status(404).json({ message: 'Job applications not found' });
    }
    res.status(200).json(jobId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default {
  getAppliedJobs,
  applyForJob,
  getJobsAppliedByRecruiter,
  getJobApplication
};
