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
/*
class ticketDetail extends metodosComunes {
  constructor(id) {
    super("ticketDetails", "ticketDetail-table");
    this.id = id;
    this.urlProduct= "http://localhost:8080/product/all";
    this.selector = document.getElementById("details-product");
  }

  borrarId(elemento)
    {
        let id = elemento.idTicketDetails;
        delete elemento.idTicketDetails;
        return id;
    }
  cargar(elemento){
    if ((elemento) === null) {return;}
    console.log(elemento);
    let id = this.borrarId(elemento);
    delete elemento.idTicket;
    let fila = this.tabla.insertRow(-1);
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
     // Agrega la fila a la tabla
    this.tabla.appendChild(fila);
  }

  cargarTabla(){
    fetch(this.url + "/getTicketDetailsByID/"+this.id, {
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
        console.log("Hubo un problema con la petición Fetch:" + error.message);
        console.log(this.url);
    });
}


armarElemento()
{
    let elemento = {
        "idTicket": this.id,
        "idProduct": document.getElementById("details-product").value,
        "quantity": document.getElementById("details-product-qty").value,
        "price": 0
    }
    return elemento;
}

 cambioValido(){

    return true;
}

 leerFila(fila){
    let elemento = {
        "idTicket": this.id,
        "idProduct": fila.children[2].innerHTML,
        "quantity": fila.children[1].innerHTML,
        "price": fila.children[0].innerHTML
    }
    return elemento;
}
agregarServidor(){ let elemento = this.armarElemento();super.agregarServidor(elemento);}
iniciarPagina() {
  this.cargarTabla();
  this.cargarSelector();
  document.querySelector('#details-submit').addEventListener('click', (event) => {
      event.preventDefault();
      this.agregarServidor();
  });
}
  cargarSelector()
  {
    fetch(this.urlProduct, {
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
        this.selector.innerHTML = "";
        elementos.forEach(e => {
        let option= document.createElement('option');
        option.innerHTML= e.name;
        option.value =e.idProduct;
        this.selector.appendChild(option);
       });
   })
    .catch(function(error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
  }
}
*/
