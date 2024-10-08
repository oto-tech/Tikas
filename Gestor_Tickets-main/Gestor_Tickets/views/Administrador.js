
$(document).ready(function() {
    // Obtener y mostrar el nombre del usuario desde localStorage
    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Administrador';
    $('#nombreUsuario').text(nombreUsuario);

    // Función para mostrar la sección seleccionada
    function showSection(sectionId) {
        $('.content-section').addClass('d-none'); // Ocultar todas las secciones
        $('#' + sectionId).removeClass('d-none'); // Mostrar la sección seleccionada
        $('.nav-link').removeClass('active'); // Quitar clase active de todos los enlaces
        $('.nav-link[data-section="' + sectionId + '"]').addClass('active'); // Añadir clase active al enlace seleccionado

        // Si la sección es 'historial', 'ticketsPendientes' o 'ticketsResueltos', cargar los tickets
        if(sectionId === 'historial') {
            cargarListaTicketsHistorial();
        } else if(sectionId === 'ticketsPendientes') {
            cargarListaTicketsPendientes();
        } else if(sectionId === 'ticketsResueltos') {
            cargarListaTicketsResueltos();
        }
    }

    // Evento al hacer clic en un enlace del sidebar
    $('.nav-link').click(function(e) {
        e.preventDefault();
        var section = $(this).data('section');
        if (section) {
            showSection(section);
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

    // Función para obtener el nombre de la prioridad basado en el ID
    function obtenerPrioridad(prioridadId) {
        switch(prioridadId) {
            case 1:
                return 'Baja';
            case 2:
                return 'Media';
            case 3:
                return 'Alta';
            default:
                return 'Desconocida';
        }
    }

    // Función para obtener el estado basado en el ID
    function obtenerEstado(estadoId) {
        switch(estadoId) {
            case 1:
                return 'Abierto';
            case 2:
                return 'Resuelto';
            default:
                return 'Desconocido';
        }
    }

    // Función para formatear la fecha
    function formatearFecha(fecha) {
        const date = new Date(fecha);
        return date.toLocaleString(); // Puedes personalizar el formato según tus preferencias
    }

    // -----------------------------
    // Funcionalidades de Tickets
    // -----------------------------

    // Función para cargar la lista de tickets en el dashboard
    function cargarListaTickets() {
        $.ajax({
            url: 'http://localhost:3000/tickets/todos-los-tickets',
            method: 'GET',
            success: function(response) {
                const tickets = response.tickets;
                const listaTickets = $('#listaTickets');
                listaTickets.empty();

                if (tickets.length === 0) {
                    listaTickets.append(`
                        <li class="list-group-item text-center">No hay tickets disponibles.</li>
                    `);
                    return;
                }

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
                showAlert('dashboardAlert', 'Error al cargar la lista de tickets.', 'danger');
            }
        });
    }

    // Función para cargar la lista de tickets en el Historial
    function cargarListaTicketsHistorial() {
        $.ajax({
            url: 'http://localhost:3000/tickets/todos-los-tickets',
            method: 'GET',
            success: function(response) {
                const tickets = response.tickets;
                const tablaHistorial = $('#tablaHistorialTickets tbody');
                tablaHistorial.empty(); // Limpiar la tabla antes de insertar nuevos datos

                if (tickets.length === 0) {
                    tablaHistorial.append(`
                        <tr>
                            <td colspan="9" class="text-center">No hay tickets disponibles.</td>
                        </tr>
                    `);
                    return;
                }

                tickets.forEach(ticket => {
                    tablaHistorial.append(`
                        <tr>
                            <td>${ticket.ticket_id}</td>
                            <td>${ticket.asunto}</td>
                            <td>${ticket.descripcion}</td>
                            <td>${ticket.nombre_usuario}</td>
                            <td>${obtenerPrioridad(ticket.prioridad_id)}</td>
                            <td>${obtenerEstado(ticket.estado_id)}</td>
                            <td>${formatearFecha(ticket.fecha_creacion)}</td>
                            <td>${ticket.fecha_resolucion ? formatearFecha(ticket.fecha_resolucion) : 'N/A'}</td>
                            <td>
                                <!-- Puedes agregar botones de acción aquí -->
                                <button class="btn btn-sm btn-info ver-detalles" data-ticket-id="${ticket.ticket_id}">Ver</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function() {
                console.error('Error al obtener los tickets para el historial');
                showAlert('historialAlert', 'Error al cargar el historial de tickets.', 'danger');
            }
        });
    }


// Función para cargar la lista de Tickets Pendientes
function cargarListaTicketsPendientes() {
    $.ajax({
        url: 'http://localhost:3000/tickets/ticketsP', // Llamar al endpoint de tickets pendientes
        method: 'GET',
        success: function(response) {
            const tickets = response.tickets;
            const tablaPendientes = $('#tablaTicketsPendientes tbody');
            tablaPendientes.empty(); // Limpiar la tabla antes de insertar nuevos datos

            if (tickets.length === 0) {
                tablaPendientes.append(`
                    <tr>
                        <td colspan="7" class="text-center">No hay tickets pendientes.</td>
                    </tr>
                `);
                return;
            }

            tickets.forEach(ticket => {
                tablaPendientes.append(`
                    <tr>
                        <td>${ticket.ticket_id}</td>
                        <td>${ticket.asunto}</td>
                        <td>${ticket.descripcion}</td>
                        <td>${ticket.nombre_usuario}</td>
                        <td>${obtenerPrioridad(ticket.prioridad_id)}</td>
                        <td>${formatearFecha(ticket.fecha_creacion)}</td>
                        <td>
                            <!-- Botones de acción -->
                            <button class="btn btn-sm btn-info ver-detalles" data-ticket-id="${ticket.ticket_id}">Ver</button>
                            <button class="btn btn-sm btn-warning escalar-ticket" data-ticket-id="${ticket.ticket_id}" data-prioridad="3">Escalar</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function() {
            console.error('Error al obtener los tickets pendientes');
            showAlert('ticketsPendientesAlert', 'Error al cargar los tickets pendientes.', 'danger');
        }
    });
}

// Función para cargar la lista de Tickets Resueltos
function cargarListaTicketsResueltos() {
    $.ajax({
        url: 'http://localhost:3000/tickets/ticketsR', // Llamar al endpoint de tickets resueltos
        method: 'GET',
        success: function(response) {
            const tickets = response.tickets;
            const tablaResueltos = $('#tablaTicketsResueltos tbody');
            tablaResueltos.empty(); // Limpiar la tabla antes de insertar nuevos datos

            if (tickets.length === 0) {
                tablaResueltos.append(`
                    <tr>
                        <td colspan="8" class="text-center">No hay tickets resueltos.</td>
                    </tr>
                `);
                return;
            }

            tickets.forEach(ticket => {
                tablaResueltos.append(`
                    <tr>
                        <td>${ticket.ticket_id}</td>
                        <td>${ticket.asunto}</td>
                        <td>${ticket.descripcion}</td>
                        <td>${ticket.nombre_usuario}</td>
                        <td>${obtenerPrioridad(ticket.prioridad_id)}</td>
                        <td>${formatearFecha(ticket.fecha_creacion)}</td>
                        <td>${ticket.fecha_resolucion ? formatearFecha(ticket.fecha_resolucion) : 'N/A'}</td>
                        <td>
                            <!-- Botones de acción -->
                            <button class="btn btn-sm btn-info ver-detalles" data-ticket-id="${ticket.ticket_id}">Ver</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function() {
            console.error('Error al obtener los tickets resueltos');
            showAlert('ticketsResueltosAlert', 'Error al cargar los tickets resueltos.', 'danger');
        }
    });
}



    // Manejar clic en botones de "Ver Detalles" para mostrar información en el modal
    $('.content').on('click', '.ver-detalles', function() {
        const ticketID = $(this).data('ticket-id');

        // Realizar una solicitud para obtener los detalles del ticket
        $.ajax({
            url: `http://localhost:3000/tickets/${ticketID}`,
            method: 'GET',
            success: function(response) {
                const ticket = response.ticket;
                $('#detalleTicketID').text(ticket.ticket_id);
                $('#detalleTicketAsunto').text(ticket.asunto);
                $('#detalleTicketDescripcion').text(ticket.descripcion);
                $('#detalleTicketCreadoPor').text(ticket.nombre_usuario);
                $('#detalleTicketPrioridad').text(obtenerPrioridad(ticket.prioridad_id));
                $('#detalleTicketEstado').text(obtenerEstado(ticket.estado_id));
                $('#detalleTicketFechaCreacion').text(formatearFecha(ticket.fecha_creacion));
                $('#detalleTicketFechaResolucion').text(ticket.fecha_resolucion ? formatearFecha(ticket.fecha_resolucion) : 'N/A');

                // Mostrar el modal
                $('#detallesTicketModal').modal('show');
            },
            error: function() {
                console.error('Error al obtener los detalles del ticket');
                showAlert('dashboardAlert', 'Error al obtener los detalles del ticket.', 'danger');
            }
        });
    });

    // -----------------------------
    // Funcionalidades de Escalar Ticket en Pendientes
    // -----------------------------

    // Manejar escalamiento de ticket desde la tabla de pendientes
    $('.content').on('click', '.escalar-ticket', function() {
        const ticketID = $(this).data('ticket-id');
        const nuevoPrioridadID = $(this).data('prioridad'); // Por ejemplo, 3 para Alta

        const agenteResponsableID = localStorage.getItem('usuario_id') || 1; // ID del administrador

        $.ajax({
            url: 'http://localhost:3000/tickets/escalar-ticket',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                ticketID: ticketID,
                nuevoPrioridadID: nuevoPrioridadID,
                motivo: "El ticket requiere atención de un nivel superior.",
                agenteResponsableID: agenteResponsableID
            }),
            success: function() {
                showAlert('ticketsPendientesAlert', 'Ticket escalado correctamente.', 'success');
                cargarListaTicketsPendientes();
            },
            error: function(xhr) {
                console.error('Error al escalar el ticket:', xhr.responseText);
                showAlert('ticketsPendientesAlert', 'Error al escalar el ticket.', 'danger');
            }
        });
    });



     


});
