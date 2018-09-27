const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');
var middlewareAuth = require('../middlewares/AuthJWT');

//login - register
router.post('/login', generalController.login);
router.post('/register', middlewareAuth.checkToken, generalController.register);

//Get Users
router.post('/getUsers', middlewareAuth.checkToken, generalController.getUser);

//Set Permission
router.put('/permissions/:user_id', generalController.setPermissions);

//Templates
router.post('/createtemplates', middlewareAuth.checkToken, generalController.createTemplate);
router.post('/getTemplates', middlewareAuth.checkToken, generalController.getTemplates);

//Test
router.get('/other', middlewareAuth.checkToken, generalController.other);


module.exports = router;