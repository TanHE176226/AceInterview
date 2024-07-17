import express from 'express';
import { userController } from "../controller/index.js";
import authJWT from '../middleware/authJWT.js';

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get list of users (applicants, recruiters)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of users
 *       401:
 *         description: Unauthorized request
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: User role (optional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of users to retrieve (optional)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (optional)
 */
userRouter.get("/", authJWT.authenticationToken, authJWT.isRecruiter, userController.getAllUsers);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: example@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Invalid credentials
 */
userRouter.post('/login', userController.login);

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: User registration
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: example@example.com
 *               password: password123
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */
userRouter.post('/register', userController.register);

/**
 * @swagger
 * /user/regis-recruiter:
 *   post:
 *     summary: Recruiter registration
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: example@example.com
 *               password: password123
 *     responses:
 *       201:
 *         description: Successfully registered as a recruiter
 *       400:
 *         description: Bad request
 */
userRouter.post('/regis-recruiter', userController.registerRecruiter);

/**
 * @swagger
 * /user/logout:
 *   delete:
 *     summary: User logout
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized request
 */
userRouter.delete("/logout", userController.deleteRefreshTokes);

/**
 * @swagger
 * /user/token:
 *   post:
 *     summary: Get new access tokens
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: [refresh_token]
 *     responses:
 *       200:
 *         description: Successfully retrieved new access tokens
 *       400:
 *         description: Bad request
 */
userRouter.post("/token", userController.getNewAccessTokens);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     requestBody:
 *```javascript
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: example@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Successfully updated the user profile
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: User not found
 */
userRouter.put('/:id', userController.updateProfile);

/**
 * @swagger
 * /user/recruiters:
 *   get:
 *     summary: Get all recruiters
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of recruiters
 *       401:
 *         description: Unauthorized request
 */
userRouter.get('/recruiters', userController.getAllRecruiters);

/**
 * @swagger
 * /user/invalidated-recruiters:
 *   get:
 *     summary: Get invalidated recruiters
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of invalidated recruiters
 *       401:
 *         description: Unauthorized request
 */
userRouter.get('/invalidated-recruiters', userController.getInvalidatedRecruiters);

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the user details
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: User not found
 */
userRouter.get("/:userId", userController.getUserDetails);

/**
 * @swagger
 * /user/{userId}/deactive:
 *   patch:
 *     summary: Deactivate user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successfully deactivated the user
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: User not found
 */
userRouter.patch("/:userId/deactive", userController.deactivateUser);

/**
 * @swagger
 * /user/{userId}/active:
 *   patch:
 *     summary: Activate user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successfully activated the user
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: User not found
 */
userRouter.patch("/:userId/active", userController.activateUser);

/**
 * @swagger
 * /user/{userId}/choose-company:
 *   patch:
 *     summary: Choose a company for the user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyID:
 *                 type: string
 *                 format: uuid
 *             example:
 *               companyID: abcdef123456
 *     responses:
 *       200:
 *         description: Successfully chosen a company for the user
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: User not found
 */
userRouter.patch('/:userId/choose-company', userController.chooseCompany);

export default userRouter;