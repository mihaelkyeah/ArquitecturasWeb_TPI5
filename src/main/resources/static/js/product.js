"use strict";
class product extends metodosComunes{
    constructor() {
		super("product","product-table");
	}

    borrarId(elemento)
    {
        let id = elemento.idProduct;
        delete elemento.idProduct;
        return id;
    }

    /**
     * @returns elemento JSON
     * Devuelve un json cargados con los valores leidos del formulario
     */
    armarElemento()
    {
         let elemento = {
             "name": document.getElementById("product-name").value,
             "description": document.getElementById("product-description").value,
             "price": document.getElementById("product-price").value
         }
         return elemento;
    }

    leerFila(fila){
    let elemento = {
        "name": fila.children[0].innerHTML,
        "description": fila.children[1].innerHTML,
        "price": fila.children[2].innerHTML
    }
    return elemento;
}

cambioValido(){

    return true;
}
iniciarPagina() {
    this.cargarTabla();
    document.querySelector('#product-submit').addEventListener('click', (event) => {
        event.preventDefault();
        this.agregarServidor();
    });
}
}