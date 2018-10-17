var time = require('express-timestamp');

//===================================
// obtener timeStamp - Middleware
//===================================

exports.getTime = function(req, res, next) {
    var timeStamp = tme.init;
    next();
}