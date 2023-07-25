"use strict";

const tabla = document.getElementById("tabla_prductos")
let contador = 0;
//console.log(tabla);

const createJSONProduct= ()=>{
const inputName = document.getElementById("input-name").value;
const inputRef = document.getElementById("input-ref").value;
const inputUrl = document.getElementById("input-img").value;
const inputSize = document.getElementById("input-size").value;
const inputPrice= document.getElementById("input-price").value;

let newProuct={};
newProuct.referencia=inputRef;
newProuct.url=inputUrl;
newProuct.nombre=inputName;
newProuct.talla=inputSize;
newProuct.precio=inputPrice;
 

//console.log(newProuct);  
return newProuct;
}
const addProduct=  ()=>
{

  const product = createJSONProduct();

 fetch('/sesion/agregar', {//igual que la de get solo cambia es el metodo
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(product)
}).then((res)=>{
  console.log('HOALAAAAA')
 console.log(res)
});
 
// const users = await req.json();
  //console.log(users);
   

   

}


const showModal= ()=>{
console.log("registrando");
document.querySelector(".modal-overlay").style.display="block";
document.body.style.overflowY = 'hidden';
document.body.style.overflowX = 'hidden';

}


const shutModal= ()=>{
  console.log("cerrando modal");
document.querySelector(".modal-overlay").style.display="none";
document.body.style.overflowY = 'auto';
document.body.style.overflowX = 'auto';
  
  }

  const createRow = (reference,url,name,size,price)=>
  {
    //console.log("agregando 1");
    const container = document.createElement("TR");
    container.setAttribute("id",reference);
    const ref = document.createElement("TD");
    const imagen = document.createElement("TD");
    const nombre = document.createElement("TD");
    const talla = document.createElement("TD");
    const precio = document.createElement("TD");
    const acciones = document.createElement("TD");
    
    const img = document.createElement("IMG");
    img.setAttribute("src",url); 
    img.classList.add("img-edit");
    
    nombre.innerHTML=`<div>${name}</div>`;
    ref.innerHTML=`<div>${reference}</div>`;
    talla.innerHTML=`<div>${size}</div>`;
    precio.innerHTML=`<div>${price}</div>`;
    imagen.appendChild(img);
    
    const btn_del = document.createElement("A");
    const btn_edit = document.createElement("A");
    const icon_btn_del = document.createElement("I");
    const icon_btn_edit = document.createElement("I");
    
    btn_del.setAttribute("href","#");
    console.log(reference,+' CONSOLE DE LA REFERENCIA')
    btn_del.setAttribute("onclick",`deleteProduct("${reference}")`);
    btn_del.classList.add("btn","btn-danger","btn-circle","btn-sm");
    icon_btn_del.classList.add("fas","fa-trash");
    
    btn_edit.setAttribute("href","#");
    btn_edit.setAttribute("onclick",`editProduct("${reference}")`);
    btn_edit.classList.add("btn","btn-warm","btn-circle","btn-sm");
    icon_btn_edit.classList.add("fa-solid","fa-pen-to-square");
    
    btn_edit.appendChild(icon_btn_edit);
    btn_del.appendChild(icon_btn_del);
    acciones.appendChild(btn_del);
    acciones.appendChild(btn_edit);
    
    
    precio.children[0].addEventListener("dblclick",()=>{ editTable(reference)});
    talla.children[0].addEventListener("dblclick",()=>{ editTable(reference)});
    nombre.children[0].addEventListener("dblclick",()=>{ editTable(reference)});
    
    
    container.appendChild(ref);
    container.appendChild(imagen);
    container.appendChild(nombre);
    container.appendChild(talla);
    container.appendChild(precio);
    container.appendChild(acciones);
    
    
    return container;
  
  }

const cargarMasPublis =  entry =>{
    if (entry[0].isIntersecting) cargarPublicaciones(10)      
}

const observar = new IntersectionObserver(cargarMasPublis);
const cargarPublicaciones = async num =>{
    const   requestFetch = await fetch("/sesion/productos",{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

      }) ;
    const content = await requestFetch.json();
    console.log(content+' Esta es la impresion del content');
    const arr =  content;
    console.log(arr);
    const docFragment= document.createDocumentFragment();
   
    for (let i = 0; i < num; i++) {
       if (arr[contador] != undefined){
      //  console.log(arr[0].referencia)
      const newPublicacion=createRow(arr[contador].referencia,arr[contador].url,arr[contador].nombre,arr[contador].talla,arr[contador].precio);
      docFragment.appendChild(newPublicacion);
      contador++;
      if (i == num-1) observar.observe(newPublicacion);
      }else{
        let notMore = document.createElement("h3");
        notMore.style.margin="auto";
        notMore.style.padding="20px";
        notMore.style.width="min-content"
        notMore.textContent=`No hay mas Publicaciones`;
        docFragment.appendChild(notMore);
        observar.disconnect(); //detiene la obsercacion de todos los elementos
       break;
  
      }
      console.log(docFragment);
    }

    tabla.appendChild(docFragment);
}

cargarPublicaciones(20);




const deleteProduct = async (id) => {
  let identificador=id;
  if(typeof (id) ==typeof('string')) identificador=id;
  else identificador=id.children[0].children[0].innerHTML;
  
 
  if(confirm("¿Desea elimina este producto?"))
  {

    const req = await fetch('/sesion/'+identificador, { 
           method: 'DELETE',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           }
           
         });
  //await location.reload();//PARA RECARGAR LA PAGINA
  if (req.statusText == "OK") console.log("SE ELIMINÓ CORRECTAMENTE");
  }else{
  //console.log("eliminacion cancelada");
  }


}


const editTable = (id) => {
  console.log("editando "+ id)
  var  ROW = document.getElementById(`${id}`);
  console.log(ROW+' CONSOLE DEL ID al momento de empezara editar');
  var textoNombre = ROW.children[2].firstElementChild.textContent;
  var textPrecio=ROW.children[4].firstElementChild.textContent;
  var textSize=ROW.children[3].firstElementChild.textContent;
  console.log(textoNombre);
  console.log(textPrecio);
  console.log(textSize);

  var inputname = document.createElement('INPUT');
  inputname.type = 'text';
  inputname.value = textoNombre;

  var inputprice = document.createElement('INPUT');
  inputprice.type = 'text';
  inputprice.value = textPrecio;

  var inputsize = document.createElement('INPUT');
  inputsize.type = 'text';
  inputsize.value = textSize;


  ROW.children[2].replaceChild(inputname,ROW.children[2].firstElementChild);
  

  ROW.children[3].replaceChild(inputsize,ROW.children[3].firstElementChild);
  

  ROW.children[4].replaceChild(inputprice,ROW.children[4].firstElementChild);
 



  
}
 
const editProduct = async (id) => {
 console.log('ESTE ES EL ID '+id)
//LA REGLA SOLO APLICA PARA LA SEGUNDA PRENDA EN ADELANTE 
    let identificador=id;

    if(typeof id =="string")  identificador=id ;
    //else identificador=id.children[0].children[0].innerHTML
  console.log(identificador+'SOY un identificador')
    const  ROW = document.getElementById(`${identificador}`);
   
    console.log(ROW+' impresion del row a editar')
let newProuct={}  
 
 
newProuct.nombre=ROW.children[2].firstElementChild.value;
newProuct.talla=ROW.children[3].firstElementChild.value;
newProuct.precio=ROW.children[4].firstElementChild.value;
  

console.log(newProuct);
    const req = await fetch('sesion/'+identificador, {//igual que la de get solo cambia es el metodo
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProuct)
      });
      const res = await req.text();
      //console.log(res);
      if (req.ok) {
        window.location.reload();
      }



}