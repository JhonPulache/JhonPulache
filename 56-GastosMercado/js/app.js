//variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
const miImgDiv = document.querySelector('#miDiv')

console.log(miImgDiv)
// eventos
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);

    formulario.addEventListener ('submit', agregarGasto);
}

// classes
class Presupuesto {
    constructor (presupuesto) {
        this.presupuesto = Number (presupuesto);
        this.restante = Number (presupuesto);
        this.gastos = [];
    }

    nuevoGasto (gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce ( (total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;

        console.log(this.restante);
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter( gasto => gasto.id !== id );
        this.calcularRestante();

        console.log(this.gastos);
    }
}

class UI {
    insertarPresupuesto ( cantidad ){
        const { presupuesto, restante } = cantidad;

        document.querySelector ('#total').textContent = presupuesto;
        document.querySelector ('#restante').textContent = restante;
    }
    
    imprimirAlerta(mensaje, tipo) {
        // crear el div
        const divMensaje = document.createElement ('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error 
        divMensaje.textContent = mensaje;

        //Insertar en el HTML
        document.querySelector('.primario').insertBefore (divMensaje, formulario);

        //Quitar del html
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarGastos(gastos) {
        // console.log(gastos)

        this.limpiarHTML()

        //Iterar sobre los gastos
        gastos.forEach(gasto => {
            const { cantidad, nombre, id } = gasto;

            //Crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            //Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>`

            //Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = ' Borrar &times';
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar)

            //Agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        });
    }

    limpiarHTML() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }

        while (miImgDiv.firstChild) {
            miImgDiv.removeChild(miImgDiv.firstChild)
        }
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj;

        const restanteDiv = document.querySelector('.restante');

        const imagenDiv = document.querySelector('.imagen');

        const imagen = document.createElement("IMG");

        //Comprobar 25%
        if ( (presupuesto / 4) > restante ) {
            restanteDiv.classList.remove('alert-success','alert-warning');
            restanteDiv.classList.add('alert-danger');
            imagenDiv.classList.remove('alert-success','alert-warning','d-none');
            imagenDiv.classList.add('alert-danger')

            //Creamos imagen 
            imagen.src = "img/avisoRojo.jpg"
            //Insertamos imagen al div
            imagenDiv.appendChild(imagen)

        } else if ((presupuesto / 2) > restante){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
            imagenDiv.classList.remove('alert-success','d-none');
            imagenDiv.classList.add('alert-warning');

            //Creamos imagen 
            imagen.src = "img/avisoAmarillo.jpg"
            //Insertamos imagen al div
            imagenDiv.appendChild(imagen)

        } else {
            restanteDiv.classList.remove('alert-danger','alert-warning');
            restanteDiv.classList.add('alert-success');
            imagenDiv.classList.remove('alert-danger','alert-warning','d-none');
            imagenDiv.classList.add('alert-success');

            //Creamos imagen 
            imagen.src = "img/avisoVerde.jpg"
            //Insertamos imagen al div
            imagenDiv.appendChild(imagen)
        }

        //Si el total es 0 o menor
        if(restante <= 0){
            ui.imprimirAlerta('El presupuesto se ha agotado','error');

            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}

// instanciar
const ui = new UI();
let presupuesto;

// funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');

    console.log( Number (presupuestoUsuario ));

    //validacion si presupuesto esta vacio
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ){
        window.location.reload();
    }

    //Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
    e.preventDefault();

    //Leer datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number (document.querySelector('#cantidad').value);

    // validar
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos son obligatorios', 'error');
    } else if ( cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no valida','error');

        return;

    }

    //Generar un objeto de tipo gasto

    const gasto = { nombre, cantidad, id: Date.now() }

    //añade nuevo gasto
    presupuesto.nuevoGasto(gasto);

    //Todo bien
    ui.imprimirAlerta('Gasto agregado correctamente')

    // Pasa los gastos para que se impriman...
    const { gastos, restante } = presupuesto;
    
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);

    //Reinicia formulario
    formulario.reset();
}

function eliminarGasto(id) {

    // Elimina del objeto
    presupuesto.eliminarGasto(id);

    //Elimina los gastos del HTML
    const { gastos, restante } = presupuesto;
    ui.mostrarGastos( gastos );
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}