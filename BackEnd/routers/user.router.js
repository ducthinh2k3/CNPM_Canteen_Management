const {
<<<<<<< Updated upstream
    getProductPage,
    addProduct
=======
    getUserPage,
    addUser,
    getByID,
    updateUser,
    deleteUser,
    searchUsersByName,
>>>>>>> Stashed changes
} = require('../controller/user.controller');

const express = require('express');
const router = express.Router();

<<<<<<< Updated upstream
router.get('/user', getProductPage);
router.post('/user/add', addProduct);
=======
router.get('/user/read', getUserPage);
router.get('/user/edit', getByID);
router.post('/user/add', addUser);
router.post('/user/update', updateUser);
router.get('/user/delete', deleteUser);
router.get('/user/search', searchUsersByName);
>>>>>>> Stashed changes

module.exports = router;