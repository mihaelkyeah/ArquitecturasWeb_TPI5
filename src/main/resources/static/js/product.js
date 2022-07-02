"use strict";
document.addEventListener("DOMContentLoaded", iniciarPagina);

function borrarId(elemento)
{
    let id = elemento.idProduct;
    delete elemento.idProduct;
    return id;
}

    /**
     * @returns elemento JSON
     * Devuelve un json cargados con los valores leidos del formulario
     */
     function armarElemento()
     {
         let elemento = {
             "name": document.getElementById("product-name").value,
             "description": document.getElementById("product-description").value,
             "price": document.getElementById("product-price").value
         }
         return elemento;
     }

function cambioValido(){

    return true;
}

function leerFila(fila){
    let elemento = {
        "name": fila.children[2].innerHTML,
        "description": fila.children[1].innerHTML,
        "price": fila.children[0].innerHTML
    }
    return elemento;
}

function iniciarPagina() {
    url = 'http://localhost:8080/product';
    tabla = document.getElementById("product-table");
    cargarTabla();
    document.querySelector('#product-submit').addEventListener('click', (event) => {
        event.preventDefault();
        agregarServidor();
    });
}