import User from "../models/users.js";
import bcrypt from 'bcrypt';

import createError from 'http-errors';

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

// const createUser = async (userData) => {
//     try {
//         console.log('retuen:', userData.email);
//         const user = await User.create(
//             {
//                 username: userData.username,
//                 hash_password: userData.hash_password,
//                 email: userData.email,
//                 fullName: userData.fullName,
//                 roleID: userData.roleID,
//                 isActive: userData.isActive,
//                 companiesID: userData.companiesID,
//                 BusinessLicense: userData.BusinessLicense,
//                 Workplace: userData.Workplace
//             }, {strict: false});
//         return user;
//     } catch (error) {
//         throw new Error('Error creating user: ' + error.message);
//     }
// };

const createUser = async (userData) => {
    try {
        console.log('Creating user with email:', userData.email);
        const user = await User.create(userData);
        console.log('User created:', user);
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user: ' + error.message);
    }
};



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

export default {
    getUserById, comparePassword, findUserByUsernameOrEmail, findUserByUsernameAndPassword, createUser, findUserByEmailAndPassword, findUserByEmail, getAllUsers
};