import User from "../models/users.js";
import bcrypt from 'bcrypt';

import createError from 'http-errors';

const createUser = async (userData) => {
    try {
        console.log('Creating user with email:', userData.email);
        const user = await User.create(userData, { strict: false });
        console.log('User created:', user);
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user: ' + error.message);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find({}).exec();
        return users;
    } catch (error) {
        throw createError(500, error.message);
    }
}

const findUserByUsernameAndPassword = async (username, password) => {
    try {
        const user = await User.findOne({ username: username }).exec();

        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.hash_password);
        if (!isPasswordValid) {
            return null;
        }

        return user;
    } catch (error) {
        console.error('Error in findUserByUsernameAndPassword:', error);
        throw createError(500, 'Error finding user by username and password');
    }
};

const findUserByEmailAndPassword = async (email, password) => {
    try {
        const user = await User.findOne({ email: email }).exec();

        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.hash_password);
        if (!isPasswordValid) {
            return null;
        }

        return user;
    } catch (error) {
        console.error('Error in findUserByEmailAndPassword:', error);
        throw createError(500, 'Error finding user by email and password');
    }
};

// Find a user by username or email
const findUserByUsernameOrEmail = async (identifier) => {
    try {
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: new RegExp('^' + identifier + '$', 'i') }],
        }).exec();

        console.log("return: ", identifier)
        console.log("return1: ", user)

        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        console.error('Error in findUserByUsernameOrEmail:', error);
        throw createError(500, 'Error finding user by username or email');
    }
};

const comparePassword = async (user, password) => {
    return user.comparePassword(password);
}

const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
};

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
        // Strict: false for updated unregistered field in schema
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
    comparePassword,
    findUserByUsernameOrEmail,
    findUserByUsernameAndPassword,
    createUser,
    findUserByEmailAndPassword,
    findUserByEmail,
    getAllUsers,
    getUserById,
    deactivateUser,
    activateUser,
    getAllRecruiters,
    getAllInvalidatedRecruiters,
    validateRecruiter
};