
const productos = [ 
    {id: 2, marca: "fender", modelo: "telecaster", precio: 1700, img: "./img/telecaster.jpg"},
    {id: 3, marca: "fender", modelo: "jaguar", precio: 1500, img:"./img/jaguar.jpg" },
    {id: 4, marca: "fender", modelo: "mustang", precio: 1300, img:"./img/mustang.jpg"},
    {id: 5, marca: "gibson", modelo: "les paul", precio: 2500, img: "./img/lespaul.jpg"},
    {id: 6, marca: "gibson", modelo: "sg", precio: 1800, img:"./img/sg.jpg"},
    {id: 7, marca: "gibson", modelo: "335", precio: 4000, img:"./img/335.jpg"},
    {id: 8, marca: "gibson", modelo: "explorer", precio: 2000, img:"./img/explorer.jpg"},
];


const containerDiv = document.querySelector(".container")
const carritoDiv = document.querySelector(".carrito")
const carrito = JSON.parse(localStorage.getItem("carrito"))

function crearCards (){
  productos.forEach(producto=>{
    containerDiv.innerHTML += `<div style="padding: 20px; background-color: white; border: 2px solid black; display: grid; ">
     <h4>${producto.marca}</h4>
     <h4>${producto.modelo}</h4>
     <p>$${producto.precio}</p>
     <img style= "height: 80px" src="${producto.img}" alt="">
     <button style= "margin: 10px; class="btnCarrito" id="btn-agregar${producto.id}">Agregar</button></div>
     `

  })
  agregarFuncionAlBoton();
}

function agregarFuncionAlBoton(){
  productos.forEach(producto=>{
    document.querySelector(`#btn-agregar${producto.id}`).addEventListener("click",()=>{
      agregarAlCarrito(producto);
    })
  })
}



function agregarAlCarrito(parametro){
  
  carrito.some(prod=> prod.id === parametro.id) ? cantidad++ : parametro.cantidad = 1; carrito.push(parametro);
 
  /* 
  let existe = carrito.some(prod=> prod.id === parametro.id);

  if (existe === false) { 
      parametro.cantidad = 1;
      carrito.push(parametro)} 

  else{  
    let prodFind = carrito.find(prod=> prod.id === parametro.id),prodFind.cantidad++
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
crearCards();
