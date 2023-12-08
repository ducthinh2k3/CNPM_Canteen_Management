const {
    getMaterialPage,
    addMaterial,
} = require('../controller/material.controller');

const express = require('express');
const router = express.Router();

router.get('/material', getMaterialPage);
router.post('/material/add', addMaterial);

module.exports = router;