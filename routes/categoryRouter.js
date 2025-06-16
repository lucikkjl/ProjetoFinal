const categoryController = require('../controllers/categoryController.js');

const router = require('express').Router();

/**
 * @swagger
 * /categories/addcategory:
 *   post:
 *     summary: Create a new category
 *     tags: [categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/addcategory', categoryController.addCategory);

/**
 * @swagger
 * /categories/getallcategories:
 *   get:
 *     summary: Get all categories
 *     tags: [categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/getallcategories', categoryController.getAllCategories);

/**
 * @swagger
 * /categories/getcategory/{ID}:
 *   get:
 *     summary: Get category by ID
 *     tags: [categories]
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
router.get('/getcategory/:id', categoryController.getOneCategory);

/**
 * @swagger
 * /categories/updatecategory/{id}:
 *   put:
 *     summary: Update category by ID
 *     tags: [categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid data
 */
router.put('/updatecategory/:id', categoryController.updateCategory);

/**
 * @swagger
 * /categories/deletecategory/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/deletecategory/:id', categoryController.deleteCategory);

module.exports = router;