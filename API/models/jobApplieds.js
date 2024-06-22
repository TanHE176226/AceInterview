import mongoose, { Schema } from "mongoose";
import Users from './users.js';
import Jobs from './jobs.js';

const jobAppliedSchema = new Schema({
    jobID: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: 'Jobs',
        required: true
    },
    applicantID: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: 'Users',
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