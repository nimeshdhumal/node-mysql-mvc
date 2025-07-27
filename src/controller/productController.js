const { validationResult, body } = require('express-validator');
const productModel = require('../model/productModel');
const { NotFoundError, BadRequestError } = require('../utils/errorHandler');

exports.validateProduct = [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive'),
    body('stock_quantity').isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer')
];

exports.getProducts = async (req, res) => {
    try {
        const products = await productModel.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productModel.getById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            //res.status(404).json({ message: 'Product not found' });
            throw new NotFoundError('Product not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(400).json({ errors: errors.array() });
        throw new BadRequestError('Field should not be a NULL');
    }
    try {
        const newProductId = await productModel.create(req.body);
        res.status(201).json({ message: 'Product created successfully', id: newProductId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(400).json({ errors: errors.array() });
        throw new BadRequestError('Field should not be a NULL');
    }
    try {
        const affectedRows = await productModel.update(req.params.id, req.body);
        if (affectedRows > 0) {
            res.json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const affectedRows = await productModel.delete(req.params.id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Row deleted' }, req.params.id);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};