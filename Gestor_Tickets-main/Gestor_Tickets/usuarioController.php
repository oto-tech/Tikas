<?php
require_once 'conexion.php'; // Asegúrate de que la ruta sea correcta

class UsuarioController {
    public function obtenerUsuarios() {
        try {
            $conexion = conectarDB();
            $sql = "SELECT * FROM Usuarios";
            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            
            $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($usuarios);
        } catch (Exception $e) {
            echo json_encode(['error' => 'Error al obtener usuarios: ' . $e->getMessage()]);
            http_response_code(500); // Establece el código de respuesta HTTP a 500
        }
    }
}
?>