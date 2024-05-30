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
    name: {
        type: String,
        required: true
    },
    roleID: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model("Users", userSchema);
export default User;