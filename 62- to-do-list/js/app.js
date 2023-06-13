const tareaInput = document.querySelector('#tareaInput')
const container = document.querySelector('#container')
const resultado = document.querySelector('#resultado')

let tareas = [];

document.addEventListener('submit', guardarTarea);

function guardarTarea(e) {
    e.preventDefault();
    

    //Validar
    if (tareaInput.value === '') {
        mostrarError('Se debe ingresar una tarea');

        return ; 
    }

    tareas.push(tareaInput.value)

    mostrarTareaHTML(tareaInput.value);
}


function mostrarError(mensaje) {

    const alerta = document.querySelector('.alert');

    if(!alerta) {
        //Crear la alerta
        const alerta = document.createElement('div');

        alerta.classList.add('alert', 'alert-danger', 'mx-auto', 'text-center', 'm-3') ;
        
        alerta.innerHTML = `
        <strong class="font-bold"> Error! </strong><br>
        <span class="block"> ${mensaje} </span>`;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    
}

function mostrarTareaHTML(tarea) {


    const contenedorTarea = document.createElement('DIV');
    contenedorTarea.classList.add('d-flex');

    const divTarea = document.createElement('DIV');
    divTarea.classList.add('d-flex');

    const textoTarea = document.createElement('P')
    textoTarea.classList.add('alert' ,'alert-success','m-3')

    const btnEliminar = document.createElement('BUTTON')
    btnEliminar.classList.add('btn','btn-danger', 'm-3')
    btnEliminar.innerText = 'Eliminar'

    btnEliminar.addEventListener('click', () => {
        textoTarea.classList.add('text-decoration-line-through');
        btnEliminar.classList.add('disabled')
      });

    textoTarea.innerText = tarea;

    resultado.appendChild(contenedorTarea)
    contenedorTarea.appendChild(divTarea)

    divTarea.appendChild(textoTarea)
    divTarea.appendChild(btnEliminar)

    tareaInput.value = ''

}
