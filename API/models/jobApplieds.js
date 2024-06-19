import mongoose, { Schema } from "mongoose";
import User from './users.js';
import Job from './jobs.js';

const jobAppliedSchema = new Schema({
    jobID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
        required: true
    },
    applicantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    // Job Status: 1-Accept, 0-Reject, 2-Pending
    status: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const JobApplied = mongoose.model("JobApplied", jobAppliedSchema);
export default JobApplied;