"use strict";

/**
 * 
 * @param {*} elemento 
 * Agrega un nuevo elemento al servidor y a la tabla
 */
class metodosComunes{
    constructor(url,tabla) {

		this.url = "http://localhost:8080/"+url;
		this.tabla = document.getElementById(tabla);
	}

    getTabla(){return this.tabla;}
    agregarServidor (elemento){
    fetch((this.url + "/add"), {
        'method': 'POST',
        'headers': {
            'content-type': 'application/JSON'
        },
        'mode': 'cors',
        'body': JSON.stringify(elemento)
    })
    .then(function (respuesta) {
        if (respuesta.ok) {
            this.cargarTabla();
        }
        else {
            alert("La solicitud al servidor falló.");
        }
    })
    .catch(function(error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
}

/**
* @param {elemento}
* Crea una nueva fila en la tabla
*/
cargar(elemento){
    console.log("cargando");
    let t = this.getTabla();
    let fila = t.insertRow(-1);
    //Editar por id de tabla
    let id = this.borrarId(elemento)
    console.log(elemento);
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

    btnEditar.addEventListener('click', function(){
        this.editarElemento(fila, id);
    });
    celEditar.appendChild(btnEditar);
    fila.appendChild(celEditar);

    //Crea el boton de borrar
    let celBorrar = fila.insertCell(0);
    let btnBorrar = document.createElement("button");
    btnBorrar.innerHTML = "Borrar";
    btnBorrar.type = "button";
    btnBorrar.addEventListener('click', function(){
        this.borrarElemento(fila, id);
    });
    celBorrar.appendChild(btnBorrar);
    fila.appendChild(celBorrar);
    // Agrega la fila a la tabla
    t.appendChild(fila);
}

/**
 * 
 * Obtiene los datos de la url y manda a cargar la tabla
 */
 cargarTabla(){
    let t = this.getTabla();
     fetch(this.url + "/all", {
         method: 'GET',
         mode: 'cors',
     })
     .then(function(respuesta){
         if(respuesta.ok) {
             return respuesta.json();
 
         }
         else {
             alert("Error");
         }
     })
     .then(function(elementos){
         while ((t.rows.length - 1) > 0)
         {
             t.deleteRow(-1);
         }
         elementos.forEach(e => {
            this.cargar(e.bind(e));
        });
     })
     .catch(function(error) {
         console.log("Hubo un problema con la petición Fetch:" + error.message);
     });
 }

 regresarAnteriores(fila, valoresAnteriores){
    let children = Array.from(fila.children);
    let i = 0;
    children.forEach(child => {
        if (child.tagName !== "BUTTON")
        {
            child.innerHTML = valoresAnteriores[i];
            i++;
        }
    });
}
//Esta funcion edita un pedido del servidor, de no poder hacerlo restaura los valores viejos en la tabla
 editarServidor(fila, id, valoresAnteriores)
{
    //Crea el pedido los valores de la fila alterada
    let elemento = this.leerFila(fila);
    //Encuentra el pedido por su ID y lo pisa con los datos nuevos
    fetch((this.url+ '/update/' +id),{
        'method':'PUT',
        'mode': 'cors',
        'headers': {
            'content-type': 'application/JSON'
        },
        'body': JSON.stringify(elemento)
    })
    .then(function(respuesta){
        if(!respuesta.ok) {
            //Si falla el PUT restaura los valores anteriores en la tabla
            this.regresarAnteriores(fila, valoresAnteriores)
            alert("No se pudo modificar el pedido");
        }
        else {
            //Si funciona el PUT
            alert("Datos modificados");
        }
    })
}

//Esta funcion deja de permitir la edicion de la tabla y que cambios ocurren
 guardarCambios(fila, valoresAnteriores, id)
{
    //Deja de poder se editable
    let children = Array.from(fila.children);
    let i = 0;
    children.forEach(child => {
        if (child.tagName !== "BUTTON")
        {child.contentEditable = "false";
        i++;}
    });
    //Verifica si esta todo bien
    if (this.cambioValido())
    {
        //Pregunta si esta seguro
        if (confirm("¿Seguro que desea modificar?"))
        {
            this.editarServidor(fila, id, valoresAnteriores);
        }
        else
        {
            this.regresarAnteriores(fila, valoresAnteriores);
        }
    }
    else {this.regresarAnteriores(fila, valoresAnteriores);}
    //Vuelve a poner el mismo boton que estaba antes, esto se hizo porque si solo modificabas el evento bucleaba
    let btnEditar = document.createElement("button");
    btnEditar.innerHTML = "Editar";
    btnEditar.type = "button";
    btnEditar.addEventListener('click', function(){this.editarPedido(fila, id);});
    fila.replaceChild(btnEditar,fila.children[i]);
}

//Esta funcion permite la edicion de la tabla
 editarElemento(fila, id)
{
    //Se guardan los valores viejos y las celdas se vuelven editables
    let valoresAnteriores  = [];
    let children = Array.from(fila.children);
    let i = 0;
    children.forEach(child => {
        if (child.tagName !== "BUTTON")
        {
            valoresAnteriores[i]= child.innerHTML;
            child.contentEditable = "true";
            i++;}
    });
    //Se crea un boton que al apretarse confirma los cambios, este reemplaza el boton anterior
    let btnGuardar = document.createElement("button");
    btnGuardar.innerHTML = "Guardar";
    btnGuardar.type = "button";
    btnGuardar.addEventListener('click', function(){this.guardarCambios(fila, valoresAnteriores, id);});
    fila.replaceChild(btnGuardar,fila.children[i]);
}

/**
 *
 * @param {fila, id}
 * Elimina un elemento del servidor y de la tabla en el html
 */
    borrarElemento(fila, id)
    {
        let t = this.getTabla();
        if (confirm("¿Seguro que desea eliminarlo?"))
        {
            fetch((this.url + '/deleteByID/' +id),{
                'method':'DELETE',
                'mode': 'cors'
            })
            .then(function(respuesta){
                if(respuesta.ok) {
                    t.removeChild(fila);
                }
                else {
                    alert("No se pudo eliminar");
                }
            });
        }
    }

////////////// METODOS POR CLASE ////////////

    borrarId(elemento)
    {
        let id = elemento.id;
        delete elemento.id;
        return id;
    }

    armarElemento()
    {
        let elemento = {
            // "Modelo": "Valor Leido"
        }
        return elemento;
    }

    cambioValido(){
        return true;
    }

    leerFila(fila){
        let elemento = {
            // "Modelo": "fila.children[num_columna].innerHTML"
        }
        return elemento;
    }

    iniciarPagina() {
     //  
    }
}


