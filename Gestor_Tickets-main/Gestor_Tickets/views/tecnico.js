$(document).ready(function() {
    const usuarioId = localStorage.getItem('usuario_id');
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    $('#nombreUsuario').text(nombreUsuario);

    function cargarTickets() {
        $.ajax({
            url: `http://localhost:3000/tickets?tecnico_id=${usuarioId}`, // Endpoint para obtener los tickets del técnico
            method: 'GET',
            success: function(response) {
                const ticketList = $('#ticketList');
                ticketList.empty();
                response.tickets.forEach(ticket => {
                    ticketList.append(`
                        <li class="list-group-item ticket-item" data-description="${ticket.descripcion}">
                            ${ticket.asunto}
                        </li>
                    `);
                });
            },
            error: function(xhr) {
                console.error('Error al cargar los tickets:', xhr);
            }
        });
    }

    $('#ticketList').on('click', '.ticket-item', function() {
        const ticketDescription = $(this).data('description');
        $('#ticketDescription').text(ticketDescription);
        $('#ticketDetails').show();
    });

    cargarTickets();
});