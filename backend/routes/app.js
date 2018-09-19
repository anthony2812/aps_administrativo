const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');


router.post('/login', generalController.login);
router.get('/other', generalController.otherpage);


module.exports = router;