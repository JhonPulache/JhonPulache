const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const tipo = document.querySelector ('#tipo');

console.log(tipo)

let tipoBusqueda = '';

tipo.addEventListener('change', e => {
    tipoBusqueda = e.target.value;

    buscarTipoPokemon()
})

function buscarTipoPokemon() {

    const url = `https://pokeapi.co/api/v2/type/${tipoBusqueda}`;

    mostrarSpinner()

    fetch(url)
        .then( respuesta => respuesta.json())
        .then ( resultado => {
            const pokemonesLista = resultado.pokemon.map ( pokemon => {
                const nombre = pokemon.pokemon.name;
                const pokemonUrl = pokemon.pokemon.url;

                return fetch (pokemonUrl)
                .then(respuesta => respuesta.json())
                .then( pokemonData => {
                    const spritesUrl = pokemonData.sprites.front_default;
                    return { nombre, spritesUrl}
                })
            });

            Promise.all(pokemonesLista)
                .then ( resultados => { mostrarTipoPokemon( resultados )} )
                })
}

function mostrarTipoPokemon(pokemones) {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    pokemones.forEach(pokemon => {

        const { nombre, spritesUrl } = pokemon;


        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
            <img class="w-full" src="${spritesUrl}">
                <div class="bg-white">
                    <div class="p-4">
                        <p class="font-light"> Nombre: <span class="font-bold"> ${nombre.charAt(0).toUpperCase() + nombre.slice(1)} </span></p>
                    </div>
                </div>
                </div>
            </div>
        ` 
        
    });
} 

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        mostrarAlerta('Agrega un id o nombre del pokemon')
        return;
    }

    buscarPokemon()
}

function mostrarAlerta(mensaje) {

    const existeAlerta = document.querySelector('.bg-red-100');

    if (!existeAlerta) {
        //Crea la alerta
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg',
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

function buscarPokemon() {

    const termino = document.querySelector('#termino').value.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${termino}`;

    fetch(url)
        .then( respuesta => respuesta.json())
        .then ( resultado => { mostrarPokemon( resultado )} )
}

function mostrarPokemon(pokemon) {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    console.log(pokemon)

    const { name } = pokemon.species
    const { front_default } = pokemon.sprites
    const tipos = pokemon.types.map (tipo => tipo.type.name).join(', ');

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${front_default}">

                    <div class="p-4">
                        <p class="font-light"> Nombre: <span class="font-bold"> ${name.charAt(0).toUpperCase() + name.slice(1)} </span></p>
                        <p class="font-light"> Tipo: <span class="font-bold"> ${tipos.charAt(0).toUpperCase() + tipos.slice(1)} </span></p>

                        <a 
                            class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                            href="${front_default}" target="_blank" rel="nooopener noreferrer"
                        >
                            Ver Pokemon
                        </a>
                    </div>
                </div>
            </div>
        ` 
}

function mostrarSpinner() {

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