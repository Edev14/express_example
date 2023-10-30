const mongoose = require('mongoose');

const connect = () => {
    
    return new Promise((resolve, reject) => {

        mongoose.connect('mongodb://localhost:27017/express_example_mongo', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.set('debug', false);

        resolve(console.log("- - - MongoDB connection successful..."));

    })

}

module.exports = connect;