const {
    getUserPage,
    addUser,
    getByID,
    updateUser,
    deleteUser,
    searchUsersByName,
} = require('../controller/user.controller');

const express = require('express');
const router = express.Router();

router.get('/user/read', getUserPage);
router.get('/user/edit', getByID);
router.post('/user/add', addUser);
router.post('/user/update', updateUser);
router.get('/user/delete', deleteUser);
router.get('/user/search', searchUsersByName);

module.exports = router;