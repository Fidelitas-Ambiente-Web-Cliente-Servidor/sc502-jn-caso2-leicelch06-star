$(function() {

    function mostrarMensaje(texto, tipo) {
        let mensaje = $("#mensaje");
        
        mensaje.removeClass("ok error");
        
   
        if (tipo === "ok") {
            mensaje.addClass("ok");
        } else {
            mensaje.addClass("error");
        }
        
        mensaje.text(texto).fadeIn(300);
        
        
        setTimeout(function() {
            mensaje.fadeOut(500);
        }, 3000);
    }

    $(document).on("click", ".btn-aprobar", function() {
        let id = $(this).data("id");
        let fila = $(this).closest("tr");
        let boton = $(this);
        
        boton.prop("disabled", true).text("Procesando...");
        
        $.ajax({
            url: "index.php",
            method: "POST",
            data: {
                option: "aprobar",
                id_solicitud: id
            },
            dataType: "json",
            success: function(data) {
                if (data.success) {
                    mostrarMensaje("✓ Solicitud aprobada correctamente", "ok");
                    fila.fadeOut(300, function() {
                        fila.remove();
                    });
                } else {
                    mostrarMensaje("✗ " + (data.error || "Error al aprobar"), "error");
                    boton.prop("disabled", false).text("Aprobar");
                }
            },
            error: function() {
                mostrarMensaje("✗ Error de conexión", "error");
                boton.prop("disabled", false).text("Aprobar");
            }
        });
    });

    $(document).on("click", ".btn-rechazar", function() {
        let id = $(this).data("id");
        let fila = $(this).closest("tr");
        let boton = $(this);
        
        boton.prop("disabled", true).text("Procesando...");
        
        $.ajax({
            url: "index.php",
            method: "POST",
            data: {
                option: "rechazar",
                id_solicitud: id
            },
            dataType: "json",
            success: function(data) {
                if (data.success) {
                    mostrarMensaje("✓ Solicitud rechazada correctamente", "ok");
                    fila.fadeOut(300, function() {
                        fila.remove();
                    });
                } else {
                    mostrarMensaje("✗ " + (data.error || "Error al rechazar"), "error");
                    boton.prop("disabled", false).text("Rechazar");
                }
            },
            error: function() {
                mostrarMensaje("✗ Error de conexión", "error");
                boton.prop("disabled", false).text("Rechazar");
            }
        });
    });

});