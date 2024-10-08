const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'USUARIO_NE',
    password: process.env.DB_PASSWORD || 'Manager1',
    database: process.env.DB_NAME || 'GestorTickets2'

};

// Función para crear un nuevo usuario en la base de datos
async function nuevoUsuario(nombre, apellido, email, contrasenia) {
    let connection;

    try {
        connection = await mysql.createConnection(config);
        await connection.execute(
            'INSERT INTO Usuarios (nombre, apellido, email, contrasenia) VALUES (?, ?, ?, ?)',
            [nombre, apellido, email, contrasenia]
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