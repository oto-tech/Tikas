const express = require('express');
const router = express.Router();
const usuarioModel = require('../models/usuarioModel');

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
    const { nombre, apellido, email, contrasenia } = req.body;

    // Validar que se reciban todos los datos necesarios
    if (!nombre || !apellido || !email || !contrasenia) {
        return res.status(400).send('Faltan datos necesarios para crear el usuario');
    }

    try {
        // Llama a la función para crear un nuevo usuario
        const creado = await usuarioModel.nuevoUsuario(nombre, apellido, email, contrasenia);
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