const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST || 'database-1.cd24gaw6es8e.us-east-2.rds.amazonaws.com',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'CJJe2003--',
    database: process.env.DB_NAME || 'GestorTickets'
};

// Función para crear un nuevo usuario en la base de datos
async function nuevoUsuario(nombre, apellido, email, contrasenia, rol_id) {
    let connection;

    try {
        connection = await mysql.createConnection(config);
        await connection.execute(
            'INSERT INTO Usuarios (nombre, apellido, email, contrasenia, rol_id) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellido, email, contrasenia, rol_id]
        );
        return true;
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        return false;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}


module.exports = {
    nuevoUsuario,
};