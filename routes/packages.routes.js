const express = require('express');
const { getPackages, registerPackage, deletePackage, getPendingPackages, updatePackageAndLocation } = require('../controllers/package.controller');
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

router.get(
    '/pending',
    getPendingPackages
);
router.post(
    '/updatePackageAndLocation',
    updatePackageAndLocation
);



module.exports = router;