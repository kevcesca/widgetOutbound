function enviarSolicitudSeguroMHOME() {
    // Verifica si los datos del cliente están disponibles
    const datos = window.infoCliente || {};

    // Obtener la fecha y hora actual
    const fechaHoy = new Date().toISOString().split('T')[0]; // YYYY/MM/DD
    const horaActual = new Date().toLocaleTimeString('en-GB'); // formato HH:MM:SS

    // Crear objeto de solicitud
    const solicitud = {
        nombreServicio: "seguroMHOME", // Hardcodeado
        membresia: "NoEspf",           // Hardcodeado
        folio: document.getElementById("numeroFolio").value, // Desde el formulario
        fechaCaptura: fechaHoy,
        nombreCompleto: datos["NOMBRE_TIT"] || "Nombre no especificado",
        importe: "NoEspf",             // Hardcodeado
        tipoMovimiento: "A",           // Hardcodeado
        noCuenta: datos["CUENTA"] || document.getElementById("cuentaInput").value,
        tipoCargo: document.getElementById("codigoRespuesta1").value === "acepta" ? "A" : "M", // Tipo cargo depende del formulario
        fechaTransaccion: fechaHoy,
        horaTransaccion: horaActual,
        ipOrigen: "10.196.135.12"      // Hardcodeado
    };

    // Enviar la solicitud
    fetch("https://10.128.14.10:8443/SeguroMHOME/ServiciosSearsVisa/spb_services/seguroMHOME", {
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
    document.querySelector("button[type='submit']").addEventListener("click", function(event) {
        event.preventDefault(); // Previene el envío predeterminado del formulario
        enviarSolicitudSeguroMHOME(); // Llama a la función de envío
    });
});