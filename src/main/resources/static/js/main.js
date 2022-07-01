document.addEventListener("DOMContentLoaded", iniciarPagina);
"use strict";

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
        }).then((response)=> {

            contenido.innerHTML = "";
            contenido.innerHTML = response;

            if (pagina === url_client) {
                client_pagina();
            }
            if (pagina === url_productos) {

            }
            if (pagina === url_cart) {

            }


        }).catch((error) => {
            console.log(error);
        });


        function client_pagina() {
            const url = 'http://localhost:8080/client';

                cargarTabla();
                document.querySelector('#client-submit').addEventListener('click', (event) => {
                    event.preventDefault();
                    let elem = armarElemento();
                    console.log(elem);
                    agregarServidor(elem);
                });



            /**
             *
             * Obtiene los datos de la url y la carga en la tabla
             */
            function cargarTabla(){
                fetch(url + "/all", {
                    method: 'GET',
                    mode: 'cors',
                })
                    .then(function(respuesta){
                        if(respuesta.ok) {
                            return respuesta.json();

                        }
                        else {
                            alert("Error");
                        }
                    })
                    .then(function(elementos){
                        let tabla = document.getElementById("client-table");
                        while ((tabla.rows.length - 1) > 0)
                        {
                            tabla.deleteRow(-1);
                        }

                        elementos.forEach(function(elemento){
                            cargar(elemento);
                        });
                    })
                    .catch(function(error) {
                        console.log("Hubo un problema con la petición Fetch:" + error.message);
                    });
            }

            /**
             *
             * @param {elemento}
             * Crea una nueva fila en la tabla
             */
            function cargar(elemento){

                console.log(elemento);
                let tabla = document.getElementById("client-table");
                let fila = tabla.insertRow(-1);
                //Editar por id de tabla
                let id = elemento.idClient;
                //elemento.delete(IdClient);
                delete elemento.idClient;
                console.log(elemento);
                //Crea todos los elementos
                for(var key in elemento){
                    let cel = fila.insertCell(0);
                    cel.innerHTML = elemento[key];
                    //fila.appendChild(document.createElement("td").text(elemento[key]));
                }
                //Crea el boton de editar
                let btnEditar = document.createElement("button");

                btnEditar.innerHTML = "Editar";
                btnEditar.type = "button";
                btnEditar.addEventListener('click', function(){editarElemento(fila, id);});
                fila.appendChild(btnEditar);
                //Crea el boton de borrar
                let btnBorrar = document.createElement("button");
                btnBorrar.innerHTML = "Borrar";
                btnBorrar.type = "button";
                btnBorrar.addEventListener('click', function(){borrarElemento(fila, id);});
                fila.appendChild(btnBorrar);
                fila.setAttribute("id", "fila-".id);
                // Agrega la fila a la tabla
                tabla.appendChild(fila);
            }

/////////////////////////////  ALTA  /////////////////////////////

            /**
             *
             * @returns elemento JSON
             * Devuelve un json cargados con los valores leidos del formulario
             */
            function armarElemento()
            {
                let elemento = {
                    "name": document.getElementById("client-name").value,
                    "lastName": document.getElementById("client-lastName").value,
                    "email": document.getElementById("client-email").value
                }
                return elemento;
            }

            /**
             *
             * @param {*} elemento
             * Agrega un elemento al servidor
             */

            function agregarServidor (elemento){
                // Escribe el objeto en el JSON del servidor
                console.log(elemento);
                fetch((url + "/add"), {
                    'method': 'POST',
                    'headers': {
                        'content-type': 'application/JSON'
                    },
                    'mode': 'cors',
                    'body': JSON.stringify(elemento)
                })
                    .then(function (respuesta) {
                        if (respuesta.ok) {
                            cargarTabla(url);
                        }
                        else {
                            alert("La solicitud al servidor falló.");
                        }
                    })
                    .catch(function(error) {
                        console.log("Hubo un problema con la petición Fetch:" + error.message);
                    });
            }

            /**
             *
             * @param {fila, id}
             * Elimina un elemento del servidor y de la tabla en el html
             */
            function borrarElemento(fila, id)
            {
                if (confirm("¿Seguro que desea eliminarlo?"))
                {
                    fetch((url + '/deleteByID/' +id),{
                        'method':'DELETE',
                        'mode': 'cors'
                    })
                        .then(function(respuesta){
                            if(respuesta.ok) {
                                let tabla = document.getElementById("client-table");
                                tabla.removeChild(fila);
                            }
                            else {
                                alert("No se pudo eliminar");
                            }
                        });
                }
            }


//Esta funcion edita un pedido del servidor, de no poder hacerlo restaura los valores viejos en la tabla
            function editarServidor(fila, id, valoresAnteriores)
            {
                //Crea el pedido los valores de la fila alterada
                let elemento = leerFila(fila);
                //Encuentra el pedido por su ID y lo pisa con los datos nuevos
                console.log(elemento);
                fetch((url+ '/update/' +id),{
                    'method':'PUT',
                    'mode': 'cors',
                    'headers': {
                        'content-type': 'application/JSON'
                    },
                    'body': JSON.stringify(elemento)
                })
                    .then(function(respuesta){
                        if(!respuesta.ok) {
                            //Si falla el PUT restaura los valores anteriores en la tabla
                            volverValoresAnteriores(fila, valoresAnteriores)
                            alert("No se pudo modificar el pedido");
                        }
                        else {
                            //Si funciona el PUT
                            alert("Datos modificados");
                        }
                    })
            }

//Esta funcion deja de permitir la edicion de la tabla y que cambios ocurren
            function guardarCambios(fila, valoresAnteriores, id)
            {
                //Deja de poder se editable
                let  children = Array.from(document.getElementById(fila.id).children);
                let i = 0;
                children.forEach(child => {
                    if (child.tagName !== "BUTTON")
                    {child.contentEditable = "false";
                    i++;}
                });
                //Verifica si esta todo bien
                if (cambioValido())
                {
                    //Pregunta si esta seguro
                    if (confirm("¿Seguro que desea modificar?"))
                    {
                        editarServidor(fila, id, valoresAnteriores);
                    }
                    else
                    {
                        volverValoresAnteriores(fila, valoresAnteriores);
                    }
                }
                else {volverValoresAnteriores(fila, valoresAnteriores);}
                //Vuelve a poner el mismo boton que estaba antes, esto se hizo porque si solo modificabas el evento bucleaba
                let btnEditar = document.createElement("button");
                btnEditar.innerHTML = "Editar";
                btnEditar.type = "button";
                btnEditar.addEventListener('click', function(){editarPedido(fila, id);});
                fila.replaceChild(btnEditar,fila.children[i]);

            }

//Esta funcion permite la edicion de la tabla
            function editarElemento(fila, id)
            {
                //Se guardan los valores viejos y las celdas se vuelven editables
                let valoresAnteriores  = [];
                let  children = Array.from(document.getElementById(fila.id).children);
                let i = 0;

                children.forEach(child => {
                    console.log(child);
                    if (child.tagName !== "BUTTON")
                    {
                        valoresAnteriores[i]= child.innerHTML;
                        child.contentEditable = "true";
                        i++;}
                });
                //Se crea un boton que al apretarse confirma los cambios, este reemplaza el boton anterior
                let btnGuardar = document.createElement("button");
                btnGuardar.innerHTML = "Guardar";
                btnGuardar.type = "button";
                btnGuardar.addEventListener('click', function(){guardarCambios(fila, valoresAnteriores, id);});
                fila.replaceChild(btnGuardar,fila.children[i]);
            }

            function volverValoresAnteriores(fila, valoresAnteriores){
                let  children = Array.from(document.getElementById(fila.id).children);
                let i = 0;
                children.forEach(child => {
                    if (child.tagName !== "BUTTON")
                    {
                        child.innerHTML = valoresAnteriores[i];
                        i++;
                    }
                });
            }

            function cambioValido(){

                return true;
            }

            function leerFila(fila){
                let elemento = {
                    "name": fila.children[2].innerHTML,
                    "lastName": fila.children[1].innerHTML,
                    "email": fila.children[0].innerHTML
                }
                return elemento;
            }
        }
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