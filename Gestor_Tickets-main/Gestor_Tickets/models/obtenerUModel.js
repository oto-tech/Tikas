const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'USUARIO_NE',
    password: process.env.DB_PASSWORD || 'Manager1',
    database: process.env.DB_NAME || 'GestorTickets2'
};





async function obtenerUsuarios() {
    let connection;

    try {
        connection = await mysql.createConnection(config);
        
        // Comprobar si la conexión se realizó correctamente
        if (!connection) {
            throw new Error('No se pudo establecer una conexión con la base de datos.');
        }

        const [rows] = await connection.execute(
            'SELECT usuario_id, nombre, apellido, email, fecha_creacion FROM Usuarios WHERE rol_id = 3;'
        );
        
        // Aquí puedes agregar un log para verificar qué se está retornando
        console.log('Usuarios obtenidos:', rows);

        return rows;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
        throw new Error(`Error en obtenerUsuarios: ${error.message}`); // Mensaje de error más descriptivo
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

module.exports = {
    obtenerUsuarios,
};