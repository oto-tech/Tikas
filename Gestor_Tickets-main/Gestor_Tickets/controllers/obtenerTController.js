const express = require('express');
const router = express.Router();
const obtenerTModel = require('../models/obtenerTModel');

// Ruta para obtener todos los usuarios

router.get('/', async (req, res) => {
    try {
        const tecnico = await obtenerTModel.obtenerTecnicos();
        console.log('Usuarios en la ruta:', tecnico); // Log para depuración
        res.json(tecnico);
    } catch (error) {
        console.error('Error al obtener tecnicos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


module.exports = router;