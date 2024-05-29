import { getData } from "./peticionesJsonServer.js";

const d = document;
const contenedorCartas = d.querySelector('.contenedor_productos');
const menu = d.querySelector('.header')

d.addEventListener('DOMContentLoaded', async (e) => {
  // Cargar los productos
  try {
    const data = await getData();
    if(!data) contenedorCartas.innerHTML = '<h2> Ocurrio un error al cargar la información. </h2> '
   
    data.forEach( (figura) => {
      let figuraHtml = `
      <div class="producto">
      <div class="imagen_producto">
        <img src="${figura.Imagen}" alt="Imagen alusiva al producto" class="imagen1">
        <img src="${figura.Imagen}" alt="Imagen alusiva al producto" class="imagen2">
      </div>
      <div>
        <h3 class="nombre_producto">${figura.nombre}</h3>
        <p> ${figura.modelo} </p> 
      </div>
      <div class="descripcion_producto">
        <p class="precio_producto"> <span>$</span> ${figura.precio} </p>
        <i class="bi bi-cart-plus-fill"></i>
      </div>
      </div>`
      contenedorCartas.innerHTML += figuraHtml;
  });

  } catch (error) {
    console.log(error)
    contenedorCartas.innerHTML = '<h2> Ocurrio un error al cargar la información.</h2> '
  }
});


d.addEventListener('click' , (e) => {
  if(e.target.matches('.bi-list')){
    // Mostar lista de menu
    menu.classList.toggle('header_menu_visible')
  }
})