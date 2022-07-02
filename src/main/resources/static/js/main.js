"use strict";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TODO login sensillo (verificar si existe el cliente) =====> sin Login no ahi Authenticacion en la API
const url_inicio = '../pages/home.html';
const url_productos = '../pages/product.html';
const url_client = '../pages/client.html';
const url_clientReporte = '../pages/clientReporte.html';
const url_ticket = '../pages/ticket.html';
const url_ticketReporte = '../pages/ticketReporte.html';
let jsPagina;

document.getElementById("pag1").addEventListener('click', (e) => {
    e.preventDefault();
    cargar_pagina(url_inicio);
});
document.getElementById("pag2").addEventListener('click', (e) => {
    e.preventDefault();
    cargar_pagina(url_productos);
});
document.getElementById("pag3").addEventListener('click', (e) => {
    e.preventDefault();
    cargar_pagina(url_client);
});
document.getElementById("pag4").addEventListener('click', (e) => {
    e.preventDefault();
    cargar_pagina(url_ticket);
});
document.getElementById("pag5").addEventListener('click', (e) => {
    e.preventDefault();
    cargar_pagina(url_clientReporte);
});

document.getElementById("pag6").addEventListener('click', (e) => {
    e.preventDefault();
    cargar_pagina(url_ticketReporte);
});

function linkLoadCVS() {
    fetch("http://localhost:8080/api/LoadCVS/load", {
        method: 'GET',
        mode: 'cors',
    }).then(function (respuesta) {
        if (respuesta.ok) {
            console.log("200 ok LoadCVS");
        } else {
            console.log("406 datos similaren en la base de datos");
        }
    }).catch(function (error) {
        console.log(error.message);
    });
}

cargar_pagina(url_inicio);//SI SE ELIMINA NO CARGA LA PAGINA HOME EN UN PRINCIPIO
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cargar_pagina(pagina) {
    let contenido = document.getElementById("contenido");
    fetch(pagina).then((response) => {
        if (response.ok)
            return response.text();
        else
            contenido.innerHTML = "<h1>Error to Load</h1>";
    }).then((response) => {

        contenido.innerHTML = "";
        contenido.innerHTML = response;

    }).then(function () {

        switch (pagina) {
            case url_client:
                jsPagina = new client();
                jsPagina.iniciarPagina();
                break;
            case url_productos:
                jsPagina = new product();
                jsPagina.iniciarPagina();
                break;
            case url_ticket:
                ticket_pagina();
                break;
            case url_clientReporte:
                jsPagina = new metodosReporte("client/totalCompras","client-report-table");
                jsPagina.iniciarPagina();
                break;
            case url_ticketReporte:
                jsPagina = new metodosReporte("ticket/date","ticket-report-table");
            break;
        }
    }).catch((error) => {
        console.log(error);
    });
}

function ticket_pagina() {
    url = 'http://localhost:8080/ticket';
    tabla = document.getElementById("ticket-table");
    cargarTabla();
    document.querySelector('#ticket-submit').addEventListener('click', (event) => {
        event.preventDefault();
        agregarServidor();
    });
    /*
       function borrarId(elemento)
       {
           let id = elemento.idTicket;
           delete elemento.idTicket;
           return id;
       }

       /**
        * @returns elemento JSON
        * Devuelve un json cargados con los valores leidos del formulario
        */ /*
    function armarElemento()
    {
        let elemento = {
            "total": document.getElementById("ticket-total").value
        }
        return elemento;
    }

    function cambioValido(){

        return true;
    }

    function leerFila(fila){
        let elemento = {
            "total": fila.children[0].innerHTML
        }
        return elemento;
    } */
}
