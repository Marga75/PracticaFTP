 // Leer el archivo XML
 fetch('../tiendaHipica.xml')
 .then(response => response.text())
 .then(data => {
     const parser = new DOMParser();
     const xml = parser.parseFromString(data, "application/xml");
     const productos = xml.getElementsByTagName("producto");

     const contenedor = document.getElementById("contenedor_productos");

     for (let i = 0; i < productos.length; i++) {
         const nombre = productos[i].getElementsByTagName("nombre")[0].textContent;
         const precio = productos[i].getElementsByTagName("precio")[0].textContent;
         const descripcion = productos[i].getElementsByTagName("descripcion")[0].textContent;
         const imagen = productos[i].getElementsByTagName("imagen")[0].textContent;

         // Crear un bloque de producto
         const productoDiv = document.createElement("div");
         productoDiv.className = "producto";

         productoDiv.innerHTML = `
             <h2>${nombre}</h2>
             <img src="${imagen}" alt="${nombre}">
             <p class="precio">€${precio}</p>
             <p>${descripcion}</p>
         `;

         // Añadir el producto al contenedor
         contenedor.appendChild(productoDiv);
     }
 })
 .catch(error => console.error("Error al cargar el XML:", error));