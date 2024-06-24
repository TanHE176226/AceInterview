import express from 'express';
import multer from 'multer';
import path from 'path';
import { cvController } from '../controller/index.js';

const cvRouter = express.Router();


//Router to upload CV
cvRouter.post('/upload', cvController.uploadCV);

cvRouter.get('/:id', cvController.getCV);
cvRouter.get('/', cvController.getAllCVs);

export default cvRouter;