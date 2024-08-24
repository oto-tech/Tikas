document.addEventListener('DOMContentLoaded', cargarTickets);

document.getElementById('btnCrearTicket').addEventListener('click', crearTicket);

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado y parseado');
    cargarTickets();
    const crearTicketButton = document.getElementById('btnCrearTicket');
    if (crearTicketButton) {
        console.log('Botón "Crear Ticket" encontrado');
        crearTicketButton.addEventListener('click', crearTicket);
    } else {
        console.log('Botón "Crear Ticket" no encontrado');
    }
});

function crearTicket() {
    let titulo = document.getElementById('titulo').value;
    let descripcion = document.getElementById('descripcion').value;
    let categoriaId = 1; // Ajusta esto según tu lógica
    let usuarioCreadorId = 1; // Este debería ser el ID del usuario actualmente autenticado

    let ticketData = {
        asunto: titulo,
        descripcion: descripcion,
        categoriaId: categoriaId,
        usuarioCreadorId: usuarioCreadorId
    };

    fetch('http://localhost:3000/api/crear-ticket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Ticket creado:', data);
        alert('Ticket creado con éxito');
        let modal = bootstrap.Modal.getInstance(document.getElementById('crearTicketModal'));
        modal.hide();
        document.getElementById('titulo').value = '';
        document.getElementById('descripcion').value = '';
        cargarTickets();
    })
    .catch(error => {
        console.error('Error al crear el ticket:', error);
        alert('Error al crear el ticket');
    });
}

function cargarTickets() {
    let usuarioCreadorId = 1; // Este debería ser el ID del usuario actualmente autenticado

    fetch(`http://localhost:3000/api/tickets?usuarioCreadorId=${usuarioCreadorId}`)
    .then(response => response.json())
    .then(data => {
        let ticketList = document.querySelector('.list-group');
        ticketList.innerHTML = '';

        data.forEach(ticket => {
            let listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = `${ticket.asunto} - ${ticket.descripcion}`;
            ticketList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error al cargar los tickets:', error);
        alert('Error al cargar los tickets');
    });
}