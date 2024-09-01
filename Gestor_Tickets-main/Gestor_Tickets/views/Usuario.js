$(document).ready(function() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const usuarioCreadorId = localStorage.getItem('usuario_id');

    $('#nombreUsuario').text(nombreUsuario);

    function cargarTickets() {
        $.ajax({
            url: 'http://localhost:3000/tickets/tickets', // Endpoint para obtener tickets del usuario
            method: 'GET',
            data: { usuarioID: usuarioCreadorId },
            success: function(response) {
                $('#misTicketsList').empty();
                response.tickets.forEach(function(ticket) {
                    $('#misTicketsList').append('<tr class="ticket-item" data-description="' + ticket.descripcion + '"><td>' + ticket.asunto + '</td><td>' + ticket.categoria + '</td></tr>');
                });
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener los tickets:', error);
            }
        });
    }

    function cargarRespuestas() {
        $.ajax({
            url: 'http://localhost:3000/respuestas', // Endpoint para obtener respuestas del usuario
            method: 'GET',
            data: { usuarioID: usuarioCreadorId },
            success: function(response) {
                const respuestasList = $('#respuestasList');
                respuestasList.empty();
                response.respuestas.forEach(function(respuesta) {
                    respuestasList.append('<li class="list-group-item">' + respuesta.texto + '</li>');
                });
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener las respuestas:', error);
            }
        });
    }

    cargarTickets();
    cargarRespuestas();

    $('#misTicketsList').on('click', '.ticket-item', function() {
        const ticketDescription = $(this).data('description');
        $('#ticketDescription').text(ticketDescription);
        $('#descripcionTicketModal').modal('show');
    });

    $('#ticketForm').on('submit', function(event) {
        event.preventDefault();

        const titulo = $('#titulo').val();
        const descripcion = $('#descripcion').val();
        const categoriaId = $('#categoria').val();

        $.ajax({
            url: 'http://localhost:3000/crear-ticket',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ titulo, descripcion, categoriaId, usuarioID: usuarioCreadorId }),
            success: function(response) {
                alert('Ticket creado correctamente');
                window.location.reload();
            },
            error: function(xhr, status, error) {
                alert('Error al crear el ticket');
            }
        });
    });
});