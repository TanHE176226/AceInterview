import User from "../models/users.js";
import createError from 'http-errors';

// Create a new user
const createUser = async (userData) => {
    const user = new User(userData);
    return user.save();
};

// Find a user by email
const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        throw new Error('Error finding user by email');
    }
};

// Find a user by username or email
const findUserByUsernameOrEmail = async (usernameOrEmail) => {
    try {
        return await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    } catch (error) {
        throw new Error('Error finding user by username or email');
    }
};

export default {
    createUser,
    findUserByEmail,
    findUserByUsernameOrEmail
};