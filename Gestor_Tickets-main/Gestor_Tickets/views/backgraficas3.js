document.addEventListener('DOMContentLoaded', function () {
    // Referencia a las secciones de contenido
    const estadisticasSection = document.getElementById('stadisticas'); // Cambiado a 'estadisticas'

    // Datos simulados de los tickets por categoría
    const ticketData = {
        soporteGeneral: 10,
        problemasTecnicos: 20,
        solicitudMejora: 15
    };

    // Función para mostrar las gráficas al seleccionar "Estadísticas"
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            const section = this.getAttribute('data-section');
            
            if (section === 'stadisticas') { // Cambiado a 'estadisticas'
                estadisticasSection.classList.remove('d-none');
                console.log(ticketData); // Agregar log para verificar datos
                generarGraficas(ticketData);
            } else {
                estadisticasSection.classList.add('d-none');
            }
        });
    });

    // Función para generar las gráficas
    function generarGraficas(data) {
        // Gráfico de barras
        const ctxBarras = document.getElementById('graficoBarra').getContext('2d');
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
        const ctxPastel = document.getElementById('graficoPaste').getContext('2d');
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