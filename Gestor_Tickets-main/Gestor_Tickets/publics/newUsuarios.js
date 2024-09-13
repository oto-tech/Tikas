
document.getElementById('btnCrearUsuario').addEventListener('click', crearusuario);

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado y parseado');
    cargarTickets();
    const crearusuariotButton = document.getElementById('btnCrearUsuario');
    if (crearusuariotButton) {
        console.log('Botón "Crear usuario" encontrado');
        crearusuariotButton.addEventListener('click', crearusuario);
    } else {
        console.log('Botón "Crear usuario" no encontrado');
    }
});

function crearusuario() {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let contrasenia = document.getElementById('contrasenia').value;
    let rol_id = document.getElementById('rol_id').value;


    let usuarioData = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasenia: contrasenia,
        rol_id: rol_id
    };


    fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('usuario creado:', data);
        alert('usuario creado con éxito');
        let modal = bootstrap.Modal.getInstance(document.getElementById('crearUsuarioModal'));
        modal.hide();
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('email').value = '';
        document.getElementById('contrasenia').value = '';
        document.getElementById('rol_id').value = '';
    })
    .catch(error => {
        console.error('Error al crear el usuario:', error);
        alert('Error al crear el usuario');
    });
}

