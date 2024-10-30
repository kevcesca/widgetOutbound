class scriptsOutbound extends HTMLElement {
    static _WIDGETNAME = 'scripts-outbound';
    static _WIDGTEURL = 'https://127.0.0.1/widgets/';

    constructor() {
        super();
        this.dataFromMessageEvent = {};
        this.dataFromInteractionEvent = {};
        this.queue = "Nulo";
        this.nombreAgente = "Nulo";
        this.motivoTermino = "";  
        this.callEnded = false;
    }

    connectedCallback() {
        this.classList.add('neo-widget');
        this.classList.add(`widget--${scriptsOutbound._WIDGETNAME}`);
        this.style.overflowX = 'hidden';

        fetch(`${scriptsOutbound._WIDGTEURL}${scriptsOutbound._WIDGETNAME}/${scriptsOutbound._WIDGETNAME}.html`)
            .then(data => data.text())
            .then(html => {
                this.innerHTML += `<link rel="stylesheet" href="${scriptsOutbound._WIDGTEURL}${scriptsOutbound._WIDGETNAME}/${scriptsOutbound._WIDGETNAME}.css">`;
                this.innerHTML += html;
                this.initWidgetCode();
            });

        // Inicializamos la API con un máximo de espera de 5 segundos
        this.initializeAPI();
    }


    initializeAPI() {
        let attempts = 0;
        const maxAttempts = 5; // 5 segundos de espera máximo

        const interval = setInterval(() => {
            let interaccionPreview = window.interactionID;

            if (interaccionPreview) {
                // Si encontramos un interactionID, lo asignamos y configuramos la API
                console.log("ID de interacción encontrado:", interaccionPreview);
                this.interactionId = this.getAttribute("interactionid") || interaccionPreview;
                console.log("ID de interacción encontrado:", this.interactionId);
                this.workRequestId = this.getAttribute("workrequestid") || interaccionPreview;
                console.log("ID de workRequest encontrado:", this.workRequestId);
                this.api = window.WS.widgetAPI(interaccionPreview);

                console.log("API inicializado:", this.api);

                let interactionData = this.api.getInteractionData();
                console.log("Datos de interacción:", interactionData);

                this.queue = interactionData.topic;
                console.log("Topic:", this.queue);
                this.nombreAgente = this.api.getClientDetails().displayName
                console.log("Nombre Agente:", this.nombreAgente);

                this.api.onDataEvent('onMessageEvent', (data) => {
                    if (data.widgetDestino == "scripts-outbound") {
                        console.log(`[${scriptsOutbound._WIDGETNAME}] Mensaje recibido desde otro widget:`, data);
                    }
                    if (data.widgetDestino == "scripts-outbound" && !data.stateCall) {
                        console.log("Se ha recibido un cliente");
                        window.infoCliente = data;
                        if (data.widgetDestino == "scripts-outbound") {
                            console.log(`[${scriptsOutbound._WIDGETNAME}] Mensaje recibido desde otro widget:`, data);
                        }
                        if (data.widgetDestino == "scripts-outbound" && !data.stateCall) {
                            console.log("Se ha recibido un cliente");
                            window.infoCliente = data;
                            window.infoCliente.nombreAgente = this.nombreAgente;
                            window.infoCliente.queue = this.queue; //para entorno prod
                            // window.infoCliente.queue = 'CTAS LN Sears'; // Solo para entorno de pruebas
                        }
                    }

                    // Si se manda este mensaje es porque la llamada terminó
                    if (data.widgetDestino == "scripts-outbound" && data.stateCall == "AWC") {
                        this.callEnded = true; // Marcar que la llamada ha terminado
                        this.api.sendNotification('Por favor termina el formulario', 'warning');
                        this.sendDispCode(); // Enviar automáticamente el dispCode al finalizar la llamada
                    }
                });

                // // Mensaje de prueba
                // this.api.sendMessage({ widgetDestino: 'preview', dispCode: "AGEN" });
                // Escuchar mensajes del iframe

                // Detenemos el intervalo una vez inicializado
                clearInterval(interval);

            } else {
                attempts++;
                console.log("Esperando por interactionID... intento:", attempts);

                if (attempts >= maxAttempts) {
                    console.error("No se encontró le interactionID depues de 5 segundos.");
                    clearInterval(interval);
                }
            }
        }, 2000); // Intenta cada 2 segundos
    }

    // Método para enviar el dispCode en cualquier momento después de la terminación
    sendDispCode() {
        if (this.callEnded && this.motivoTermino) {  // Verifica que la llamada haya terminado
            this.api.sendMessage({ widgetDestino: 'preview', dispCode: this.motivoTermino });
            console.log("DispCode enviado:", this.motivoTermino);
        } else if (!this.callEnded) {
            console.warn("La llamada aún no ha terminado, el dispCode no se puede enviar todavía.");
        }
    }

    setMotivoTermino(motivo) {
        this.motivoTermino = motivo;
        console.log("Motivo de terminación actualizado:", this.motivoTermino);
        this.sendDispCode();
    }

    initWidgetCode() {
        const $container = $(this);

        const url = `https://127.0.0.1/widgets/scripts-outbound/index.html`;

        const iframe = $container.find('#SCRIPTSOUT-IFRAME');
        if (iframe.length) {
            // Establecemos la URL del iframe
            iframe.attr('src', url);
            console.log('URL generada para el iframe:', url);

            // Escuchamos el evento 'load' para asegurar que el iframe esté cargado antes de enviar los datos sears
            iframe.on('load', () => {
                // Verificamos que `window.infoCliente` esté disponible
                if (window.infoCliente) {
                    // Enviamos `infoCliente` al iframe usando postMessage
                    iframe[0].contentWindow.postMessage(window.infoCliente, 'https://127.0.0.1');
                    console.log("Datos enviados al iframe mediante postMessage:", window.infoCliente);
                } else {
                    console.warn("infoCliente no está definido.");
                }
            });
        } else {
            console.error("No se encontró el iframe con el ID 'SCRIPTS-IFRAME'");
        }

        console.log("Widget inicializado");

        window.addEventListener('message', (event) => {
            if (event.data && event.data.motivo) {
                this.setMotivoTermino(event.data.motivo);
            }
        });
    }
}

customElements.define(scriptsOutbound._WIDGETNAME, scriptsOutbound);
