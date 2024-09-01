const express = require('express');
const router = express.Router();
const ticketModel = require('../models/ticketModel');


router.post('/', async (req, res) => {
    const { titulo, descripcion, categoriaId, usuarioID } = req.body; // Obtener el ID del usuario del cuerpo de la solicitud

    try {
        // Crear el ticket utilizando el ID del usuario logueado
        const creado = await ticketModel.crearTicket(titulo, descripcion, categoriaId, usuarioID);
        if (creado) {
            res.status(201).send('Ticket creado correctamente');
        } else {
            res.status(500).send('Error al crear el ticket');
        }
    } catch (error) {
        console.error('Error al crear ticket:', error.message);
        res.status(500).send('Error al crear el ticket');
    }
});

// Ruta para obtener los tickets del usuario
router.get('/tickets', async (req, res) => {
    const { usuarioID } = req.query;

    try {
        const tickets = await ticketModel.obtenerTicketsUsuario(usuarioID);
        res.json({ tickets });
    } catch (error) {
        console.error('Error al obtener los tickets del usuario:', error.message);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para obtener todos los tickets
router.get('/todos-los-tickets', async (req, res) => {
    try {
        const tickets = await ticketModel.obtenerTodosLosTickets();
        res.json({ tickets });
    } catch (error) {
        console.error('Error al obtener todos los tickets:', error.message);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para escalar un ticket
router.post('/escalar-ticket', async (req, res) => {
    const { ticketID, nuevoPrioridadID, motivo, agenteResponsableID } = req.body;

    try {
        // Escalar el ticket utilizando los parámetros proporcionados
        const escalado = await ticketModel.escalarTicket(ticketID, nuevoPrioridadID, motivo, agenteResponsableID);
        if (escalado) {
            res.status(200).send('Ticket escalado correctamente');
        } else {
            res.status(500).send('Error al escalar el ticket');
        }
    } catch (error) {
        console.error('Error al escalar el ticket:', error.message);
        res.status(500).send('Error al escalar el ticket');
    }
});


module.exports = router;
