const models = {};

models.test = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM test', (err, rows) => {
            if (err) {
                res.status(400).json({
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

module.exports = models;