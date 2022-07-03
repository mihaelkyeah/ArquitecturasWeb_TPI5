"use strict";
class ticket extends metodosComunes{
    constructor() {
		super("ticket","ticket-table");
	}

////// SUPER /////

agregarServidor(){ let elemento = this.armarElemento();super.agregarServidor(elemento);}

borrarId(elemento)
{
    let id = elemento.idTicket;
    delete elemento.idTicket;
    return id;
}

/**
 * @returns elemento JSON
 * Devuelve un json cargados con los valores leidos del formulario
 */
 armarElemento()
{
    let elemento = {
        "idCliente": document.getElementById("ticket-client").value,
        "total": document.getElementById("ticket-total").value
    }
    return elemento;
}

 cambioValido(){

    return true;
}

 leerFila(fila){
    let elemento = {
        "idCliente": fila.children[2].innerHTML,
        "total": fila.children[0].innerHTML
    }
    return elemento;
}

filtrarFecha(){
    let day = document.getElementById("ticket-report-day").value;
    let url = this.url+"/date/"+day;
    fetch(url, {
        method: 'GET',
        mode: 'cors',
   })
   .then( respuesta =>{ 
       if (respuesta.status == 200)
       {
           return respuesta.json();
           
       }else{
           alert("Error");
       }
   })
   .then(elementos =>{
       while ((this.tabla.rows.length - 1) > 0)
       {
           this.tabla.deleteRow(-1);
       }
       elementos.forEach(e => {
           this.cargar(e);
       });
   })
    .catch(function(error) {
        console.log("Hubo un problema con la petición Fetch: " + error.message);
    });
}

iniciarPagina() {
    this.cargarTabla();
    document.querySelector('#ticket-report-submit').addEventListener('click', (event) => {
        event.preventDefault();
        this.filtrarFecha();
    });
}
}