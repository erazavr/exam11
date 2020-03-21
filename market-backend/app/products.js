const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const auth = require('../middleware/auth');

const Product = require('../models/Product');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});
router.get('/', async (req, res) => {
    let product;
   if (req.query.category) {
       product = await Product.find({category: req.query.category})
   } else if(req.query.product) {
       product = await Product.find({_id: req.query.product}).populate('category').populate('user')
   }
   else {
       product = await Product.find()
   }
   res.send(product)
});
router.post('/', auth, upload.single('image'), async (req,res) => {
    const productData = req.body;
    if (req.file) {
        productData.image = req.file.filename
    }
    productData.user = req.user._id;
    const product = new Product(productData);
    try {
        await product.save();
        res.send(product)
    } catch (error) {
        res.status(400).send(error)
    }
});
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Product.findOne({_id: req.params.id, user: req.user._id});
        if (!task) {
            res.status(400).send({error: "Wrong Id"})
        } else {
            await Product.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted'})
        }
    } catch (error) {
        res.status(400).send(error)
    }
});


module.exports = router;