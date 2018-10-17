const jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
//===================================
// Verificar Token - Middleware
//===================================
exports.checkToken = function(req, res, next) {
    const beareHeader = req.headers["authorization"];


    if (typeof beareHeader !== 'undefined') {
        const bearer = beareHeader.split(" ");
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    code: "001",
                    message: 'Token incorrecto',
                    errors: err
                });
            }

            req.token = bearerToken;
            console.log(bearerToken);
            next();
        });
    } else {
        res.sendStatus(403);
    }
}