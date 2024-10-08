$(document).ready(function() {
    // Obtener y mostrar el nombre del usuario desde localStorage
    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Administrador';
    $('#nombreUsuario').text(nombreUsuario);

    //manejar creacion nuevo usuario 
    $('#crearUsuario').on('submit', function(event) {
        event.preventDefault();
    
        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();
        const email = $('#email').val();
        const contrasenia = $('#contrasenia').val();
        const rol_id = $('#rol_id').val();
    
        $.ajax({
            url: 'http://localhost:3000/usuarios',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                email: email,
                contrasenia: contrasenia,
                rol_id: rol_id
            }),
            success: function() {
                alert('Usuario creado correctamente');
                $('#crearUsuarioModal').modal('hide');
            },
            error: function(xhr, status, error) {
                console.error('Error al crear el usuarios:', error);
                alert('Error al crear el usuarioss');
            }
        });
    });
    
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


      // Manejar creación de nuevo ticket
      $('#crearTicket').on('submit', function(event) {
        event.preventDefault();
    
        const titulo = $('#titulo').val();
        const descripcion = $('#descripcion').val();
        const categoriaId = $('#categoria').val();
        const usuarioID = localStorage.getItem('usuario_id') || 1; // ID del administrador
    
        $.ajax({
            url: 'http://localhost:3000/tickets',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                titulo,
                descripcion,
                categoriaId,
                usuarioID
            }),
            success: function() {
                alert('Ticket creado correctamente');
                $('#crearTicketModal').modal('hide');
                cargarListaTickets();
            },
            error: function() {
                alert('Error al crear el ticket');
            }
        });
    });

});