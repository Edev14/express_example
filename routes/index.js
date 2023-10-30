const router = require('express').Router();

const mainRoutes = require('./mainRoutes');
const userRoutes = require('./userRoutes');

router.use('/', mainRoutes);
router.use('/users', userRoutes);

module.exports = router;