"use strict";
class client extends metodosComunes{
    constructor() {
		super("client","client-table");
	}

////// SUPER /////

agregarServidor(){ let elemento = this.armarElemento();super.agregarServidor(elemento);}

borrarId(elemento)
{
    let id = elemento.idClient;
    delete elemento.idClient;
    return id;
}

/**
 * @returns elemento JSON
 * Devuelve un json cargados con los valores leidos del formulario
 */
 armarElemento()
{
    let elemento = {
        "name": document.getElementById("client-name").value,
        "lastName": document.getElementById("client-lastName").value,
        "email": document.getElementById("client-email").value
    }
    return elemento;
}

 cambioValido(){

    return true;
}

 leerFila(fila){
    let elemento = {
        "name": fila.children[2].innerHTML,
        "lastName": fila.children[1].innerHTML,
        "email": fila.children[0].innerHTML
    }
    return elemento;
}

cargarComprasCliente(){
    fetch(this.url + "/totalCompras", {
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
    .catch(function(error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
}

iniciarPagina() {
    this.cargarTabla();
    document.querySelector('#client-submit').addEventListener('click', (event) => {
        event.preventDefault();
        this.agregarServidor();
    });
}
}