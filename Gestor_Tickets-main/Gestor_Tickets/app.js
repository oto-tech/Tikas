const express = require('express');
const cors = require('cors');
const path = require('path');
const conectarDB = require('./conexion'); // Asegúrate de que la ruta sea correcta
const ticketController = require('./controllers/ticketController');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));  // Sirve archivos estáticos desde 'public'

// Rutas
app.use('/crear-ticket', ticketController);
app.use('/usuarios', ticketController);
app.use('/tickets', ticketController);
app.use('/todos-los-tickets', ticketController);
app.use('/escalar-ticket', ticketController);

app.post('/login', async (req, res) => {
    const { email, contrasenia } = req.body;

    try {
        const connection = await conectarDB(); // Asegúrate de que esta llamada sea correcta
        const [rows] = await connection.execute(
            'SELECT usuario_id, rol_id, nombre FROM Usuarios WHERE email = ? AND contrasenia = ?',
            [email, contrasenia]
        );

        if (rows.length === 0) {
            return res.status(401).send('Credenciales incorrectas');
        }

        const { usuario_id, rol_id } = rows[0];
        res.json({ usuario_id, rol_id });

        await connection.end(); // Cerrar la conexión después de usarla
    } catch (error) {
        console.error('Error en el login:', error.message);
        res.status(500).send('Error en el servidor');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});