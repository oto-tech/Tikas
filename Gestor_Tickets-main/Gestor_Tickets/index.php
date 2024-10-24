<?php
// controllers/TicketController.php

class TicketController {
    private $model;

    public function __construct($model) {
        $this->model = $model;
    }

    public function mostrarEstadisticas() {
        // Obtiene los datos de estadísticas
        $datos = $this->model->obtenerEstadisticas();

        // Incluye la vista donde se mostrarán las estadísticas
        include 'views/estadisticas.php'; // Cambia la ruta según tu estructura
    }
}