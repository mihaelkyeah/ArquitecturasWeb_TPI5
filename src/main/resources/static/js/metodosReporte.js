"use strict";

/**
 * 
 * @param {*} elemento 
 * Agrega un nuevo elemento al servidor y a la tabla
 */
class metodosReporte{
    constructor(url,tabla) {
		this.url = "http://localhost:8080/"+url;
		this.tabla = document.getElementById(tabla);
	}

/**
* @param {elemento}
* Crea una nueva fila en la tabla
*/
cargar(elemento){
    if ((elemento) === null) {return;}
    console.log(elemento);
    let fila = this.tabla.insertRow(-1);
    //Crea todos los elementos
    for(var key in elemento){
        let cel = fila.insertCell(0);
        cel.innerHTML = elemento[key];
    }
    // Agrega la fila a la tabla
    this.tabla.appendChild(fila);
}

/**
 * 
 * Obtiene los datos de la url y manda a cargar la tabla
 */
 cargarTabla(){
     fetch(this.url, {
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
    });
 }

iniciarPagina() {
    this.cargarTabla();
}

}


