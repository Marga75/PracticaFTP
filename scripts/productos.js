// Leer el archivo XML
fetch("../tiendaHipica.xml")
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    const productos = xml.getElementsByTagName("producto");

    const contenedor = document.getElementById("contenedor_productos");

    for (let i = 0; i < productos.length; i++) {
      const nombre = productos[i].getElementsByTagName("nombre")[0].textContent;
      const precio = productos[i].getElementsByTagName("precio")[0].textContent;
      const descripcion =
        productos[i].getElementsByTagName("descripcion")[0].textContent;
      const imagen = productos[i].getElementsByTagName("imagen")[0].textContent;


      //Descripción con saltos de línea
      const descripcionConSaltos = descripcion.replace(/\n/g, "<p>")

      // Crear un bloque de producto
      const productoDiv = document.createElement("div");
      productoDiv.className = "producto";

      productoDiv.innerHTML = `
             <h2>${nombre}</h2>
             <img src="${imagen}" alt="${nombre}">
             <p class="precio">€${precio}</p>
         `;

      //Agregar evento de clic al div de producto
      productoDiv.addEventListener("click", () => {
        mostrarPopUp(nombre, imagen, descripcionConSaltos);
      });

      // Añadir el producto al contenedor
      contenedor.appendChild(productoDiv);
    }
  })
  .catch((error) => console.error("Error al cargar el XML:", error));

function mostrarPopUp(nombre, imagen, descripcion) {
  const popup = document.getElementById("popup");
  const contenidoPopup = document.getElementById("contenido_popup");

  // Mostrar el pop-up
  popup.style.display = "flex";

  // Agregar contenido al pop-up
  contenidoPopup.innerHTML = `
            <h2>${nombre}</h2>
            <img src="${imagen}" alt="${nombre}" style="width: 100%; height: auto;">
            <p>${descripcion}</p>
            <button class="añadir" onclick="agregarProducto(${id}, '${nombre}', ${precio}, '${imagen}')">Añadir al carrito</button>
        `;
}

const cerrarBoton = document.getElementById("cerrar");
cerrarBoton.addEventListener("click", () => {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
});
