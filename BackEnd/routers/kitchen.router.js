const express = require('express');
const router = express.Router();

const {
    GetKitchenPageComplete,
    GetKitchenPageNotComplete,
    notifyKitchenPageComplete,
    notifyKitchenPageNotComplete,
    notifySoldOut
} = require('../controller/kitchen.controller');
router.get('/kitchen/NotComplete', GetKitchenPageNotComplete);
router.get('/kitchen/Complete', GetKitchenPageComplete);
router.get('/kitchen/notifyComplete', notifyKitchenPageComplete);
router.get('/kitchen/notifyNotComplete', notifyKitchenPageNotComplete);
router.post('/kitchen/notifySoldOut', notifySoldOut);
module.exports = router;