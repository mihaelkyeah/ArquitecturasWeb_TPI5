"use strict";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TODO login sensillo (verificar si existe el cliente) =====> sin Login no ahi Authenticacion en la API
const url_inicio = '../pages/home.html';
const url_productos = '../pages/product.html';
const url_client = '../pages/client.html';
const url_clientReporte = '../pages/clientReporte.html';
const url_ticket = '../pages/ticket.html';
const url_ticket_detail = '../pages/ticketDetail.html';
const url_carrito = '../pages/carrito.html';
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
    cargar_pagina(url_carrito);
});

function linkLoadCVS() {
    fetch("http://localhost:8080/api/LoadCVS/load", {
        method: 'GET',
        mode: 'cors',
    }).then(function (respuesta) {
        if (respuesta.ok) {
            console.log("200 ok LoadCVS");
        } else {
            console.log("406 datos similares en la base de datos");
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
                jsPagina = new ticket();
                jsPagina.iniciarPagina();
                break;
            case url_ticket_detail:
                jsPagina = new ticketDetail();
                jsPagina.iniciarPagina();
                break;
            case url_clientReporte:
                jsPagina = new metodosReporte("client/totalCompras","client-report-table");
                jsPagina.iniciarPagina();
                break;
            case url_carrito:
                jsPagina = new carrito();
                jsPagina.iniciarPagina();
            break;
        }
    }).catch((error) => {
        console.log(error);
    });
}

