"use strict";
document.addEventListener("DOMContentLoaded", iniciarPagina);

//TODO login sensillo (verificar si existe el cliente)
const url_inicio = '../pages/login.html';
const url_productos = '../pages/product.html';
const url_client = '../pages/client.html';
const url_cart = '../pages/cart.html';

function iniciarPagina() {
    cargar_pagina(url_inicio);

    document.getElementById("pag1").addEventListener('click', (e) => {
        cargar_pagina(url_inicio);
    });
    document.getElementById("pag2").addEventListener('click', (e) => {
        cargar_pagina(url_productos);
    });
    document.getElementById("pag3").addEventListener('click', (e) => {
        cargar_pagina(url_client);
    });

    document.getElementById("pag4").addEventListener('click', (e) => {
        cargar_pagina(url_cart);
    });

    function cargar_pagina(pagina) {
        let contenido = document.getElementById("contenido");

        fetch(pagina).then((response)=>{
            if(response.ok)
                return response.text();
            else
                contenido.innerHTML = "<h1>Error to Load</h1>";
        }).then((response)=>{

            contenido.innerHTML = "";
            contenido.innerHTML = response;
        }).catch((error) => {
            console.log(error);
        });

    }






    //     let contenido = document.getElementById("contenido");
    //     fetch(pagina)
    //         .then((respuesta) => {
    //             if (respuesta.ok)
    //                 return respuesta.text();
    //             else
    //                 contenido.innerHTML = "<h1>Error al cargar...</h1>";
    //         })
    //         .then((respuesta) =>{
    //             contenido.innerHTML = "";
    //             contenido.innerHTML = respuesta;

    //             if (pagina === url_productos) {
    //                 const URL = 'https://web-unicen.herokuapp.com/api/groups/006aranarosiello/stock/';

    //                 //Cargo automaticamente la tabla y despues se va actualizando cada 30 seg.
    //                 cargarTabla();
    //                 actualizarTabla();

    //                 //Les asigno a los botones un evento y llamo a las funciones.
    //                 let btn_agregar = document.getElementById("btnAdd");
    //                 btn_agregar.addEventListener("click", (e) => {
    //                     agregar();
    //                 });

    //                 let btn_buscar = document.getElementById("btnBuscar");
    //                 btn_buscar.addEventListener("click", (e) => {
    //                     buscar();
    //                 });

    //                 let btn_3r = document.getElementById("btn3");
    //                 btn_3r.addEventListener("click", (e) => {
    //                     agregar3();
    //                 });

    //                 //La funcion agregar capta el valor que hay en los inputs html y los guarda en el servidor.
    //                 function agregar() {
    //                     let contenedorcargar = document.getElementById("resultado_cargar");
    //                     let nombre = document.getElementById("producto").value;
    //                     let precio = document.getElementById("precio").value;

    //                     if (nombre.length === 0 || precio.length === 0) {
    //                         contenedorcargar.innerHTML = "Complete todos los campos";
    //                         contenedorcargar.classList.add("resaltado");
    //                         return;
    //                     }

    //                     let producto = {
    //                         "thing": {
    //                             "nombre": nombre,
    //                             "precio": precio,
    //                         }
    //                     };
    //                     fetch(URL, {
    //                         "method": "POST",
    //                         "mode": 'cors',
    //                         "headers": { "Content-Type": "application/json" },
    //                         "body": JSON.stringify(producto)
    //                     }).then(respuesta => {
    //                         if (!respuesta.ok) {
    //                             contenedorcargar.innerHTML = "No se pudo cargar producto";
    //                         }
    //                         return respuesta.json();
    //                     }).then(json => {
    //                         cargarTabla();

    //                     }).catch(err => {
    //                         console.log(err);
    //                     })
    //                 }

    //                 //Capturo la tabla, la vacio y la cargo de vuelta, recorriendo el servidor.
    //                 function cargarTabla() {
    //                     let tabla = document.getElementById("table");

    //                     fetch(URL, {
    //                             "method": "GET",
    //                             "mode": 'cors',
    //                         })
    //                         .then(respuesta => {
    //                             if (respuesta.ok)
    //                                 return respuesta.json();
    //                             else console.log("error al actualizar tabla");
    //                         })
    //                         .then(respuesta => {

    //                             tabla.innerHTML = " ";
    //                             //creo las filas y columnas, les imprimo los valores en las celdas y a la vez creo los botones
    //                             //editar y eliminar(que les asigno un evento y les mando la id de la informacion a las funciones).
    //                             for (let info of respuesta.stock) {
    //                                 crear_fila(info, tabla);
    //                             }
    //                         }).catch(err => {
    //                             console.log(err);
    //                         })
    //                 }

    //                  //La variable contador_edicion me va a permitir solo editar de a un producto a la vez.
    //                  let contador_edicion = 0;

    //                 function crear_fila(info, tabla) {
    //                     let row = tabla.insertRow(-1);
    //                     let cel1 = row.insertCell(0);
    //                     let cel2 = row.insertCell(1);
    //                     let cel3 = row.insertCell(2);
    //                     let cel4 = row.insertCell(3);

    //                     let botonEliminar = document.createElement("button");
    //                     botonEliminar.innerHTML = "Eliminar";
    //                     botonEliminar.addEventListener("click", e => {
    //                         contador_edicion = 0;
    //                         eliminar(info._id);
    //                     });
    //                     let botonEditar = document.createElement("button");
    //                     botonEditar.innerHTML = "Editar";
    //                     botonEditar.addEventListener("click", e => {
    //                         contador_edicion++;
    //                         editar(info._id, row);
    //                     });

    //                     cel1.innerHTML = info.thing.nombre;
    //                     cel2.innerHTML = "$" + info.thing.precio;
    //                     cel3.appendChild(botonEliminar);
    //                     cel4.appendChild(botonEditar);
    //                 }

    //                 function editar(id, row) {
    //                     let id_auxiliar = id; //evito que se vayan acumulando las id.
    //                     let contenedoreditar = document.getElementById("resultado_editar");

    //                     if (contador_edicion > 1) {
    //                         contenedoreditar.innerHTML = "Solo se puede editar un producto a la vez";
    //                         contenedoreditar.classList.add("resaltado");
    //                         return;
    //                     } else {
    //                         //oculto en el html los otros 2 formularios y hago visible el formulario para editar.
    //                         row.classList.add("resaltar_fila");
    //                         let editartabla = document.getElementById("editar");
    //                         let editarproducto = document.getElementById("editar_producto");
    //                         editartabla.classList.add("ocultar");
    //                         editarproducto.classList.remove("ocultar");
    //                         editarproducto.classList.add("mostrar", "cuerpo_form");

    //                         //le asigno al boton del formulario un evento y le mando la id con la info a la funcion.
    //                         document.getElementById("btnEditar").addEventListener("click", e => {
    //                             contenedoreditar.innerHTML = " ";
    //                             contenedoreditar.classList.remove("resaltado");
    //                             contador_edicion = 0;
    //                             guardarEdicion(id_auxiliar, editartabla, editarproducto, contenedoreditar);
    //                             id_auxiliar = 0;
    //                         });

    //                         //oculto el formulario de editar, hago visible los otros y reinicio el contador.
    //                         document.getElementById("btnCancelar").addEventListener("click", e => {
    //                             contenedoreditar.innerHTML = " ";
    //                             contenedoreditar.classList.remove("resaltado");
    //                             contador_edicion = 0;
    //                             cargarTabla();
    //                             ocultarFormularioEditar(editartabla, editarproducto);
    //                             id_auxiliar = 0;
    //                         });
    //                     }
    //                 }

    //                 //capturo el valor de los inputs y le reemplazo el valor en el servidor por los nuevos.
    //                 function guardarEdicion(id, editartabla, editarproducto, contenedoreditar) {

    //                     let nombre = document.getElementById("producto_nuevo").value;
    //                     let precio = document.getElementById("precio_nuevo").value;

    //                     if (nombre.length === 0 || precio.length === 0) {
    //                         contenedoreditar.innerHTML = "Complete todos los campos";
    //                         contenedoreditar.classList.add("resaltado");
    //                         return;
    //                     }
    //                     let producto = {
    //                         "thing": {
    //                             "nombre": nombre,
    //                             "precio": precio,
    //                         }
    //                     };
    //                     fetch(URL + id, {
    //                         "method": "PUT",
    //                         "mode": 'cors',
    //                         "headers": { "Content-Type": "application/json" },
    //                         "body": JSON.stringify(producto)
    //                     }).then(respuesta => {
    //                         if (!respuesta.ok) {
    //                             contenedoreditar.innerHTML = "Fallo la edicion del producto";
    //                         }
    //                         return respuesta.json();
    //                     }).then(json => {
    //                         //una vez que guarda la edicion, recargo la tabla y oculto el formulario de editar
    //                         cargarTabla();
    //                         ocultarFormularioEditar(editartabla,editarproducto);
    //                     }).catch(err => {
    //                         console.log(err);
    //                     })
    //                 }

    //                 function eliminar(id) {
    //                     fetch(URL + id, {
    //                             "method": "DELETE",
    //                             "mode": 'cors',
    //                         })
    //                         .then(respuesta => {
    //                             if (respuesta.ok)
    //                                 cargarTabla();
    //                             else
    //                                 console.log("error al eliminar");
    //                         })
    //                         .catch(err => {
    //                             console.log(err);
    //                         })
    //                 }

    //                 //recorro en el servidor los nombres y si coincide con lo ingresado por el usuario se carga la fila.
    //                 function buscar() {
    //                     let busqueda = document.getElementById("busqueda");
    //                     let cantidad_encontrada = 0;
    //                     let contenedorbuscar = document.getElementById("resultado_buscar");
    //                     let tabla = document.getElementById("table");
    //                     fetch(URL, {
    //                             "method": "GET",
    //                             "mode": 'cors',
    //                         })
    //                         .then(respuesta => {
    //                             if (respuesta.ok)
    //                                 return respuesta.json();
    //                             else console.log("error en la busqueda");
    //                         })
    //                         .then(respuesta => {

    //                             tabla.innerHTML = " ";

    //                             for (let info of respuesta.stock) {
    //                                 if (info.thing.nombre === busqueda.value) {
    //                                     crear_fila(info, tabla);
    //                                     contenedorbuscar.innerHTML = " ";
    //                                     contenedorbuscar.classList.remove("resaltado");
    //                                     cantidad_encontrada++;
    //                                 }
    //                             }
    //                             if (cantidad_encontrada === 0) {
    //                                 contenedorbuscar.innerHTML = "No se encontro el producto";
    //                                 contenedorbuscar.classList.add("resaltado");
    //                                 cargarTabla();
    //                             }
    //                         }).catch(err => {
    //                             console.log(err);
    //                         })
    //                 }

    //                 //La funcion agregar3 contiene un for que ejecuta 3 veces la funcion agregar.
    //                 function agregar3() {
    //                     for (let index = 0; index < 3; index++) {
    //                         agregar();
    //                     }
    //                 }
    //                 //se va actualizando la tabla cada 30 seg, excepto si estoy editando un producto.
    //                 function actualizarTabla(){
    //                     setInterval(() => {
    //                         if (contador_edicion === 0) {
    //                             cargarTabla();
    //                         }
    //                     }, 30000);
    //                 }

    //                 function ocultarFormularioEditar(editartabla, editarproducto){
    //                     editartabla.classList.remove("ocultar");
    //                     editartabla.classList.add("cuerpo_form");
    //                     editarproducto.classList.remove("mostrar");
    //                     editarproducto.classList.add("ocultar");
    //                 }
    //             }

    //             if (pagina === url_soporte) {

    //                 let captcha = document.getElementById("naleatorio").innerHTML = Math.floor((Math.random() * 10000) + 1);

    //                 document.getElementById("botonComprobar").addEventListener("click", (e) => {
    //                     comprobar(captcha);
    //                 });

    //                 function comprobar(captcha) {
    //                     let validacion = document.getElementById("validacion");
    //                     let numero = document.getElementById("IngresarNumero").value;

    //                     if (numero == captcha) {
    //                         validacion.innerHTML = "¡Eres Humanx!";
    //                         validacion.classList.add("ResultadoPositivo");
    //                         validacion.classList.remove("ResultadoNegativo");
    //                         let div = document.getElementById('enviar');
    //                         div.style.display = "block";
    //                     } else {
    //                         validacion.innerHTML = "¡Intenta de vuelta!";
    //                         validacion.classList.add("ResultadoNegativo");
    //                         validacion.classList.remove("ResultadoPositivo");
    //                         let div = document.getElementById('enviar');
    //                         div.style.display = "none";
    //                     }
    //                 }
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }
    // /////////////////////////////////////////////MENU DESPLEGABLE///////////////////////////////////////////////
    // document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

    // function toggleMenu() {
    //     document.querySelector(".navigation").classList.toggle("show");
    // }
}
