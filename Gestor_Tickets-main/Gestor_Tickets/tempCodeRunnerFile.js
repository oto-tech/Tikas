const conectarDB = require('./conexion'); // Asegúrate de la ruta correcta al archivo de conexión

app.post('/login', async (req, res) => {
    const { email, contrasenia } = req.body;

    try {
        const connection = awaitconectarDB(); // Usa la función conectada para obtener la conexión
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
