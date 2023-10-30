const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/express_example_mongo',
    collection: 'sessions'
});

const sess = {
    secret: 'Session.',
    resave: false,
    rolling: true,
    saveUninitialized: true,
    store,
    cookie: {
      expires: 600 * 1000
    }
};

module.exports = sess;