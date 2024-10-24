document.addEventListener('DOMContentLoaded', function () {
    // Referencia a las secciones de contenido
    const estadisticasSection = document.getElementById('estadistic'); // Cambiado a 'estadistic'

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
            
            if (section === 'estadistic') { // Asegúrate de que coincida con el data-section correcto
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
        const ctxBarras = document.getElementById('graficoBarr');
        if (ctxBarras) {
            const ctxBarrasContext = ctxBarras.getContext('2d');
            new Chart(ctxBarrasContext, {
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
        } else {
            console.error("No se encontró el elemento 'graficoBarr'");
        }

        // Gráfico de pastel
        const ctxPastel = document.getElementById('graficoPast');
        if (ctxPastel) {
            const ctxPastelContext = ctxPastel.getContext('2d');
            new Chart(ctxPastelContext, {
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
        } else {
            console.error("No se encontró el elemento 'graficoPast'");
        }
    }
});