const db = require('../config/db');

const Product = {
    getAll: async () => {
        const [rows] = await db.query('SELECT products.*,categories.category_name FROM products INNER JOIN categories ON products.category_id = categories.category_id;');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT products.*,categories.category_name FROM products INNER JOIN categories ON products.category_id = categories.category_id WHERE products.id = ?', [id]);
        return rows[0];
    },

    create: async (products) => {
        const [result] = await db.query('INSERT INTO products (name,description,price,stock_quantity,category_id) VALUES(?,?,?,?,?)',
            [products.name, products.description, products.price, products.stock_quantity, products.category_id]);
        return result.insertId;
    },

    update: async (id, productData) => {
        const { name, description, price, stock_quantity, category_id } = productData;
        const [result] = await db.query(
            'UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ?, category_id = ? WHERE id = ?',
            [name, description, price, stock_quantity, category_id, id]
        );
        return result.affectedRows;
    },

    delete: async (id) => {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Product;