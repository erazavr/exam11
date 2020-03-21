const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
   title: {
       type: String,
       required: true,
   },
   description: {
       type: String,
       required: true
   },
   image: {
       type: String,
       required: true
   },
   category: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Category',
       required: true,
   },
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
   },
   price: {
       type: Number,
       validate: {
           validator: async value => {
               if (value <= 5) throw new Error('The price should not be empty and more than 5')
           }
       }
   }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product