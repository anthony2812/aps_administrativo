const promises = {};
var connection = require('../config/config').connection;

promises.getTest = function(primera) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (resolve) {
                console.log("1 are ready! ", primera);
                resolve();
            } else {
                reject();
                throw "Error en getTest2";
            }
        }, 400);
    });
}


promises.getTest2 = function(segunda) {
    return new Promise((resolve, reject) => {
        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query('select * from persona', function(error, results, fields) {

                console.log("campos ", results);
                // Handle error after the release.
                if (error) throw error;

                // Don't use the connection here, it has been returned to the pool.
            });
            console.log('connected as id ' + connection.threadId);
        });
        setTimeout(() => {
            if (resolve) {
                console.log("2 are ready! ", segunda);
                resolve();

            } else {
                reject();
                throw "Error en getTest2";
            }


            //resolve();
        }, 100);
    });
}

promises.insertPermission = function(data) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO permisologia (id_usuario,modulo_ventas,modulo_compras,modulo_inventario,modulo_bancos,modulo_proveedores) VALUES(?,?,?,?,?,?)', [data[0], data[1], data[2], data[3], data[4], data[5]], function(error, results, fields) {

            if (error) {
                reject();
                throw "Insert principal permission";
            } else {
                console.log("Permisos Principales Insertados con exito");
                resolve();
            }

        });
    });

}

promises.insertPermissionVentas = function(data) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id_permiso FROM permisologia WHERE id_usuario = ?', [data[0]], (err, res, field) => {
            if (err) {
                console.log(error);
                reject();
                throw "Insert ventas permission";
            } else {
                connection.query('INSERT INTO permisologia_ventas (id_permiso,permisologia_pedidos,permisologia_cotizaciones,permisologia_factura_ventas,permisologia_devoluciones_ventas,permisologia_registro_clientes,permisologia_cierre_caja) VALUES(?,?,?,?,?,?,?)', [res[0].id_permiso, data[1], data[2], data[3], data[4], data[5], data[6]], function(error, results, fields) {

                    if (error) {
                        console.log(error);
                        reject();
                        throw "Insert ventas permission";
                    } else {
                        console.log("Permisos Ventas Insertados con exito");
                        resolve();
                    }

                });
            }



        });
    });
};

promises.insertPermissionCompras = function(data) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id_permiso FROM permisologia WHERE id_usuario = ?', [data[0]], (err, res, field) => {
            if (err) {
                console.log(error);
                reject();
                throw "Insert Compras permission";
            } else {
                connection.query('INSERT INTO permisologia_compras (id_permiso,permisologia_factura_compra,permisologia_orden_compra,permisologia_requisiciones,permisologia_devoluciones_compras,permisologia_proveedor) VALUES(?,?,?,?,?,?)', [res[0].id_permiso, data[1], data[2], data[3], data[4], data[5]], function(error, results, fields) {

                    if (error) {
                        console.log(error);
                        reject();
                        throw "Insert Compras permission";
                    } else {
                        console.log("Permisos Compras Insertados con exito");
                        resolve();
                    }

                });
            }
        })

    });
}

promises.insertPermissionInventario = function(data) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id_permiso FROM permisologia WHERE id_usuario = ?', [data[0]], (err, res, field) => {
            if (err) {
                console.log(error);
                reject();
                throw "Insert Inventario permission";
            } else {
                connection.query('INSERT INTO permisologia_inventario (id_permiso,permisologia_entradas,permisologia_salida,permisologia_art_serv,permisologia_almacenes,permisologia_existencia,permisologia_cambio_precio) VALUES(?,?,?,?,?,?,?)', [res[0].id_permiso, data[1], data[2], data[3], data[4], data[5]], function(error, results, fields) {

                    if (error) {
                        console.log(error);
                        reject();
                        throw "Insert Inventario permission";
                    } else {
                        console.log("Permisos Inventario Insertados con exito");
                        resolve();
                    }

                });
            }
        })

    });
}

promises.insertPermissionBancos = function(data) {

}
module.exports = promises;