$(function() {
    
    function cargarTalleres() {
        $.get("index.php", { option: "talleres_json" }, function(data) {
            let tbody = $("#talleres-body");
            tbody.empty();

            for (let i = 0; i < data.length; i++) {
                let t = data[i];
                tbody.append("<tr>" +
                    "<td>" + t.id + "</td>" +
                    "<td>" + t.nombre + "</td>" +
                    "<td>" + t.cupo_maximo + "</td>" +
                    "<td><button class='btn-solicitar' data-id='" + t.id + "'>Solicitar</button></td>" +
                "</tr>");
            }
        }, "json");
    }

    $(document).on("click", ".btn-solicitar", function() {
        let id = $(this).data("id");
        let boton = $(this);
        let mensajeGlobal = $("#mensajeGlobal");
        
        $.post("index.php", { taller_id: id, option: "solicitar" }, function(r) {
            if (r.success) {
                mensajeGlobal.css("background-color", "#d4edda").css("color", "#155724").text("✓ Solicitud enviada correctamente").show();
                boton.prop("disabled", true).text("Solicitado");
                cargarTalleres();
            } else {
                mensajeGlobal.css("background-color", "#f8d7da").css("color", "#721c24").text("✗ " + r.error).show();
            }
            setTimeout(function() { mensajeGlobal.fadeOut(); }, 3000);
        }, "json");
    });

    cargarTalleres();
});