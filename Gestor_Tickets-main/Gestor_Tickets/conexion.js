const mysql = require('mysql2/promise');

const config = {
    host: 'localhost',
    user: 'USUARIO_NE',
    password: 'CJJe2003--',
    database: 'GestorTickets2'

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














