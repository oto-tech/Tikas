const express = require('express');
const cors = require('cors');
const path = require('path');
const sql = require('mssql');
const ticketController = require('./controllers/ticketController');


const app = express();
const PORT = 3000;


const conectarDB = require('./conexion');
conectarDB();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 


// Rutas
app.use('/crear-ticket', ticketController); 
app.use('/tickets', ticketController);
app.use('/todos-los-tickets', ticketController);
app.use('/escalar-ticket', ticketController); 





app.post('/login', async (req, res) => {
    const { email, contrasenia } = req.body;


    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('contrasenia', sql.VarChar, contrasenia)
            .query('SELECT usuario_id, rol_id, nombre FROM Usuarios WHERE email = @email AND contrasenia = @contrasenia');


        if (result.recordset.length === 0) {
            return res.status(401).send('Credenciales incorrectas');
        }


        const { usuario_id, rol_id } = result.recordset[0];
        res.json({ usuario_id, rol_id });
    } catch (error) {
        console.error('Error en el login:', error.message);
        res.status(500).send('Error en el servidor');
    }
});


app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
