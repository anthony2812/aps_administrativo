const models = {};
let tryLogin = 0;


models.test = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM test', (err, rows) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Hubo un error en la bd ' + err
                });

                return;
            }
            res.status(200).json({
                ok: true,
                mensaje: rows
            });
        });
    });
};

models.login = (req, res) => {

    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT username,password,status FROM usuario WHERE username = ?', [data.username], (err, rows) => {

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
                        message: 'El usuario se encuentra bloqueado por favor contactar a su soporte'
                    });
                }
                if (rows[0].password === data.password) {
                    res.status(200).json({
                        success: true,
                        code: '002',
                        message: rows
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
                    message: "El usuario es incorrecto"
                });


            }

        });
    });
};

module.exports = models;