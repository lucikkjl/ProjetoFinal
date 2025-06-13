const categoryController = require('../controllers/categoryController.js');

const router = require('express').Router();

router.post('/addCategory', categoryController.addCategory);
router.get('/allCategories', categoryController.getAllCategories);
router.get('/with-products', categoryController.getCategoriesWithProducts);

router.get('/:id', categoryController.getOneCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
