document.addEventListener('DOMContentLoaded', function () {
    const codigoRespuesta1 = document.getElementById('codigoRespuesta1');
    const codigoRespuesta2 = document.getElementById('codigoRespuesta2');
    const observaciones = document.getElementById('observaciones');

    const opcionesAcepta = [
        { text: 'ANUAL', value: 'SACEPA' },
        { text: 'MENSUAL', value: 'SACEPM' }
    ];
    const opcionesNoAcepta = [
        { text: 'COSTO', value: 'CTO' },
        { text: 'NO CUBRE NECESIDADES', value: 'NEC' },
        { text: 'NO LE INTERESA', value: 'NOLI' },
        { text: 'YA TIENE SERVICIO', value: 'YTS' },
        { text: 'No ha tenido Tiempo', value: 'NTT' },
        { text: 'OTROS NA', value: 'OTRNA' }
    ];
    const opcionesNoContacto = [
        { text: 'NO VIVE AHÍ', value: 'NOVA' },
        { text: 'NO SE ENCUENTRA', value: 'NOSE' },
        { text: 'No Contesta', value: 'NCT' },
        { text: 'CONTESTADORA', value: 'CON' },
        { text: 'Teléfono Ocupado', value: 'TOO' },
        { text: 'Fuera de Servicio', value: 'FSE' },
        { text: 'CLIENTE RIP', value: 'OKRIP' },
        { text: 'OTROS NC', value: 'OTRNC' },
        { text: 'Datos no Corresponden Req/Tel', value: 'XSCFC' }
    ];

    // Evento para regresar a la página inicial
    document.getElementById('inicio').addEventListener('click', function () {
        // Recargar la página manteniendo la URL y sus parámetros
        window.location.href = window.location.href;
    });

    codigoRespuesta1.addEventListener('change', function () {
        codigoRespuesta2.innerHTML = '<option selected>Seleccione una opción</option>';

        if (this.value === 'acepta') {
            opcionesAcepta.forEach(opcion => {
                const option = document.createElement('option');
                option.value = opcion.value;
                option.textContent = opcion.text;
                option.classList.add('dispCode'); // Agrega la clase dispCode
                codigoRespuesta2.appendChild(option);
            });
            codigoRespuesta2.style.display = 'block';
            observaciones.style.display = 'none';
        } else if (this.value === 'no_acepta') {
            opcionesNoAcepta.forEach(opcion => {
                const option = document.createElement('option');
                option.value = opcion.value;
                option.textContent = opcion.text;
                option.classList.add('dispCode'); // Agrega la clase dispCode
                codigoRespuesta2.appendChild(option);
            });
            codigoRespuesta2.style.display = 'block';
            observaciones.style.display = 'block';

        } else if (this.value === 'no_contacto') {
            opcionesNoContacto.forEach(opcion => {
                const option = document.createElement('option');
                option.value = opcion.value;
                option.textContent = opcion.text;
                option.classList.add('dispCode'); // Agrega la clase dispCode
                codigoRespuesta2.appendChild(option);
            });
            codigoRespuesta2.style.display = 'block';
            observaciones.style.display = 'block';
        } else {
            codigoRespuesta2.style.display = 'none';
            observaciones.style.display = 'none';
        }
    });
});
