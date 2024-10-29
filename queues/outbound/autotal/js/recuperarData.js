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
        document.getElementById('nombre').value = datos["NOMBRE_TIT"] || 'No Disponible';
        document.getElementById('paterno').value = datos["PATERNO_TIT"] || 'No Disponible';
        document.getElementById('materno').value = datos["MATERNO_TIT"] || 'No Disponible';
        document.getElementById('cuenta').value = datos["CUENTA"] || 'No Disponible';
        document.getElementById('apertura').value = datos.apertura || 'No Disponible';
        document.getElementById('corte').value = datos.corte || 'No Disponible';
        document.getElementById('empleo').value = datos["EMPLEO"] || 'No Disponible';
        document.getElementById('rfc').value = datos["RFC"] || 'No Disponible';
        document.getElementById('sexo').value = datos["GENERO"] || 'No Disponible';
        document.getElementById('direccion').value = datos["DOMICILIO"] || 'No Disponible';
        document.getElementById('colonia').value = datos["COLONIA"] || 'No Disponible';
        document.getElementById('ciudad').value = datos["CIUDAD"] || 'No Disponible';
        document.getElementById('estado').value = datos["ESTADO"] || 'No Disponible';
        document.getElementById('cp').value = datos["CODIGO_POSTAL"] || 'No Disponible';
        document.getElementById('tel-casa').value = datos["TEL_CASA"] || 'No Disponible';
        document.getElementById('tel-oficina').value = datos["TEL_OFICINA"] || 'No Disponible';
        document.getElementById('tel-cRef').value = datos["TEL_REF1"] || 'No Disponible';
        document.getElementById('tel-oRef').value = datos["TEL_REF2"] || 'No Disponible';
        document.getElementById('nombre-adicional').value = datos["NOMBRE_ADIC"] || '';
        document.getElementById('paterno-adicional').value = datos["PATERNO_ADIC"] || '';
        document.getElementById('materno-adicional').value = datos["MATERN_ADIC"] || '';
        // Llenamos campos de la sidebar
        document.getElementById('telefonoCasa').value = datos["TEL_CASA"] || 'No Disponible';
        document.getElementById('telefonoOficina').value = datos["TEL_OFICINA"] || 'No Disponible';
        document.getElementById('cuentaInput').value = datos["CUENTA"] || 'No Disponible';
        // Llenamos los nombres del agente
        document.getElementById('nombreAgente').textContent = datos.nombreAgente || 'Agente';
        document.getElementById('nombreAgenteDespedida').textContent = datos.nombreAgente || 'Agente';

        // Actualizar todos los elementos con clase `nombreCliente`
        document.querySelectorAll('.nombreCliente').forEach(el => {
            el.textContent = datos["NOMBRE_TIT"] || 'Cliente';
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
//     FECHA_ENVIO: "",
//     MATERNO_TIT: "",
//     NOMBRE_TIT: "",
//     PATERNO_TIT: "",
//     GENERO: "",
//     NOMBRE_ADIC: "",
//     PATERNO_ADIC: "",
//     MATERN_ADIC: "",
//     TEL_REF1: "",
//     TEL_REF2: "",
//     TEL_REF2_ctry_code: "",
//     TEL_REF2_tz: "",
//     TEL_REF2_state: "",
//     TEL_REF2_wireless: "",
//     TEL_REF2_allowedtime: "",
//     TEL_REF2_disallowedtime: "",
//     EMPLEO: "",
//     RFC: "",
//     DOMICILIO: "",
//     COLONIA: "",
//     CODIGO_POSTAL: "",
//     CIUDAD: "",
//     ESTADO: "",
//     DIA_FACTURACION: ""
// };