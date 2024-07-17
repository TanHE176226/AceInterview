import express from 'express';
import { companiesController } from '../controller/index.js';

const companiesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: API endpoints for companies
 */

/**
 * @swagger
 * /company:
 *   get:
 *     summary: Get a list of companies
 *     description: Retrieve a list of all companies.
 *     responses:
 *       200:
 *         description: The list of companies
 *       500:
 *         description: Internal server error
 */
companiesRouter.get("/", companiesController.getAllCompanies);

/**
 * @swagger
 * /company/search:
 *   get:
 *     summary: Search companies by name
 *     description: Retrieve a list of companies matching the provided name.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name to search for
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
companiesRouter.get('/search', companiesController.searchCompanyByName);

/**
 * @swagger
 * /company/{id}:
 *   get:
 *     summary: Get company details by ID
 *     description: Retrieve details of a company by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the company
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
companiesRouter.get('/:id', companiesController.getCompanyDetailById);

/**
 * @swagger
 * /company:
 *   post:
 *     summary: Create a new company
 *     description: Create a new company with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Invalid request payload
 *       500:
 *         description: Internal server error
 */
companiesRouter.post("/", companiesController.createCompany);

export default companiesRouter;