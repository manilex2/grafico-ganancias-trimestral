const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/grafico/:indice', async (req, res) => {
    const { indice } = req.params;
    const datos = await pool.query(`SELECT * FROM ${process.env.NOMBRE_TABLA} WHERE ticker = ?`, [indice]);
    const datosExtraidos = JSON.stringify(datos);
    var datosNuevos = JSON.parse(datosExtraidos);
    datosNuevos.map((i) => {
        i.colorBarra = process.env.COLOR_BARRAS;
        i.nombreGrafico = process.env.NOMBRE_TABLA.charAt(0).toUpperCase() + process.env.NOMBRE_TABLA.slice(1);
    });
    JSON.stringify(datosNuevos);
    res.send(datosNuevos);
});

module.exports = router;