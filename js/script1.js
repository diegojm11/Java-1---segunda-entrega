

const containerDiv = document.querySelector(".container")
const carritoDiv = document.querySelector(".carrito")
const carrito = JSON.parse(localStorage.getItem("carrito"))
const inputSearch = document.querySelector(".inputSearch")
const btnSearch = document.querySelector(".btnSearch")



async function fetchAPI(){
  try{
  const URL = "./data/data.json";
  const response = await fetch (URL);
  const data = await response.json();
  console.log(data);
  crearCards(data);
  
  btnSearch.addEventListener('click',()=>{
  const filtro = filtrarPorMarca(data)
  crearCards(filtro);
  
})

} catch (error){
  console.log(error);
}
}

fetchAPI()



function crearCards (arr){
  arr.forEach(producto=>{
    containerDiv.innerHTML += `<div style="padding: 20px; background-color: white; border: 2px solid black; display: grid; ">
     <h4>${producto.marca}</h4>
     <h4>${producto.modelo}</h4>
     <p>$${producto.precio}</p>
     <img style= "height: 80px" src="${producto.img}" alt="">
     <button style= "margin: 10px; class="btnCarrito" id="btn-agregar${producto.id}">Agregar</button></div>
     `

  })
  agregarFuncionAlBoton(arr);
}

function filtrarPorMarca(arr){
  containerDiv.innerHTML = "";
  let marca = inputSearch.value;
 // let marcaC = marca.charAt(0).toUpperCase()+marca.slice(1);
 if (!marca){
  return arr;
}else{
  return arr.filter((e)=> e.marca.includes(marca))
}
}


function agregarFuncionAlBoton(arr){
  arr.forEach(producto=>{
    document.querySelector(`#btn-agregar${producto.id}`).addEventListener("click",()=>{
      agregarAlCarrito(producto);
    })
  })
}



function agregarAlCarrito(parametro){
  
  carrito.some(prod=> prod.id === parametro.id) ? cantidad++ : parametro.cantidad = 1; carrito.push(parametro);
 
          //    AIUDA !! :
// nose como hacer funcionar el "else" (let prodFind) en el operador ternario de arriba, quizas encerrandolo en una variable pero no pude...
// me tira error cuando apreto agregar por segunda vez, no me lo suma.


  /* 
  let existe = carrito.some(prod=> prod.id === parametro.id);
    if (existe === false) { 
      parametro.cantidad = 1;
      carrito.push(parametro)} 

  else{  let prodFind = carrito.find(prod=> prod.id === parametro.id),
    prodFind.cantidad++
  } */

  
  console.log(carrito);  
  renderizarCarrito()
  
Toastify({
  text: "Agregaste un producto al Carrito",
  duration: 3000,
 /*  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true, */
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "right", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, grey, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
}  


function renderizarCarrito (){
  carritoDiv.innerHTML = "";

  carrito.forEach (prod=>{
    carritoDiv.innerHTML +=  `<div style="padding: 20px; background-color: white; border: 2px solid black; display: grid; ">
     <h4>${prod.marca}</h4>
     <h4>${prod.modelo}</h4>
     <p>$${prod.precio}</p>
     <p>Candidad:${prod.cantidad}</p>
     <img style= "height: 80px" src="${prod.img}" alt="">
     <button id=botonSumar${prod.id}>+</button>
     <button id=botonRestar${prod.id}>-</button>
     <button style= "margin: 10px; class="btnCarrito" id="btn-eliminar${prod.id}">Eliminar</button>
    `
  })
  localStorage.setItem("carrito", JSON.stringify(carrito))
  borrarProducto()
  botonSumar()
  botonRestar()

}

function borrarProducto(){
  carrito.forEach(producto=>{
    document.querySelector(`#btn-eliminar${producto.id}`).addEventListener("click",()=>{
      let indice = carrito.findIndex(element=>element.id === producto.id)
      carrito.splice(indice,1)
      renderizarCarrito()
      Toastify({
        text: "Eliminaste un producto del Carrito",
        duration: 3000,
       /*  destination: "https://github.com/apvarun/toastify-js",
        newWindow: true, */
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, grey, red)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    })
  })
  
}

function botonSumar(){
  carrito.forEach(producto=>{
    document.querySelector(`#botonSumar${producto.id}`).addEventListener("click",()=>{
       carrito.find(element=>element.id === producto.id)
       producto.cantidad++
      renderizarCarrito()
    })
  })  
}

function botonRestar(){
  carrito.forEach(producto=>{
    document.querySelector(`#botonRestar${producto.id}`).addEventListener("click",()=>{
       carrito.find(element=>element.id === producto.id)
       producto.cantidad--
      renderizarCarrito()
    })
  })  
}

renderizarCarrito()

