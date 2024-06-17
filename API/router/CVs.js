import express from 'express';
import multer from 'multer';
import { cvController } from '../controller/index.js';

const cvRouter = express.Router();

const upload = multer({ dest: 'uploads/' }); 

//Router to upload CV
cvRouter.post('/upload', upload.single('myFile'), (req, res) => cvController.uploadCV(req, res));

cvRouter.get('/:id', cvController.getCV);
cvRouter.get('/', cvController.getAllCVs);

export default cvRouter;