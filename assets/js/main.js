import { getData,cargarProducto, eliminarProducto } from "./peticionesJsonServer.js";

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
            
              <div class="descripcion_producto">
                <p class="precio_producto"> <span>$</span> ${figura.precio} </p>
                <i class="bi bi-trash-fill" data-id="${figura.id}"></i>
              </div>
          </div>
      </div>`

      contenedorCartas.innerHTML += figuraHtml;
  });

  } catch (error) {
    console.log(error)
    contenedorCartas.innerHTML = '<h2> Ocurrio un error al cargar la información.</h2> '
  }
});


async function manejadorSubmit(e) {
  try {
    const producto = {
      nombre: e.target.nombre_producto.value,
      modelo: e.target.modelo_producto.value,
      precio : e.target.precio_producto.value,
      tamaño : e.target.tamanio_producto.value,
      Imagen : e.target.imagen_producto.value
    }
    const crearProducto = await cargarProducto(producto);  
    if(crearProducto) alert('Producto creado con exitosamente.')
  } catch (error) {
    alert('Ocurrio un error al crear el producto, intenta de nuevo.')
  }
}

d.addEventListener("submit" , async (e) => {
  e.preventDefault();
  if(e.target.matches('.formulario_productos')){
    // Datos del producto
    manejadorSubmit(e)
  }
});


async function manejadorEliminarProducto (id) {
  try {
    const res = await eliminarProducto(id)
    res ? alert('Producto eliminado exitosamente') : alert('Ocurrio un error al eliminar el producto.')
  } catch (error) {
    alert('Ocurrio un error al eliminar el producto.')
  }
}


d.addEventListener('click', (e) => {
  if(e.target.matches('.bi-trash-fill')){
    const id = e.target.getAttribute('data-id');
    manejadorEliminarProducto(id);
  }
  
if(e.target.matches('.bi-list')){
      // Mostar lista de menu
      menu.classList.toggle('header_menu_visible')
}
    
  });



