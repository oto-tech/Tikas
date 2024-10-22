const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'USUARIO_NE',
    password: process.env.DB_PASSWORD || 'Manager1',
    database: process.env.DB_NAME || 'GestorTickets2'
};

// Función para actualizar la respuesta de un ticket en la base de datos
async function actualizarRespuesta(ticket_id, solucion) {
    let connection;

    try {
        connection = await mysql.createConnection(config);
        
        // Actualiza el estado, estado_id y solución en el ticket existente
        const [result] = await connection.execute(
            'UPDATE Tickets SET estado_id = ?, estado = ?, solucion = ? WHERE ticket_id = ?',
            [2, 'CERRADO', solucion, ticket_id] // Utiliza ticket_id de la función
        );
        
        // Verificar si se actualizó algún registro
        return result.affectedRows > 0; // Devuelve true si se actualizó el ticket, de lo contrario false
    } catch (error) {
        console.error('Error al actualizar ticket:', error.message);
        return false; // Si ocurre un error, devuelve false
    } finally {
        if (connection) {
            await connection.end(); // Cierra la conexión
        }
    }
}

module.exports = {
    actualizarRespuesta,
};

        