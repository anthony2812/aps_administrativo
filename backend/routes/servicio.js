const express = require('express');
const app = express();

var Models = require('../models/models');
app.get('/', (req, res, next) => {


    res.status(200).json({
        ok: true,
        mensaje: 'Estoy en servicio'
    });
});

app.post('/', (req, res) => {
    var body = req.body;

    var models = new Models({
        nombre: body.nombre,
        img: body.img
    });

    models.save((err, modelsSave) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuarios',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            models: modelsSave
                // usuarioToken: req.usuario
        });
    })

});



module.exports = app;