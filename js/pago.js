//dentro del document ready agrego todas las funciones de validacion y las partes que necesitan renderizarse
$(document).ready(function () {
    $("#subtotal").text(calcularTotalCarrito());
    $("#metodo-envio").on("change", calcularEnvio);
    calcularEnvio();
    $("#metodo-pago").on("change", validarPago);
    validarPago();
    validarFormulario();
});

//funcion que calcula el costo de envio en funcion de la opcion seleccionada por el usuario
function calcularEnvio() {
    let envio;
    let metodoEnvio = $("#metodo-envio").val();
    if (metodoEnvio == "caba") {
        envio = 800;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
        $("#form-carrito").submit(function () {
            $("#error-envio").hide();
            $("#total").text(calcularTotalCompra(envio));
        });
    };
    if (metodoEnvio == "gba") {
        envio = 1100;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
        $("#form-carrito").submit(function () {
            $("#error-envio").hide();
            $("#total").text(calcularTotalCompra(envio));
        });
    };
    if (metodoEnvio == "interior") {
        envio = 2500;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
        $("#form-carrito").submit(function () {
            $("#error-envio").hide();
            $("#total").text(calcularTotalCompra(envio));
        });
    };
    if (metodoEnvio == "retiro") {
        envio = 0;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
        $("#form-carrito").submit(function () {
            $("#error-envio").hide();
            $("#total").text(calcularTotalCompra(envio));
        });
    };
    if (metodoEnvio == "defecto") {
        $("#form-carrito").submit(function (e) {
            e.preventDefault();
            $("#error-envio").fadeIn();
            $("#total").text("");
            $("#total").text(calcularTotalCompra(envio));
        });
    }
};

//funcion para calcular el total de la compra sumando el total del carrito y el envio
function calcularTotalCompra(envio) {
    let total = 0;
    for (const producto of carrito) {
        total += producto.precio * producto.cantidad;
    }
    return total + envio;
};

//funcion para validar la opcion elegida como metodo de pago
function validarPago() {
    if ($("#metodo-pago").val() == "debito" || $("#metodo-pago").val() == "credito") {
        $(".pago-tarjeta").show();
        $("#error-pago").fadeOut();
        $("#form-carrito").submit(function (e) {
            validarTarjeta(e);
            $("#error-pago").hide();
        });
    };
    if ($("#metodo-pago").val() == "efectivo") {
        $("#error-pago").fadeOut();
        $(".pago-tarjeta").hide();
        $("#error-numtarj").hide();
        $("#error-codseg").hide();
        $("#form-carrito").submit(function () {
            $("#error-pago").hide();
            $("#error-numtarj").hide();
            $("#error-codseg").hide();
        });
    };
    if ($("#metodo-pago").val() == "defecto") {
        $("#form-carrito").submit(function (e) {
            e.preventDefault();
            $("#error-pago").fadeIn();
        });

    };
};

//funcion para validar los datos de la tarjeta
function validarTarjeta(e) {
    if (($("#num-tarjeta").val() == "") || ($("#num-tarjeta").val().length != 16)) {
        e.preventDefault();
        $("#error-numtarj").fadeIn();
        $("#num-tarjeta").change(function () {
            $("#error-numtarj").fadeOut();
        });
    };
    if (($("#cod-seguridad").val() == "") || ($("#cod-seguridad").val().length != 3)) {
        e.preventDefault();
        $("#error-codseg").fadeIn();
        $("#cod-seguridad").change(function () {
            $("#error-codseg").fadeOut();
        });
    };
};

//funcion para validar los campos del formulario antes de su envio
function validarFormulario() {
    $("#form-carrito").submit(function (e) {
        if ($("#nombre").val() == "") {
            e.preventDefault();
            $("#error-nombre").fadeIn();
            $("#nombre").change(function () {
                $("#error-nombre").fadeOut();
            });
        } else if ($("#email").val() == "") {
            e.preventDefault();
            $("#error-email").fadeIn();
            $("#email").change(function () {
                $("#error-email").fadeOut();
            });
        } else if ($("#telefono").val() == "") {
            e.preventDefault();
            $("#error-tel").fadeIn();
            $("#telefono").change(function () {
                $("#error-tel").fadeOut();
            });
        } else if ($("#direccion").val() == "") {
            e.preventDefault();
            $("#error-direccion").fadeIn();
            $("#direccion").change(function () {
                $("#error-direccion").fadeOut();
            });
        } else if (($("#cod-postal").val() == "") || ($("#cod-postal").val().length != 4)) {
            e.preventDefault();
            $("#error-codigopostal").fadeIn();
            $("#cod-postal").change(function () {
                $("#error-codigopostal").fadeOut();
            });
        } else if ($("#provincia").val() == "") {
            e.preventDefault();
            $("#error-provincia").fadeIn();
            $("#provincia").change(function () {
                $("#error-provincia").fadeOut();
            });
        } else if ($("#localidad").val() == "") {
            e.preventDefault();
            $("#error-localidad").fadeIn();
            $("#localidad").change(function () {
                $("#error-localidad").fadeOut();
            });
        } else {
            $("#btn-finalizar").on("click", confirmarCompra);
        }
    });
};

//funcion para que se dispare un sweet alert al enviar el formulario cuando esten todos los datos correctos
function confirmarCompra() {
    Swal.fire({
        title: '¿Seguro que queres finalizar tu compra?',
        showCancelButton: true,
        confirmButtonColor: '#008f39',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Compra confirmada',
                '¡Que lo disfrutes!',
                'success'
            )
            vaciarCarrito();
            $("#subtotal").text("");
        };
    });;
};