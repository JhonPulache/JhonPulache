const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const contenedor = document.querySelector('#container');

console.log(contenedor)

console.log(formulario)

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        mostrarAlerta('Agrega un termino de busqueda')
        return;
    }

    buscarGifs();

    mostrarSpinner();
}

function mostrarAlerta(mensaje) {

    const existeAlerta = document.querySelector('.btn-danger');

    if (!existeAlerta) {
        //Crea la alerta
        const alerta = document.createElement('p');
        alerta.classList.add('btn','btn-danger', 'border-danger', 'text-red-700', 'mt-2', 'p-1', 'pt-1', 'rounded', 'max-w-lg',
        'max-auto', 'text-center', 'mt-6');

        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> ${mensaje}</span>
        `;

        formulario.appendChild(alerta);

        setTimeout(() => {
        alerta.remove();
        }, 3000);      
    }  
}

function buscarGifs() {

    const termino = document.querySelector('#termino').value.toLowerCase();

    console.log(termino)

    const key = 'bPrOUHiOVgRyXCQQ98ERtPg9vwAM0CmR';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${termino}`;

    mostrarSpinner();

    fetch(url)
        .then( respuesta => respuesta.json())
        .then ( resultado => { mostrarGifs( resultado.data )} )
}

function mostrarGifs(gifs) {

    limpiarHTML();

    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    gifs.forEach(gif => {

        const { title, images: {fixed_height: {url}} } = gif;

        resultado.innerHTML += `
        <div class="col-md-4">
            <div class="card">
                <img class="card-img-top" src="${url}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                </div>
        </div>
        ` 
        
    });
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

}

function mostrarSpinner() {

    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('lds-circle','mx-auto');

    spinner.innerHTML = `
    <div class="lds-circle">
    <div></div>
    `

    resultado.appendChild(spinner)

    setTimeout(() => {
        spinner.add();
        }, 6000);
        
}