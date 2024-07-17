import express from 'express';
import multer from 'multer';
import path from 'path';
import { cvController } from '../controller/index.js';

const cvRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: CV
 *   description: Endpoints related to CVs
 */

/**
 * @swagger
 * /cv/upload:
 *   post:
 *     summary: Upload a CV
 *     tags: [CV]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cvFile:
 *                 type: string
 *                 format: binary
 *             required:
 *               - cvFile
 *     responses:
 *       200:
 *         description: Success
 */
cvRouter.post('/upload', multer().single('cvFile'), cvController.uploadCV);

/**
 * @swagger
 * /cv/{id}:
 *   get:
 *     summary: Get CV by ID
 *     tags: [CV]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: CV ID
 *     responses:
 *       200:
 *         description: Success
 */
cvRouter.get('/:id', cvController.getCV);

/**
 * @swagger
 * /cv:
 *   get:
 *     summary: Get all CVs
 *     tags: [CV]
 *     responses:
 *       200:
 *         description: Success
 */
cvRouter.get('/', cvController.getAllCVs);

export default cvRouter;