document.addEventListener('DOMContentLoaded', function () {
    // Referencia a las secciones de contenido
    const estadisticasSection = document.getElementById('Estadisticas');

    // Datos simulados de los tickets por categoría (Soporte General, Problemas Técnicos, Solicitud de Mejora)
    const ticketData = {
        soporteGeneral: 10,  // Número de tickets de Soporte General
        problemasTecnicos: 20,  // Número de tickets de Problemas Técnicos
        solicitudMejora: 15  // Número de tickets de Solicitud de Mejora
    };

    // Función para mostrar las gráficas al seleccionar "Estadísticas"
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            const section = this.getAttribute('data-section');
            
            if (section === 'Estadisticas') {
                estadisticasSection.classList.remove('d-none');
                generarGraficas(ticketData);
            } else {
                estadisticasSection.classList.add('d-none');
            }
        });
    });

    // Función para generar las gráficas
    function generarGraficas(data) {
        // Gráfico de barras
        const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
        new Chart(ctxBarras, {
            type: 'bar',
            data: {
                labels: ['Soporte General', 'Problemas Técnicos', 'Solicitud de Mejora'],
                datasets: [{
                    label: 'Número de Tickets',
                    data: [data.soporteGeneral, data.problemasTecnicos, data.solicitudMejora],
                    backgroundColor: ['#3498db', '#e74c3c', '#2ecc71']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Gráfico de pastel
        const ctxPastel = document.getElementById('graficoPastel').getContext('2d');
        new Chart(ctxPastel, {
            type: 'pie',
            data: {
                labels: ['Soporte General', 'Problemas Técnicos', 'Solicitud de Mejora'],
                datasets: [{
                    label: 'Distribución de Tickets',
                    data: [data.soporteGeneral, data.problemasTecnicos, data.solicitudMejora],
                    backgroundColor: ['#3498db', '#e74c3c', '#2ecc71']
                }]
            },
            options: {
                responsive: true
            }
        });
    }
});