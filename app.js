require('dotenv').config();
const express = require('express');
const productRoutes = require('./src/routes/productRoutes');
const app = express();
app.use(express.json());// Middleware to parse JSON body
const PORT = process.env.PORT;

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});