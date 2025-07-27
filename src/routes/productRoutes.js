const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/', productController.getProducts);
router.post('/save', productController.validateProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.validateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;