const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'USUARIO_NE',
    password: process.env.DB_PASSWORD || 'Manager1',
    database: process.env.DB_NAME || 'GestorTickets2'
};

// Función para conectar con la base de datos
async function conectarDB() {
    try {
        console.log('Intentando conectar...');
        const connection = await mysql.createConnection(config);
        console.log('Conexión exitosa');
        return connection; // Devuelve la conexión para usarla en otras partes del código
    } catch (error) {
        console.error('Error de conexión:', error);
        throw error; // Lanza el error para manejarlo en el código que llama a esta función
    }
}

module.exports = conectarDB;














