const express = require('express');
const path = require('path');
const session = require('express-session');

const connect = require('./config/connection');
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

connect()
    .then(() => app.listen(PORT, () => console.log(`- - - Express server listening on port: ${PORT}`)))
    .catch((err) => console.log(err))