// Funcionalidad para tienda de repuestos

// Manejo de navegación entre secciones
const navLinks = document.querySelectorAll('nav ul li a');
const secciones = document.querySelectorAll('section');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetSection = e.target.getAttribute('data-section');

        secciones.forEach(sec => {
            if (sec.id === targetSection) {
                sec.classList.add('seccion-activa');
                sec.classList.remove('seccion-oculta');
            } else {
                sec.classList.add('seccion-oculta');
                sec.classList.remove('seccion-activa');
            }
        });
    });
});

// Productos de ejemplo
const productos = [
    { id: 1, nombre: 'Repuesto 1', precio: 100.00, imagen: 'https://via.placeholder.com/300x200?text=Repuesto+1' },
    { id: 2, nombre: 'Repuesto 2', precio: 150.00, imagen: 'https://via.placeholder.com/300x200?text=Repuesto+2' },
    { id: 3, nombre: 'Repuesto 3', precio: 200.00, imagen: 'https://via.placeholder.com/300x200?text=Repuesto+3' }
];

// Carrito de compras
let carrito = [];

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const itemCarrito = carrito.find(item => item.id === id);
    if (itemCarrito) {
        itemCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Actualizar visualización del carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalCarrito.textContent = '';
        return;
    }

    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrito');
        itemDiv.innerHTML = `
            <p>${item.nombre} - $${item.precio.toFixed(2)} x ${item.cantidad}</p>
            <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
        `;
        listaCarrito.appendChild(itemDiv);
        total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;

    // Añadir eventos a botones eliminar
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            eliminarDelCarrito(id);
        });
    });
}

// Eventos para botones "Agregar al carrito"
const botonesAgregar = document.querySelectorAll('.btn-agregar');
botonesAgregar.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        agregarAlCarrito(id);
    });
});

// Evento para vaciar carrito
const btnVaciar = document.getElementById('btn-vaciar-carrito');
btnVaciar.addEventListener('click', () => {
    vaciarCarrito();
});

// Manejo del formulario de contacto (envío a WhatsApp)
const form = document.getElementById('form-contacto');

form.addEventListener('submit', e => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const direccion = form.direccion ? form.direccion.value.trim() : '';
    const nota = form.nota ? form.nota.value.trim() : '';
    const mensaje = form.mensaje.value.trim();

    let texto = `Nombre: ${nombre}%0ADirección: ${direccion}%0ANota: ${nota}%0AMensaje: ${mensaje}`;

    if (carrito.length > 0) {
        texto += '%0A%0AProductos en el carrito:%0A';
        carrito.forEach(item => {
            texto += `- ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}%0A`;
        });
        const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        texto += `%0ATotal: $${total.toFixed(2)}`;
    }

    const telefono = '32891585'; // Número de WhatsApp destino
    const url = `https://wa.me/${telefono}?text=${texto}`;
    window.open(url, '_blank');
});

// Splash screen
const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');

window.addEventListener('load', () => {
    setTimeout(() => {
        splashScreen.classList.add('oculto');
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
        }, 1000);
    }, 2500);
});
