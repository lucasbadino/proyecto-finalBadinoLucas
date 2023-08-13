let clave = "usuarios"

document.addEventListener("DOMContentLoaded",() =>{
    if(localStorage.getItem(clave)){
        usuarios = []
        let local_user = localStorage.getItem(clave)
        local_user = JSON.parse(local_user)
        local_user.forEach(e => {
            usuarios.push(e)            
        });
    }
    let login = document.getElementById("bot")
    login.addEventListener("click", e => {
        e.preventDefault()  
        let user = document.querySelector("#user").value
        let pass = document.querySelector("#pass").value
        let val = validar(user, pass)
        if (val) {
            window.location.href = "../pages/prod.html";
        } else {
            Toastify({
                text: "Usuario o contraseña incorrecta",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
        }
    
    })
    
    function validar(user, pass) {
        for (let i = 0; i < usuarios.length; i++) {
            if (user == usuarios[i].usuario) {
                if (pass == usuarios[i].contrasenia) {
                    return true;
                }
            }
        }
        return false
    }
})
