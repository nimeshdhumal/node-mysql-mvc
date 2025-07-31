const { validationResult } = require('express-validator');
const productModel = require('../model/productModel');
const { NotFoundError, BadRequestError } = require('../utils/errorHandler');

/* Get the all the products details */
exports.getProducts = async (req, res) => {
    try {
        const products = await productModel.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Get the products details by ID */
exports.getProductById = async (req, res) => {
    try {
        const product = await productModel.getById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            throw new NotFoundError('Product not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Insert the data into the DB */
exports.createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const badRequest = new BadRequestError('Field should not be a NULL');
        badRequest.status = 400;
        badRequest.errors = errors.array();
        return next(badRequest);
    }

    try {
        const newProductId = await productModel.create(req.body);
        res.status(201).json({ message: 'Product created successfully', id: newProductId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Update the data which is saved into DB */
exports.updateProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const badRequest = new BadRequestError('Field should not be a NULL');
        badRequest.status = 400;
        badRequest.errors = errors.array();
        return next(badRequest);
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

/* Delete the products by there ID */
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