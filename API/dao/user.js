import User from "../models/users.js";
import createError from 'http-errors';

const getAllUsers = async () => {
    try {
        const users = await User.find({}).exec();
        return users;
    } catch (error) {
        throw createError(500, error.message);
    }
}

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw createError(404, 'User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

const deactivateUser = async (userId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
        if (!user) {
            throw createError(404, 'User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

const activateUser = async (userId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { isActive: true }, { new: true });
        if (!user) {
            throw createError(404, 'User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

const getAllRecruiters = async () => {
    try {
        const recruiters = await User.find({ roleID: 2 });
        return recruiters;
    } catch (error) {
        throw error;
    }
};

const getAllInvalidatedRecruiters = async () => {
    try {
        const invalidatedRecruiters = await User.find({ roleID: 2, recruiterStatus: false });
        return invalidatedRecruiters;
    } catch (error) {
        throw error;
    }
};

const validateRecruiter = async (userId) => {
    try {
        const recruiter = await User.findByIdAndUpdate(
            userId,
            { $set: { 'recruiterStatus': true } },
            { new: true, strict: false }
        );
        if (!recruiter) {
            throw createError(404, 'User not found');
        }
        return recruiter;
    } catch (error) {
        throw error;
    }
};

export default {
    getAllUsers,
    getUserById,
    deactivateUser,
    activateUser,
    getAllRecruiters,
    getAllInvalidatedRecruiters,
    validateRecruiter
}