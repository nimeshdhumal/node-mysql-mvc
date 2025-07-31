const { body } = require('express-validator');
const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const { verifyToken, authorizeRoles } = require('../utils/authMiddleware');

/* Valdiation perform on routes */
const validationFields = [body('name').notEmpty().withMessage('Product name is required'),
body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive'),
body('stock_quantity').isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer')];

/* All Routes are here with validation */
router.get('/', productController.getProducts);
router.post('/save', verifyToken, authorizeRoles('admin'), validationFields, productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', verifyToken, authorizeRoles('admin'), validationFields, productController.updateProduct);
router.delete('/:id', verifyToken, authorizeRoles('admin'), productController.deleteProduct);

module.exports = router;