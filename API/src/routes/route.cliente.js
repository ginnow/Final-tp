const express = require('express');
const router = express.Router();
const db = require('../database');
const inet = require("inet");

/* Listar clientes */
router.get('/cliente', async(req, res) => {

    const respuesta = await db.query('select * from clientes', (err, rows) => {

        if (!err) {
            res.json(rows);
        } else {
            res.json('No se pudieron obtener los clientes');
        }
    });
});

/* Eliminar cliente */
router.delete('/cliente/:micli', async(req, res) => {

    let id = req.params.micli;

    const respuesta = await db.query('delete from clientes where id_cliente = ?', [id]);

    res.json('Se elimino el cliente exitosamente');
});
/* Almacenar un cliente */
router.post('/cliente', async(req, res) => {

    let unCli = req.body;

    const respuesta = await db.query('insert into clientes set ?', [unCli]);

    res.json('Se registro correctamente al cliente');

});
/* Actualizar datos de un cliente */
router.put('/cliente/:id_cliente', async(req, res) => {

    let id = req.params.id_cliente;
    let unCli = req.body;

    const respuesta = await db.query('update clientes set ? where id_cliente = ?', [unCli, id]);

    res.json('Se actualizo correctamente el cliente');
});
/* busqueda de un cliente */
router.get('/cliente/:bcli', async(req, res) => {

        let id = req.params.bcli;

        await db.query('select * from clientes where id_cliente = ?', [id], (err, rows) => {

            if (!err) {
                res.json(rows);
            } else {
                res.json('No existe ningun cliente registrado con los datos ingresados');
            }
        });
    }),

    module.exports = router;