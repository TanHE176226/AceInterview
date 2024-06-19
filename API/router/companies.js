import express from 'express';
import { companiesController } from '../controller/index.js';

const companiesRouter = express.Router();

// Get list of companies
companiesRouter.get("/", companiesController.getAllCompanies);

// Get company by ID
companiesRouter.get("/:companyId", companiesController.getCompanyById);

// Create a new company
companiesRouter.post("/", companiesController.createCompany);

// Update a company by ID
companiesRouter.patch("/:companyId", companiesController.updateCompany);

// Delete a company by ID
companiesRouter.delete("/:companyId", companiesController.deleteCompany);

export default companiesRouter;
