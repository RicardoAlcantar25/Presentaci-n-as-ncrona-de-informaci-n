const btnCargar = document.getElementById('btnCargar');
const mensaje = document.getElementById('mensaje');
const listaProductos = document.getElementById('listaProductos');
const buscador = document.getElementById('buscador');

let productosGlobales = []; // Guarda los productos para filtrar localmente

btnCargar.addEventListener('click', cargarProductos);

// Evento para filtrar en tiempo real mientras el usuario escribe
buscador.addEventListener('input', (e) => {
    const textoBusqueda = e.target.value.toLowerCase();

    const productosFiltrados = productosGlobales.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBusqueda)
    );

    renderizarProductos(productosFiltrados);
});

async function cargarProductos() {
    mensaje.textContent = 'Cargando productos...';
    listaProductos.innerHTML = '';
    btnCargar.disabled = true; // Evita múltiples clics mientras carga

    try {
        const respuesta = await fetch('/api/productos');

        if (!respuesta.ok) {
            throw new Error('No se pudo obtener la información');
        }

        productosGlobales = await respuesta.json();

        mensaje.textContent = 'Productos cargados correctamente';
        buscador.style.display = 'inline-block'; // Muestra el buscador al terminar

        renderizarProductos(productosGlobales);

    } catch (error) {
        mensaje.textContent = 'Ocurrió un error al cargar los productos';
        console.error(error);
    } finally {
        btnCargar.disabled = false;
    }
}

function renderizarProductos(productos) {
    listaProductos.innerHTML = '';

    // Manejo del estado "sin resultados"
    if (productos.length === 0) {
        listaProductos.innerHTML = '<p style="color: #dc3545; font-weight: bold; grid-column: 1 / -1;">❌ No se encontraron productos que coincidan con la búsqueda.</p>';
        return;
    }

    // Creación dinámica del DOM
    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');

        tarjeta.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p><strong>Precio:</strong> $${producto.precio}</p>
      <p><strong>Categoría:</strong> ${producto.categoria}</p>
    `;

        listaProductos.appendChild(tarjeta);
    });
}