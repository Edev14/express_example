const router = require('express').Router();
const withAuth = require('../utils/auth');

const { restricted } = require('../controllers/userController');

router
  .get('/restricted', withAuth, restricted)

module.exports = router;