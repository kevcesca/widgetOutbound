function enviarSolicitud() {
    // Obtén valores del formulario y `window.infoCliente`
    const datosCliente = window.infoCliente || {};
    const cuenta = datosCliente["CUENTA"];
    const usuario = datosCliente["E-Mail"];
    const fechaHoy = new Date().toISOString().slice(0, 10); // formato YYYY-MM-DD
    const horaActual = new Date().toLocaleTimeString('en-GB'); // formato 24h

    // Determina tipo de seguro en función de la selección del formulario
    const tipoSeguro = determinarTipoSeguro(document.getElementById('plan').value);
    const tipoCargo = document.getElementById('tipoPago').value === "SACEPA" ? "A" : "M";

    // Genera el objeto de solicitud base
    const solicitudBase = {
        nombreServicio: "seguroPPS",
        cuenta: cuenta,
        usuario: usuario,
        tipoSeguro: tipoSeguro,
        tipoCargo: tipoCargo,
        autoriza: "T",
        titulo: document.getElementById('titulo1').value,
        nombre: document.getElementById('nombre1').value,
        apellidoPaterno: document.getElementById('paterno1').value,
        apellidoMaterno: document.getElementById('materno1').value,
        fechaNacimiento: document.getElementById('fechaNac1').value,
        tituloAsegurado: datosCliente["Title Predefined"],
        nombreAsegurado: datosCliente["NOMBRE_TIT"],
        apellidoPaternoAse: datosCliente["PATERNO_TIT"],
        apellidoMaternoAse: datosCliente["MATERNO_TIT"],
        fechaNacimientoAse: datosCliente["fec_nac"],
        fechaAlta: datosCliente["fec_alta"],
        folio: document.getElementById('folio1').value,
        fechaTransaccion: fechaHoy,
        horaTransaccion: horaActual,
        ipOrigen: "10.196.45.80" // Hardcodeada según el ejemplo
    };

    // Si el plan es "Paquete" o "Paquete Plus", genera una solicitud por cada registro
    const solicitudes = (tipoSeguro === 'S' || tipoSeguro === 'C') 
        ? [solicitudBase, {...solicitudBase, ...{nombre: document.getElementById('nombre2').value}}]
        : [solicitudBase];

    // Envía cada solicitud
    solicitudes.forEach(solicitud => {
        fetch("https://10.128.14.10:8443/SeguroPPS/ServiciosSearsVisa/spb_services/seguroPPS", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(solicitud)
        })
        .then(response => response.json())
        .then(data => console.log("Solicitud enviada con éxito:", data))
        .catch(error => console.error("Error al enviar la solicitud:", error));
    });
}

// Determina el tipo de seguro con base en la selección del formulario
function determinarTipoSeguro(planSeleccionado) {
    switch (planSeleccionado) {
        case "INDIVIDUAL PLUS": return "I";
        case "PAQUETE PLUS": return "S";
        case "INDIVIDUAL": return "B";
        case "PAQUETE": return "C";
        default: return "B";
    }
}