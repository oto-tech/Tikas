const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'USUARIO_NE',
    password: process.env.DB_PASSWORD || 'Manager1',
    database: process.env.DB_NAME || 'GestorTickets2'
};

// Crear un pool de conexiones para mejorar la eficiencia
const pool = mysql.createPool(config);

// Función para crear un nuevo técnico en la base de datos
async function nuevotecnico(nombreTecnico, apellidoTecnico, emailTecnico, contraseniaTecnico) {
    let connection;

    try {
        connection = await pool.getConnection(); // Obtener una conexión del pool
        const [result] = await connection.execute(
            'INSERT INTO Tecnico (nombre, apellido, email, contrasenia) VALUES (?, ?, ?, ?)',
            [nombreTecnico, apellidoTecnico, emailTecnico, contraseniaTecnico]
        );

        console.log(`Nuevo técnico creado con ID: ${result.insertId}`); // Imprimir el ID del nuevo técnico
        return result.insertId; // Retornar el ID del nuevo técnico
    } catch (error) {
        console.error('Error al crear técnico:', error.message);
        return false;
    } finally {
        if (connection) {
            connection.release(); // Liberar la conexión de vuelta al pool
        }
    }
}

module.exports = {
    nuevotecnico,
};