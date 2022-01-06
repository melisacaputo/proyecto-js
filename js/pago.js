//evento al boton finalizar compra para que el usuario confirme su compra
$(document).ready(function () {
    $("#subtotal").text(calcularTotalCarrito());

    $("#metodo-envio option[value='pordefecto']").attr("selected", true);
    $("#metodo-envio").on("change", calcularEnvio);
  
    $("#total").text(calcularTotalCompra());
    
//no puedo hacer que cuando ingrese bien el valor se vaya el mensaje de error
    $("#form-carrito").submit(function (e) {
        if ($("#nombre").val() == "") {
            e.preventDefault();
            $("#error-nombre").fadeIn();
        };
        if ($("#email").val() == "") {
            e.preventDefault();
            $("#error-email").fadeIn();
        };
        if ($("#telefono").val() == "") {
            e.preventDefault();
            $("#error-tel").fadeIn();
        };
        if ($("#direccion").val() == "") {
            e.preventDefault();
            $("#error-direccion").fadeIn();
        };
        if ($("#cod-postal").val() == "") {
            e.preventDefault();
            $("#error-codigopostal").fadeIn();
        };
        if ($("#provincia").val() == "") {
            e.preventDefault();
            $("#error-provincia").fadeIn();
        };
        if ($("#localidad").val() == "") {
            e.preventDefault();
            $("#error-localidad").fadeIn();
        };
    });

});


let envio;
let totalCompra;

function calcularEnvio() {
    let metodoEnvio = $("#metodo-envio").val();
    if (metodoEnvio == "caba") {
        envio = 800;
        $("#envio").text(envio);
    } else if (metodoEnvio == "gba") {
        envio = 1100;
        $("#envio").text(envio);
    } else if (metodoEnvio == "interior") {
        envio = 2500;
        $("#envio").text(envio);
    } else if (metodoEnvio == "retiro") {
        envio = 0;
        $("#envio").text(envio);
    } else {
        $("#error-envio").fadeIn();
    }
};

//no puedo hacer que la funcion calcularEnvio retorne nuemeros
//se me ocurrio inicializar variables con los costos de envio fuera de la funcion
function calcularTotalCompra () {
    return $("#subtotal").html() + $("#envio").html();
}




/* $("#btn-finalizar").on('click', function () {
    //uso sweet alert para que el usuario confirme su compra, cuando toca si se vacia el carrito
    Swal.fire({
        title: '¿Seguro que queres finalizar tu compra?',
        text: `Total a abonar: $${calcularTotalCarrito()}`,
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
        }
    })
}); */