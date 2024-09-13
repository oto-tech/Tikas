const mysql = require('mysql2/promise');

// Configuración de la conexión
const config = {
    host: 'database-1.cd24gaw6es8e.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'CJJe2003--',
    database: 'GestorTickets'
    
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














