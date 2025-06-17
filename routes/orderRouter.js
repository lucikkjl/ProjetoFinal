const orderController = require("../controllers/orderController.js");

const router = require("express").Router();

/**
 * @swagger
 * /orders/addorder:
 *   post:
 *     summary: Create a new order
 *     tags: [orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUser
 *             properties:
 *               idUser:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid data
 */
router.post("/addorder", orderController.addOrder);

/**
 * @swagger
 * /orders/getallorders:
 *   get:
 *     summary: Retrieve all orders
 *     tags: [orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get("/getallorders", orderController.getAllOrders);

/**
 * @swagger
 * /orders/getorder/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get("/getorder/:id", orderController.getOneOrder);

/**
 * @swagger
 * /orders/updateorder/{id}:
 *   put:
 *     summary: Update order by ID
 *     tags: [orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Invalid data
 */
router.put("/updateorder/:id", orderController.updateOrder);

/**
 * @swagger
 * /orders/deleteorder/{id}:
 *   delete:
 *     summary: Delete order by ID
 *     tags: [orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete("/deleteorder/:id", orderController.deleteOrder);

module.exports = router;
