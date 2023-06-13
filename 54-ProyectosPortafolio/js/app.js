// Variables
// Lleva # en el querySelector porque es el id
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector ('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const pagarCarritoBtn = document.querySelector('#pagar-carrito');
const listaProductos = document.querySelector('#lista-productos');

let articulosCarrito = [];

cargarEventListener();

function cargarEventListener() {
    //EventListener cuando agregas curso presionando el boton "Agregar al carrito"
    listaProductos.addEventListener('click', agregarProducto);
    
    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarProducto);

    //Vaciar el carrito de compras
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //Pagar el carrito de compras
    pagarCarritoBtn.addEventListener('click', pagarCarrito);
}

// Lista de funciones
function agregarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado)
    }
    
}

function eliminarProducto(e) {
    if (e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( producto => producto.id !== productoId );

        carritoHTML();
        console.log(articulosCarrito)
    }
}

function vaciarCarrito() {
    articulosCarrito = [];

    carritoHTML();
}

function pagarCarrito() {

    cantidadTotal();
    carritoHTML();
}

//Lee el contenido y extrae la informacion del producto
function leerDatosProducto(productoSeleccionado) {
    // console.log(cursoSeleccionado)

    //Crear un objeto con la data del curso seleccionado
    const infoProductoSeleccionado = {
        imagen: productoSeleccionado.querySelector('img').src,
        titulo: productoSeleccionado.querySelector('h4').textContent,
        precio: productoSeleccionado.querySelector ('.precio span').textContent,
        id: productoSeleccionado.querySelector ('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si elemento existe
    const existe = articulosCarrito.some( producto => producto.id === infoProductoSeleccionado.id );

    console.log(existe)

    if(existe) {
        //Actualizamos la cantidad
        const productos = articulosCarrito.map( producto => {

            

            if (producto.id === infoProductoSeleccionado.id){
                producto.cantidad++;
                producto.precio = producto.precio * producto.cantidad;
                return producto;
            } else {
                return producto;
            }

        });

        articulosCarrito = [...productos]
    } else {
        articulosCarrito = [...articulosCarrito, infoProductoSeleccionado];
    }


    console.log(articulosCarrito)

    //Agregar los cursosseleccionados al carrito
    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( producto => {
        const {imagen, titulo, precio, cantidad, id} = producto; 
        const row = document.createElement ('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>

        <td>
            <a href="#" class="borrar-producto" data-id="${id}"> X </a>
        </td>
        `;

        contenedorCarrito.appendChild(row)
    });
}

function limpiarHTML() {
    //     Forma lenta
    //     contenedorCarrito.innerHTML = '';
    
        while (contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild)
            
        }
}

function cantidadTotal() {

    let cantidadTotal = 0;

    for (let i = 0; i < articulosCarrito.length; i++) {
        cantidadTotal += parseInt(articulosCarrito[i].precio);
    }

    const alertaPago = window.alert(`El pago total es de: ${cantidadTotal}`)


}