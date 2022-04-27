const express = require('express');

const auth = require('./auth');

const users = require('./users')

const router = express.Router();

router.use('/auth', auth);   // Endpoint for Authentication.

router.use('/user', users);  // Endpoint for Category.


module.exports = router;
