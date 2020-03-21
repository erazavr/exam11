const mongoose = require('mongoose');
const config = require('./config');

const Category = require('./models/Category');
const User = require('./models/User');
const Product = require('./models/Product');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name)
    }

    const [category1, category2, category3] = await Category.create(
        {title: "Cars"},
        {title: "Foods"},
        {title: "Computers"},

    );
    const [user1, user2] = await User.create(
        {
            username: "test1",
            password: "123",
            displayName: "test_1",
            phone: "0557058804",
            token: "2ubF06rE-gHhwql8Phjb0"
        },
        {
            username: "test2",
            password: "123",
            displayName: "test_2",
            phone: "0557058804",
            token: "jXC21WkupRF5his3gSXi0"
        }
    );

    await Product.create(
        {
            title: "Lamborghini",
            description: "This is lamborghini",
            price: 1000000,
            category: category1._id,
            image: "lamba.jpeg",
            user: user1._id,
        },
        {
            title: "Mercedes",
            description: "This is Mercedes",
            price: 1000000,
            category: category1._id,
            image: "mers.jpeg",
            user: user2._id,
        },
        {
            title: "Hotdog",
            description: "This is Hotdog",
            price: 10,
            category: category2._id,
            image: "hotdog.jpg",
            user: user1._id,
        },
        {
            title: "Hamburger",
            description: "This is Hamburger",
            price: 15,
            category: category2._id,
            image: "burger.jpeg",
            user: user2._id,
        },
        {
            title: "IMac",
            description: "This is IMac",
            price: 10000,
            category: category3._id,
            image: "mac.jpg",
            user: user1._id,
        },
        {
            title: "MacBook",
            description: "This is MacBook",
            price: 5000,
            category: category3._id,
            image: "macbook.jpeg",
            user: user2._id,
        }
    );

    mongoose.connection.close();

};

run().catch(e => {
   throw e
});