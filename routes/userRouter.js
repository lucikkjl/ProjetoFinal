const userController = require('../controllers/userController.js');
const { verifyToken } = userController;

const router = require('express').Router();



router.post('/addUser', userController.addUser);
console.log("Função addUser:", typeof userController.addUser);
router.post('/loginUser', userController.loginUser);

router.get('/me', verifyToken, userController.getUserInfo);
router.get('/allUsers', userController.getAllUsers);
router.get('/orders', userController.getUserOrders);

router.get('/:id', userController.getOneUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;