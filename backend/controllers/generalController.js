const models = require('../models/models');
const controller = {};

controller.login = models.login;
controller.register = models.register;
controller.other = models.other;

module.exports = controller;