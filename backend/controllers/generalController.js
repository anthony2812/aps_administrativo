const models = require('../models/models');
const controller = {};

controller.login = models.login;
controller.otherpage = models.otherpage;

module.exports = controller;