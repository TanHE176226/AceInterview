import CV from '../models/CVs.js';

const createCV = async (fileURL, applicantID) => {
    try {
        const newCV = await CV.create({fileURL, applicantID});
        return newCV;
    } catch (error) {
        throw error
    }
};

const findById = async (id) => {
    try {
        const cv = await CV.findById(id);
        return cv;
    } catch (error) {
        throw error;
    }
}

const getCVById = async (id) => {
    try {
        return await CV.findById(id).populate('applicantID');
    } catch (error) {
        throw error;
    }
};

const getAllCVs = async () => {
    try {
        return await CV.find().populate('applicantID');
    } catch (error) {
        throw error;
    }
};


export default {
    createCV,
    getCVById,
    getAllCVs,
    findById
};