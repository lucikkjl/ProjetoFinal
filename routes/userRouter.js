const express = require('express')
const userController = require("../controllers/userController");
const { verifyToken } = userController;

const router = require("express").Router();

/**
 * @swagger
 * /users/adduser:
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/addUser', userController.addUser);

/**
 * @swagger
 * /users/loginuser:
 *   post:
 *     summary: Authenticate user and return token
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/loginUser', userController.loginUser);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get authenticated user's information
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user data
 *       401:
 *         description: Unauthorized
 */
router.get('/me', verifyToken, userController.getUserInfo);

/**
 * @swagger
 * /users/allusers:
 *   get:
 *     summary: Get all users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/allUsers', userController.getAllUsers);

/**
 * @swagger
 * /users/orders:
 *   get:
 *     summary: Get all users with their orders
 *     tags: [users]
 *     responses:
 *       200:
 *         description: List of users with their orders
 */
router.get('/orders', userController.getUserOrders);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 */
router.get('/:id', userController.getOneUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
