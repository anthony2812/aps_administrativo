//Global variables
const jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
const models = {};
let tryLogin = 0;
let token;


//Login model
models.login = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT username,password,status,id_empresa FROM usuario WHERE username = ?', [data.username], (err, rows) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    code: '005',
                    message: 'Hubo un error en la bd ' + err
                });

                return;
            }
            if (rows.length > 0) {
                if (rows[0].status === 0) {
                    return res.status(200).json({
                        success: false,
                        code: '054',
                        message: 'El usuario se encuentra bloqueado'
                    });
                }
                if (rows[0].password === data.password) {
                    token = jwt.sign({ username: data.username }, SEED)

                    res.status(200).json({
                        success: true,
                        code: '002',
                        message: { username: rows[0].username, status: rows[0].status, id_empresa: rows[0].id_empresa },
                        token: token
                    });
                } else {
                    if (tryLogin < 5) {
                        tryLogin = tryLogin + 1;
                        res.status(400).json({
                            success: false,
                            code: '051',
                            message: "Error al autenticar",
                            tryLogin: tryLogin

                        });
                    } else {
                        conn.query("UPDATE usuario SET status = 0 WHERE username = ?", [data.username]);
                        return res.status(400).json({
                            success: false,
                            code: '052',
                            message: "El usuario ha sido bloqueado"
                        });
                    }
                }
            } else {
                res.status(400).json({
                    success: false,
                    code: '053',
                    message: "El usuario es incorrecto",
                });
            }

        });
    });
};

//Registro model
models.register = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuario WHERE username = ?', [data.username], (err, rows) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    code: '005',
                    message: 'Hubo un error en la bd ' + err
                });

                return;
            }
            if (rows.length > 0) {

                res.status(200).json({
                    success: true,
                    code: '002',
                    message: 'Usuario ya existe',
                    data: { username: rows[0].username, status: rows[0].status, timestamp: rows[0].timestamp, id_empresa: rows[0].id_empresa, rol: rows[0].rol_usuario },
                    token: token
                });

            } else {
                conn.query('INSERT INTO usuario (username,password,status,timestamp,id_empresa,rol_usuario) VALUES(?,?,?,?,?,?) ', [data.username, data.password, 1, new Date(), data.id_empresa, data.rol_usuario], (err, rows) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            code: '005',
                            message: 'Hubo un error en la bd ' + err
                        });
                    }
                    res.status(201).json({
                        success: true,
                        code: '021',
                        message: 'Usuario Insertado con exito ',
                    });
                });

            }

        });
    });
};




//Test
models.other = (req, res) => {

    res.json({
        ok: true,
        message: "This is other page",
        timestamp: new Date()
    });
}
module.exports = models;