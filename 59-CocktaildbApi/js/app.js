const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        mostrarAlerta('Agrega un nombre de coctel')
        return;
    }

    buscarCoctel();
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

function buscarCoctel() {

    const termino = document.querySelector('#termino').value.toLowerCase();

    const url = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${termino}`;

    fetch(url)
        .then( respuesta => respuesta.json())
        .then ( resultado => { mostrarCocteles( resultado.drinks )} )
}

function mostrarCocteles(cocteles) {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
    console.log(cocteles)

    cocteles.forEach(coctel => {

        const { strDrink, strCategory, strDrinkThumb, strInstructions } = coctel;
        const ingredientes = [];
        const medidas = []

        // Agregar los ingredientes a un arreglo
        for ( let i = 1; i <= 15; i++ ) {
            if ( coctel [ `strIngredient${i}` ] ) {
                ingredientes.push(coctel[`strIngredient${i}`]);
            } else {
                break;
            }
        }

        // Agregar los ingredientes a un arreglo
        for ( let i = 1; i <= 15; i++ ) {
            if ( coctel [ `strMeasure${i}` ] ) {
                medidas.push(coctel[`strMeasure${i}`]);
            } else {
                break;
            }
        }
  
        const ingredientesStr = ingredientes.join(', ');
        const medidasStr = medidas.join(', ');

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${strDrinkThumb}">

                    <div class="p-4">
                        <p class="font-light"> Nombre: <span class="font-bold"> ${strDrink} </span></p>
                        <p class="font-light"> Categoria: <span class="font-bold"> ${strCategory} </span></p>
                        <p class="font-light"> Ingredientes: <span class="font-bold"> ${ingredientesStr} </span></p>
                        <p class="font-light"> Medidas: <span class="font-bold"> ${medidasStr} </span></p>
                        <p class="font-light"> Instrucciones: <span class="font-bold"> ${strInstructions} </span></p>

                        <a 
                            class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                            href="${strDrinkThumb}" target="_blank" rel="nooopener noreferrer"
                        >
                            VER COCTEL
                        </a>
                    </div>
                </div>
            </div>
        ` 


  


    });

}