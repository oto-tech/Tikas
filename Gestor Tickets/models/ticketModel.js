
const sql = require('mssql');
const conectarDB = require('../conexion');

// Función para crear un nuevo ticket en la base de datos
async function crearTicket(asunto, descripcion, categoriaId, usuarioCreadorId) {
    try {
        await conectarDB();
        const pool = await sql.connect();
        await pool.request()
            .input('asunto', sql.VarChar, asunto)
            .input('descripcion', sql.VarChar, descripcion)
            .input('categoriaId', sql.Int, categoriaId)
            .input('usuarioCreadorId', sql.Int, usuarioCreadorId)
            .query('INSERT INTO Tickets (asunto, descripcion, fecha_limite, categoria_id, usuario_creador_id) VALUES (@asunto, @descripcion, DATEADD(day, 7, GETDATE()), @categoriaId, @usuarioCreadorId)');
        return true;
    } catch (error) {
        console.error('Error al crear ticket:', error.message);
        return false;
    }
}

async function obtenerTicketsUsuario(usuarioID) {
    try {
        await conectarDB();
        const pool = await sql.connect();
        const result = await pool.request()
            .input('usuarioID', sql.Int, usuarioID)
            .query('SELECT * FROM Tickets WHERE usuario_creador_id = @usuarioID');


        return result.recordset;
    } catch (error) {
        console.error('Error al obtener los tickets del usuario:', error.message);
        return [];
    }
}

async function obtenerTodosLosTickets() {
    try {
        await conectarDB();
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT t.ticket_id, t.asunto, t.descripcion, t.prioridad_id, u.nombre AS nombre_usuario FROM Tickets t JOIN Usuarios u ON t.usuario_creador_id = u.usuario_id');
        return result.recordset;
    } catch (error) {
        console.error('Error al obtener todos los tickets:', error.message);
        return [];
    }
}

async function escalarTicket(ticketID, nuevoPrioridadID, motivo, agenteResponsableID) {
    try {
        await conectarDB();
        const pool = await sql.connect();
        await pool.request()
            .input('ticketID', sql.Int, ticketID)
            .input('nuevoPrioridadID', sql.Int, nuevoPrioridadID)
            .input('motivo', sql.NVarChar, motivo)
            .input('agenteResponsableID', sql.Int, agenteResponsableID)
            .query('EXEC escalamiento_ticket @ticket_id = @ticketID, @nuevo_prioridad_id = @nuevoPrioridadID, @motivo = @motivo, @agente_responsable_id = @agenteResponsableID');
        return true;
    } catch (error) {
        console.error('Error al escalar el ticket:', error.message);
        return false;
    }
}


module.exports = {
    crearTicket,
    obtenerTicketsUsuario,
    obtenerTodosLosTickets,
    escalarTicket
};


