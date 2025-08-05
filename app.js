require('dotenv').config();
const express = require('express');
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');
const { errorHandler } = require('./src/middleware/errorHandler');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());// Middleware to parse JSON body
app.use('/api/products', productRoutes);//Products-Routes;;;
app.use('api/auth/', authRoutes);//Auth-Routes;;;

//Basic error handling middleware (will be improved later)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(errorHandler);// This must be the last middleware

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});