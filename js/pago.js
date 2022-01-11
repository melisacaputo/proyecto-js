$(document).ready(function () {
    //subtotal que viene del archivo carrito.js
    $("#subtotal").text(calcularTotalCarrito());
    //evento para que se modifique el html al cambiar el select sin que haya un error primero
    $("#metodo-envio").on("change", calcularEnvio);
    $("#metodo-pago").on("change", validarPago);
    //funcion para validar el form 
    validarFormulario();
});

//funcion para validar todos los campos del formulario antes de su envio
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
        } else if ($("#metodo-envio").val() == "defecto") {
            e.preventDefault();
            $("#error-envio").fadeIn();
            //como es un select inclui un change que depende de otra funcion y modifica el html
            $("#metodo-envio").on("change", calcularEnvio);
        } else if ($("#metodo-pago").val() == "defecto") {
            e.preventDefault();
            $("#error-pago").fadeIn();
            //como es un select inclui un change que depende de otra funcion y modifica el html
            $("#metodo-pago").on("change", validarPago);
        } else if ($("#metodo-pago").val() == "debito" || $("#metodo-pago").val() == "credito") {
            //si el medio de pago es tarjeta se suman dos validaciones mas
            e.preventDefault();
            if (($("#num-tarjeta").val() == "") || ($("#num-tarjeta").val().length != 16)) {
                e.preventDefault();
                $("#error-numtarj").fadeIn();
                $("#num-tarjeta").change(function () {
                    $("#error-numtarj").fadeOut();
                });
            } else if (($("#cod-seguridad").val() == "") || ($("#cod-seguridad").val().length != 3)) {
                e.preventDefault();
                $("#error-codseg").fadeIn();
                $("#cod-seguridad").change(function () {
                    $("#error-codseg").fadeOut();
                });
            } else {
                //este else es para cuando el usuario elige tarjeta
                e.preventDefault();

                //una vez que se validan los datos los guardo en un array
                let datosCompra = [];
                datosCompra.push($("#nombre").val());
                datosCompra.push($("#email").val());
                datosCompra.push($("#telefono").val());
                datosCompra.push($("#direccion").val());
                datosCompra.push($("#cod-postal").val());
                datosCompra.push($("#provincia").val());
                datosCompra.push($("#localidad").val());
                datosCompra.push($("#metodo-envio").val());
                datosCompra.push($("#metodo-pago").val());
                datosCompra.push($("#num-tarjeta").val());
                datosCompra.push($("#cod-seguridad").val());

                //convierto el array a formato JSON para poder subirlo a la API
                let datosCompraJSON = JSON.stringify(datosCompra);
                enviarDatos(datosCompraJSON);

                //muestro un alert para que el usuario vea que la compra fue exitosa
                Swal.fire({
                    icon: 'success',
                    title: '¡Compra confirmada!',
                    text: 'Vas a recibir un mail de confirmación con el detalle de la compra en tu casilla',
                    confirmButtonColor: "#444444"
                });

                //vacio el carrito
                vaciarCarrito();

                //reseteo los campos de entrada
                $(".entrada-pago").val('');
                $("#metodo-envio option[value='defecto']").attr("selected", true);
                $("#metodo-pago option[value='defecto']").attr("selected", true);
            };
        } else {
            //este else es para cuando el usuario elige efectivo
            e.preventDefault();

            //una vez que se validan los datos los guardo en un array
            let datosCompra = [];
            datosCompra.push($("#nombre").val());
            datosCompra.push($("#email").val());
            datosCompra.push($("#telefono").val());
            datosCompra.push($("#direccion").val());
            datosCompra.push($("#cod-postal").val());
            datosCompra.push($("#provincia").val());
            datosCompra.push($("#localidad").val());
            datosCompra.push($("#metodo-envio").val());
            datosCompra.push($("#metodo-pago").val());

            //convierto el array a formato JSON para poder subirlo a la API
            let datosCompraJSON = JSON.stringify(datosCompra);
            enviarDatos(datosCompraJSON);

            //muestro un alert para que el usuario vea que la compra fue exitosa
            Swal.fire({
                icon: 'success',
                title: '¡Compra confirmada!',
                text: 'Vas a recibir un mail de confirmación con el detalle de la compra en tu casilla',
                confirmButtonColor: "#444444"
            });

            //vacio el carrito
            vaciarCarrito();

            //reseteo los campos de entrada
            $(".entrada-pago").val('');
            $("#metodo-envio option[value='defecto']").attr("selected", true);
            $("#metodo-pago option[value='defecto']").attr("selected", true);
        };
    });
};

//funcion que calcula el costo de envio en funcion de la opcion seleccionada por el usuario
function calcularEnvio() {
    let envio;
    let metodoEnvio = $("#metodo-envio").val();
    if (metodoEnvio == "caba") {
        envio = 800;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
    };
    if (metodoEnvio == "gba") {
        envio = 1100;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
    };
    if (metodoEnvio == "interior") {
        envio = 2500;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
    };
    if (metodoEnvio == "retiro") {
        envio = 0;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
    };
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
    let metodoPago = $("#metodo-pago").val();
    if (metodoPago == "debito" || metodoPago == "credito") {
        $(".pago-tarjeta").fadeIn();
        $("#error-pago").fadeOut();
    };
    if (metodoPago == "efectivo") {
        $(".pago-tarjeta").fadeOut();
        $("#error-pago").fadeOut();
        $("#error-numtarj").fadeOut();
        $("#error-codseg").fadeOut();
    };
};

//funcion que resetea todos los valores una vez finalizada la compra 
function vaciarCarrito() {
    $("#gastoTotal").text("Total: $0");
    $("#cantidad-compra").text("0");
    $(".tabla-carrito").remove();
    localStorage.clear();
    carrito = [];
}

//funcion para simular la subida de los datos a una API
function enviarDatos(datos) {
    const URLPOST = "https://jsonplaceholder.typicode.com/posts";

    $.post(URLPOST, datos).done(function (respuesta, estado) {
        console.log(respuesta);
        console.log(estado);
    })
}