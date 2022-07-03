"use strict";
class ticketDetail extends metodosComunes {
  constructor() {
    super("ticketDetail", "ticketDetail-table");
  }
  iniciarPagina() {
    this.cargarTabla();
    document.querySelector('#ticketDetail-form-addDetail').addEventListener('click', () => {
      this.agregarServidor();
    })
  }
  agregarServidor(){
    let elemento = this.armarElemento();
    super.agregarServidor(elemento);
  }
  borrarId(elemento) {
    let id = elemento.idTicketDetail;
    delete elemento.idTicketDetail;
    return id;
  }
  armarElemento() {
    return {
      "idTicket": document.querySelector('#ticketDetail-form-idTicket').value,
      "idProduct": document.querySelector('#ticketDetail-form-idProduct').value,
      "quantity": document.querySelector('#ticketDetail-form-quantity').value,
      "price": document.querySelector('#ticketDetail-form-price').value
    }
  }

}