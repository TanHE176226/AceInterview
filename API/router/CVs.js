import express from 'express';
import upload from '../config/multer.js';
import { cvController } from '../controller/index.js';

const cvRouter = express.Router();

//Router to upload CV
cvRouter.post('/upload',  upload.single('file'), cvController.uploadCV);

cvRouter.get('/:id', cvController.getCV);
cvRouter.get('/', cvController.getAllCVs);

export default cvRouter;