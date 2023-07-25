
"use strict";

const tabla = document.getElementById("podructos");
let contador = 0;

const createPublication = (reference,muestra,name,size,price)=>
{
  //console.log("agregando 1");
const container = document.createElement("DIV");
container.classList.add("card","mb-3");
container.style.height="min-content";
container.style.maxWidth= "400px";
container.setAttribute("id",reference);

const row = document.createElement("DIV");
row.classList.add("row","g-0");

const imgCol = document.createElement("DIV");
imgCol.classList.add("c-img","col-md-4");

const textCol = document.createElement("DIV");
textCol.classList.add("col-md-8");

const card = document.createElement("DIV");
card.classList.add("card-body");


const imagen = document.createElement("IMG");
imagen.src= muestra
//imagen.setAttribute("src",url); 
imagen.classList.add("img-fluid","rounded-start");


const nombre = document.createElement("H5");
nombre.innerHTML=`${name}`;
nombre.classList.add("card-title");
const texto = document.createElement("P");
texto.classList.add("card-text")
texto.innerHTML=`Talla: ${size} <br> Precio: ${price}` ;

card.appendChild(nombre);
card.appendChild(texto);

textCol.appendChild(card);
imgCol.appendChild(imagen);


row.appendChild(imgCol);
row.appendChild(textCol);


container.appendChild(row);

return container;

}


const cargarMasPublis =  entry =>{
    if (entry[0].isIntersecting) cargarPublicaciones(10)      
}



const observar = new IntersectionObserver(cargarMasPublis);
const cargarPublicaciones = async num =>{
    const   requestFetch = await fetch("/home/catalogo",{//AQUI VA LA API 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

      }) ;
    const content = await requestFetch.json();
    console.log(content);
    const arr =  content;
    console.log(arr);
    const docFragment= document.createDocumentFragment();
   
    for (let i = 0; i < num; i++) {
       if (arr[contador] != undefined){
      const newPublicacion=createPublication(arr[contador].referencia,arr[contador].muestra,arr[contador].nombre,arr[contador].talla,arr[contador].precio);
      docFragment.appendChild(newPublicacion);
      contador++;
      if (i == num-1) observar.observe(newPublicacion);
      }else{     
        observar.disconnect(); //detiene la obsercacion de todos los elementos
       break;
  
      }
      console.log(docFragment);
    }

    tabla.appendChild(docFragment);
}

cargarPublicaciones(10);

