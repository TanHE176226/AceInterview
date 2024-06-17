import mongoose, { Schema } from "mongoose";
import User from './users.js';

const cvSchema = new Schema({
    fileURL: {
        type: Buffer,
        required: true
    },
    applicantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const CV = mongoose.model("CVs", cvSchema);
export default CV;