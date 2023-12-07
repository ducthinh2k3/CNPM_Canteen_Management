const {
    getUserPage,
    addUser,
    getByID,
    updateUser,
    deleteUser
} = require('../controller/user.controller');

const express = require('express');
const router = express.Router();

router.get('/user', getUserPage);
router.get('/user/edit', getByID);
router.post('/user/add', addUser);
router.post('/user/update', updateUser);
router.get('/user/delete', deleteUser);

module.exports = router;