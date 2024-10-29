document.getElementById('contactoExitoso').addEventListener('click', function () {
    document.getElementById('seccion1').classList.add('hidden');
    document.getElementById('seccion2').classList.remove('hidden');
});

document.getElementById('contactoNoExitoso').addEventListener('click', function () {
    document.getElementById('seccion1').classList.add('hidden');
    document.getElementById('seccionNoExitoso').classList.remove('hidden');
});

document.getElementById('siTieneTarjeta').addEventListener('click', function () {
    document.getElementById('seccion2').classList.add('hidden');
    document.getElementById('seccion3').classList.remove('hidden');
});

document.getElementById('continuar').addEventListener('click', function () {
    document.getElementById('seccion3').classList.add('hidden');
    document.getElementById('seccion4').classList.remove('hidden');
});

document.getElementById('siguiente').addEventListener('click', function () {
    document.getElementById('seccion4').classList.add('hidden');
    document.getElementById('seccionFinal').classList.remove('hidden');
});

document.getElementById('finalizarLlamada').addEventListener('click', function () {
    var selectedCode = document.getElementById('codigoRespuesta').value;
    document.getElementById('selectedCode').textContent = selectedCode;
    var modalElement = document.getElementById('confirmationModal');
    var modal = new bootstrap.Modal(modalElement);
    modalElement.style.display = 'block';
    modal.show();
});

// Listener para el modal
document.getElementById('confirmFinalize').addEventListener('click', function () {
    // Reiniciar el widget
    document.querySelectorAll('.container > div').forEach(function (el) {
        el.classList.add('hidden');
    });
    document.getElementById('seccion1').classList.remove('hidden');
    // Esconder el modal
    var modal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
    modal.hide();
});

document.getElementById('confirmationModal').addEventListener('hidden.bs.modal', function () {
    this.style.display = 'none';
});

document.getElementById('despedida').addEventListener('click', function () {
    document.getElementById('seccionNoExitoso').classList.add('hidden');
    document.getElementById('seccionDespedida').classList.remove('hidden');
});

document.getElementById('finalizarLlamadaDespedida').addEventListener('click', function () {
    // Reset to first section
    document.querySelectorAll('.container > div').forEach(function (el) {
        el.classList.add('hidden');
    });
    document.getElementById('seccion1').classList.remove('hidden');
});

document.getElementById('noTieneTarjeta').addEventListener('click', function () {
    document.getElementById('seccion2').classList.add('hidden');
    document.getElementById('seccionNoTieneTarjeta').classList.remove('hidden');
});

document.getElementById('despedidaNoTarjeta').addEventListener('click', function () {
    document.getElementById('seccionNoTieneTarjeta').classList.add('hidden');
    document.getElementById('seccionFinal').classList.remove('hidden');
});


// Evento para regresar a la página inicial
document.getElementById('inicio').addEventListener('click', function () {
    // Recargar la página manteniendo la URL y sus parámetros
    window.location.href = window.location.href;
});