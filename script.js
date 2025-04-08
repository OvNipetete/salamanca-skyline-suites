// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Formulario de reserva
const formReserva = document.querySelector('.form-reserva');

formReserva.addEventListener('submit', (e) => {
    e.preventDefault();

    // Aquí iría la lógica para procesar la reserva
    // Por ahora, solo mostraremos un mensaje de confirmación
    alert('Gracias por tu solicitud de reserva. Nos pondremos en contacto contigo lo antes posible para confirmar la disponibilidad.');

    // Resetear el formulario
    formReserva.reset();
});

// Animación de scroll suave para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
    window.scrollTo({
    top: targetElement.offsetTop - 80, // Ajuste para el header fijo
    behavior: 'smooth'
    });

    // Cerrar el menú móvil si está abierto
    if (nav.classList.contains('active')) {
    nav.classList.remove('active');
    }
    }
    });
});

// Animación al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    if (window.scrollY > 50) {
    header.classList.add('scrolled');
    } else {
    header.classList.remove('scrolled');
    }
});

// Selector de idioma
const languageBtns = document.querySelectorAll('.language-btn');
const elementsWithTranslation = document.querySelectorAll('[data-es][data-en]');

// Función para cambiar el idioma
function changeLanguage(lang) {
    // Actualizar los botones de idioma
    languageBtns.forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
    btn.classList.add('active');
    } else {
    btn.classList.remove('active');
    }
    });

    // Actualizar los textos
    elementsWithTranslation.forEach(element => {
    const translation = element.getAttribute(`data-${lang}`);
    if (translation) {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    element.placeholder = translation;
    } else if (element.tagName === 'OPTION') {
    element.textContent = translation;
    } else {
    element.textContent = translation;
    }
    }
    });

    // Guardar la preferencia de idioma
    localStorage.setItem('preferredLanguage', lang);
}

// Evento click para los botones de idioma
languageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    changeLanguage(lang);
    });
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100,
        delay: 0
    });

    // Cargar el idioma preferido
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
    changeLanguage(savedLanguage);
    }

    // Establecer la fecha mínima en los inputs de fecha como hoy
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha-entrada').min = today;
    document.getElementById('fecha-salida').min = today;

    // Establecer la fecha de entrada por defecto como hoy
    document.getElementById('fecha-entrada').value = today;

    // Establecer la fecha de salida por defecto como mañana
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('fecha-salida').value = tomorrow.toISOString().split('T')[0];

    // Validar que la fecha de salida sea posterior a la de entrada
    document.getElementById('fecha-entrada').addEventListener('change', function() {
    const fechaEntrada = this.value;
    const fechaSalida = document.getElementById('fecha-salida');

    if (fechaSalida.value <= fechaEntrada) {
    const nuevaFechaSalida = new Date(fechaEntrada);
    nuevaFechaSalida.setDate(nuevaFechaSalida.getDate() + 1);
    fechaSalida.value = nuevaFechaSalida.toISOString().split('T')[0];
    }

    fechaSalida.min = fechaEntrada;
    });
});

// Función para revelar elementos cuando se hacen visibles
function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal-on-scroll');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

// Añadir evento de scroll para revelar elementos
window.addEventListener('scroll', revealOnScroll);
