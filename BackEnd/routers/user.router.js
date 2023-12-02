const {
    getUserPage,
    addUser,
    getByID,
    updateUser
} = require('../controller/user.controller');

const express = require('express');
const router = express.Router();

router.get('/user', getUserPage);
router.get('/user/edit', getByID);
router.post('/user/add', addUser);
router.post('/user/update', updateUser);

module.exports = router;