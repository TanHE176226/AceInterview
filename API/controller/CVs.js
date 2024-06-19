import { cvDAO } from '../dao/index.js';

const uploadCV = async (req, res) => {
    try {
        const cvData = {
            fileURL: req.body.fileURL,
            applicantID: req.body.applicantID
        };
        const newCV = await cvDAO.createCV(cvData);
        res.status(201).json(newCV);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCV = async (req, res) => {
    try {
        const cv = await cvDAO.getCVById(req.params.id);
        if (!cv) {
            return res.status(404).json({ message: "CV not found" });
        }
        res.status(200).json(cv);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllCVs = async (req, res) => {
    try {
        const cvs = await cvDAO.getAllCVs();
        res.status(200).json(cvs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    uploadCV,
    getCV,
    getAllCVs
};