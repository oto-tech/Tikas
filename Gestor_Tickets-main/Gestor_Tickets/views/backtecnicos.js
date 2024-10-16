$(document).ready(function () {
    // Obtener y mostrar el nombre del usuario desde localStorage
    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Administrador';
    $('#nombreUsuario').text(nombreUsuario);

    // Función para mostrar la sección seleccionada
    function showSection(sectionId) {
        $('.content-section').addClass('d-none'); // Ocultar todas las secciones
        $('#' + sectionId).removeClass('d-none'); // Mostrar la sección seleccionada
        $('.nav-link').removeClass('active'); // Quitar clase active de todos los enlaces
        $('.nav-link[data-section="' + sectionId + '"]').addClass('active'); // Añadir clase active al enlace seleccionado

        // Cargar usuarios o técnicos según la sección
        if (sectionId === 'listaTecnicos') {
            cargarTecnicos();
        }
    }

    // Evento al hacer clic en un enlace del sidebar
    $('.nav-link').click(function (e) {
        e.preventDefault();
        var sectionId = $(this).data('section');
        if (sectionId) {
            showSection(sectionId);
        }
    });

    // Mostrar el dashboard por defecto al cargar la página
    showSection('dashboard');

    // Función para mostrar mensajes de alerta utilizando Bootstrap
    function showAlert(containerId, message, type = 'success') {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
            </div>
        `;
        $(`#${containerId}`).html(alertHtml);

        // Opcional: Auto cerrar la alerta después de 3 segundos
        setTimeout(() => {
            $(`#${containerId} .alert`).alert('close');
        }, 3000);
    }


     // Manejar creación nuevo técnico
     $('#crearTecnico').on('submit', function(event) {
        event.preventDefault();
        const nombreTecnico = $('#nombreTecnico').val();
        const apellidoTecnico = $('#apellidoTecnico').val();
        const emailTecnico = $('#emailTecnico').val();
        const contraseniaTecnico = $('#contraseniaTecnico').val();
        $.ajax({
            url: 'http://localhost:3000/tecnico',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                nombreTecnico: nombreTecnico,
                apellidoTecnico: apellidoTecnico,
                emailTecnico: emailTecnico,
                contraseniaTecnico: contraseniaTecnico,
            }),
            success: function(response) {
                alert('Técnico creado correctamente');
                $('#crearTecnicoModal').modal('hide'); // Asegúrate de que el ID del modal sea correcto
            },
            error: function(xhr, status, error) {
                console.error('Error al crear el técnico:', error);
                alert('Error al crear el técnico: ' + xhr.responseText); // Muestra el mensaje de error del servidor
            }
        });
    });

    // Función para cargar técnicos
    function cargarTecnicos() {
        $('#listaTecnicosAlert').html('<div class="alert alert-info">Cargando técnicos...</div>'); // Mensaje de carga
        $.ajax({
            url: 'http://localhost:3000/tecnicoC', // Ruta al endpoint para obtener técnicos
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var tbody = $('#tablaTecnicos tbody');
                tbody.empty(); // Limpiar la tabla antes de llenarla

                if (!Array.isArray(data) || data.length === 0) {
                    tbody.append(`
                        <tr>
                            <td colspan="6" class="text-center">No hay técnicos disponibles.</td>
                        </tr>
                    `);
                    $('#listaTecnicosAlert').html('<div class="alert alert-warning">No hay técnicos disponibles.</div>');
                    return;
                }

                data.forEach(function (tecnico) {
                    var fila = `<tr>
                        <td>${tecnico.tecnico_id}</td>
                        <td>${tecnico.nombre}</td>
                        <td>${tecnico.apellido}</td>
                        <td>${tecnico.email}</td>
                        <td>${new Date(tecnico.fecha_creacion).toLocaleString()}</td> <!-- Formatear fecha -->
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="editarTecnico(${tecnico.tecnico_id})">Editar</button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarTecnico(${tecnico.tecnico_id})">Eliminar</button>
                        </td>
                    </tr>`;
                    tbody.append(fila);
                });
                $('#listaTecnicosAlert').empty(); // Limpiar el mensaje de carga
            },
            error: function (error) {
                $('#listaTecnicosAlert').html('<div class="alert alert-danger">Error al cargar los técnicos.</div>');
                console.error('Error al cargar los técnicos:', error);
            }
        });
    }

    // Cargar la sección de técnicos al inicio
    $('.nav-link[data-section="listaTecnicos"]').trigger('click'); // Cargar técnicos al inicio
});
