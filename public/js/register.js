$(function() {
    $("#formRegister").on("submit", function(event) {
        event.preventDefault();
        
        let username = $("#username").val();
        let password = $("#password").val();
        
        if (username === "" || password === "") {
            alert("Debe completar todos los campos");
            return;
        }
        
        $.ajax({
            url: "index.php",
            type: "POST",
            data: {
                username: username,
                password: password,
                option: "register"
            },
            dataType: "json",
            success: function(response) {
                if (response.response === "00") {
                    alert("Registro exitoso");
                    window.location.href = "index.php?page=login";
                } else {
                    $("#mensaje").text(response.message).css("color", "red").show();
                }
            },
            error: function() {
                $("#mensaje").text("Error de conexión").css("color", "red").show();
            }
        });
    });
});