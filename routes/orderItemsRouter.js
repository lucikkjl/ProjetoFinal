const orderItemsController = require('../controllers/orderItemsController.js');

const router = require('express').Router();

router.post('/addItem', orderItemsController.addOrderItem);
router.get('/allItems', orderItemsController.getAllOrderItems);

router.get('/:id', orderItemsController.getOneOrderItem);
router.put('/:id', orderItemsController.updateOrderItem);
router.delete('/:id', orderItemsController.deleteOrderItem);

module.exports = router;
