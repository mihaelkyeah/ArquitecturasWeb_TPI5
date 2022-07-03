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

cargar(elemento) {
    if ((elemento) === null) {return;}
    let fila = this.tabla.insertRow(-1);
    //Editar por id de tabla
    let id = this.borrarId(elemento)
    //Crea todos los elementos
    for(var key in elemento){
        let cel = fila.insertCell(0);
        cel.innerHTML = elemento[key];
    }
    //Crea el boton de editar
    let celEditar = fila.insertCell(0);
    let btnEditar = document.createElement("button");
    btnEditar.innerHTML = "Editar";
    btnEditar.type = "button";

    btnEditar.addEventListener('click', e => { 
        this.editarElemento(fila, id);
    });
    celEditar.appendChild(btnEditar);
    fila.appendChild(celEditar);

    //Crea el boton de borrar
    let celBorrar = fila.insertCell(0);
    let btnBorrar = document.createElement("button");
    btnBorrar.innerHTML = "Borrar";
    btnBorrar.type = "button";
    btnBorrar.addEventListener('click', e => { 
        this.borrarElemento(fila, id);
    });
    celBorrar.appendChild(btnBorrar);
    fila.appendChild(celBorrar);
    // Crear link ver detalle
    let celVerDetalle = fila.insertCell(0);
    let btnDetalle = document.createElement("Button");
    btnDetalle.type = "button";
    btnDetalle.innerHTML = "Ver detalles";
    btnDetalle.addEventListener('click', e => {
        e.preventDefault();
        cargar_paginaID(url_ticketDetail,id)
    });
    celVerDetalle.appendChild(btnDetalle);
    fila.appendChild(celVerDetalle);
    // ====================================== //
    // Agrega la fila a la tabla
    this.tabla.appendChild(fila);
}

iniciarPagina() {
    this.cargarTabla();
    document.querySelector('#ticket-report-submit').addEventListener('click', (event) => {
        event.preventDefault();
        this.filtrarFecha();
    });
}
}