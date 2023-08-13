
let clave = "carrito"




recorrer()
sum()

function recorrer() {
    if (localStorage.getItem(clave)) {
        compras = []
        let local_compras = localStorage.getItem(clave)
        local_compras = JSON.parse(local_compras)
        local_compras.forEach(e => {
            compras.push(e)
        })
        let prod_carr = document.querySelector("#div_car")
            prod_carr.innerHTML = ""
        compras.forEach(e => {
            let prod_carr = document.querySelector("#div_car")
            let nuevo = document.createElement("div")
            nuevo.innerHTML = `
            <div class="row  justify-content-between">
            <div class="col-auto col-md-7">
                <div class="media flex-column flex-sm-row">
                    <img class=" img-fluid" src="${e.img}"
                        width="62" height="62">
                    <div class="media-body  my-auto">
                        <div class="row ">
                            <div class="col-auto">
                                <p class="mb-0"><b>${e.marca}</b></p><small
                                    class="text-muted">${e.descripcion}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" pl-0 flex-sm-col col-auto  my-auto">
            <a href="javascript:eliminar(${e.id})">  -  </a><a href="#" class="border">${e.cantidad}
            </a>
            </div>
            <div class=" pl-0 flex-sm-col col-auto  my-auto ">
                <p><b>$ ${parseInt(e.precio) * parseInt(e.cantidad)}</b></p>
            </div>
            </div>
            `
            prod_carr.appendChild(nuevo)
        });
    } else {
        let prod_carr = document.querySelector("#div_car")
        let nuevo = document.createElement("div")
        nuevo.innerHTML = `
        <h1 class="text-center">No hay Compras</h1>
        `
        prod_carr.appendChild(nuevo)

    }


}

function eliminar(id) {
    let exist = compras.some(p => p.id == id)

    if (exist) {
        compras.forEach(e => {
            if (e.id == id) {
                if (e.cantidad <= 1) {
                    compras = compras.filter(e => e.id != id)
                } else {
                    e.cantidad--
                }

            }
        })
    }
    localStorage.setItem(clave,"")
    let actualizar = JSON.stringify(compras)
    localStorage.setItem(clave,actualizar)
    recorrer()
    sum()
}


function sum() {
    let totales = document.querySelector(".totales")
    totales.innerHTML = ""
    let acumulado = 0
    compras.forEach(e => {
        acumulado += e.precio * e.cantidad
    })
    totales = document.querySelector(".totales")
    let parcial = document.createElement("div")
    parcial.innerHTML = `
    <div class="col">
    <div class="row justify-content-between">
        <div class="col-4">
            <p class="mb-1"><b>Subtotal</b></p>
        </div>
        <div class="flex-sm-col col-auto">
            <p class="mb-1"><b>$ ${acumulado}</b></p>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="col">
            <p class="mb-1"><b>Envio</b></p>
        </div>
        <div class="flex-sm-col col-auto">
            <p class="mb-1"><b>Free</b></p>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="col">
            <p class="mb-1"><b>Iva</b></p>
        </div>
        <div class="flex-sm-col col-auto">
            <p class="mb-1"><b>21 %</b></p>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="col-4">
            <p><b>Total</b></p>
        </div>
        <div class="flex-sm-col col-auto">
            <p class="mb-1"><b>$ ${acumulado * 1.21} </b></p>
        </div>
    </div>
    <hr class="my-0">
    </div>
                        `
    totales.appendChild(parcial)
}









