const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
const session = require('express-session');

const sess = require('./utils/session-service');

const app = express();
const PORT = process.env.PORT || 3000;

// Setting sessions
app.use(session(sess));

// Using JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', express.static(path.join('public')));
app.use(require('./routes'));

sequelize
    .sync()
    .then(() => console.log('- - - Connection has been established successfully...'))
    .then(() => app.listen(PORT, () => console.log(`- - - Express server listening on port: ${PORT}`)))
    .catch((error) => console.log({"error": "Failed to start server", "message" : error }))