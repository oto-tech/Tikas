$(document).ready(function() {
    const usuarioId = localStorage.getItem('usuario_id');
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    $('#nombreUsuario').text(nombreUsuario);

   // Cargar lista de tickets al cargar la página
   cargarListaTickets();

   // Manejar clic en un ticket para mostrar detalles
   $('#listaTickets').on('click', '.ticket-item', function() {
       const ticketDescription = $(this).data('description');
       const createdBy = $(this).data('created-by');
       const priority = $(this).data('priority');
       const ticketId = $(this).data('ticket-id');

       $('#ticketDescription').text(`Descripción del Ticket:\n\n${ticketDescription}`);
       $('#creadoPor').text(`Creado por: ${createdBy}`);
       $('#prioridad').text(`Prioridad: ${priority}`);

       // Actualizar data-ticket-id en botones de escalado
       $('#escalateLow, #escalateMedium, #escalateHigh').attr('data-ticket-id', ticketId);

       $('#descripcionTicketModal').modal('show');
   });

    // Función para cargar la lista de tickets
    function cargarListaTickets() {
        $.ajax({
            url: 'http://localhost:3000/tickets/todos-los-tickets',
            method: 'GET',
            success: function(response) {
                const tickets = response.tickets;
                const listaTickets = $('#listaTickets');
                listaTickets.empty();

                tickets.forEach(ticket => {
                    listaTickets.append(`
                        <li class="list-group-item ticket-item" 
                            data-description="${ticket.descripcion}" 
                            data-created-by="${ticket.nombre_usuario}" 
                            data-priority="${ticket.prioridad_id}" 
                            data-ticket-id="${ticket.ticket_id}">
                            ${ticket.asunto}
                        </li>
                    `);
                });
            },
            error: function() {
                console.error('Error al obtener los tickets');
            }
        });
    }

   
});