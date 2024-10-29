document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar todos los elementos de lista desplegable (select)
    const dispCodeSelectElements = document.querySelectorAll('select');

    // Agregar el evento 'change' a cada lista desplegable con la clase 'dispCode'
    dispCodeSelectElements.forEach((selectElement) => {
        selectElement.addEventListener('change', function () {
            const selectedValue = selectElement.value;

            // Verificar que el valor no esté vacío o sea un placeholder
            if (selectedValue !== '' && selectedValue !== 'Seleccione una opción') {
                window.parent.postMessage({ motivo: selectedValue }, '*'); // Cambia '*' por el origen correcto si es necesario
                console.log("Motivo enviado:", selectedValue);
            }
        });
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
