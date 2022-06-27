$(document).ready(function () {
    listar();
});
function listar() {
    $.ajax({
        url: "/producto/all",
        type: 'GET',
        success: function (x) {
            $("#tablita tbody tr").remove();
            x.forEach((item, index, array) => {
                $("#tablita").append(
                        "<tr><td>" + item.id + "</td><td>" + item.nombre
                        + "</td><td>" + item.precio + "</td><td>" + item.cantidad + "</td><td><a href='#' onclick='editar("
                        + item.id + ")'><i class='fa-solid fa-pen-to-square yelow'></i></a></td><td><a href='#' onclick='eliminar(" + item.id + ")'><i class='fa-solid fa-trash-can red'></i></a></td></tr>");

            });
        }
    });
}
function editar(id) {
    $.ajax({
        url: "/producto/" + id,
        type: 'GET',
        success: function (w) {
            $("#editar_nombre").val(w.nombre);
            $("#editar_precio").val(w.precio);
            $("#editar_cantidad").val(w.cantidad);
            $("#editar_id").val(w.id);
        }
    });
    $("#editarModal").modal('show');
}
function eliminar(id) {
    bootbox.confirm({
        message: "Realmente desea Eliminar?",
        buttons: {
            confirm: {
                label: 'SI',
                className: 'btn-success'
            },
            cancel: {
                label: 'NO',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "/producto/" + id,
                    type: 'DELETE',
                    success: function (w) {
                        bootbox.alert({
                            message: "Registro eliminado correctamente...!",
                            callback: function () {
                                console.log('This was logged in the callback!');
                            }
                        });
                        listar();
                    }
                });
            } else {
                bootbox.alert({
                    message: "Registro no eliminado!",
                    size: 'small'
                });
            }
        }
    });
}
let imagen= new Object();
$("#imagen").change(function (e) {
    imagen = e.target.files[0].name;

});

$("#guardar").click(function () {
    let nombre = $("#nombre").val();
    let precio = $("#precio").val();
    let cantidad = $("#cantidad").val();
    
    //alert(foto)
     $.ajax({
     url: "/producto/add",
     type: 'POST',
     contentType: "application/json; charset=utf-8",
     data: JSON.stringify({'nombre': nombre, 'precio': precio, 'cantidad':cantidad, 'imagen':imagen}),
     cache: false,
     success: function (w) {
     bootbox.alert({
     message: "Registro guardado correctamente...!",
     callback: function () {
     console.log('This was logged in the callback!');
     }
     });
     limpiar();
     listar();
     }
     });
    $("#exampleModal").modal('hide');
});
function limpiar() {
    $("#nombre").val("");
    $("#precio").val("");
    $("#cantidad").val("");
}
$("#modificar").click(function () {
    var nombre = $("#editar_nombre").val();
    var precio = $("#editar_precio").val();
    var cantidad = $("#editar_cantidad").val();
    var id = $("#editar_id").val();
    bootbox.confirm({
        message: "Realmente desea Modificar?",
        buttons: {
            confirm: {
                label: 'SI',
                className: 'btn-success'
            },
            cancel: {
                label: 'NO',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "/producto/edit",
                    type: 'PUT',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({'id': id, 'nombre': nombre, 'precio': precio, 'cantidad': cantidad}),
                    cache: false,
                    success: function (w) {
                        bootbox.alert({
                            message: "Registro Modificado correctamente...!",
                            callback: function () {
                                console.log('This was logged in the callback!');
                            }
                        });
                        limpiar();
                        listar();
                    }
                });
                $("#editarModal").modal('hide');
            } else {
                bootbox.alert({
                    message: "Registro no Modificado!",
                    size: 'small'
                });
            }
        }
    });
});
