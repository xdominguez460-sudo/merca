// ==========================================
// CARRITO DE COMPRAS
// ==========================================

let carrito = [];

let productoSeleccionado = {
    nombre: "Playera deportiva",
    precio: 299
};


// ==========================================
// BOTONES "VER PRODUCTO"
// ==========================================

const botonesVer = document.querySelectorAll(".btn-ver");

botonesVer.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const nombre = boton.dataset.producto;
        const precio = Number(boton.dataset.precio);

        productoSeleccionado = {
            nombre: nombre,
            precio: precio
        };

        document.getElementById("detalleNombre").textContent = nombre;

        document.getElementById("detallePrecio").textContent =
            "$" + precio;

        document.getElementById("detalleTitulo").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ==========================================
// AGREGAR PRODUCTO AL CARRITO
// ==========================================

document
    .getElementById("agregarCarrito")
    .addEventListener("click", function() {

        const color =
            document.getElementById("color").value;

        const talla =
            document.getElementById("talla").value;


        const productoExistente = carrito.find(function(producto) {

            return producto.nombre === productoSeleccionado.nombre &&
                   producto.color === color &&
                   producto.talla === talla;

        });


        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            carrito.push({

                nombre: productoSeleccionado.nombre,

                precio: productoSeleccionado.precio,

                color: color,

                talla: talla,

                cantidad: 1

            });

        }


        actualizarCarrito();


        alert(
            productoSeleccionado.nombre +
            " fue agregado al carrito."
        );


        document.getElementById("carrito")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


// ==========================================
// MOSTRAR CARRITO
// ==========================================

function actualizarCarrito() {

    const lista =
        document.getElementById("listaCarrito");

    const carritoVacio =
        document.getElementById("carritoVacio");


    lista.innerHTML = "";


    if (carrito.length === 0) {

        lista.innerHTML =
            '<p id="carritoVacio">Tu carrito está vacío.</p>';

        actualizarTotales();

        return;
    }


    carrito.forEach(function(producto, indice) {

        const item =
            document.createElement("div");

        item.className = "item";


        item.innerHTML = `

            <div class="item-img"></div>

            <div>

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    Talla: ${producto.talla}
                </p>

                <p>
                    Color: ${producto.color}
                </p>

                <p>
                    $${producto.precio}
                </p>

                <div class="cantidad">

                    <button onclick="disminuirCantidad(${indice})">
                        -
                    </button>

                    <span>
                        ${producto.cantidad}
                    </span>

                    <button onclick="aumentarCantidad(${indice})">
                        +
                    </button>

                </div>

            </div>

            <div>

                <button onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>

            </div>

        `;


        lista.appendChild(item);

    });


    actualizarTotales();

}


// ==========================================
// AUMENTAR CANTIDAD
// ==========================================

function aumentarCantidad(indice) {

    carrito[indice].cantidad++;

    actualizarCarrito();

}


// ==========================================
// DISMINUIR CANTIDAD
// ==========================================

function disminuirCantidad(indice) {

    if (carrito[indice].cantidad > 1) {

        carrito[indice].cantidad--;

    } else {

        carrito.splice(indice, 1);

    }


    actualizarCarrito();

}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();

}


// ==========================================
// ACTUALIZAR PRECIOS
// ==========================================

function actualizarTotales() {

    let subtotal = 0;

    let cantidadProductos = 0;


    carrito.forEach(function(producto) {

        subtotal +=
            producto.precio *
            producto.cantidad;

        cantidadProductos +=
            producto.cantidad;

    });


    let envio = 0;


    if (subtotal > 0) {

        envio = 100;

    }


    let total =
        subtotal + envio;


    document.getElementById("subtotal")
        .textContent =
        "$" + subtotal;


    document.getElementById("envio")
        .textContent =
        "$" + envio;


    document.getElementById("total")
        .textContent =
        "$" + total;


    document.getElementById("contadorCarrito")
        .textContent =
        cantidadProductos;

}


// ==========================================
// BOTÓN PROCEDER AL PAGO
// ==========================================

document
    .getElementById("procederPago")
    .addEventListener("click", function() {

        if (carrito.length === 0) {

            alert(
                "Tu carrito está vacío."
            );

            return;

        }


        const total =
            document.getElementById("total")
                .textContent;


        alert(
            "Compra lista para procesar.\n\n" +
            "Total: " + total
        );

    });


// ==========================================
// BUSCADOR
// ==========================================

const buscador =
    document.getElementById("buscador");


buscador.addEventListener("input", function() {

    const texto =
        buscador.value.toLowerCase();


    const productos =
        document.querySelectorAll(".producto");


    productos.forEach(function(producto) {

        const nombre =
            producto.dataset.nombre.toLowerCase();


        if (nombre.includes(texto)) {

            producto.style.display = "";

        } else {

            producto.style.display = "none";

        }

    });

});


// ==========================================
// INICIO
// ==========================================

actualizarCarrito();