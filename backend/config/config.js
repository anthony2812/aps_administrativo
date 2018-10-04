var mysql = require('mysql');

//json Web Token JWT
module.exports.SEED = '@este-es@-un-seed-dificil';
module.exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aps_administrativo'
});