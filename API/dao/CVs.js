import CV from '../models/CVs.js';

const createCV = async (cvData) => {
    try {
        const newCV = new CV(cvData);
        return await newCV.save();
    } catch (error) {
        throw error;
    }
};

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
    getAllCVs
};