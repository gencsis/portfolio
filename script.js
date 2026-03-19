const navLinks = document.querySelectorAll('.nav-link');
const views = {
    home: document.getElementById('homeView'),
    experience: document.getElementById('experienceView'),
    projects: document.getElementById('projectsView')
};

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

function showView(viewName) {
    Object.entries(views).forEach(([key, section]) => {
        section.classList.toggle('active', key === viewName);
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.view === viewName);
    });
}

function closeMobileMenu() {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showView(link.dataset.view);
        closeMobileMenu();
    });
});

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });
}

const themeButtons = [
    document.getElementById('themeToggle'),
    document.getElementById('themeToggleMobile')
].filter(Boolean);

const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'dark') {
    document.body.classList.remove('light');
} else {
    document.body.classList.add('light');
}

function toggleTheme() {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
}

themeButtons.forEach(btn => btn.addEventListener('click', toggleTheme));

window.addEventListener('resize', () => {
    if (window.innerWidth > 620) {
        closeMobileMenu();
    }
});