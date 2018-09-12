//requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Inicializacion de express 
const app = express();

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Importar Rutas
var servicioRoutes = require('./routes/servicio');
var appRoutes = require('./routes/app');

//Rutas (Uso)
app.use('/servicio', servicioRoutes);
app.use('/', appRoutes);

//conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/apsAdministrativo', (err, res) => {
    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});
//escuchar peticiones
app.listen(3000, () => {
    console.log('Servidor: \x1b[32m%s\x1b[0m', 'online');
});