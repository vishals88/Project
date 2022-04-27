const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth')

router.post('/user-login', Auth.login);

router.post('/logout', Auth.logout);

module.exports = router;