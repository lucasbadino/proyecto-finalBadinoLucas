let clave = "productos"
let clave2 = "carrito"


mostrar_productos(productos)
buscador()



function formatear_html(valor) {
    while (valor.firstChild) {
        valor.removeChild(valor.firstChild)
    }
}

function mostrar_productos(valor) {
    if (localStorage.getItem(clave)) {
        valor = []
        let store = localStorage.getItem(clave)
        store = JSON.parse(store)

        store.forEach(e =>
            valor.push(e)
        );
    }
    let div = document.querySelector("#div")
    formatear_html(div)
    valor.forEach(e => {
        let div = document.querySelector("#div")
        let prod = document.createElement("div")
        prod.id = `prod-${e.id}`
        prod.innerHTML = `
        <div class="row p-2 bg-white border rounded">
                <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image"
                    src="${e.img}">
                </div>
                <div class="col-md-6 mt-1">
                  <h5>${e.marca}</h5>
                  <div class="d-flex flex-row">
                    <div class="ratings mr-2"><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                        class="fa fa-star"></i><i class="fa fa-star"></i></div><span>Stock ${e.stock}</span>
                  </div>
                  <p class="text-justify text-truncate para mb-0">${e.descripcion}<br><br></p>
                </div>
                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                  <div class="d-flex flex-row align-items-center">
                    <h4 class="mr-1">$ ${e.precio}</h4><span class="strike-text">$ ${Math.round(e.precio * 1.12)}</span>
                  </div>
                  <h6 class="text-success">Envio Gratis</h6>
                  <a id=""href="javascript:traer_item(${e.id})" class="btn btn-primary">Agregar al carrito</a>
                </div>
              </div>`
        div.appendChild(prod)
    });
}

function buscador() {
    document.querySelector("#buscar").addEventListener("keyup", () => {
        let buscar = document.querySelector("#buscar").value
        let prod = productos.filter(e =>
            e.marca.toLowerCase().includes(buscar.toLowerCase()) ||
            e.descripcion.toLowerCase().includes(buscar.toLowerCase())
        )
        mostrar_productos(prod)
    })
}


function traer_item(id) {
    let prod = document.querySelector("#prod-" + id)
    let marca = prod.querySelector("h5").textContent;
    let descripcion = prod.querySelector(".para").textContent;
    let img = prod.querySelector("img").src;
    let precio = prod.querySelector("h4").textContent.substring(1, prod.querySelector("h6").textContent.length);
    let n_prod = new Carrito(id, marca, descripcion, img, precio)
    agregar_carrito(n_prod)
}

function agregar_carrito(producto) {
    if (localStorage.getItem(clave2)) {
        compras = []
        let local_sell = localStorage.getItem(clave2)
        local_sell = JSON.parse(local_sell)
        local_sell.forEach(e => {
            compras.push(e)
        })
    }
    let confirm = compras.some(e => e.id == producto.id)
    if (confirm) {
        compras.map(e => {
            if (e.id == producto.id) {
                e.cantidad++
                return e;
            } else {
                return e;
            }
        })
    } else {
        compras.push(producto)
    }
    let local_compras = JSON.stringify(compras)
    localStorage.setItem(clave2, local_compras)

}

