const btnCarrito = document.getElementById("btn-carrito");
const carritoPopup = document.getElementById("carrito-popup");
const listaCarrito = document.getElementById("lista-carrito");

const carrito = [];

//Función para alternar la visibilidad del pop-up
btnCarrito.addEventListener("click", () => {
  carritoPopup.style.display =
    carritoPopup.style.display === "block" ? "none" : "block";
});

//Función para añadir un producto al carrito
function agregarProducto(id, nombre, precio, imagen) {
  const productoExistente = carrito.find((producto) => producto.id === id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
  }

  actualizarCarrito();
}

//Función para actualizar la lista del carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
  
    carrito.forEach((producto, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; margin-right: 10px;">
          <span>${producto.nombre} - €${producto.precio} x ${producto.cantidad}</span>
          <button onclick="eliminarProducto(${index})" style="background-color: red; color: white; border: none; padding: 5px;">X</button>
        </div>
      `;
      listaCarrito.appendChild(li);
    });
  
    if (carrito.length === 0) {
      listaCarrito.innerHTML = "<li>Tu carrito está vacío</li>";
    }
  }

//Función para eliminar un producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}
