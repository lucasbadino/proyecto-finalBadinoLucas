let clave = "productos"

agregar_producto()





function agregar_producto() {
    if (localStorage.getItem(clave)) {
        productos = []
        let store = localStorage.getItem(clave)
        store = JSON.parse(store)
        store.forEach(e => {
            productos.push(e)
        });}

    let bot = document.querySelector("#btn-form")
    bot.addEventListener("click", (e) => {
        let marca = document.querySelector("#marca").value
        let descripcion = document.querySelector("#descripcion").value
        let condicion = document.querySelector("#condicion").value
        let imagen = document.querySelector("#imagen").value
        let stock = document.querySelector("#stock").value
        let precio = document.querySelector("#precio").value
        productos.push(new Producto(productos.length + 1, marca, descripcion, condicion, imagen, stock, precio))
        let nuevo = JSON.stringify(productos)
        localStorage.setItem(clave,nuevo)
    
    window.location.href = "../pages/prod.html";
    })
        

}

