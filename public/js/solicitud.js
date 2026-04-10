$(function() {
    function cargar() {
        $.get("index.php", { option: "solicitudes_json" }, function(data) {
            console.log("Datos recibidos:", data);
            $("#solicitudes-body").empty();
            
            if (!data || data.length === 0) {
                $("#solicitudes-body").append("<td><td colspan='6'>No hay solicitudes pendientes</td></tr>");
                return;
            }
            
            for (let i = 0; i < data.length; i++) {
                let s = data[i];
                $("#solicitudes-body").append("<tr>" +
                    "<td>" + (s.id || "") + "</td>" +
                    "<td>" + (s.taller_nombre || s.nombre || "") + "</td>" +
                    "<td>" + (s.username || s.solicitante || "") + "</td>" +
                    "<td>" + (s.usuario_id || s.id_usuario || "") + "</td>" +
                    "<td>" + (s.fecha_solicitud || s.fecha || "") + "</td>" +
                    "<td><button class='btn-aprobar' data-id='" + s.id + "'>Aprobar</button> " +
                    "<button class='btn-rechazar' data-id='" + s.id + "'>Rechazar</button></td>" +
                "</tr>");
            }
        }, "json").fail(function(error) {
            console.log("Error en petición:", error);
            $("#solicitudes-body").append("<td><td colspan='6'>Error al cargar</td></tr>");
        });
    }

    $(document).on("click", ".btn-aprobar", function() {
        let id = $(this).data("id");
        let boton = $(this);
        let mensaje = $("#mensajeAdmin");
        
        if (!mensaje.length) {
            console.log("No existe el div mensajeAdmin");
            return;
        }
        
        $.post("index.php", { id_solicitud: id, option: "aprobar" }, function(r) {
            if (r.success) {
                mensaje.css("background-color", "#d4edda").css("color", "#155724").text("Solicitud aprobada").show();
                boton.closest("tr").remove();
                cargar();
            } else {
                mensaje.css("background-color", "#f8d7da").css("color", "#721c24").text("Error: " + (r.error || "Desconocido")).show();
            }
            setTimeout(function() { mensaje.fadeOut(); }, 3000);
        }, "json");
    });

    $(document).on("click", ".btn-rechazar", function() {
        let id = $(this).data("id");
        let boton = $(this);
        let mensaje = $("#mensajeAdmin");
        
        $.post("index.php", { id_solicitud: id, option: "rechazar" }, function(r) {
            if (r.success) {
                mensaje.css("background-color", "#d4edda").css("color", "#155724").text("Solicitud rechazada").show();
                boton.closest("tr").remove();
                cargar();
            } else {
                mensaje.css("background-color", "#f8d7da").css("color", "#721c24").text("Error al rechazar").show();
            }
            setTimeout(function() { mensaje.fadeOut(); }, 3000);
        }, "json");
    });

    cargar();
});