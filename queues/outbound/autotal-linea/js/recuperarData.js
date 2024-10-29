// Listener para recibir datos desde el widget principal
window.addEventListener('message', (event) => {
    const allowedOrigin = 'https://na-01.workspaces.avayacloud.com'; // Asegúrate de que coincida con el origen correcto
    if (event.origin === allowedOrigin && event.data) {
        // Almacenamos los datos en window.infoCliente y actualizamos el formulario
        window.infoCliente = event.data;
        cargarDatosFormulario(); // Llamada a cargar los datos en el formulario
        console.log("Datos recibidos y cargados en el formulario:", window.infoCliente);
    } else {
        console.warn("Origen no permitido o datos no válidos recibidos:", event.origin);
    }
});

// Función para cargar datos en el formulario
function cargarDatosFormulario() {
    console.log("Cargando datos en el formulario...");
    if (window.infoCliente) {
        console.log("Datos recibidos:", window.infoCliente);
        const datos = window.infoCliente;
        // Llenamos los campos del formulario
        document.getElementById('nombreCliente').value = datos.nombreCliente || 'No Disponible';
        document.getElementById('noCuenta').value = datos.noCuenta || 'No Disponible';
        document.getElementById('noCliente').value = datos.CUENTA || 'No Disponible';
        document.getElementById('central').value = datos.central || 'No Disponible';
        document.getElementById('centralConf').value = datos.central || 'No Disponible';
        document.getElementById('fechaCotizacion').value = datos.apertura || 'No Disponible';
        document.getElementById('fechaCotConf').value = datos.apertura || 'No Disponible';
        document.getElementById('telCasa').value = datos["TEL_CASA"] || 'No Disponible';
        document.getElementById('telOficina').value = datos["TEL_OFICINA"] || 'No Disponible';
        document.getElementById('telCasaConf').value = datos["TEL_CASA"] || 'No Disponible';
        document.getElementById('telOficinaConf').value = datos["TEL_OFICINA"] || 'No Disponible';

        // Llenamos campos de la sidebar
        document.getElementById('telefonoCasa').value = datos["TEL_CASA"] || 'No Disponible';
        document.getElementById('telefonoOficina').value = datos["TEL_OFICINA"] || 'No Disponible';
        document.getElementById('cuentaInput').value = datos["CUENTA"] || 'No Disponible';

        // Llenamos los nombres del agente
        document.getElementById('nombreAgente').textContent = datos.nombreAgente || 'Agente';
        document.getElementById('nombreAgenteDespedida').textContent = datos.nombreAgente || 'Agente';

        // Actualizar todos los elementos con clase `nombreCliente`
        document.querySelectorAll('.nombreCliente').forEach(el => {
            el.textContent = datos["First Name"] || 'Cliente';
        });
    }
}

