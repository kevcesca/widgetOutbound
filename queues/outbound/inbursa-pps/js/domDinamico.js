document.addEventListener('DOMContentLoaded', function () {
    const mainView = document.getElementById('mainView');
    const insuranceView = document.getElementById('insuranceView');
    const customerDataView = document.getElementById('customerDataView');
    const confirmationView = document.getElementById('confirmationView');
    const initialButtons = document.getElementById('initialButtons');
    const contactOptions = document.getElementById('contactOptions');
    const noContactView = document.getElementById('noContactView');
    const otraPersonaOptions = document.getElementById('otraPersonaOptions');
    const loConoceOptions = document.getElementById('loConoceOptions');
    const siConoceOptions = document.getElementById('siConoceOptions');
    const noConoceView = document.getElementById('noConoceView');
    const dejarRecadoView = document.getElementById('dejarRecadoView');
    const agendarView = document.getElementById('agendarView');
    const aseguradosTable = document.getElementById('aseguradosTable').getElementsByTagName('tbody')[0];
    const declineInsuranceView = document.getElementById('declineInsuranceView');
    const contactBtn = document.getElementById('contactBtn');
    const noContactBtn = document.getElementById('noContactBtn');
    const contactSection = document.getElementById('contactSection');
    const conyugeBtn = document.getElementById('conyugeBtn');
    const agregarBtn = document.getElementById('agregarBtn');
    const continuarBtn = document.getElementById('continuarBtn');
    const finalizarBtn = document.getElementById('finalizarBtn');
    const planSelect = document.getElementById('plan');
    const formularioBeneficiario2 = document.getElementById('formularioBeneficiario2');



    document.getElementById('contactBtn').addEventListener('click', function () {
        initialButtons.classList.add('d-none');
        contactOptions.classList.remove('d-none');
    });

    document.getElementById('noContactBtn').addEventListener('click', function () {
        initialButtons.classList.add('d-none');
        noContactView.classList.remove('d-none');
    });

    document.getElementById('finalizarNoContactoBtn').addEventListener('click', function () {
        alert('No contacto registrado. Gracias por su tiempo.');
        resetForm();
    });

    document.getElementById('otraPersonaBtn').addEventListener('click', function () {
        contactOptions.classList.add('d-none');
        otraPersonaOptions.classList.remove('d-none');
    });

    document.getElementById('noViveAhiBtn').addEventListener('click', function () {
        otraPersonaOptions.classList.add('d-none');
        loConoceOptions.classList.remove('d-none');
    });

    document.getElementById('noSeEncuentraBtn').addEventListener('click', function () {
        otraPersonaOptions.classList.add('d-none');
        siConoceOptions.classList.remove('d-none');
    });

    document.getElementById('siConoceBtn').addEventListener('click', function () {
        loConoceOptions.classList.add('d-none');
        siConoceOptions.classList.remove('d-none');
    });

    document.getElementById('noConoceBtn').addEventListener('click', function () {
        loConoceOptions.classList.add('d-none');
        noConoceView.classList.remove('d-none');
    });

    document.getElementById('dejarRecadoBtn').addEventListener('click', function () {
        siConoceOptions.classList.add('d-none');
        dejarRecadoView.classList.remove('d-none');
    });

    document.getElementById('otroTelefonoBtn').addEventListener('click', function () {
        siConoceOptions.classList.add('d-none');
        agendarView.classList.remove('d-none');
    });

    document.getElementById('noTieneTiempoBtn').addEventListener('click', function () {
        contactOptions.classList.add('d-none');
        agendarView.classList.remove('d-none');
    });

    document.getElementById('titularBtn').addEventListener('click', function () {
        mainView.classList.add('d-none');
        insuranceView.classList.remove('d-none');
    });

    document.getElementById('acceptInsuranceBtn').addEventListener('click', function () {
        insuranceView.classList.add('d-none');
        customerDataView.classList.remove('d-none');
    });

    planSelect.addEventListener('change', function () {
        if (this.value === 'PAQUETE' || this.value === 'PAQUETE PLUS') {
            formularioBeneficiario2.classList.remove('d-none');
        } else {
            formularioBeneficiario2.classList.add('d-none');
        }
    });

    // Función para añadir beneficiario al hacer clic en "Agregar"
    agregarBtn.addEventListener('click', function () {
        const plan = planSelect.value;
        const tipoPago = document.getElementById('tipoPago').value;
        const beneficiarios = [];

        // Agrega los datos de beneficiario 1
        beneficiarios.push({
            titulo: document.getElementById('titulo1').value,
            nombre: document.getElementById('nombre1').value,
            paterno: document.getElementById('paterno1').value,
            materno: document.getElementById('materno1').value,
            fechaNac: document.getElementById('fechaNac1').value,
            folio: document.getElementById('folio1').value,
            plan: plan,
            tipoPago: tipoPago
        });

        // Si el plan es PAQUETE o PAQUETE PLUS, agrega los datos del segundo beneficiario
        if (plan === 'PAQUETE' || plan === 'PAQUETE PLUS') {
            beneficiarios.push({
                titulo: document.getElementById('titulo2').value,
                nombre: document.getElementById('nombre2').value,
                paterno: document.getElementById('paterno2').value,
                materno: document.getElementById('materno2').value,
                fechaNac: document.getElementById('fechaNac2').value,
                folio: document.getElementById('folio2').value,
                plan: '', // Plan vacío para el segundo beneficiario
                tipoPago: '' // Tipo de pago vacío para el segundo beneficiario
            });
        }

        // Añadir cada beneficiario a la tabla
        beneficiarios.forEach((beneficiario, index) => {
            if (beneficiario.nombre && beneficiario.paterno && beneficiario.materno && beneficiario.fechaNac) {
                const newRow = aseguradosTable.insertRow();
                newRow.innerHTML = `
                <td>${beneficiario.titulo} ${beneficiario.nombre} ${beneficiario.paterno} ${beneficiario.materno}</td>
                <td>${beneficiario.fechaNac}</td>
                <td>${beneficiario.plan}</td>
                <td>${beneficiario.tipoPago}</td>
                <td><button class="btn btn-danger btn-sm eliminar">Eliminar</button></td>
            `;

                // Event listener para eliminar el beneficiario al hacer clic en "Eliminar"
                newRow.querySelector('.eliminar').addEventListener('click', function () {
                    aseguradosTable.removeChild(newRow);
                });
            } else {
                alert('Por favor, complete todos los campos obligatorios para el beneficiario ' + (index + 1));
            }
        });

        // Actualiza el estado del botón continuar después de agregar beneficiarios
        actualizarEstadoContinuarBtn();
    });

    // Inicialmente desactiva el botón continuar
    continuarBtn.disabled = true;

    // Función para verificar si hay beneficiarios en la tabla
    function actualizarEstadoContinuarBtn() {
        const numeroBeneficiarios = aseguradosTable.rows.length;
        continuarBtn.disabled = numeroBeneficiarios === 0; // Habilita si hay al menos un beneficiario
    }

    document.getElementById('continuarBtn').addEventListener('click', function () {
        enviarSolicitud();
    });

    document.querySelectorAll('.finalizarBtn').forEach(button => {
        button.addEventListener('click', function () {
            alert('Proceso finalizado. Gracias por su tiempo.');
            resetForm();
        });
    });

    document.getElementById('agendarBtn').addEventListener('click', function () {
        alert('Cita agendada. Gracias por su tiempo.');
        resetForm();
    });

    document.getElementById('declineInsuranceBtn').addEventListener('click', function () {
        insuranceView.querySelector('.d-flex.justify-content-end').classList.add('d-none');
        declineInsuranceView.classList.remove('d-none');
    });

    document.getElementById('finalizarRechazoBtn').addEventListener('click', function () {
        const motivo = document.getElementById('motivoRechazo').value;
        if (motivo === 'Seleccione una opción') {
            alert('Por favor, seleccione un motivo de rechazo.');
        } else {
            alert('Seguro rechazado. Motivo: ' + motivo);
            resetForm();
        }
    });

    document.getElementById('NecesitaPensarloBtn').addEventListener('click', function () {
        insuranceView.classList.add('d-none');
        agendarView.classList.remove('d-none');

        // Pre-fill some fields in the agendarView
        document.getElementById('ciclo').value = document.getElementById('ci').value;
        document.getElementById('cuenta').value = document.getElementById('cuenta').value;
        document.getElementById('fecha').valueAsDate = new Date();
    });

    // Evento para regresar a la página inicial
    document.getElementById('inicio').addEventListener('click', function () {
        // Recargar la página manteniendo la URL y sus parámetros
        window.location.href = window.location.href;
    });

    function resetForm() {
        // Hide all views
        [
            mainView, insuranceView, customerDataView, confirmationView, contactOptions,
            noContactView, otraPersonaOptions, loConoceOptions, siConoceOptions,
            noConoceView, dejarRecadoView, agendarView, declineInsuranceView
        ].forEach(view => {
            if (view) {
                view.classList.add('d-none');
            }
        });

        // Show initial view
        if (mainView) {
            mainView.classList.remove('d-none');
        }
        if (initialButtons) {
            initialButtons.classList.remove('d-none');
        }

        // Clear all input fields
        document.querySelectorAll('input').forEach(input => {
            switch (input.type) {
                case 'text':
                case 'email':
                case 'tel':
                case 'number':
                case 'date':
                    input.value = '';
                    break;
                case 'checkbox':
                case 'radio':
                    input.checked = false;
                    break;
            }
        });

        // Reset all select elements
        document.querySelectorAll('select').forEach(select => {
            select.selectedIndex = 0;
        });

        // Clear asegurados table
        if (aseguradosTable) {
            aseguradosTable.innerHTML = '';
        }

        // Reset any custom styles or classes
        document.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
            el.classList.remove('is-invalid', 'is-valid');
        });

        // Clear any error messages
        document.querySelectorAll('.invalid-feedback, .valid-feedback').forEach(el => {
            el.textContent = '';
        });

        // Reset any disabled buttons
        document.querySelectorAll('button[disabled]').forEach(button => {
            button.disabled = false;
        });

        // Clear any dynamically added content
        const dynamicContents = document.querySelectorAll('.dynamic-content');
        dynamicContents.forEach(content => {
            content.innerHTML = '';
        });

        // Reset any progress indicators
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            bar.style.width = '0%';
            bar.setAttribute('aria-valuenow', '0');
        });

        console.log('Form has been reset to its initial state');
    }
});