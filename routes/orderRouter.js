const orderController = require('../controllers/orderController.js');

const router = require('express').Router();

router.post('/addOrder', orderController.addOrder);
router.get('/allOrders', orderController.getAllOrders);
router.get('/:id/details', orderController.getOrderWithProductsAndUser);
router.get('/with-products', orderController.getAllOrdersWithProducts);


router.get('/:id', orderController.getOneOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.get('/', orderController.getAllOrdersWithProducts);

module.exports = router;