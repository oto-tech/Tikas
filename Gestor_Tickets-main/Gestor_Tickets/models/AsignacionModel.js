const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'USUARIO_NE',
    password: process.env.DB_PASSWORD || 'Manager1',
    database: process.env.DB_NAME || 'GestorTickets2'
};

// Función para Asignar un técnico a un ticket en la base de datos
async function AsignarTicket(ticket_id, agente_asignado_id) {
    let connection;

    try {
        connection = await mysql.createConnection(config);
        
        // Actualiza el agente asignado en el ticket existente
        const [result] = await connection.execute(
            'UPDATE Tickets SET agente_asignado_id = ? WHERE ticket_id = ?',
            [agente_asignado_id, ticket_id] // Primero el valor a asignar, luego la condición
        );
        
        // Verificar si se actualizó algún registro
        return result.affectedRows > 0; // Devuelve true si se actualizó el ticket, de lo contrario false
    } catch (error) {
        console.error('Error al Asignar ticket:', error.message);
        return false; // Si ocurre un error, devuelve false
    } finally {
        if (connection) {
            await connection.end(); // Cierra la conexión
        }
    }
}

module.exports = {
    AsignarTicket,
};