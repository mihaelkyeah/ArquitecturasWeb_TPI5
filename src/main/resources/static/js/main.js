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
                            cargar(elemento, num);
                        });
                    })
                    .catch(function(error) {
                        console.log("Hubo un problema con la petición Fetch:" + error.message);
                    });
            }

            /**
             * @param {elemento}
             * Crea una nueva fila en la tabla
             */
            function cargar(elemento){

                console.log(elemento);
                let tabla = document.getElementById("client-table");
                let fila = tabla.insertRow(-1);
                //Editar por id de tabla
                let id = elemento.idClient;
                fila.setAttribute("id","fila-".id);
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

                btnEditar.addEventListener('click', function(){
                    editarElemento(fila, id);
                });
                fila.appendChild(btnEditar);

                //Crea el boton de borrar
                let btnBorrar = document.createElement("button");
                btnBorrar.innerHTML = "Borrar";
                btnBorrar.type = "button";
                btnBorrar.addEventListener('click', function(){
                    borrarElemento(fila, id);
                });
                fila.appendChild(btnBorrar);
                fila.setAttribute("id", "fila-".id);
                // Agrega la fila a la tabla
                tabla.appendChild(fila);
            }

            /////////////////////////////  ALTA  /////////////////////////////

            /**
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



}
