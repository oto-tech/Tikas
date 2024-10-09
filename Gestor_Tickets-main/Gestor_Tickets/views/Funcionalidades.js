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
        } else if (sectionId === 'listaTecnicos') {
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

    // Manejar creación de nuevo usuario
    $('#usuarioForm').on('submit', function (event) {
        event.preventDefault();
        const nuevoUsuario = {
            nombre: $('#nombre').val(),
            apellido: $('#apellido').val(),
            email: $('#email').val(),
            contrasenia: $('#contrasenia').val(),
            rol_id: $('#rol_id').val()
        };

        $.ajax({
            url: 'http://localhost:3000/usuarios',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(nuevoUsuario),
            success: function () {
                alert('Usuario creado correctamente');
                $('#crearUsuarioModal').modal('hide');
                cargarUsuarios(); // Recargar la lista de usuarios
            },
            error: function (xhr) {
                console.error('Error al crear el usuario:', xhr.responseText);
                alert('Error al crear el usuario: ' + xhr.responseText);
            }
        });
    });

// Función para cargar usuarios
function cargarUsuarios() {
    $.ajax({
        url: 'http://localhost:3000/usuariosC',
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
                        <button class="btn btn-sm btn-primary" onclick="editarUsuario(${usuario.usuario_id})">Editar</button>
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

    // Manejar creación de nuevo técnico
    $('#tecnicoForm').on('submit', function (event) {
        event.preventDefault();
        const nuevoTecnico = {
            nombre: $('#nombreTecnico').val(),
            apellido: $('#apellidoTecnico').val(),
            email: $('#emailTecnico').val(),
            contrasenia: $('#contraseniaTecnico').val()
        };

        $.ajax({
            url: 'http://localhost:3000/tecnico',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(nuevoTecnico),
            success: function () {
                alert('Técnico creado correctamente');
                $('#crearTecnicoModal').modal('hide'); // Asegúrate de que el ID del modal sea correcto
                cargarTecnicos(); // Recargar la lista de técnicos
            },
            error: function (xhr) {
                console.error('Error al crear el técnico:', xhr.responseText);
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

                data.forEach(function (tecnico) {
                    var fila = `<tr>
                        <td>${tecnico.tecnico_id}</td>
                        <td>${tecnico.nombre}</td>
                        <td>${tecnico.apellido}</td>
                        <td>${tecnico.email}</td>
                        <td>${new Date(tecnico.fecha_creacion).toLocaleString()}</td> <!-- Formatear fecha -->
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="editarTecnico(${tecnico.administrador_id})">Editar</button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarTecnico(${tecnico.administrador_id})">Eliminar</button>
                        </td>
                    </tr>`;
                    tbody.append(fila);
                });
            },
            error: function (error) {
                $('#listaTecnicosAlert').html('<div class="alert alert-danger">Error al cargar los técnicos.</div>');
                console.error('Error al cargar los técnicos:', error);
            }
        });
    }

    

    // Cargar la sección de usuarios al inicio
    $('.nav-link[data-section="listaUsuarios"]').trigger('click'); // Cargar usuarios al inicio
});


