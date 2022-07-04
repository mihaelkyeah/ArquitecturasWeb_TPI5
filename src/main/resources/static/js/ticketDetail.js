"use strict";

class ticketDetail extends metodosReporte {
  constructor(id) {
    super("ticketDetails/getTicketDetailsByID/"+id, "ticketDetail-table");
  }

/**
* @param {elemento}
* Crea una nueva fila en la tabla
*/

cargar(elemento){
  if ((elemento) === null) {return;}
  console.log(elemento);
  delete elemento.idTicketDetails;
  delete elemento.idTicket;
  let fila = this.tabla.insertRow(-1);
  //Crea todos los elementos
  for(var key in elemento){
      let cel = fila.insertCell(0);
      cel.innerHTML = elemento[key];
  }
  // Agrega la fila a la tabla
  this.tabla.appendChild(fila);
}

}