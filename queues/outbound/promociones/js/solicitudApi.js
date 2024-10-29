function enviarSolicitudSegurosTelemarketing() {
    // Verifica que se han recibido datos desde el widget
    const datos = window.infoCliente || {};

    // Obtener la fecha y hora actual
    // Obtener la fecha y hora actual
    const fechaHoy = new Date();
    const dia = String(fechaHoy.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
    const mes = String(fechaHoy.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
    const anio = fechaHoy.getFullYear();
    const fechaTransaccion = `${dia}/${mes}/${anio}`; // Formato DD/MM/YYYY
    const horaActual = new Date().toLocaleTimeString('en-GB'); // formato HH:MM:SS

    // Crear objeto de solicitud
    const solicitud = {
        nombreServicio: "cargosSegurosTelemark", // Hardcodeado
        compania: datos["COMPANIA"] ,
        cicloIndice: datos["CICLO"] ,
        cuenta: datos["CUENTA"] ,
        notaSeguimiento: document.getElementById("codigoRespuesta")?.value,
        usuario: datos["E-Mail"] || "Nulo",
        fecha: "1240613",
        promocion: datos["queue"],
        fechaTransaccion: fechaTransaccion,
        horaTransaccion: horaActual,
        ipOrigen: "191.168.12.23" // Temporalmente hardcodeado
    };

    // Enviar la solicitud
    fetch("https://searsvisadesa.sears.com.mx:8443/spb-service-telemarketing/ServiciosSearsVisa/spb_services/SegurosTelemarketing", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(solicitud)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error en la respuesta de la solicitud");
        }
    })
    .then(data => console.log("Solicitud enviada con éxito:", data))
    .catch(error => console.error("Error al enviar la solicitud:", error));
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("finalizarLlamada").addEventListener("click", function(event) {
        event.preventDefault(); // Evita el envío predeterminado del formulario
        enviarSolicitudSegurosTelemarketing(); // Llama a la función de envío de solicitud
    });
});
