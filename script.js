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

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
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
