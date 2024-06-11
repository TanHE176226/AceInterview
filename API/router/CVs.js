import express from 'express';
import { cvController } from '../controllers/index.js';

const cvRouter = express.Router();

cvRouter.post('/upload', cvController.uploadCV);
cvRouter.get('/:id', cvController.getCV);
cvRouter.get('/', cvController.getAllCVs);

export default cvRouter;