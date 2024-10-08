const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'USUARIO_NE',
    password: process.env.DB_PASSWORD || 'Manager1',
    database: process.env.DB_NAME || 'GestorTickets2'
};

// Función para crear un nuevo ticket en la base de datos
async function crearTicket(asunto, descripcion, categoriaId, usuarioCreadorId) {
    let connection;

    try {
        connection = await mysql.createConnection(config);
        await connection.execute(
            'INSERT INTO Tickets (asunto, descripcion, fecha_limite, categoria_id, usuario_creador_id) VALUES (?, ?, DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY), ?, ?)',
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


// Función para obtener todos los tickets (sin filtro)
async function obtenerTodosLosTickets() {
    let connection;

    try {
        connection = await mysql.createConnection(config);
        const [rows] = await connection.execute(
            'SELECT t.ticket_id, t.asunto, t.descripcion, t.prioridad_id, u.nombre AS nombre_usuario ' +
            'FROM Tickets t ' +
            'JOIN Usuarios u ON t.usuario_creador_id = u.usuario_id'
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


// Función para obtener todos los tickets pendientes
async function obtenerTodosLosTicketsPendientes() {
    let connection;

    try {
        connection = await mysql.createConnection(config); // Obtener conexión del pool
        const [rows] = await connection.execute(
            'SELECT t.ticket_id, t.asunto, t.descripcion, t.prioridad_id, u.nombre AS nombre_usuario ' +
            'FROM Tickets t ' +
            'JOIN Usuarios u ON t.usuario_creador_id = u.usuario_id ' +
            'WHERE t.estado_id = 1' // Solo obtener tickets pendientes
        );
        return rows;
    } catch (error) {
        console.error('Error al obtener tickets pendientes:', error.message);
        return [];
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Función para obtener todos los tickets resueltos
async function obtenerTodosLosTicketsResueltos() {
    let connection;

    try {
        connection = await mysql.createConnection(config);
        const [rows] = await connection.execute(
            'SELECT t.ticket_id, t.asunto, t.descripcion, t.prioridad_id, u.nombre AS nombre_usuario ' +
            'FROM Tickets t ' +
            'JOIN Usuarios u ON t.usuario_creador_id = u.usuario_id ' +
            'WHERE t.estado_id = 2' // Solo obtener tickets resueltos
        );
        return rows;
    } catch (error) {
        console.error('Error al obtener todos los tickets resueltos:', error.message);
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
    obtenerTodosLosTickets,
    obtenerTodosLosTicketsPendientes,
    obtenerTodosLosTicketsResueltos,
    escalarTicket
};



