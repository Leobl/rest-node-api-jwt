// Now time to create routes for above users controller methods
// In route we included user controller and each post route is mapped with respective controller method.
const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
module.exports = router;