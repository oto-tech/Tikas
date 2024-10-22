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
        if (sectionId === 'listaUsuarios') {
            cargarUsuarios();
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

    // Función para cargar usuarios
    function cargarUsuarios() {
        $.ajax({
            url: 'http://localhost:3000/usuariosC', // Asegúrate de que este endpoint exista en tu backend
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                const usuarios = response; // Asumimos que la respuesta es un array de usuarios
                const tbody = $('#tablaUsuarios tbody');
                tbody.empty(); // Limpiar la tabla antes de llenarla

                // Verificar si hay usuarios
                if (!Array.isArray(usuarios) || usuarios.length === 0) {
                    tbody.append(`
                        <tr>
                            <td colspan="6" class="text-center">No hay usuarios disponibles.</td>
                        </tr>
                    `);
                    $('#listaUsuariosAlert').html('<div class="alert alert-warning">No hay usuarios disponibles.</div>'); // Añadir un mensaje de alerta
                    return; // Salir de la función si no hay usuarios
                }

                // Iterar sobre cada usuario y agregarlo a la tabla
                usuarios.forEach(function (usuario) {
                    const fila = `<tr>
                        <td>${usuario.usuario_id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.apellido}</td>
                        <td>${usuario.email}</td>
                        <td>${new Date(usuario.fecha_creacion).toLocaleString()}</td> <!-- Formatear fecha -->
                        <td>
                            
                            <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${usuario.usuario_id})">Eliminar</button>
                        </td>
                    </tr>`;
                    tbody.append(fila); // Agregar la fila a la tabla
                });
            },
            error: function (xhr) {
                console.error('Error al cargar los usuarios:', xhr);
                $('#listaUsuariosAlert').html('<div class="alert alert-danger">Error al cargar los usuarios: ' + xhr.responseText + '</div>');
            }
        });
    }


    $('#usuarioForm').on('submit', function(event) {
        event.preventDefault();
    
        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();
        const email = $('#email').val();
        const contrasenia = $('#contrasenia').val();
    
        // Validar que los campos no estén vacíos
        if (!nombre || !apellido || !email || !contrasenia) {
            alert('Por favor, complete todos los campos.');
            return;
        }
    
        // Mostrar el modal de confirmación
        $('#confirmacionModalUsuario').modal('show');
    
        // Si el usuario confirma la creación del nuevo usuario
        $('#confirmarCreacionUsuario').off('click').on('click', function() {
            $.ajax({
                url: 'http://localhost:3000/usuarios', // Asegúrate de que esta URL sea correcta según tu backend
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    contrasenia: contrasenia
                }),
                success: function(response) {
                    // Mostrar mensaje de éxito
                    alert('Usuario creado correctamente');
    
                    // Limpiar el formulario solo después de la creación exitosa
                    $('#usuarioForm')[0].reset();
    
                    // Cerrar el modal de confirmación
                    $('#confirmacionModalUsuario').modal('hide');
    
                    // Opcional: Recargar la lista de usuarios si tienes una función para esto
                    cargarListaUsuarios();
                },
                error: function(xhr, status, error) {
                    console.error('Error al crear el usuario:', error);
                    alert('Ocurrió un error al crear el usuario. Inténtelo nuevamente.');
                }
            });
        });
    
        // Si el usuario cancela la creación
        $('#confirmacionModalUsuario .btn-secondary').off('click').on('click', function() {
            // Cerrar el modal de confirmación sin hacer nada más
            $('#confirmacionModalUsuario').modal('hide');
        });
    });

    // Cargar la sección de usuarios al inicio
    $('.nav-link[data-section="listaUsuarios"]').trigger('click'); // Cargar usuarios al inicio
});
