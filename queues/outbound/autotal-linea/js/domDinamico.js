document.addEventListener('DOMContentLoaded', function () {
    const btnCliente = document.getElementById('btnCliente');
    const btnNoEncuentro = document.getElementById('btnNoEncuentro');
    const btnNoContacto = document.getElementById('btnNoContacto');
    const communicationButtons = document.getElementById('communicationButtons');
    const clientMessage = document.getElementById('clientMessage');
    const noContactoMessage = document.getElementById('noContactoMessage');
    const noContactoOptions = document.getElementById('noContactoOptions');
    const btnSiLeInteresa = document.getElementById('btnSiLeInteresa');
    const btnContratar = document.getElementById('btnContratar');
    const btnNoInteresa = document.getElementById('btnNoInteresa');
    const btnNoInteresa2 = document.getElementById('btnNoInteresa2');
    const btnNoInteresa3 = document.getElementById('btnNoInteresa3');
    const btnFinalizar = document.getElementById('btnFinalizar');
    const btnFinalizarNoInteresa = document.getElementById('btnFinalizarNoInteresa');
    const btnFinalizarNoContacto = document.getElementById('btnFinalizarNoContacto');
    const initialView = document.getElementById('initialView');
    const confirmationView = document.getElementById('confirmationView');
    const acceptanceConfirmation = document.getElementById('acceptanceConfirmation');
    const noInteresaView = document.getElementById('noInteresaView');

    btnCliente.addEventListener('click', function () {
        communicationButtons.classList.add('d-none');
        clientMessage.classList.remove('d-none');
    });

    btnNoEncuentro.addEventListener('click', function () {
        communicationButtons.classList.add('d-none');
        noContactoMessage.classList.remove('d-none');
    });

    btnNoContacto.addEventListener('click', function () {
        communicationButtons.classList.add('d-none');
        noContactoOptions.classList.remove('d-none');
    });

    btnSiLeInteresa.addEventListener('click', function () {
        initialView.classList.add('d-none');
        confirmationView.classList.remove('d-none');
    });

    btnContratar.addEventListener('click', function () {
        acceptanceConfirmation.classList.remove('d-none');
    });

    btnNoInteresa.addEventListener('click', function () {
        confirmationView.classList.add('d-none');
        noInteresaView.classList.remove('d-none');
    });

    btnNoInteresa2.addEventListener('click', function () {
        noContactoMessage.classList.add('d-none');
        noInteresaView.classList.remove('d-none');
    });

    btnNoInteresa3.addEventListener('click', function () {
        clientMessage.classList.add('d-none');
        noInteresaView.classList.remove('d-none');
    });

    // Evento para regresar a la página inicial
    document.getElementById('inicio').addEventListener('click', function () {
        // Recargar la página manteniendo la URL y sus parámetros
        window.location.href = window.location.href;
    });
});