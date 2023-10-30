const router = require('express').Router();
// const withAuth = require('../utils/auth'); // might need later anyways

const {
    getUsers,
    getUserById,
    postUser,
    deleteUser,
    loginUser,
    logoutUser,
  } = require('../controllers/userController');

router
  .route('/')
  .get(getUsers)
  .post(postUser);

router
  .route('/:id')
  .get(getUserById)
  .delete(deleteUser)

router
  .route('/login')
  .post(loginUser)

router
  .route('/logout')
  .post(logoutUser)

module.exports = router;