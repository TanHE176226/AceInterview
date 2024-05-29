import { userDAO } from "../dao/index.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await userDAO.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userDAO.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const deactivateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userDAO.deactivateUser(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const activateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userDAO.activateUser(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const getAllRecruiters = async (req, res) => {
    try {
        const recruiters = await userDAO.getAllRecruiters();
        res.status(200).json(recruiters);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const getInvalidatedRecruiters = async (req, res) => {
    try {
        const invalidatedRecruiters = await userDAO.getAllInvalidatedRecruiters();
        res.status(200).json(invalidatedRecruiters);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const validateRecruiter = async (req, res) => {
    try {
        const { userId } = req.params;
        const recruiter = await userDAO.validateRecruiter(userId);
        res.status(200).json(recruiter);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

export default {
    getAllUsers,
    getUserDetails,
    deactivateUser,
    activateUser,
    getAllRecruiters,
    getInvalidatedRecruiters,
    validateRecruiter
}