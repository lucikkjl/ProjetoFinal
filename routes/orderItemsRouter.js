const orderItemsController = require("../controllers/orderItemsController.js");

const router = require("express").Router();

/**
 * @swagger
 * /orderitems/addorderitem:
 *   post:
 *     summary: Add a new item to an order
 *     tags: [orderitems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idOrder
 *               - idProduct
 *             properties:
 *               idOrder:
 *                 type: integer
 *                 description: ID of the order
 *               idProduct:
 *                 type: integer
 *                 description: ID of the product
 *     responses:
 *       200:
 *         description: Order item added successfully
 *       400:
 *         description: Invalid data
 */
router.post("/addorderitem", orderItemsController.addOrderItem);

/**
 * @swagger
 * /orderitems/getallorderitems:
 *   get:
 *     summary: Get all order items
 *     tags: [orderitems]
 *     responses:
 *       200:
 *         description: List of all order items
 */
router.get("/getallorderitems", orderItemsController.getAllOrderItems);

/**
 * @swagger
 * /orderitems/getoneorderitem/{id}:
 *   get:
 *     summary: Get one order item by ID
 *     tags: [orderitems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order item
 *     responses:
 *       200:
 *         description: Order item found
 *       404:
 *         description: Order item not found
 */
router.get("/getoneorderitem/:id", orderItemsController.getOneOrderItem);

/**
 * @swagger
 * /orderitems/updateorderitem/{id}:
 *   put:
 *     summary: Update an order item by ID
 *     tags: [orderitems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idOrder:
 *                 type: integer
 *               idProduct:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *       400:
 *         description: Invalid data
 */
router.put("/updateorderitem/:id", orderItemsController.updateOrderItem);

/**
 * @swagger
 * /orderitems/deleteorderitem/{id}:
 *   delete:
 *     summary: Delete an order item by ID
 *     tags: [orderitems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order item
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *       404:
 *         description: Order item not found
 */
router.delete("/deleteorderitem/:id", orderItemsController.deleteOrderItem);

module.exports = router;
