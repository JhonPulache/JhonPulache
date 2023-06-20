let usuario = {
    email: '',
    password: '',
};

// Comprobar si ya hay datos del usuario en localStorage
const datosUsuario = localStorage.getItem('usuario');
if (datosUsuario) {
    usuario = JSON.parse(datosUsuario);
}

const btnLogin = document.querySelector('#login');
if (btnLogin) {
    btnLogin.addEventListener('click', iniciarSesion);
}

const btnCrear = document.querySelector('#crear-usuario');
if (btnCrear) {
    btnCrear.addEventListener('click', crearUsuarioHTML);
}

const btnRegistro = document.querySelector('#registro');
if (btnRegistro) {
    btnRegistro.addEventListener('click', crearUsuario);
}

function crearUsuarioHTML() {
    window.location.href = 'crear-usuario.html';    
}

function crearUsuario() {
    const email = document.querySelector('#email-user').value;
    const password = document.querySelector('#password-user').value;
    const password2 = document.querySelector('#password-user-repeat').value;

    //Revisar si hay campos vacios mediante el Array methods
    const camposVacios = [ email , password ].some ( campo => campo === '' );
    const passwordError = password !== password2;

    if (camposVacios) {
        //Verificar si existe alerta
        const existeAlerta = document.querySelector('.alert');

        if (!existeAlerta) {
            const alerta = document.createElement('div');
            alerta.classList.add('alert', 'alert-danger', 'text-center');
            alerta.textContent = 'Todos los campos son obligatorios';
            document.querySelector('form .alerta').appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
        return;
    }

    if(passwordError){

        const existeAlerta = document.querySelector('.alert');

        if (!existeAlerta) {
            const alerta = document.createElement('div');
            alerta.classList.add('alert', 'alert-danger', 'text-center');
            alerta.textContent = 'Los passwords no coinciden';
            document.querySelector('form .alerta').appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
        return;
    }

    //Asiganr datos del formulario a cliente
    usuario = { ...usuario, email, password }

    // Guardar datos del usuario en localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    setTimeout(() => {
        window.location.href = 'index.html'; 
    }, 1000);

}

function iniciarSesion() {

    const email = document.querySelector('#email-user').value;
    const password = document.querySelector('#password-user').value;

    //Revisar si hay campos vacios mediante el Array methods
    const camposVacios = [ email , password ].some ( campo => campo === '' );
    const ingresoError = email !== usuario.email || password !== usuario.password
    const ingresoExito = email === usuario.email && password === usuario.password

    if (camposVacios) {
        //Verificar si existe alerta
        const existeAlerta = document.querySelector('.alert');

        if (!existeAlerta) {
            const alerta = document.createElement('div');
            alerta.classList.add('alert', 'alert-danger', 'text-center');
            alerta.textContent = 'Todos los campos son obligatorios';
            document.querySelector('form .alerta').appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
        return;
    }

    if (ingresoError) {
        //Verificar si existe alerta
        const existeAlerta = document.querySelector('.alert');

        if (!existeAlerta) {
            const alerta = document.createElement('div');
            alerta.classList.add('alert', 'alert-danger', 'text-center');
            alerta.textContent = 'Este usuario no se encuentra registrado';
            document.querySelector('form .alerta').appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
        return;
    }

    if (ingresoExito) {
        //Verificar si existe alerta
        const existeAlerta = document.querySelector('.alert');

        if (!existeAlerta) {
            const alerta = document.createElement('div');
            alerta.classList.add('alert', 'alert-success', 'text-center');
            alerta.textContent = 'Ingreso exitoso!';
            document.querySelector('form .alerta').appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
        return;
    }




}