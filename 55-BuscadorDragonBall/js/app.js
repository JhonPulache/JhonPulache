// Variables
const raza = document.querySelector ('#raza');
const genero = document.querySelector ('#genero');
const vida = document.querySelector ('#vida');
const ataque = document.querySelector ('#ataque');
const defensa = document.querySelector ('#defensa');
const ki = document.querySelector ('#ki');

// Contenedor de resultado
const resultado = document.querySelector ('#resultado');


//Genera un objeto de busqueda
const datosBusqueda = {
    raza : '',
    genero : '',
    vida : '',
    ataque : '',
    defensa : '',
    ki : '',
}

// Eventos
document.addEventListener('DOMContentLoaded',() => {
    mostrarPersonajes(personajes);

    llenarSelect();
})

//Listener de las opciones marcadas y grabadas en el objeto datosBusqueda
raza.addEventListener('change', e => {
    datosBusqueda.raza = e.target.value;

    filtrarPersonaje();
});

genero.addEventListener('change', e => {
    datosBusqueda.genero = e.target.value;

    filtrarPersonaje();
});

vida.addEventListener('change', e => {
    datosBusqueda.vida = e.target.value;

    filtrarPersonaje();
});

ataque.addEventListener('change', e => {
    datosBusqueda.ataque = e.target.value;

    filtrarPersonaje();
});

defensa.addEventListener('change', e => {
    datosBusqueda.defensa = e.target.value;

    filtrarPersonaje();
});

ki.addEventListener('change', e => {
    datosBusqueda.ki = e.target.value;

    filtrarPersonaje();
});

//Funciones
function mostrarPersonajes(personajes) {

    limpiarHTML();

    personajes.forEach( personaje => {
        
        const { raza, name, genero, vida, ataque, defensa, ki, img } = personaje;
        const personajeContenedor = document.createElement('DIV');
        const personajeTexto = document.createElement('P');
        const personajeImgHTML = document.createElement('img')

        personajeContenedor.style.borderTop = '1px solid black';
        personajeContenedor.style.marginTop = '25px';

        personajeTexto.textContent = `
        ${name} - Raza: ${raza} - Genero: ${genero} - Vida: ${vida} - Ataque: ${ataque} - Defensa: ${defensa} - Ki: ${ki}` ;

        personajeImgHTML.src = `${img}`;
        personajeImgHTML.style.margin = 'auto'
        personajeImgHTML.style.display = 'block'
        personajeImgHTML.style.width = '15%'
        personajeImgHTML.style.heiht = '15%'

        personajeContenedor.appendChild(personajeTexto);
        personajeContenedor.appendChild(personajeImgHTML);
        
           //insertar en el HTML
        resultado.appendChild(personajeContenedor);
    });
}

//Limpiar HTML
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
        
    }
}

//Genera los select
function llenarSelect() {
  personajes.forEach( personaje => {

        for (let i = personaje.vida; i >= personaje.vida ; i--) {
            const opcion = document.createElement('option');
            opcion.value = i;
            opcion.textContent = i;
            vida.appendChild(opcion);
            }

        for (let i = personaje.ataque; i >= personaje.ataque ; i--) {
            const opcion = document.createElement('option');
            opcion.value = i;
            opcion.textContent = i;
            ataque.appendChild(opcion);
            }

        for (let i = personaje.defensa; i >= personaje.defensa ; i--) {
            const opcion = document.createElement('option');
            opcion.value = i;
            opcion.textContent = i;
            defensa.appendChild(opcion);
            }
            
        for (let i = personaje.ki; i >= personaje.ki ; i--) {
            const opcion = document.createElement('option');
            opcion.value = i;
            opcion.textContent = i;
            ki.appendChild(opcion);
            } 
        
    });
}

//Funcion que filtra en base a la marca
function filtrarPersonaje() {
    const resultado = personajes.filter( filtrarRaza).filter( filtrarGenero ).filter( filtrarVida ).filter( filtrarAtaque)
                            .filter (filtrarDefensa).filter( filtrarKi)

    mostrarPersonajes(resultado);

    if(resultado.length ){
        mostrarPersonajes(resultado);
    } else {
        noResultado()
    }
}

function noResultado() {

    limpiarHTML(); 
    
    const noResultado = document.createElement('DIV');
    noResultado.classList.add( 'alerta', 'error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado)
    
}

function filtrarRaza(personaje) {
    const { raza } = datosBusqueda;
    if (raza){
        return personaje.raza === raza;
    }
    return personaje;
}

function filtrarGenero(personaje) {
    const { genero } = datosBusqueda;
    if (genero){
        return personaje.genero === genero;
    }
    return personaje;
}

function filtrarVida(personaje) {
    const { vida } = datosBusqueda;
    if (vida){
        return personaje.vida == vida;
    }
    return personaje;
}

function filtrarAtaque(personaje) {
    const { ataque } = datosBusqueda;
    if (ataque){
        return personaje.ataque == ataque;
    }
    return personaje;
}

function filtrarDefensa(personaje) {
    const { defensa } = datosBusqueda;
    if (defensa){
        return personaje.defensa == defensa;
    }
    return personaje;
}

function filtrarKi(personaje) {
    const { ki } = datosBusqueda;
    if (ki){
        return personaje.ki == ki;
    }
    return personaje;
}