require('dotenv').config();
const express = require('express');
const productRoutes = require('./src/routes/productRoutes');
const errorHandler = require('./src/utils/errorHandler');
const app = express();
app.use(express.json());// Middleware to parse JSON body
app.use('/api/products', productRoutes);
const PORT = process.env.PORT;

//Basic error handling middleware (will be improved later)
app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging

    if (err.statusCode) {
        return res.status(err.statusCode).json({ error: err.name, message: err.message });
    }

    // Default to 500 Internal Server Error for unhandled errors
    res.status(500).json({ error: 'InternalServerError', message: 'Something went wrong.' });
});

app.use(errorHandler);// This must be the last middleware

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});