"use strict";
class carrito{
    constructor() {
        this.postUrl = "http://localhost:8080/ticket/add";
        this.productUrl = "http://localhost:8080/product";
        this.product = document.getElementById("carrito-product");
        this.clientUrl = "http://localhost:8080/client/all";
        this.client= document.getElementById("carrito-client");
        this.tabla =document.getElementById("carrito-table");
        this.carrito = {};
	}

/**
 * @returns elemento JSON
 * Devuelve un json cargados con los valores leidos del formulario
 */
 armarElemento()
{ 
    let elemento = {
        "ticketDetails": [],
        "ticket": {
            "idClient": this.client.value,
            "total": 0
        }
    };
    for(var key in this.carrito){
        let details = {"idTicket":0, "idProduct":key, "quantity":this.carrito[key],"price":0};
        elemento.ticketDetails.push(details);
    }
    return elemento;
}

cargarSelector(url, selector){
    fetch(url, {
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
        selector.innerHTML = "";
        elementos.forEach(e => {
        let option= document.createElement('option');
        option.innerHTML= e.name;
        (e.idProduct !== undefined) ? option.value =e.idProduct : option.value =e.idClient;
        selector.appendChild(option);
       });
   })
    .catch(function(error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
}

agregarServidor()
{ 
    let elemento = this.armarElemento();
    console.log(elemento);
    fetch((this.postUrl), {
        'method': 'POST',
        'headers': {
            'content-type': 'application/JSON'
        },
        'mode': 'cors',
        'body': JSON.stringify(elemento)
    })
    .then(respuesta =>{ 
        if (respuesta.status == 200) {      
            this.limpiarTabla();
            this.carrito = {};
            alert("Ticket realizado.");
        }
        else {
            alert("La solicitud al servidor falló.");
        }
    })
    .catch(function(error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
}

 cambioValido(fila){
    if (fila.children[1].value <1 || fila.children[1].value > 3)
        {return false;}
    return true;
}

productoValido(){
    let cant = document.getElementById("carrito-product-qty").value;
    if (this.product.value !== "" && (1 <= cant && cant <= 3))
        {return true;}
    return false;
}


cargar(){
    //Celdas del producto
    console.log(this.carrito);
    let valor = document.getElementById("carrito-product-qty").value;
    let clave =     this.product.value;
    let fila = this.tabla.insertRow(-1);
    let cel = fila.insertCell(0);

    cel.innerHTML =  valor;
    let cel2 = fila.insertCell(0);
    cel2.innerHTML =clave;
    (this.carrito[clave] === undefined) ? this.carrito[clave] = valor : this.carrito[clave] = Number.parseInt(this.carrito[clave],10)+ valor;
    console.log(this.carrito);
    //Crea el boton de editar
    let celEditar = fila.insertCell(0);
    let btnEditar = document.createElement("button");
    btnEditar.innerHTML = "<i class=\"large material-icons\">create</i>";
    btnEditar.type = "button";
    btnEditar.className = "btn waves-effect waves-light amber";
    btnEditar.addEventListener('click', e => { 
        this.editarElemento(fila);
    });
    celEditar.appendChild(btnEditar);
    fila.appendChild(celEditar);

    //Crea el boton de borrar
    let celBorrar = fila.insertCell(0);
    let btnBorrar = document.createElement("button");
    btnBorrar.innerHTML = "<i class=\"large material-icons\">delete_forever</i>";
    btnBorrar.type = "button";
    btnBorrar.className = "btn waves-effect waves-light red";
    btnBorrar.addEventListener('click', e => { 
        this.tabla.removeChild(fila);
        delete this.carrito[clave];
        console.log(this.carrito);
    });
    celBorrar.appendChild(btnBorrar);
    fila.appendChild(celBorrar);
    //Agregado de la fila
    this.tabla.appendChild(fila);
}

//Esta funcion deja de permitir la edicion de la tabla y que cambios ocurren
guardarCambios(fila, valorAnterior)
{
    //Deja de poder se editable
    fila.children[1].contentEditable = "false";
    //Verifica si esta todo bien
    if (this.cambioValido(fila))
    {
        //Pregunta si esta seguro
        if (!confirm("¿Seguro que desea modificar?"))
        {
            fila.children[1].innerHTML = valorAnterior;
            
        }else{ let key = fila.children[0].innerHTML;
            this.carrito[key]= fila.children[1].innerHTML;}
    }
    else {fila.children[1].innerHTML = valorAnterior;}
    //Vuelve a poner el mismo boton que estaba antes, esto se hizo porque si solo modificabas el evento bucleaba
    let btnEditar = document.createElement("button");
    btnEditar.innerHTML = "<i class=\"large material-icons\">create</i>";
    btnEditar.type = "button";
    btnEditar.className = "btn waves-effect waves-light amber";
    btnEditar.addEventListener('click', e => { this.editarElemento(fila);});
    fila.replaceChild(btnEditar,fila.children[2]);
}

//Esta funcion permite la edicion de la tabla
 editarElemento(fila)
{
    //Se guardan los valores viejos y las celdas se vuelven editables
    let valorAnterior  = fila.children[1].innerHTML;
    fila.children[1].contentEditable = "true";
    //Se crea un boton que al apretarse confirma los cambios, este reemplaza el boton anterior
    let btnGuardar = document.createElement("button");
    btnGuardar.innerHTML = "<i class=\"large material-icons\">check</i>";
    btnGuardar.type = "button";
    btnGuardar.className = "btn waves-effect waves-light green";
    btnGuardar.addEventListener('click', e => { this.guardarCambios(fila, valorAnterior);});
    fila.replaceChild(btnGuardar,fila.children[2]);
}

limpiarTabla(){
    while ((this.tabla.rows.length - 1) > 0)
    {
        this.tabla.deleteRow(-1);
    }
}



iniciarPagina() {
    this.limpiarTabla();
    this.cargarSelector(this.clientUrl,this.client);
    this.cargarSelector(this.productUrl+"/all",this.product);
    document.querySelector('#ticket-submit').addEventListener('click', (event) => {
        event.preventDefault();
        this.agregarServidor();
    });
    document.querySelector('#product-submit').addEventListener('click', (event) => {
        event.preventDefault();
        if(this.productoValido())
        {this.cargar();}
    });
}
}