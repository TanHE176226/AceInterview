import mongoose, { Schema } from "mongoose";
import User from './users.js';
import Job from './jobs.js';

const jobAppliedSchema = new Schema({
    jobID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Job Status: Accept, Reject, Pending
    status: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const JobApplied = mongoose.model("JobApplied", jobAppliedSchema);
export default JobApplied;