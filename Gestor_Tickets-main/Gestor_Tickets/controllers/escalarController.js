const express = require('express');
const router = express.Router();
const escalarModel = require('../models/escalarModel'); // Ruta para actualizar la respuesta de un ticket

// Ruta para actualizar la respuesta de un ticket
router.put('/', async (req, res) => { // Cambiado a '/respuesta' para especificar la ruta
    const { ticket_id } = req.body; // Obtener ticket_id y solucion del cuerpo de la solicitud

    // Log para verificar los datos recibidos
    console.log('Datos recibidos:', req.body); // Esto debería mostrar ticket_id y solucion

    // Validar que se hayan proporcionado ticket_id y solucion
    if (!ticket_id) {
        return res.status(400).send('Faltan datos necesarios para actualizar la respuesta del ticket');
    }

    try {
        // Llama al modelo para realizar la actualización
        const actualizado = await escalarModel.escalar(ticket_id );
        if (actualizado) {
            return res.status(200).send('Respuesta del ticket actualizada correctamente');
        } else {
            return res.status(404).send('Error al actualizar el ticket. Verifica el ID del ticket.');
        }
    } catch (error) {
        console.error('Error al actualizar ticket:', error.message);
        return res.status(500).send('Error al actualizar la respuesta del ticket. Por favor, inténtalo de nuevo más tarde.');
    }
});

module.exports = router;