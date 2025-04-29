// Preloader
window.addEventListener('load', () => {
    showNotification('success', '¡Bienvenido!', 'Gracias por visitar nuestra plataforma.');
    
    

    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 500);
});

// Scroll Indicator
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    scrollIndicator.style.width = progress + '%';
});

// Inicializar variables de tema para cálculos CSS
document.documentElement.style.setProperty('--primary-rgb', '59, 130, 246');
document.documentElement.style.setProperty('--secondary-rgb', '109, 40, 217');
document.documentElement.style.setProperty('--accent-rgb', '6, 182, 212');
document.documentElement.style.setProperty('--bg-light-rgb', '248, 250, 252');
document.documentElement.style.setProperty('--bg-dark-rgb', '15, 23, 42');

const body = document.body;
const themeToggleCheckbox = document.getElementById('themeToggleCheckbox');
const themeLabel = document.querySelector('.theme-toggle-wrapper span');

// Detectar o aplicar el tema inicial
let storedTheme = localStorage.getItem('theme');
if (!storedTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    storedTheme = prefersDark ? 'dark' : 'light';
    localStorage.setItem('theme', storedTheme);
}

body.setAttribute('data-theme', storedTheme);
themeToggleCheckbox.checked = storedTheme === 'dark';

// Asignar el texto correcto para la acción (lo que haría el botón)
if (themeLabel) {
    themeLabel.textContent = storedTheme === 'dark' ? 'Modo oscuro' : 'Modo claro';
}






// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Ajuste para header fijo
                behavior: 'smooth'
            });

            // Actualizar estado activo de navegación
            document.querySelectorAll('.nav-item, .desktop-nav a').forEach(item => {
                item.classList.remove('active');
            });

            document.querySelectorAll(`.nav-item[href="${this.getAttribute('href')}"], .desktop-nav a[href="${this.getAttribute('href')}"]`).forEach(item => {
                item.classList.add('active');
            });
        }
    });
});

// Botón Scroll to Top
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animaciones de aparición con Intersection Observer
const fadeElements = document.querySelectorAll('.fade-in, .fade-right, .fade-left');

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Estado activo de navegación al hacer scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item, .desktop-nav a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Header sticky con cambio al hacer scroll
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


themeToggleCheckbox.addEventListener('change', () => {
    const mode = themeToggleCheckbox.checked ? 'dark' : 'light';
    body.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
    showNotification('success', 'Modo cambiado', `Modo ${mode === 'dark' ? 'oscuro' : 'claro'} activado.`);

    if (themeLabel) {
        themeLabel.textContent = mode === 'dark' ? 'Modo oscuro' : 'Modo claro';
    }
    
});






// Menú de configuración
const configButton = document.getElementById('configButton');
const configMenu = document.getElementById('configMenu');
const closeConfigMenu = document.getElementById('closeConfigMenu');

configButton.addEventListener('click', () => {
    configMenu.classList.toggle('open');
    configButton.classList.toggle('active');
});

closeConfigMenu.addEventListener('click', () => {
    configMenu.classList.remove('open');
    configButton.classList.remove('active');
});

// Cerrar al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!configButton.contains(e.target) && !configMenu.contains(e.target)) {
        configMenu.classList.remove('open');
        configButton.classList.remove('active');
    }
});

// Función para mostrar notificaciones
function showNotification(type, title, message) {
    // Eliminar notificación existente si hay alguna
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Crear la notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    notification.innerHTML = `
    <div class="notification-icon">
        <i class="fas ${type === 'success' ? 'fa-check' : 'fa-exclamation'}"></i>
    </div>
    <div class="notification-content">
        <h4 class="notification-title">${title}</h4>
        <p class="notification-message">${message}</p>
    </div>
    <div class="notification-close">
        <i class="fas fa-times"></i>
    </div>
    `;

    document.body.appendChild(notification);

    // Añadir clase show después de un pequeño retraso (para la animación)
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Añadir funcionalidad de cierre
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });

    // Cerrar automáticamente después de 5 segundos
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 500);
}

// Estilos CSS complementarios para notificaciones
// Añadimos estos estilos dinámicamente si son necesarios
if (!document.getElementById('notification-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'notification-styles';
    styleSheet.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: var(--spacing-4) var(--spacing-6);
        background: var(--card);
        border-left: 4px solid var(--primary);
        border-radius: var(--radius-sm);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        transform: translateX(calc(100% + 20px));
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        z-index: var(--z-tooltip);
        max-width: 350px;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification.success {
        border-left-color: #10b981;
    }
    
    .notification.success .notification-icon {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
    }
    
    .notification.error {
        border-left-color: #ef4444;
    }
    
    .notification.error .notification-icon {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
    }
    
    .notification-icon {
        width: 40px;
        height: 40px;
        min-width: 40px;
        border-radius: var(--radius-sm);
        background: rgba(var(--primary-rgb), 0.1);
        color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: var(--spacing-4);
        font-size: 1.25rem;
    }
    
    .notification-content {
        flex: 1;
    }
    
    .notification-title {
        font-weight: 600;
        margin-bottom: var(--spacing-1);
        font-size: 1rem;
    }
    
    .notification-message {
        color: var(--text-muted);
        font-size: 0.9rem;
        line-height: 1.5;
        margin-bottom: 0;
    }
    
    .notification-close {
        margin-left: var(--spacing-4);
        cursor: pointer;
        color: var(--text-muted);
        transition: color 0.3s ease;
    }
    
    .notification-close:hover {
        color: var(--text);
    }
    `;
    document.head.appendChild(styleSheet);
}

// Función para crear un modal simple
function createModal(id, title, content) {
    // Comprobamos si ya existe un modal con ese ID
    if (document.getElementById(id)) {
        return;
    }
    
    // Creamos el modal
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal';
    
    modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal" onclick="closeModal('${id}')">&times;</span>
        <div class="modal-header">
            <h2>${title}</h2>
        </div>
        <div class="modal-body">
            ${content}
        </div>
    </div>
    `;
    
    document.body.appendChild(modal);
    
    // Estilos para el modal
    if (!document.getElementById('modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = `
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: var(--z-modal);
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.4s ease;
            padding: var(--spacing-4);
            overflow-y: auto;
        }
        
        .modal.show {
            display: flex;
            opacity: 1;
        }
        
        .modal-content {
            width: 95%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            padding: var(--spacing-8);
            position: relative;
            border-radius: var(--radius);
            background: var(--card);
            border: 1px solid var(--border);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            transform: scale(0.95);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .modal.show .modal-content {
            transform: scale(1);
        }
        
        .close-modal {
            position: absolute;
            top: var(--spacing-4);
            right: var(--spacing-4);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--surface);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.25rem;
            color: var(--text-muted);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid var(--border);
            z-index: 10;
        }
        
        .close-modal:hover {
            background: #ef4444;
            color: white;
            border-color: #ef4444;
            transform: rotate(90deg);
        }
        
        .modal-header {
            margin-bottom: var(--spacing-8);
            padding-bottom: var(--spacing-4);
            border-bottom: 1px solid var(--border);
        }
        
        .modal-header h2 {
            margin-bottom: 0;
        }
        
        .modal-body {
            color: var(--text-muted);
        }
        `;
        document.head.appendChild(styleSheet);
    }
    
    return modal;
}

// Abrir modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    document.body.style.overflow = 'hidden';
    modal.classList.add('show');

    // Añadir event listener para cerrar al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modalId);
        }
    });

    // Añadir evento de teclado para cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(modalId);
        }
    });
}

// Cerrar modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Función de ejemplo para mostrar cómo usar la plantilla
function demoTemplateFeatures() {
    // Mostrar una notificación
    showNotification('success', '¡Plantilla cargada!', 'La plantilla ha sido inicializada correctamente.');
    
    // Crear un modal de ejemplo
    createModal('demoModal', 'Ejemplo de Modal', `
        <p>Este es un ejemplo de cómo puedes crear fácilmente modales con esta plantilla.</p>
        <p>Puedes personalizar el contenido según tus necesidades.</p>
        <button class="btn btn-primary" onclick="closeModal('demoModal')">Cerrar</button>
    `);
    
    // Opcional: abrir automáticamente el modal después de un tiempo
    // setTimeout(() => openModal('demoModal'), 2000);
}

// Ejecutar demostración después de cargar la página (descomenta si deseas ver la demo)
// window.addEventListener('load', () => setTimeout(demoTemplateFeatures, 1500));



document.getElementById('downloadPdf').addEventListener('click', e => {
    e.preventDefault();
    showNotification('success', 'Descarga', 'Tu archivo PDF se está generando...');
});

document.getElementById('languageSelect').addEventListener('change', e => {
    const lang = e.target.value;
    showNotification('success', 'Idioma cambiado', `Has cambiado el idioma a ${lang === 'es' ? 'Español' : 'Inglés'}.`);
});

// Funcionalidad mejorada para íconos sociales
document.addEventListener('DOMContentLoaded', function() {
    // Encontrar todos los íconos sociales que usan imágenes 3D
    const socialIcons = document.querySelectorAll('.social-icon img, .config-social-icon img');
    
    if (socialIcons.length > 0) {
        socialIcons.forEach(icon => {
            // Añadir clase para aplicar estilos
            icon.classList.add('social-3d-icon');
            
            // Eventos para animación al pasar el cursor
            icon.parentElement.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.15)';
            });
            
            icon.parentElement.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1)';
            });
        });
    }
    
    // Mejorar navegación en móviles
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Cerrar menú móvil expandido si está abierto
            const expandedMenu = document.querySelector('.mobile-expanded-menu');
            const overlay = document.querySelector('.mobile-menu-overlay');
            const menuButton = document.querySelector('.mobile-menu-button');
            
            if (expandedMenu && expandedMenu.classList.contains('open')) {
                expandedMenu.classList.remove('open');
                overlay.classList.remove('active');
                menuButton.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});