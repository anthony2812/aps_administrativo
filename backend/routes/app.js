const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');


router.get('/', testController.test);
router.post('/login', testController.login);



module.exports = router;