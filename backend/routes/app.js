const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');
var middlewareAuth = require('../middlewares/AuthJWT');

router.post('/login', generalController.login);
router.post('/register', middlewareAuth.checkToken, generalController.register);
router.get('/other', middlewareAuth.checkToken, generalController.other);


module.exports = router;