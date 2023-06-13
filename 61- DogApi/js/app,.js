const razasSelect = document.querySelector('#raza');
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

const objBusqueda = {
    raza: '',
}


document.addEventListener('DOMContentLoaded',() => {
    consultarRazas();

    formulario.addEventListener('submit', buscarPerro);

    razasSelect.addEventListener('change', leerValor);
})

function consultarRazas() {
    const url = 'https://dog.ceo/api/breeds/list/all';

    fetch(url)
        .then( respuesta => respuesta.json())
        .then ( resultado => obtenerRazas(resultado.message))
}

function obtenerRazas(razas) {
    for (const raza in razas) {
        const option = document.createElement('option');
        option.value = raza;
        option.text = raza;

        razasSelect.appendChild(option)    
    }
}

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
}

function buscarPerro(e) {
    e.preventDefault();

    //Validar
    const { raza } = objBusqueda;

    if (raza === '') {
        mostrarError('La selección de raza es obligatorio');

        return; 
    }
    
    consultarApi()
}

function consultarApi() {
    const { raza } = objBusqueda;

    const url = `https://dog.ceo/api/breed/${raza}/images/random`;

    limpiarHTML()

    fetch(url)
        .then (respuesta => respuesta.json())
        .then ( imgPerro => mostrarPerroHTML (imgPerro))
}

function mostrarPerroHTML(imgPerro) {

    const {message} = imgPerro;

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('container', 'd-flex', 'justify-content-center', 'align-items-center')


    const imagenPerro = document.createElement('img');
    imagenPerro.src = message;
    imagenPerro.classList.add ('img-fluid', 'rounded')

    imgDiv.appendChild(imagenPerro);

    resultado.appendChild(imgDiv)
}

function mostrarError(mensaje) {

    const alerta = document.querySelector('.alert');

    if(!alerta) {
        //Crear la alerta
        const alerta = document.createElement('div');

        alerta.classList.add('alert', 'alert-danger', 'w-25', 'mx-auto', 'text-center') ;
        
        alerta.innerHTML = `
        <strong class="font-bold"> Error! </strong><br>
        <span class="block"> ${mensaje} </span>`;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

