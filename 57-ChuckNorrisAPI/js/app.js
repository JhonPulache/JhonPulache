const categoriasSelect = document.querySelector('#categoria');
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

const objBusqueda = {
    categoria: '',
}

//Crear un Promise
const obtenerCategorias = categorias => new Promise ( resolve => {
    resolve(categorias);

});

document.addEventListener('DOMContentLoaded',() => {
    consultarCategorias();

    formulario.addEventListener('submit', submitFormulario);

    categoriasSelect.addEventListener('change', leerValor);
})

function consultarCategorias() {
    const url = 'https://api.chucknorris.io/jokes/categories';

    // mostrarSpinner();

    fetch(url)
        .then( respuesta => respuesta.json())
        .then ( resultado => obtenerCategorias(resultado))
        .then ( categorias => selectCategorias (categorias) )
}

function selectCategorias(categorias) {
    categorias.forEach(categories => {

        const option = document.createElement('option');
        option.value =categories;
        option.textContent = categories.charAt(0).toUpperCase() + categories.slice(1);

        categoriasSelect.appendChild(option);
    });
}

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;

    console.log(objBusqueda)

}

function submitFormulario(e) {
    e.preventDefault();

    //validar
    const { categoria } = objBusqueda;

    if (categoria ==='') {
        mostrarAlerta('El campo es obligatorio');
        return;
    }

    //consultar la API con los resultados

    consultarApi();
}

function mostrarAlerta(mensaje) {

    const alerta = document.querySelector('.bg-red-100');

    if(!alerta) {
        //Crear la alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3',
        'rounded', 'max-w-md', 'mx-auto', 'text-center', 'mt-6');
        
        alerta.innerHTML = `
        <strong class="font-bold"> Error! </strong>
        <span class="block"> ${mensaje} </span>`;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}
function consultarApi() {
    const { categoria } = objBusqueda;

    const url = `https://api.chucknorris.io/jokes/random?category=${categoria}`;

    Spinner();

    fetch(url)
        .then (respuesta => respuesta.json())
        .then ( frase => {
            mostrarFraseHTML (frase)
        })
}

function mostrarFraseHTML(frase) {

    limpiarHTML();

    const {value, created_at } = frase;

    const fraseTexto = document.createElement('p');
    fraseTexto.innerHTML = `${value}`;
    fraseTexto.classList.add('font-bold','text-4xl');

    const fechaParrafo = document.createElement('P');
    fechaParrafo.classList.add('font-bold', 'text-2x1', 'mt-2')
    fechaParrafo.textContent = 'Fecha de frase: ';
    
    const fechaSpan = document.createElement('SPAN');
    fechaSpan.classList.add('font-normal');
    fechaSpan.textContent = `${created_at}`;

    fechaParrafo.appendChild(fechaSpan)

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(fraseTexto);
    resultadoDiv.appendChild(fechaParrafo);

    resultado.appendChild(resultadoDiv)

}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {

    limpiarHTML();
    
    const divSpinner = document.createElement ('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
    `;

    resultado.appendChild(divSpinner);
    
}


