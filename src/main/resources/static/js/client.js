"use strict";
class client extends metodosComunes{
    constructor() {
		super("client","client-table");
	}

////// SUPER /////
getTabla(){return super.getTabla();}
cargarTabla(){ super.cargarTabla();}
cargar(elemento){console.log("aja"); super.cargar(elemento);}  
agregarServidor(){ let elemento = this.armarElemento();super.agregarServidor(elemento);}
regresarAnteriores(fila, valoresAnteriores){super.regresarAnteriores(fila, valoresAnteriores);}
editarServidor(fila, id, valoresAnteriores){super.editarServidor(fila, id, valoresAnteriores);}
guardarCambios(fila, valoresAnteriores, id){super.guardarCambios(fila, valoresAnteriores, id);}
editarElemento(fila, id){super.editarElemento(fila, id);}
borrarElemento(fila, id){super.borrarElemento(fila, id);}

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

iniciarPagina() {
    super.cargarTabla();
    document.querySelector('#client-submit').addEventListener('click', (event) => {
        event.preventDefault();
        this.agregarServidor();
    });
}
}