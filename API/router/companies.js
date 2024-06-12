import express from 'express';
import { companiesController } from '../controller/index.js';

const companiesRouter = express.Router();

//get list companies 
companiesRouter.get("/", companiesController.getAllCompanies);

export default companiesRouter;