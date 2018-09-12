//requires
const express = require('express');


//Inicializacion de express 
const app = express();

//Importar Rutas
var appRoutes = require('./routes/app');

//Rutas (Uso)
app.use('/', appRoutes);

//escuchar peticiones
app.listen(3000, () => {
    console.log('Servidor: \x1b[32m%s\x1b[0m', 'online');
});