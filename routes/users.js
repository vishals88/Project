const express = require('express');
const router = express.Router();
const User  = require('../controllers/user')

router.post('/', User.addUser);

router.get('/:id', User.readUserById)

router.get('/', User.getUser)

router.put('/:id', User.editUser)

router.delete('/:id', User.deleteUser)

module.exports = router;