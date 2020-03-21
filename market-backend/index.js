const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const port = 8000;

const users = require('./app/users');
const categories = require('./app/categories');
const products = require('./app/products');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);
    app.use('/users', users);
    app.use('/categories', categories);
    app.use('/products', products);

    app.listen(port, () => {
        console.log(`HTTP Server started on ${port} port!`);
    });
};

run().catch(e => {
    console.error(e);
});