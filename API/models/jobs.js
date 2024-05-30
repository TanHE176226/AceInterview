import mongoose, { Schema } from 'mongoose';
import User from './users.js';
import Industry from './industries.js';

const jobSchema = new Schema({
    recruitersID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desciprtion: {
        type: String,
        required: true
    },
    industry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industry',
        required: true
    },
    numberOfApplicants: {
        type: Number,
        required: true
    },
    // 2 Type of Work: 0-FullTime, 1-PartTime
    typeOfWork: {
        type: Boolean,
        required: true
    },
    // Gender is blank means gender is not required
    gender: {
        type: Boolean
    },
    level: {
        type: Number
    },
    salary: {
        type: Number
    },
    experience: {
        type: Number
    },
    deadline: {
        type: Date
    },
    // Job Status: Approve, Reject, Pending
    status: {
        type: Number,
        required: true
    },
    location: {
        type: Object,
        default: {
            address: {
                type: String
            },
            district: {
                type: String
            },
            city: {
                type: String
            },
            province: {
                type: String
            }
        }
    }
}, {
    timestamps: true
});

const Job = mongoose.model("Jobs", jobSchema);
export default Job;