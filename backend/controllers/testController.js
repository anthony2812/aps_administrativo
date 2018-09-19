const models = require('../models/models');
const controller = {};

controller.test = models.test;
controller.login = models.login;

module.exports = controller;