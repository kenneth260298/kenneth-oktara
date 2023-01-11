const express = require('express');
const { getAvailableLocations, getAllLocations } = require('../controllers/location.controller');
const router = express.Router();

router.get(
    '/',
    getAvailableLocations
);

router.get(
    '/all',
    getAllLocations
);



module.exports = router;