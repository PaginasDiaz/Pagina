// Canvas para efectos visuales suaves y llamativos
const canvas = document.getElementById('canvas-efectos');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5 + 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 111, 97, ${this.alpha})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();

// Funcionalidad de zoom en imágenes al pasar el mouse
const galeria = document.querySelector('.galeria-imagenes');
galeria.addEventListener('mouseover', e => {
    if (e.target.tagName === 'IMG') {
        e.target.style.transform = 'scale(1.2)';
        e.target.style.zIndex = '10';
        e.target.style.transition = 'transform 0.3s ease';
    }
});
galeria.addEventListener('mouseout', e => {
    if (e.target.tagName === 'IMG') {
        e.target.style.transform = 'scale(1)';
        e.target.style.zIndex = '1';
    }
});

// Funcionalidad de carrusel automático
let scrollAmount = 0;
const scrollStep = 1;
const maxScroll = galeria.scrollWidth - galeria.clientWidth;

function autoScroll() {
    scrollAmount += scrollStep;
    if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
    }
    galeria.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
    requestAnimationFrame(autoScroll);
}

autoScroll();

// Manejo del formulario y envío a WhatsApp
const form = document.getElementById('form-contacto');

form.addEventListener('submit', e => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const direccion = form.direccion ? form.direccion.value.trim() : '';
    const nota = form.nota ? form.nota.value.trim() : '';
    const mensaje = form.mensaje.value.trim();
    const imagenInput = form.imagen;
    let imagenDataUrl = '';

    if (imagenInput.files.length > 0) {
        const file = imagenInput.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            imagenDataUrl = event.target.result;
            enviarWhatsApp(nombre, direccion, nota, mensaje, imagenDataUrl);
        };
        reader.readAsDataURL(file);
    } else {
        enviarWhatsApp(nombre, direccion, nota, mensaje, imagenDataUrl);
    }
});

function enviarWhatsApp(nombre, direccion, nota, mensaje, imagenDataUrl) {
    let texto = `Nombre: ${nombre}%0ADirección: ${direccion}%0ANota: ${nota}%0AMensaje: ${mensaje}`;
    if (imagenDataUrl) {
        texto += `%0AImagen adjunta (base64): ${imagenDataUrl}`;
    }
    const telefono = '1234567890'; // Reemplazar con el número de WhatsApp destino
    const url = `https://wa.me/${telefono}?text=${texto}`;
    window.open(url, '_blank');
}

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

// Animación splash screen y transición al contenido principal
const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');

window.addEventListener('load', () => {
    setTimeout(() => {
        splashScreen.classList.add('oculto');
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
        }, 1000); // Tiempo para que termine la transición de opacidad
    }, 2500); // Duración total de la animación del logo
});
