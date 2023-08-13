
let clave = "usuarios"
let bot = document.querySelector("#bot")
bot.addEventListener("click", e => {
    e.preventDefault();
    let nombre = document.querySelector("#nombre").value
    let apellido = document.querySelector("#apellido").value
    let email = document.querySelector("#email").value
    let edad = parseInt(document.querySelector("#edad").value)
    let usuario = document.querySelector("#usuario").value
    let pass1 = document.querySelector("#pass1").value
    let pass2 = document.querySelector("#pass2").value


    if (pass1 != pass2) {
        Toastify({
            text: "Las contraseñas no cooinciden",
            duration: 3000,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }
    let val = validar(nombre, apellido, email, edad, usuario, pass1, pass2)
    if (val) {
        if(localStorage.getItem(clave)){
            usuarios = []
            let local_user = localStorage.getItem(clave)
            local_user = JSON.parse(local_user)
            local_user.forEach(e => {
                usuarios.push(e)            
            });
        }
        usuarios.push(new User(usuarios.length + 1, usuario, pass1, nombre, apellido, edad, email))
        if (localStorage.getItem(clave)) {

            let local_user = JSON.stringify(usuarios)
            localStorage.setItem(clave, local_user)
        } else {
            localStorage.setItem(clave, "")
            let local_user = JSON.stringify(usuarios)
            localStorage.setItem(clave, local_user)
        }
        window.location.href = "../index.html";
    }

})

function validar(nombre, apellido, email, edad, usuario, pass1, pass2) {
    flag = true
    usuarios.forEach(e => {
        if (usuario == e.usuario) {
            flag = false;
        }
    });
    if (nombre == "" || apellido == "" || email == "" || edad == 0 || isNaN(edad) || usuario == "" || pass1 == "" || pass2 == "") {
        Toastify({
            text: "Debes completar todos los campos o edad incorrecta",
            duration: 3000,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
        return false;
    } else if (!flag) {
        Toastify({
            text: "El Usuario ya existe, Deseas iniciar sesión?",
            duration: 7000,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            destination: "../index.html",
            close: true,
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
        return false;
    }
    return true;
}