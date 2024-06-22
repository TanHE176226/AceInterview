import { cvDAO } from '../dao/index.js';
import { userDAO } from '../dao/index.js';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Lấy đường dẫn hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadCV = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        let cvFile = req.files.cvFile;
        const applicantID = req.body.applicantID;
        const uploadPath = path.join(__dirname, '../uploads/', cvFile.name);

        // Save the file
        cvFile.mv(uploadPath, async (err) => {
            if (err) {
                return res.status(500).send(err);
            }

            // Save the file URL to the database
            const fileURL = `/uploads/${cvFile.name}`;
            const cv = await cvDAO.createCV(fileURL, applicantID);

            res.status(201).json(cv);
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload CV', error: error.message });
    }
};

const getCV = async (req, res) => {
    try {
        const { id } = req.params;
        const cv = await cvDAO.findById(id);
        if (!cv) {
            return res.status(404).json({ error: 'CV not found' });
        }
        res.set('Content-Type', 'application/pdf'); // Assuming the CV is a PDF file
        res.send(cv.fileURL);
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