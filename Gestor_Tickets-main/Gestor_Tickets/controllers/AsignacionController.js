const express = require('express');
const router = express.Router();
const ticketModel = require('../models/AsignacionModel');// Ruta para asignar un ticket


router.put('/', async (req, res) => {
    const { ticket_id, agente_asignado_id } = req.body;

    // Log para verificar los datos recibidos
    console.log('Datos recibidos:', req.body); // Esto debería mostrar ambos campos, ticket_id y agente_asignado_id

    if (!ticket_id || !agente_asignado_id) {
        return res.status(400).send('Faltan datos necesarios para asignar el ticket');
    }

    try {
        const actualizado = await ticketModel.AsignarTicket(ticket_id, agente_asignado_id);
        if (actualizado) {
            return res.status(200).send('Asignación realizada correctamente');
        } else {
            return res.status(404).send('Error al asignar el ticket. Verifica el ID del ticket.');
        }
    } catch (error) {
        console.error('Error al asignar ticket:', error.message);
        return res.status(500).send('Error al asignar el ticket. Por favor, inténtalo de nuevo más tarde.');
    }
});


module.exports = router;