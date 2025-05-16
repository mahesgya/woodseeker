const express = require('express');
const cors = require('cors');
const router = require('./src/feature/product/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', router);

module.exports = app;