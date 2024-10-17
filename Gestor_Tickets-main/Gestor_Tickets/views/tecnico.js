function verDescripcion(ticketId) {
    // Aquí puedes agregar lógica para obtener la información del ticket (simulación de datos).
    const tickets = {
        1: {
            asunto: "Problema de conexión",
            descripcion: "El usuario no puede conectarse a la red.",
            creadoPor: "Juan Pérez",
            prioridad: "Alta"
        },
        2: {
            asunto: "Fallo en el servidor",
            descripcion: "El servidor estuvo caído durante 2 horas.",
            creadoPor: "María López",
            prioridad: "Media"
        },
        3: {
            asunto: "Error en la aplicación",
            descripcion: "La aplicación se cierra inesperadamente.",
            creadoPor: "Pedro Martínez",
            prioridad: "Alta"
        }
    };

    const ticket = tickets[ticketId];
    
    if (ticket) {
        document.getElementById("ticketDescription").innerText = ticket.descripcion;
        document.getElementById("creadoPor").innerText = `Creado por: ${ticket.creadoPor}`;
        document.getElementById("prioridad").innerText = `Prioridad: ${ticket.prioridad}`;
        const myModal = new bootstrap.Modal(document.getElementById('descripcionTicketModal'));
        myModal.show();
    }
}

// Salir
document.getElementById("salirLink").addEventListener("click", function () {
    // Aquí puedes agregar la lógica para cerrar sesión.
    alert("Cerrando sesión...");
});

