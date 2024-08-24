const sql = require('mssql');

// Configuración de la conexión
const config = {
    user: 'admin',
    password: 'admin',
    server: 'localhost', // Puede ser 'localhost' si está en tu máquina
    database: 'GestorTickets',
    options: {
        encrypt: false // Si estás en Azure, esto debe ser true
    }
};

// Función para conectar a la base de datos
async function conectarDB() {
    try {
        // Intenta conectarte a la base de datos
        await sql.connect(config);
        console.log('Conexión exitosa a la base de datos SQL Server');
    } catch (error) {
        // Si hay un error, muestra el mensaje de error
        console.error('Error al conectar a la base de datos:', error.message);
    }
}

// Exporta la función para que pueda ser utilizada en otros archivos
module.exports = conectarDB;
