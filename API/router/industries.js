import express from 'express';
import { industryController } from '../controller/index.js';

const industryRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Industries
 *   description: API endpoints for industries
 */

/**
 * @swagger
 * /industry:
 *   get:
 *     summary: Get a list of industries
 *     description: Retrieve a list of all industries.
 *     responses:
 *       200:
 *         description: The list of industries
 *       500:
 *         description: Internal server error
 */
industryRouter.get('/', industryController.getAllIndustries);

export default industryRouter;