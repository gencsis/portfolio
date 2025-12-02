// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show body after loading
    document.body.style.display = 'block';
    
    // Initialize with default settings
    initializeSettings();
    
    // Set up event listeners
    setupEventListeners();
});

function initializeSettings() {
    // Load saved settings from localStorage or use defaults
    const savedFont = localStorage.getItem('font') || 'default';
    const savedSize = localStorage.getItem('size') || '2';
    const savedTheme = localStorage.getItem('theme') || 'night';
    
    // Apply saved settings
    setFont(savedFont);
    setSize(savedSize);
    setTheme(savedTheme);
    
    // Mark selections
    updateSelections();
}

function setupEventListeners() {
    // Font selection
    document.getElementById('jgs5').addEventListener('click', () => selectFont('jgs5'));
    document.getElementById('jgs7').addEventListener('click', () => selectFont('jgs7'));
    document.getElementById('jgs9').addEventListener('click', () => selectFont('jgs9'));
    
    // Size selection
    document.getElementById('x1').addEventListener('click', () => selectSize('1'));
    document.getElementById('x2').addEventListener('click', () => selectSize('2'));
    document.getElementById('x3').addEventListener('click', () => selectSize('3'));
    
    // Theme selection
    document.getElementById('day').addEventListener('click', () => selectTheme('day'));
    document.getElementById('night').addEventListener('click', () => selectTheme('night'));
}

function selectFont(font) {
    setFont(font);
    localStorage.setItem('font', font);
    updateSelections();
    console.log('Font changed to:', font);
}

function setFont(font) {
    // Remove all font classes
    document.body.classList.remove('font-jgs5', 'font-jgs7', 'font-jgs9');
    
    // Add selected font class
    if (font !== 'default') {
        document.body.classList.add('font-' + font);
    }
    
    console.log('Font set, body classes:', document.body.className);
}

function selectSize(size) {
    setSize(size);
    localStorage.setItem('size', size);
    updateSelections();
    console.log('Size changed to:', size);
}

function setSize(size) {
    // Remove all size classes
    document.body.classList.remove('size-1', 'size-2', 'size-3');
    
    // Add selected size class
    document.body.classList.add('size-' + size);
    
    console.log('Size set, body classes:', document.body.className);
}

function selectTheme(theme) {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    updateSelections();
}

function setTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('day', 'night');
    
    // Add selected theme class
    document.body.classList.add(theme);
}

function updateSelections() {
    // Get current settings
    const currentFont = getCurrentFont();
    const currentSize = getCurrentSize();
    const currentTheme = getCurrentTheme();
    
    // Update font selections
    document.getElementById('jgs5').classList.remove('selected');
    document.getElementById('jgs7').classList.remove('selected');
    document.getElementById('jgs9').classList.remove('selected');
    
    if (currentFont === 'jgs5') document.getElementById('jgs5').classList.add('selected');
    if (currentFont === 'jgs7') document.getElementById('jgs7').classList.add('selected');
    if (currentFont === 'jgs9') document.getElementById('jgs9').classList.add('selected');
    
    // Update size selections
    document.getElementById('x1').classList.remove('selected');
    document.getElementById('x2').classList.remove('selected');
    document.getElementById('x3').classList.remove('selected');
    
    if (currentSize === '1') document.getElementById('x1').classList.add('selected');
    if (currentSize === '2') document.getElementById('x2').classList.add('selected');
    if (currentSize === '3') document.getElementById('x3').classList.add('selected');
    
    // Update theme selections
    document.getElementById('day').classList.remove('selected');
    document.getElementById('night').classList.remove('selected');
    
    if (currentTheme === 'day') document.getElementById('day').classList.add('selected');
    if (currentTheme === 'night') document.getElementById('night').classList.add('selected');
}

function getCurrentFont() {
    if (document.body.classList.contains('font-jgs5')) return 'jgs5';
    if (document.body.classList.contains('font-jgs7')) return 'jgs7';
    if (document.body.classList.contains('font-jgs9')) return 'jgs9';
    return 'default';
}

function getCurrentSize() {
    if (document.body.classList.contains('size-1')) return '1';
    if (document.body.classList.contains('size-2')) return '2';
    if (document.body.classList.contains('size-3')) return '3';
    return '2'; // default
}

function getCurrentTheme() {
    if (document.body.classList.contains('day')) return 'day';
    if (document.body.classList.contains('night')) return 'night';
    return 'night'; // default
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#top') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else if (href === '#top') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt+D for day mode
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        selectTheme('day');
    }
    
    // Alt+N for night mode
    if (e.altKey && e.key === 'n') {
        e.preventDefault();
        selectTheme('night');
    }
});

console.log('Genesis Escobar Portfolio loaded successfully!');
console.log('Keyboard shortcuts: Alt+D (Day mode), Alt+N (Night mode)');

// Handle ASCII block clicks to show/hide sections
document.addEventListener('click', function(e) {
    const target = e.target.closest('.ascii-block');
    if (target) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
            showSection(href.substring(1));
        }
    }
    
    // Handle back link clicks
    const backLink = e.target.closest('.back-link');
    if (backLink) {
        e.preventDefault();
        showMainContent();
    }
});

function showSection(sectionId) {
    // Hide main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.classList.add('hidden');
    }
    
    // Hide all content sections
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function showMainContent() {
    // Hide all content sections
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.classList.remove('hidden');
    }
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}