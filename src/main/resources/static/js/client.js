const url = 'http://localhost:8080/client';
document.addEventListener('DOMContentLoaded', () => {
    cargarTabla();
  document.querySelector('#client-submit').addEventListener('click', () => {
    agregarServidor(armarElemento());
  });
}); 


/**
 * 
 * Obtiene los datos de la url y la carga en la tabla
 */
function cargarTabla(){
  fetch(url + "/all", {
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
      let tabla = document.getElementById("client-table");
      while ((tabla.rows.length - 1) > 0)
      {
          tabla.deleteRow(-1);
      }
      
      elementos.forEach(function(elemento){ 
          cargar(elemento);
      });
  })
  .catch(function(error) {
      console.log("Hubo un problema con la petición Fetch:" + error.message);
    });    
}

/**
 * 
 * @param {elemento} 
 * Crea una nueva fila en la tabla
 */
function cargar(elemento){
    let tabla = document.getElementById("client-table");
    let fila = tabla.insertRow(-1);
    //Editar por id de tabla
    let id = elemento.IdClient;
    //elemento.delete(IdClient);
    delete elemento.IdClient;
    //Crea todos los elementos
    elemento.forEach(element => {
        fila.appendChild(document.createElement("td").textContent(element));   
    });
    //Crea el boton de editar
    let btnEditar = document.createElement("button");
    btnEditar.innerHTML = "Editar";
    btnEditar.type = "button";
    btnEditar.addEventListener('click', function(){editarElemento(fila, id);});
    fila.appendChild(btnEditar);
     //Crea el boton de borrar
    let btnBorrar = document.createElement("button");
    btnBorrar.innerHTML = "Borrar";
    btnBorrar.type = "button";
    btnBorrar.addEventListener('click', function(){borrarElemento(fila, id);});
    fila.appendChild(btnBorrar);
    fila.setAttribute("id", "fila-".id);
    // Agrega la fila a la tabla
    tabla.appendChild(fila);
}

/////////////////////////////  ALTA  /////////////////////////////

/**
 * 
 * @returns elemento JSON
 * Devuelve un json cargados con los valores leidos del formulario
 */
function armarElemento()
{
    let elemento = {
        //'Modelo' : Formulario
    }
    return elemento;
}

/**
 * 
 * @param {*} elemento
 * Agrega un elemento al servidor 
 */

function agregarServidor (elemento){
    // Escribe el objeto en el JSON del servidor
    fetch((url), {
        'method': 'POST',
        'headers': {
            'content-type': 'application/JSON'
        },
        'mode': 'cors',
        'body': JSON.stringify(elemento)
    })
    .then(function (respuesta) {
        if (respuesta.ok) {
            cargarTabla(url);
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
 * 
 * @param {fila, id}
 * Elimina un elemento del servidor y de la tabla en el html
 */
function borrarElemento(fila, id)
{
    if (confirm("¿Seguro que desea eliminarlo?")) 
    { 
        fetch((url+ '/' +id),{
            'method':'DELETE',
            'mode': 'cors'
        })
        .then(function(respuesta){
            if(respuesta.ok) {
                let tabla = document.getElementById("client-table");
                tabla.removeChild(fila);
            }
            else {
                alert("No se pudo eliminar");
            }
        });
    }
}


//Esta funcion edita un pedido del servidor, de no poder hacerlo restaura los valores viejos en la tabla
function editarServidor(fila, id, valoresAnteriores)
{
    //Crea el pedido los valores de la fila alterada
    let elemento = leerFila(fila); 
    //Encuentra el pedido por su ID y lo pisa con los datos nuevos
    fetch((url+ '/' +id),{
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
            volverValoresAnteriores(fila, valoresAnteriores)
            alert("No se pudo modificar el pedido");
        }
        else {
            //Si funciona el PUT
            alert("Datos modificados");
        }
    })
}

//Esta funcion deja de permitir la edicion de la tabla y que cambios ocurren
function guardarCambios(fila, valoresAnteriores, id)
{
    //Deja de poder se editable
    let  children = Array.from(document.getElementById(fila.id).children);
    children.forEach(child => {
        if (child.nodeType !== "BUTTON")
        {child.contentEditable = "false";}
    }); 
    //Verifica si esta todo bien
    if (cambioValido())
    {
        //Pregunta si esta seguro
        if (confirm("¿Seguro que desea modificar?"))
        {
            editarServidor(fila, id, valoresAnteriores);
        }
        else
        {
            volverValoresAnteriores(fila, valoresAnteriores);
        }
    }
    else {volverValoresAnteriores(fila, valoresAnteriores);}
    //Vuelve a poner el mismo boton que estaba antes, esto se hizo porque si solo modificabas el evento bucleaba
    let btnEditar = document.createElement("button");
    btnEditar.innerHTML = "Editar";
    btnEditar.type = "button";
    btnEditar.addEventListener('click', function(){editarPedido(fila, id);});
    fila.replaceChild(btnEditar,fila.children[i+1]);

}

//Esta funcion permite la edicion de la tabla
function editarElemento(fila, id)
{
    //Se guardan los valores viejos y las celdas se vuelven editables
    let valoresAnteriores  = [];
    let  children = Array.from(document.getElementById(fila.id).children);
    let i = 0;
    children.forEach(child => {
        if (child.nodeType !== "BUTTON")
        {
            valoresAnteriores[i]= child.innerHTML; 
            child.contentEditable = "true";
            i++;}
    }); 
    //Se crea un boton que al apretarse confirma los cambios, este reemplaza el boton anterior
    let btnGuardar = document.createElement("button");
    btnGuardar.innerHTML = "Guardar";
    btnGuardar.type = "button";
    btnGuardar.addEventListener('click', function(){guardarCambios(fila, valoresAnteriores, id);});
    fila.replaceChild(btnGuardar,fila.children[i+1]);
}

function volverValoresAnteriores(fila, valoresAnteriores){
    let  children = Array.from(document.getElementById(fila.id).children);
    let i = 0;
    children.forEach(child => {
        if (child.nodeType !== "BUTTON")
        {
            child.innerHTML = valoresAnteriores[i]; 
            i++;
        }
    }); 
}

function cambioValido(){

    return true;
}

function leerFila(fila){
    let elemento = {
        //'Modelo' : fila.modelo
    }
    return elemento;
}
