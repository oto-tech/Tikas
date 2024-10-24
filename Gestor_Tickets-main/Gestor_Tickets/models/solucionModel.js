const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'USUARIO_NE',
    password: process.env.DB_PASSWORD || 'Manager1',
    database: process.env.DB_NAME || 'GestorTickets2'
};

// Función para obtener la solución de un ticket en la base de datos
async function obtenerSolucionPorTicketId(ticket_id) {
    let connection;

    try {
        connection = await mysql.createConnection(config);

        const [rows] = await connection.execute(
            'SELECT solucion FROM Tecnico WHERE ticket_id = ?;',
            [ticket_id] // Pasar el ticket_id como parámetro
        );

        // Aquí puedes agregar un log para verificar qué se está retornando
        console.log('Solución obtenida:', rows);

        return rows; // Devuelve las soluciones obtenidas
    } catch (error) {
        console.error('Error al obtener la solución:', error.message);
        throw new Error(`Error en obtenerSolucionPorTicketId: ${error.message}`); // Mensaje de error más descriptivo
    } finally {
        if (connection) {
            await connection.end(); // Asegúrate de cerrar la conexión
        }
    }
}

module.exports = {
    obtenerSolucionPorTicketId,
};
