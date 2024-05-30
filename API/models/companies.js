import mongoose, { Schema } from 'mongoose';
import User from './users.js';

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    taxNumber: {
        type: String,
        required: true
    },
    numberOfEmployees: {
        type: Number,
        required: true
    },
    recruiters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // Company Status: Bronze, Silver, Gold, Diamond
    companyStatus: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Company = mongoose.model("Companies", companySchema);
export default Company;