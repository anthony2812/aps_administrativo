const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var modeloSchema = new Schema({
    nombre: { type: String, required: false },
    img: { type: String, required: false },

});

module.exports = mongoose.model('Modelos', modeloSchema); // aqui es q se determina el nombre de la coleccion o tabla