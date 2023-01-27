const express = require('express');
const propertyController = require('../controllers/propertyController');
const router = express.Router();

router.get('/', propertyController.getPropertiesWithinPolygon);
module.exports = router;
