
<?php
function conectarDB() {
    $host = 'localhost';
    $dbname = 'GestorTickets2';
    $user = 'USUARIO_NE';
    $password = 'Manager1';

    try {
        $conexion = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conexion;
    } catch (PDOException $e) {
        echo 'Error de conexión: ' . $e->getMessage();
        exit;
    }
}
?>