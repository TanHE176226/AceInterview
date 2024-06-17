import { cvDAO } from '../dao/index.js';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

const uploadCV = async (req, res) => {
    const { applicantId } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileURL = `/uploads/${file.filename}`;

    try {
        const savedCV = await cvDAO.saveCV(fileURL, applicantId);
        res.status(201).json(savedCV);
    } catch (error) {
        console.error('Error uploading CV:', error);
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