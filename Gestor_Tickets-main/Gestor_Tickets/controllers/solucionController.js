const express = require('express');
const router = express.Router();
const solucionModel = require('../models/solucionModel'); // Ruta para obtener la solución de un ticket

// Ruta para obtener la solución de un ticket por su ID
router.get('/', async (req, res) => {
    const { ticket_id } = req.params; // Obtener ticket_id de los parámetros de la ruta

    try {
        const soluciones = await solucionModel.obtenerSolucionPorTicketId(ticket_id); // Asegúrate de que el modelo esté correctamente definido

        if (soluciones.length === 0) {
            return res.status(404).json({ message: 'No se encontraron soluciones para este ticket.' });
        }

        res.json({ soluciones });
    } catch (error) {
        console.error('Error al obtener la solución del ticket:', error.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;