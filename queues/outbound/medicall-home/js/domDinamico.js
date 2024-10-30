document.addEventListener('DOMContentLoaded', function () {
    const codigoRespuesta1 = document.getElementById('codigoRespuesta1');
    const codigoRespuesta2 = document.getElementById('codigoRespuesta2');
    const observaciones = document.getElementById('observaciones');

    const opcionesAcepta = [
        { text: 'ANUAL', value: 'SACEPA', id: 'acepta_anual' },
        { text: 'MENSUAL', value: 'SACEPM', id: 'acepta_mensual' }
    ];
    const opcionesNoAcepta = [
        { text: 'COSTO', value: 'CTO', id: 'no_acepta_costo' },
        { text: 'NO CUBRE NECESIDADES', value: 'NEC', id: 'no_acepta_necesidades' },
        { text: 'NO LE INTERESA', value: 'NOLI', id: 'no_acepta_interesa' },
        { text: 'YA TIENE SERVICIO', value: 'YTS', id: 'no_acepta_servicio' },
        { text: 'No ha tenido Tiempo', value: 'NOTT', id: 'no_acepta_tiempo' },
        { text: 'OTROS NA', value: 'OTRNA', id: 'no_acepta_otros' }
    ];
    const opcionesNoContacto = [
        { text: 'NO VIVE AHÍ', value: 'NOVA', id: 'no_contacto_vive' },
        { text: 'NO SE ENCUENTRA', value: 'NOSE', id: 'no_contacto_encuentra' },
        { text: 'No Contesta', value: 'NOCT', id: 'no_contacto_contesta' },
        { text: 'CONTESTADORA', value: 'CON', id: 'no_contacto_contestadora' },
        { text: 'Teléfono Ocupado', value: 'TOO', id: 'no_contacto_ocupado' },
        { text: 'Fuera de Servicio', value: 'FSE', id: 'no_contacto_servicio' },
        { text: 'CLIENTE RIP', value: 'CRIP', id: 'no_contacto_cliente' },
        { text: 'OTROS NC', value: 'OTRNC', id: 'no_contacto_otros' },
        { text: 'Datos no Corresponden Req/Tel', value: 'XSCFC', id: 'no_contacto_datos' }
    ];

    // Función para registrar eventos 'change' en los select con clase 'dispCode'
    function registerChangeEvent() {
        const dispCodeSelectElements = document.querySelectorAll('select.dispCode');
        dispCodeSelectElements.forEach((selectElement) => {
            selectElement.addEventListener('change', function () {
                const selectedValue = selectElement.value;

                if (selectedValue !== '' && selectedValue !== 'Seleccione una opción') {
                    window.parent.postMessage({ motivo: selectedValue }, '*'); // Cambia '*' por el origen correcto si es necesario
                    console.log("Motivo enviado:", selectedValue);
                }
            });
        });
    }

    // Lógica para cargar opciones dinámicamente y llamar a 'registerChangeEvent' después
    codigoRespuesta1.addEventListener('change', function () {
        codigoRespuesta2.innerHTML = '<option selected>Seleccione una opción</option>';
        codigoRespuesta2.classList.add('dispCode'); // Agrega la clase al select dinámicamente

        let opciones;
        if (this.value === 'acepta') {
            opciones = opcionesAcepta;
        } else if (this.value === 'no_acepta') {
            opciones = opcionesNoAcepta;
        } else if (this.value === 'no_contacto') {
            opciones = opcionesNoContacto;
        }

        if (opciones) {
            opciones.forEach(opcion => {
                const option = document.createElement('option');
                option.value = opcion.value; // Asignamos el `value` correcto al `option`
                option.textContent = opcion.text;
                option.dataset.id = opcion.id; // Guardamos `id` en un atributo `data-id`
                codigoRespuesta2.appendChild(option);
            });
            codigoRespuesta2.style.display = 'block';
            observaciones.style.display = (this.value !== 'acepta') ? 'block' : 'none';

            // Llama a la función para registrar el evento 'change' en los select generados dinámicamente
            registerChangeEvent();
        } else {
            codigoRespuesta2.style.display = 'none';
            observaciones.style.display = 'none';
        }
    });

    // Botones para enviar motivos específicos
    const buttonsWithMotivos = [
        { id: 'agendarCitaBtn', motivo: 'AGEN' },
        { id: 'dejarRecadoBtn', motivo: 'RECF' },
        { id: 'btnContratar', motivo: 'SACEPA' },
    ];

    // Agregar listeners a cada botón según el motivo asociado
    buttonsWithMotivos.forEach(buttonInfo => {
        const button = document.getElementById(buttonInfo.id);
        if (button) {
            button.addEventListener('click', function () {
                window.parent.postMessage({ motivo: buttonInfo.motivo }, '*'); // Cambia '*' por el origen correcto si es necesario
                console.log(`Motivo '${buttonInfo.motivo}' enviado al presionar ${buttonInfo.id}`);
            });
        }
    });
});
