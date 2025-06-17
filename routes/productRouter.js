const productController = require("../controllers/productController.js");

const router = require("express").Router();

/**
 * @swagger
 * /products/addproduct:
 *   post:
 *     summary: Create a new product
 *     tags: [products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - idCategory
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               idCategory:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid data
 */
router.post("/addproduct", productController.addProduct);

/**
 * @swagger
 * /products/getallproducts:
 *   get:
 *     summary: Get all products
 *     tags: [products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/getallproducts", productController.getAllProducts);

/**
 * @swagger
 * /products/getproduct/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/getproduct/:id", productController.getOneProduct);

/**
 * @swagger
 * /products/updateproduct/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               idCategory:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid data
 */
router.put("/updateproduct/:id", productController.updateProduct);

/**
 * @swagger
 * /products/deleteproduct/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/deleteproduct/:id", productController.deleteProduct);

module.exports = router;
