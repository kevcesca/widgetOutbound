function enviarSolicitud() {
    alert("Procesando solicitud. Por favor, espere...");
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
        usuario: usuario || "Nulo",
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
        fechaAlta: fechaHoy,
        folio: document.getElementById('folio1').value,
        fechaTransaccion: fechaHoy,
        horaTransaccion: horaActual,
        ipOrigen: "10.196.45.80" 
    };

    // Si el plan es "Paquete" o "Paquete Plus", genera una solicitud por cada registro
    const solicitudes = (tipoSeguro === 'S' || tipoSeguro === 'C') 
        ? [solicitudBase, {...solicitudBase, ...{nombre: document.getElementById('nombre2').value}}]
        : [solicitudBase];

    // Envía cada solicitud
    solicitudes.forEach(solicitud => {
        fetch("https://searsvisadesa.sears.com.mx:8443/SeguroPPS/ServiciosSearsVisa/spb_services/seguroPPS", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(solicitud)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta del servidor: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(`Error en la solicitud: ${data.error}`);
            }
            console.log("Solicitud enviada con éxito:", data);
            alert("Solicitud enviada con éxito.");
            customerDataView.classList.add('d-none');
            confirmationView.classList.remove('d-none');
        })
        .catch(error => {
            console.error("Error al enviar la solicitud:", error);
            alert("Hubo un problema al enviar la solicitud: " + error.message + ". Inténtelo de nuevo más tarde.");
        });
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
