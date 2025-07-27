const db = require('../config/db');

const Product = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM products');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (products) => {
        const [result] = await db.query('INSERT INTO products (name,description,price,stock_quantity) VALUES(?,?,?,?)',
            [products.name, products.description, products.price, products.stock_quantity]);
        return result.insertId;
    },

    update: async (id, productData) => {
        const { name, description, price, stock_quantity } = productData;
        const [result] = await db.query(
            'UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ? WHERE id = ?',
            [name, description, price, stock_quantity, id]
        );
        return result.affectedRows;
    },

    delete: async (id) => {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Product;