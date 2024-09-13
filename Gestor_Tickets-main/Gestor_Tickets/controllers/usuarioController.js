const express = require('express');
const router = express.Router();
const usuarioModel = require('../models/usuarioModel');

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
    const { nombre, apellido, email, contrasenia, rol_id } = req.body;

    if (!nombre || !apellido || !email || !contrasenia || !rol_id) {
        return res.status(400).send('Faltan datos necesarios para crear el usuario');
    }

    try {
        const creado = await usuarioModel.nuevoUsuario(nombre, apellido, email, contrasenia, rol_id);
        if (creado) {
            res.status(201).send('Usuario creado correctamente');
        } else {
            res.status(500).send('Error al crear el usuario');
        }
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        res.status(500).send('Error al crear el usuario');
    }
});

module.exports = router;
