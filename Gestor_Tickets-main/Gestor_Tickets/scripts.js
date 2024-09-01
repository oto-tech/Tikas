$(document).ready(function() {
    $('#loginForm').on('submit', function(event) {
        event.preventDefault();
        const email = $('#email').val();
        const contrasenia = $('#contrasenia').val();
        $.ajax({
            url: 'http://localhost:3000/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, contrasenia }),
            success: function(response) {
                console.log('Respuesta exitosa:', response);
                const { rol_id, usuario_id, nombre } = response;
                localStorage.setItem('usuario_id', usuario_id);
                localStorage.setItem('nombreUsuario', nombre);
                switch (rol_id) {
                    case 1: // Administrador
                        window.location.href = '/Users/crist/OneDrive/Escritorio/Gestor_Tickets-main/Gestor_Tickets-main/Gestor_Tickets/views/administrador.html';
                        break;
                    case 2: // Técnico
                        window.location.href = '/Users/crist/OneDrive/Escritorio/Gestor_Tickets-main/Gestor_Tickets-main/Gestor_Tickets/views/tecnico.html';
                        break;
                    case 3: // Usuario normal
                        window.location.href = '/Users/crist/OneDrive/Escritorio/Gestor_Tickets-main/Gestor_Tickets-main/Gestor_Tickets/views/usuario.html';
                        break;
                    default:
                        console.error('Rol desconocido');
                        break;
                }
            },
            error: function(xhr) {
                console.error('Error en la solicitud:', xhr);
                $('#message').text('Error en las credenciales, por favor intente nuevamente.');
            }
        });
    });
});