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
             "price": document.getElementById("product-price").value,
             "stock":document.getElementById("product-stock").value
         }
         
         return elemento;
    }

    leerFila(fila){
    let elemento = {
        "name": fila.children[1].innerHTML,
        "description": fila.children[2].innerHTML,
        "price": fila.children[3].innerHTML,
        "stock": fila.children[0].innerHTML
    }
    return elemento;
}

cambioValido(){

    return true;
}

addId(elemento,id)
    {     
        elemento.idProduct=id;
    }

cargarMasVendido(){
    fetch(this.url + "/mas-vendido", {
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
   .then(producto =>{
        document.getElementById("product-best-sold").innerHTML= producto.name ;
   })
    .catch(function(error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
}
agregarServidor(){let elemento = this.armarElemento();super.agregarServidor(elemento);}
iniciarPagina() {
    this.cargarTabla();
    this.cargarMasVendido();
    document.querySelector('#product-submit').addEventListener('click', (event) => {
        event.preventDefault();
        this.agregarServidor();
    });
}
}