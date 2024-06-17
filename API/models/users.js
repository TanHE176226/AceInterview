import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    hash_password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: false
    },
    fullName: {
        type: String,
        // required: true
    },
    // Role ID: 0 - admin, 1 - applicant, 2 - recruiter
    roleID: {
        type: Number,
        // required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
    // companiesID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Companies',
    //     required: false
    // },
    // BusinessLicense: {
    //     type: String,
    //     required: false
    // },
    // Workplace: {
    //     type: String,
    //     required: false
    // },
}, {
    timestamps: true
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model("Users", userSchema);
export default User;