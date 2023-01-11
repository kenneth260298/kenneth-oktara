const express = require('express');
const { getPackages, registerPackage, deletePackage } = require('../controllers/package.controller');
const router = express.Router();

router.get(
    '/',
    getPackages
);

router.post(
    '/',
    registerPackage
);

router.delete(
    '/:packageId',
    deletePackage
);

module.exports = router;