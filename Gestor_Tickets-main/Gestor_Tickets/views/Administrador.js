$(document).ready(function() {
    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Administrador';
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

    // Manejar escalamiento de ticket
    $('#descripcionTicketModal').on('click', '.btn', function() {
        const ticketID = $(this).data('ticket-id');
        const nuevoPrioridadID = $(this).data('prioridad');
        const agenteResponsableID = localStorage.getItem('usuario_id') || 1; // ID del administrador

        $.ajax({
            url: 'http://localhost:3000/tickets/escalar-ticket',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                ticketID,
                nuevoPrioridadID,
                motivo: "El ticket requiere atención de un nivel superior.",
                agenteResponsableID
            }),
            success: function() {
                alert('Ticket escalado correctamente');
                $('#descripcionTicketModal').modal('hide');
                cargarListaTickets();
            },
            error: function() {
                alert('Error al escalar el ticket');
            }
        });
    });

    // Manejar creación de nuevo ticket
    $('#ticketForm').on('submit', function(event) {
        event.preventDefault();

        const titulo = $('#titulo').val();
        const descripcion = $('#descripcion').val();
        const categoriaId = $('#categoria').val();
        const usuarioID = localStorage.getItem('usuario_id') || 1; // ID del administrador

        $.ajax({
            url: 'http://localhost:3000/crear-ticket',
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



    $('#usuarioForm').on('submit', function(event) {
        event.preventDefault();
    
        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();
        const email = $('#email').val();
        const contrasenia = $('#contrasenia').val();
        const rol_id = parseInt($('#rol_id').val(), 10);
    

    
        $.ajax({
            url: 'http://localhost:3000/usuarios',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                nombre,
                apellido,
                email,
                contrasenia,
                rol_id
            }),
            success: function() {
                alert('Usuario creado correctamente');
                $('#crearUsuarioModal').modal('hide');
            },
            error: function(xhr, status, error) {
                console.error('Error al crear el usuario:', error);
                alert('Error al crear el usuario');
            }
        });
    });
    
    

    // Manejar asignación de ticket
    $('#asignarTicketForm').on('submit', function(event) {
        event.preventDefault();

        const ticketID = $('#ticketIdAsignar').val();
        const tecnicoID = $('#tecnicoIdAsignar').val();

        $.ajax({
            url: 'http://localhost:3000/tickets/asignar',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                ticketID,
                tecnicoID
            }),
            success: function() {
                alert('Ticket asignado correctamente');
                $('#asignarTicketModal').modal('hide');
                cargarListaTickets();
            },
            error: function() {
                alert('Error al asignar el ticket');
            }
        });
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