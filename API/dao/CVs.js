import CV from '../models/CVs.js';

const saveCV = async (fileURL, applicantId) => {
    const newCV = new CV({ fileURL, applicantID: applicantId });
    try {
        await newCV.save();
        return newCV;
    } catch (error) {
        console.error('Error saving CV:', error);
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
    saveCV,
    getCVById,
    getAllCVs
};