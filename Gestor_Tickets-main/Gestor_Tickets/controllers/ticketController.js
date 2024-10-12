const express = require('express');
const router = express.Router();
const ticketModel = require('../models/ticketModel');

// Ruta para crear un nuevo ticket
router.post('/', async (req, res) => {
    const { titulo, descripcion, categoriaId, usuarioID } = req.body;

    if (!titulo || !descripcion || !categoriaId || !usuarioID) {
        return res.status(400).send('Faltan datos necesarios para crear el ticket');
    }

    try {
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

// Ruta para obtener todos los tickets pendientes
router.get('/ticketsP', async (req, res) => {
    try {
        const tickets = await ticketModel.obtenerTodosLosTicketsPendientes();
        res.json({ tickets });
    } catch (error) {
        console.error('Error al obtener tickets pendientes:', error.message);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para obtener todos los tickets resueltos
router.get('/ticketsR', async (req, res) => {
    try {
        const tickets = await ticketModel.obtenerTodosLosTicketsResueltos();
        res.json({ tickets });
    } catch (error) {
        console.error('Error al obtener tickets resueltos:', error.message);
        res.status(500).send('Error en el servidor');
    }
});



// Ruta para escalar un ticket
router.post('/escalar-ticket', async (req, res) => {
    const { ticketID, nuevoPrioridadID, motivo, agenteResponsableID } = req.body;

    if (!ticketID || !nuevoPrioridadID || !motivo || !agenteResponsableID) {
        return res.status(400).send('Faltan datos necesarios para escalar el ticket');
    }

    try {
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