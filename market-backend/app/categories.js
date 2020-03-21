const express = require('express');

const router = express.Router();

const Category = require('../models/Category');

router.get('/', async (req, res)=> {
   const categories = await Category.find();
   res.send(categories)
});
router.post('/', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.send(category)
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;