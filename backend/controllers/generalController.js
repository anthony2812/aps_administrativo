const models = require('../models/models');
const controller = {};

//login y registro de usuarios
controller.login = models.login;
controller.register = models.register;

//Obtener Usuarios
controller.getUser = models.getUser;

//Asignar Permisos
controller.setPermissions = models.setPermissions;


//crear plantillas de permisologia de usuarios
controller.createTemplate = models.createTemplate;

//Obtener plantillas 
controller.getTemplates = models.getTemplates
    //test
controller.other = models.other;

module.exports = controller;