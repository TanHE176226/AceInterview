import { cvDAO } from '../dao/index.js';
import { userDAO } from '../dao/index.js';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

const uploadCV = async (req, res) => {
    try {
        const { applicantID } = req.body;

        if (!req.file || !applicantID) {
            return res.status(400).json({ error: 'File and applicantID are required' });
        }

        const user = await userDAO.getUserById(applicantID);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const savedCV = await cvDAO.saveCV(req.file.buffer, applicantID);
        res.status(201).json(savedCV);
    } catch (error) {
        // Handle MulterError: Unexpected field and other errors
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Unexpected field in upload' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getCV = async (req, res) => {
    try {
        const cv = await cvDAO.getCVById(req.params.applicantID);
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