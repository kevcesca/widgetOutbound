function toggleInfoDisplay(hasInfo) {
    const infoRow = document.getElementById('infoRow');
    const noInfoRow = document.getElementById('noInfoRow');

    if (hasInfo) {
        infoRow.classList.remove('d-none');
        noInfoRow.classList.add('d-none');
    } else {
        infoRow.classList.add('d-none');
        noInfoRow.classList.remove('d-none');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const mainView = document.getElementById('mainView');
    const insuranceView = document.getElementById('insuranceView');
    const additionalInfoView = document.getElementById('additionalInfoView');
    const confirmationView = document.getElementById('confirmationView');
    const initialButtons = document.getElementById('initialButtons');
    const contactOptions = document.getElementById('contactOptions');
    const contactBtn = document.getElementById('contactBtn');
    const noContactBtn = document.getElementById('noContactBtn');
    const finalizarNoContactoBtn = document.getElementById('finalizarNoContactoBtn');
    const otraPersonaOptions = document.getElementById('otraPersonaOptions');
    const otraPersonaBtn = document.getElementById('otraPersonaBtn');
    const titularBtn = document.getElementById('titularBtn');
    const acceptBtn = document.getElementById('acceptBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    const rejectionOptions = document.getElementById('rejectionOptions');
    const agregarBtn = document.getElementById('agregarBtn');
    const continuarBtn = document.querySelector('#additionalInfoView .btn-success');
    const finishRejectionBtn = document.getElementById('finishRejectionBtn');
    const agendarView = document.getElementById('agendarView');
    const noViveAhiBtn = document.getElementById('noViveAhiBtn');
    const siConoceBtn = document.getElementById('siConoceBtn');
    const otroTelefonoBtn = document.getElementById('otroTelefonoBtn');
    const loConoceOptions = document.getElementById('loConoceOptions');
    const siConoceOptions = document.getElementById('siConoceOptions');
    const dejarRecadoView = document.getElementById('dejarRecadoView');
    const dejarRecadoBtn = document.getElementById('dejarRecadoBtn');
    const noConoceView = document.getElementById('noConoceView');
    const noConoceBtn = document.getElementById('noConoceBtn');
    const noSeEncuentraBtn = document.getElementById('noSeEncuentraBtn');
    const noTieneTiempoBtn = document.getElementById('noTieneTiempoBtn');
    const necesitaPensarlo = document.getElementById('necesitaPensarlo')
    const aseguradosTable = document.getElementById('aseguradosTable').getElementsByTagName('tbody')[0];
    const planSelect = document.getElementById('plan');
    const formularioBeneficiario2 = document.getElementById('formularioBeneficiario2');


    contactBtn.addEventListener('click', function () {
        console.log('Botón Contacto presionado');
        initialButtons.classList.add('d-none');
        contactOptions.classList.remove('d-none');
    });

    noContactBtn.addEventListener('click', function () {
        initialButtons.classList.add('d-none');
        noContactView.classList.remove('d-none');
    });

    finalizarNoContactoBtn.addEventListener('click', function () {
        window.location.href = window.location.href;
    });

    otraPersonaBtn.addEventListener('click', function () {
        contactOptions.classList.add('d-none');
        otraPersonaOptions.classList.remove('d-none');
    });

    noViveAhiBtn.addEventListener('click', function () {
        otraPersonaOptions.classList.add('d-none');
        loConoceOptions.classList.remove('d-none');
    });

    noSeEncuentraBtn.addEventListener('click', function () {
        otraPersonaOptions.classList.add('d-none');
        siConoceOptions.classList.remove('d-none');
    });

    siConoceBtn.addEventListener('click', function () {
        loConoceOptions.classList.add('d-none');
        siConoceOptions.classList.remove('d-none');
    });

    noConoceBtn.addEventListener('click', function () {
        loConoceOptions.classList.add('d-none');
        noConoceView.classList.remove('d-none');
    });

    dejarRecadoBtn.addEventListener('click', function () {
        siConoceOptions.classList.add('d-none');
        dejarRecadoView.classList.remove('d-none');
    });

    otroTelefonoBtn.addEventListener('click', function () {
        siConoceOptions.classList.add('d-none');
        agendarView.classList.remove('d-none');
    });

    noTieneTiempoBtn.addEventListener('click', function () {
        contactOptions.classList.add('d-none');
        agendarView.classList.remove('d-none');
    });

    necesitaPensarlo.addEventListener('click', function () {
        insuranceView.classList.add('d-none');
        agendarView.classList.remove('d-none');
    });

    otraPersonaBtn.addEventListener('click', function () {
        contactOptions.classList.add('d-none');
        otraPersonaOptions.classList.remove('d-none');
    });

    noViveAhiBtn.addEventListener('click', function () {
        otraPersonaOptions.classList.add('d-none');
        loConoceOptions.classList.remove('d-none');
    });

    titularBtn.addEventListener('click', function () {
        mainView.classList.add('d-none');
        insuranceView.classList.remove('d-none');
    });

    acceptBtn.addEventListener('click', function () {
        insuranceView.classList.add('d-none');
        additionalInfoView.classList.remove('d-none');
    });

    rejectBtn.addEventListener('click', function () {
        insuranceView.classList.add('d-none');
        rejectionOptions.classList.remove('d-none');
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

    continuarBtn.addEventListener('click', showConfirmationView);

    function showConfirmationView() {
        additionalInfoView.classList.add('d-none');
        confirmationView.classList.remove('d-none');
    }

    finishRejectionBtn.addEventListener('click', function () {
        window.location.href = window.location.href;
    });

    // Evento para regresar a la página inicial
    document.getElementById('inicio').addEventListener('click', function () {
        // Recargar la página manteniendo la URL y sus parámetros
        window.location.href = window.location.href;
    });
});
