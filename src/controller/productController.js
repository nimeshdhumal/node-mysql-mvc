const productModel = require('../model/productModel');

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
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProductId = await productModel.create(req.body);
        res.status(201).json({ message: 'Product created successfully', id: newProductId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
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