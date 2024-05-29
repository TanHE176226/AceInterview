import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    // Role ID: 0 - admin, 1 - applicant, 2 - recruiter
    roleID: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
    // Recruiter status will be boolean (true: validated, false: invalidated)
}, {
    timestamps: true
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model("Users", userSchema);
export default User;