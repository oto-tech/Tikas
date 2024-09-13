const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST || 'database-1.cd24gaw6es8e.us-east-2.rds.amazonaws.com',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'CJJe2003--',
    database: process.env.DB_NAME || 'GestorTickets'
};

// Función para crear un nuevo ticket en la base de datos
async function crearTicket(asunto, descripcion, categoriaId, usuarioCreadorId) {
    let connection;

    try {
        connection = await mysql.createConnection(config);
        await connection.execute(
            'INSERT INTO Tickets (asunto, descripcion, fecha_limite, categoria_id, usuario_creador_id) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY), ?, ?)',
            [asunto, descripcion, categoriaId, usuarioCreadorId]
        );
        return true;
    } catch (error) {
        console.error('Error al crear ticket:', error.message);
        return false;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Función para obtener los tickets de un usuario
async function obtenerTicketsUsuario(usuarioID) {
    let connection;

    try {
        connection = await mysql.createConnection(config);
        const [rows] = await connection.execute(
            'SELECT * FROM Tickets WHERE usuario_creador_id = ?',
            [usuarioID]
        );
        return rows;
    } catch (error) {
        console.error('Error al obtener los tickets del usuario:', error.message);
        return [];
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Función para obtener todos los tickets
async function obtenerTodosLosTickets() {
    let connection;

    try {
        connection = await mysql.createConnection(config);
        const [rows] = await connection.execute(
            'SELECT t.ticket_id, t.asunto, t.descripcion, t.prioridad_id, u.nombre AS nombre_usuario FROM Tickets t JOIN Usuarios u ON t.usuario_creador_id = u.usuario_id'
        );
        return rows;
    } catch (error) {
        console.error('Error al obtener todos los tickets:', error.message);
        return [];
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Función para escalar un ticket
async function escalarTicket(ticketID, nuevoPrioridadID, motivo, agenteResponsableID) {
    let connection;

    try {
        connection = await mysql.createConnection(config);
        // Asegúrate de definir la lógica para el procedimiento almacenado en MySQL si es necesario
        await connection.execute(
            'CALL escalamiento_ticket(?, ?, ?, ?)', // Cambia esto si usas un procedimiento almacenado con un nombre diferente
            [ticketID, nuevoPrioridadID, motivo, agenteResponsableID]
        );
        return true;
    } catch (error) {
        console.error('Error al escalar el ticket:', error.message);
        return false;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

module.exports = {
    crearTicket,
    obtenerTicketsUsuario,
    obtenerTodosLosTickets,
    escalarTicket
};


