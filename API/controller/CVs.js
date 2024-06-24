import { cvDAO } from '../dao/index.js';
import { userDAO } from '../dao/index.js';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { storage } from '../config/firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


// Lấy đường dẫn hiện tại
const __filename = fileURLToPath(import.meta.url);

const uploadCV = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        let cvFile = req.files.cvFile;
        const applicantID = req.body.applicantID;

        // Tạo một tham chiếu đến vị trí lưu trữ nơi file sẽ được tải lên
        const fileRef = ref(storage, `uploads/${cvFile.name}`);

        // Upload file lên Firebase Storage
        const snapshot = await uploadBytes(fileRef, cvFile.data, {
            contentType: cvFile.mimetype
        });

        // Lấy URL tải xuống cho file
        const fileURL = await getDownloadURL(snapshot.ref);

        // Lưu URL của file vào cơ sở dữ liệu
        const cv = await cvDAO.createCV(fileURL, applicantID);

        res.status(201).json(cv);
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