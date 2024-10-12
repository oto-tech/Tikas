const express = require('express');
const router = express.Router();
const obtenerUModel = require('../models/obtenerUModel');

// Ruta para obtener todos los usuarios

router.get('/', async (req, res) => {
    try {
        const usuarios = await obtenerUModel.obtenerUsuarios();
        console.log('Usuarios en la ruta:', usuarios); // Log para depuración
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;