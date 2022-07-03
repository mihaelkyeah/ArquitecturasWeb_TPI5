"use strict";
class carrito{
    constructor() {
        this.postUrl = "http://localhost:8080/ticket/add";
        this.productUrl = "http://localhost:8080/product/all";
        this.product = document.getElementById("carrito-product");
        this.clientUrl = "http://localhost:8080/client/all";
        this.client= document.getElementById("carrito-client");
        this.tabla =document.getElementById("carrito-table");
	}

/**
 * @returns elemento JSON
 * Devuelve un json cargados con los valores leidos del formulario
 */
 armarElemento()
{
    let elemento = {
        "idCliente": document.getElementById("ticket-client").value,
        "total": document.getElementById("ticket-total").value
    }
    return elemento;
}

regresarAnteriores(fila, valoresAnteriores){
    let children = Array.from(fila.children);
    let c = this.tabla.rows[0].cells.length;
    let i = 0;
    children.forEach(child => {
        if ((i+2) < c)
        {
            child.innerHTML = valoresAnteriores[i];
            i++;
        }
    });
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
        option.value = e.idProduct;
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

 cambioValido(fila){
    if (fila.children[1].value <1 || fila.children[1].value > 3)
        {return false;}
    return true;
}

productoValido(){
    if (this.product.value !== "")
        {return true;}
    return false;
}


cargar(){
    //Celdas del producto
    let fila = this.tabla.insertRow(-1);
    let cel = fila.insertCell(0);
    cel.innerHTML =  document.getElementById("carrito-product-qty").value;
    let cel2 = fila.insertCell(0);
    cel2.innerHTML =this.product.value;

    //Crea el boton de editar
    let celEditar = fila.insertCell(0);
    let btnEditar = document.createElement("button");
    btnEditar.innerHTML = "Editar";
    btnEditar.type = "button";

    btnEditar.addEventListener('click', e => { 
        this.editarElemento(fila);
    });
    celEditar.appendChild(btnEditar);
    fila.appendChild(celEditar);

    //Crea el boton de borrar
    let celBorrar = fila.insertCell(0);
    let btnBorrar = document.createElement("button");
    btnBorrar.innerHTML = "Borrar";
    btnBorrar.type = "button";
    btnBorrar.addEventListener('click', e => { 
        this.tabla.removeChild(fila);
    });
    celBorrar.appendChild(btnBorrar);
    fila.appendChild(celBorrar);
    //Agregado de la fila
    this.tabla.appendChild(fila);
}

//Esta funcion deja de permitir la edicion de la tabla y que cambios ocurren
guardarCambios(fila, valoresAnteriores)
{
    //Deja de poder se editable
    let children = Array.from(fila.children);
    let i = 0;
    children.forEach(child => {
        if (child.contentEditable == "true")
        {child.contentEditable = "false";
        i++;}
    });
    //Verifica si esta todo bien
    if (this.cambioValido(fila))
    {
        //Pregunta si esta seguro
        if (!confirm("¿Seguro que desea modificar?"))
        {
            this.regresarAnteriores(fila, valoresAnteriores);
        }
    }
    else {this.regresarAnteriores(fila, valoresAnteriores);}
    //Vuelve a poner el mismo boton que estaba antes, esto se hizo porque si solo modificabas el evento bucleaba
    let btnEditar = document.createElement("button");
    btnEditar.innerHTML = "Editar";
    btnEditar.type = "button";
    btnEditar.addEventListener('click', e => { this.editarElemento(fila);});
    fila.replaceChild(btnEditar,fila.children[i]);
}

//Esta funcion permite la edicion de la tabla
 editarElemento(fila)
{
    //Se guardan los valores viejos y las celdas se vuelven editables
    let valoresAnteriores  = [];
    let children = Array.from(fila.children);
    let c = this.tabla.rows[0].cells.length;
    let i = 0;
    children.forEach(child => {
        if ((i+2) < c)
        {
            valoresAnteriores[i]= child.innerHTML;
            child.contentEditable = "true";
            i++;}
    });
    //Se crea un boton que al apretarse confirma los cambios, este reemplaza el boton anterior
    let btnGuardar = document.createElement("button");
    btnGuardar.innerHTML = "Guardar";
    btnGuardar.type = "button";
    btnGuardar.addEventListener('click', e => { this.guardarCambios(fila, valoresAnteriores);});
    fila.replaceChild(btnGuardar,fila.children[c-2]);
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
    this.cargarSelector(this.productUrl,this.product);
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