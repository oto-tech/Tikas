const express = require('express');
const router = express.Router();
const tecnicoModel = require('../models/tecnicoModel');
// Ruta para crear un nuevo tecnico
router.post('/', async (req, res) => {
    const { nombreTecnico, apellidoTecnico, emailTecnico, contraseniaTecnico } = req.body;
    // Validación básica de datos
    if (!nombreTecnico || !apellidoTecnico || !emailTecnico || !contraseniaTecnico) {
        return res.status(400).send('Faltan datos necesarios para crear el técnico');
    }
    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex simple para validar email
    if (!emailRegex.test(emailTecnico)) {
        return res.status(400).send('Formato de correo electrónico no válido');
    }
    try {
        const creadoTecnico = await tecnicoModel.nuevotecnico(nombreTecnico, apellidoTecnico, emailTecnico, contraseniaTecnico);
        if (creadoTecnico) {
            res.status(201).send('Técnico creado correctamente');
        } else {
            res.status(500).send('Error al crear el técnico');
        }
    } catch (error) {
        console.error('Error al crear técnico:', error.message);
        res.status(500).send('Error en el servidor al crear el técnico');
    }
});
module.exports = router;