// MOBILE-MENU.JS - Script específico para el menú móvil expandible

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar menú móvil expandido
    initMobileExpandedMenu();

    // Sincronizar toggle de tema móvil
    initMobileThemeToggle();
});

// Funciones para el menú móvil expandido
function initMobileExpandedMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const expandedMenu = document.querySelector('.mobile-expanded-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (!menuButton || !expandedMenu || !overlay) return;
    
    menuButton.addEventListener('click', () => {
        expandedMenu.classList.toggle('open');
        menuButton.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = expandedMenu.classList.contains('open') ? 'hidden' : '';
    });
    
    overlay.addEventListener('click', () => {
        expandedMenu.classList.remove('open');
        menuButton.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Cerrar menú al hacer click en un elemento
    document.querySelectorAll('.mobile-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            expandedMenu.classList.remove('open');
            menuButton.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Sincronizar toggle de tema móvil
function initMobileThemeToggle() {
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const body = document.body;
    const themeToggleCheckbox = document.getElementById('themeToggleCheckbox');
    
    if (!mobileThemeToggle) return;
    
    // Inicializar estado según tema actual
    mobileThemeToggle.checked = body.getAttribute('data-theme') === 'dark';
    
    // Sincronizar cambios
    mobileThemeToggle.addEventListener('change', () => {
        const mode = mobileThemeToggle.checked ? 'dark' : 'light';
        body.setAttribute('data-theme', mode);
        localStorage.setItem('theme', mode);
        
        if (themeToggleCheckbox) themeToggleCheckbox.checked = mobileThemeToggle.checked;
    
        if (typeof showNotification === 'function') {
            showNotification('success', 'Modo cambiado', `Modo ${mode === 'dark' ? 'oscuro' : 'claro'} activado.`);
        }
    });
    
    // Sincronizar cuando cambia el toggle principal
    if (themeToggleCheckbox) {
        themeToggleCheckbox.addEventListener('change', () => {
            mobileThemeToggle.checked = themeToggleCheckbox.checked;
        });
    }
}