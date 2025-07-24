require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());// Middleware to parse JSON body
const PORT = process.env.PORT;

app.use('/', (req, res) => {
    res.send('Welcome to the Product Management Project');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});