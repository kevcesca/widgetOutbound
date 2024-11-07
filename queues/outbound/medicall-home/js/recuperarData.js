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
    if (window.infoCliente) {
        const datos = window.infoCliente;
        // Llenamos los campos del formulario
        document.getElementById('nombreTitular').value = datos.NOMBRE_TIT || '';
        document.getElementById('paterno').value = datos.PATERNO_TIT || '';
        document.getElementById('materno').value = datos.MATERNO_TIT || '';
        document.getElementById('noCuenta').value = datos.CUENTA || '';
        document.getElementById('fechaApertura').value = datos.FECHA_ENVIO || '';
        document.getElementById('empleo').value = datos.EMPLEO || '';
        document.getElementById('rfc').value = datos.RFC || '';
        document.getElementById('sexo').value = datos.GENERO || '';
        document.getElementById('direccion').value = datos.DOMICILIO || '';
        document.getElementById('colonia').value = datos.COLONIA || '';
        document.getElementById('ciudad').value = datos.CIUDAD || '';
        document.getElementById('cp').value = datos.CODIGO_POSTAL || '';
        document.getElementById('estado').value = datos.ESTADO || '';
        document.getElementById('telCasa').value = datos.TEL_CASA || '';
        document.getElementById('telOficina').value = datos.TEL_OFICINA || '';
        document.getElementById('telCelular').value = datos.TEL_REF1 || '';
        document.getElementById('nombreAdicional').value = datos.NOMBRE_ADIC || '';
        document.getElementById('paternoAdicional').value = datos.PATERNO_ADIC || '';
        document.getElementById('maternoAdicional').value = datos.MATERNO_ADIC || '';
        // Llenamos campos de la sidebar
        document.getElementById('telefonoCasa').value = datos["TEL_CASA"] || 'No Disponible';
        document.getElementById('telefonoOficina').value = datos["TEL_OFICINA"] || 'No Disponible';
        document.getElementById('cuentaInput').value = datos["CUENTA"] || 'No Disponible';
        document.getElementById('tituloQueue').textContent = datos["queue"] || 'No Disponible';
        // Llenamos los nombres del agente
        document.getElementById('nombreAgente').textContent = datos.nombreAgente || 'Agente';

        // Actualizar todos los elementos con clase `nombreCliente`
        document.querySelectorAll('.nombreCliente').forEach(el => {
            el.textContent = (datos["NOMBRE_TIT"] + ' ' + datos["PATERNO_TIT"]) || 'Cliente';
        });
    }
}


// const data = {
//     Id: "",
//     TEL_CASA: "",
//     TEL_CASA_ctry_code: "",
//     TEL_CASA_tz: "",
//     TEL_CASA_state: "",
//     TEL_CASA_wireless: "",
//     TEL_CASA_allowedtime: "",
//     TEL_CASA_disallowedtime: "",
//     TEL_OFICINA: "",
//     TEL_OFICINA_ctry_code: "",
//     TEL_OFICINA_tz: "",
//     TEL_OFICINA_state: "",
//     TEL_OFICINA_wireless: "",
//     TEL_OFICINA_allowedtime: "",
//     TEL_OFICINA_disallowedtime: "",
//     CICLO: "",
//     COMPANIA: "",
//     CUENTA: "",
//     ESTADO_CENTRAL: "",
//     FECHA_ENVIO: "",
//     MATERN_TIT: "",
//     NOMBRE_TIT: "",
//     PATERNO_TIT
// };