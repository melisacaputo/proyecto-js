$(document).ready(function () {
    $(".accordion-header").click(function () {
        //si el acordion se encuentra abierto, la funcion lo cierra y modifica las clases
        if ($(this).next(".accordion-body").hasClass("active")) {
            $(this).next(".accordion-body").removeClass("active").slideUp();
            $(this).children("span").removeClass("fa-minus").addClass("fa-plus");
        //si el acordion se encuentra cerrado, la funcion lo abre y modifica las clases
        } else {
            $(".accordion .accordion-body").removeClass("active").slideUp();
            $(".accordion .accordion-header span").removeClass("fa-minus").addClass("fa-plus");
            $(this).next(".accordion-body").addClass("active").slideDown();
            $(this).children("span").removeClass("fa-plus").addClass("fa-minus");
        };
    });
});

//no se por que cuando carga por primera vez hay que hacer dos clics para que funcione, despues anda bien