import express from 'express';
import { cvController } from '../controller/index.js';

const cvRouter = express.Router();

cvRouter.post('/upload', cvController.uploadCV);
cvRouter.get('/:id', cvController.getCV);
cvRouter.get('/', cvController.getAllCVs);

export default cvRouter;