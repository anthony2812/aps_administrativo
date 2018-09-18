//requires
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

//Importar Rutas
var appRoutes = require('./routes/app');

//Inicializacion de express 
const app = express();

//Inicializacion de variables
app.set('port', process.env.PORT || 3000);


//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//conexion a la base de datos
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'aps_administrativo'
}, 'single'))

//Rutas (Uso)
app.use('/', appRoutes);

//escuchar peticiones
app.listen(app.get('port'), () => {
    console.log('Servidor: \x1b[32m%s\x1b[0m', 'online');
});