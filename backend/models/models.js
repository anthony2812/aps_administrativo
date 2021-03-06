//Global variables
const jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
const promises = require('../promises/promises');
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

//Obtener usuarios
models.getUser = (req, res) => {
    let data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuario WHERE id_empresa = ?', [data.id_empresa], (err, rows) => {
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
                    data: rows
                });
            } else {
                res.status(400).json({
                    success: false,
                    code: '053',
                    message: "No hay usuarios registrados"
                });
            }

        });
    });
};

//Asignar Permisologia a usuarios
models.setPermissions = (req, res) => {
    let id_usuario = req.params.user_id;
    let id_permiso;
    let data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT id_permiso FROM permisologia WHERE id_usuario = ?', [id_usuario], (err, rows) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    code: '005',
                    message: 'Hubo un error en la bd ' + err
                });

                return;
            }
            if (rows.length > 0) {
                id_permiso = rows[0].id_permiso;
                conn.query('UPDATE permisologia SET id_usuario = ?, modulo_ventas= ?, modulo_compras=?, modulo_inventario=?, modulo_bancos=?, modulo_proveedores =? WHERE id_permiso = ?', [id_usuario, data.perm_ventas, data.perm_compras, data.perm_inventario, data.perm_bancos, data.perm_proveedores, id_permiso], (err, rows) => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            code: '005',
                            message: 'Hubo un error en la bd ' + err
                        });

                        return;
                    } else {
                        res.status(201).json({
                            success: true,
                            code: '021',
                            message: 'Permisología actualizada con éxito',
                        });
                    }
                });
            } else {
                promises.insertPermission([id_usuario, data.perm_ventas, data.perm_compras, data.perm_inventario, data.perm_bancos, data.perm_proveedores])
                    .then(function(response) {
                        return promises.insertPermissionVentas([id_usuario, data.perm_pedidos, data.perm_cotizaciones, data.perm_factura_ventas, data.perm_dev_ventas, data.perm_registro_clientes, data.perm_cierre_caja]);
                    })
                    .then(function(response) {
                        return promises.insertPermissionCompras([id_usuario, data.perm_factura_compra, data.perm_orden_compra, data.perm_requisiciones, data.perm_devoluciones_compras, data.perm_proveedor]);
                    })
                    .then(function(response) {
                        return promises.insertPermissionInventario([id_usuario, data.perm_entradas, data.perm_salidas, data.perm_art_serv, data.perm_almacenes, data.perm_existencia, data.perm_cambio_precio]);
                    })
                    .then(function(response) {
                        return res.status(201).json({
                            success: true,
                            code: '021',
                            message: 'Permisología Insertada con éxito',
                        });
                    })

                .catch((err) => {
                    console.log("error", err);
                });
                /*conn.query('INSERT INTO permisologia (id_usuario,modulo_ventas,modulo_compras,modulo_inventario,modulo_bancos,modulo_proveedores) VALUES(?,?,?,?,?,?)', [id_usuario, data.perm_ventas, data.perm_compras, data.perm_inventario, data.perm_bancos, data.perm_proveedores], (err, rows) => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            code: '005',
                            message: 'Hubo un error en la bd ' + err
                        });

                        return;
                    } else {
                        res.status(201).json({
                            success: true,
                            code: '021',
                            message: 'Permisología actualizada con éxito',
                        });
                    }
                });*/
            }

        });
        //conn.query('UPDATE permisologia SET status = 0 WHERE username = ?')
    });
};

//Obtener permisologias de usuarios
models.getPermissions = (req, res) => {

};

//Crear plantillas de permisologia model
models.createTemplate = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO plantillas_permisologia( id_empresa, nombre_plantilla, permisologia_ventas, permisologia_compras, permisologia_inventario, permisologia_bancos, permisologia_proveedores, permisologia_pedidos, permisologia_cotizaciones, permisologia_factura_ventas, permisologia_devoluciones_ventas,permisologia_registro_clientes, permisologia_cierre_caja, permisologia_factura_compra, permisologia_orden_compra, permisologia_requisiciones, permisologia_devoluciones_compras, permisologia_proveedor, permisologia_movimientos, permisologia_transferencia, permisologia_cuenta_bancaria, permisologia_conciliacion_banco, permisologia_entradas, permisologia_salida, permisologia_art_serv, permisologia_almacenes, permisologia_existencia, permisologia_cambio_precio) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [data.id_empresa, data.nombre_plantilla, data.perm_ventas, data.perm_compras, data.perm_inventario, data.perm_bancos, data.perm_proveedores, data.perm_pedidos, data.perm_cotizaciones, data.perm_factura_ventas, data.perm_dev_ventas, data.perm_registro_clientes, data.perm_cierre_caja, data.perm_factura_compra, data.perm_orden_compra, data.perm_requisiciones, data.perm_devoluciones_compras, data.perm_pago_proveedores, data.perm_movimientos, data.perm_transferencia, data.perm_cuenta_banc, data.perm_conciliacion_banco, data.perm_entradas, data.perm_salidas, data.perm_art_serv, data.perm_almacenes, data.perm_existencia, data.perm_cambio_precio],
            (err, rows) => {
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
                    message: 'Plantilla Creada con éxito ',
                });
            });
    });
};


//Obtener plantillas 
models.getTemplates = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM plantillas_permisologia WHERE id_empresa = ?', [data.id_empresa], (err, rows) => {
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
                    message: 'Plantillas disponibles',
                    data: rows
                });

            }
        });
    });
};

//Test
models.other = (req, res, next) => {

    promises.getTest()
        .then(function(response) {
            return promises.getTest2();
        })

    .catch((err) => {
        console.log("error", err);
    });
    /*getTest()
        .then(getTest2).then(next())
        .catch((err) => {
            console.log("error", err);
        });*/
    res.json({
        ok: true,
        message: "This is other page",
        timestamp: new Date()
    });
};

function getTest() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (resolve) {
                console.log("1 are ready! ");
                resolve();
            } else {
                reject();
                throw "Error en getTest2";
            }
        }, 400);
    });
}

function getTest2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (resolve) {
                console.log("2 are ready!");
                resolve();

            } else {
                reject();
                throw "Error en getTest2";
            }


            //resolve();
        }, 100);
    });
}
module.exports = models;