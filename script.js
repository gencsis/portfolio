// ─── NAVIGATION ──────────────────────────────────────────────────────────────

const navLinks   = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

const views = {
    home:       document.getElementById('homeView'),
    experience: document.getElementById('experienceView'),
    projects:   document.getElementById('projectsView'),
};

function showView(viewName) {
    Object.entries(views).forEach(([key, section]) => {
        section.classList.toggle('active', key === viewName);
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.view === viewName);
    });
    if (viewName === 'experience') animateTimeline();
    triggerFishSwim();
}

function closeMobileMenu() {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
}

navLinks.forEach(link => {
    link.addEventListener('click', e => {
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

window.addEventListener('resize', () => {
    if (window.innerWidth > 620) closeMobileMenu();
});


// ─── THEME ───────────────────────────────────────────────────────────────────

const themeButtons = [
    document.getElementById('themeToggle'),
    document.getElementById('themeToggleMobile'),
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


// ─── TIMELINE ANIMATION ──────────────────────────────────────────────────────

function animateTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach(el => el.classList.remove('visible'));
    requestAnimationFrame(() => {
        items.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 180);
        });
    });
}


// ─── FISH SWIM ───────────────────────────────────────────────────────────────
//
// Each nav click shifts every fish 50px in its direction and stays there.
// Offsets accumulate. When the fish is fully off screen the wrap teleport is
// instant (no transition) so there is no visible slide across the screen.
//
//   fish-a (top-left)    → swims LEFT  (dir: -1)
//   fish-b (right)       → swims RIGHT (dir:  1)
//   fish-c (bottom-left) → swims LEFT  (dir: -1)
//

const STEP_PX = 50;
const SWIM_MS = 450;

// Store each fish's natural (offset:0) rect once on load so we always know
// where the fish lives without the transform applied.
const FISH_DEFS = [
    { el: document.getElementById('fish-a'), dir: -1, offset: 0, restRect: null },
    { el: document.getElementById('fish-b'), dir:  1, offset: 0, restRect: null },
    { el: document.getElementById('fish-c'), dir: -1, offset: 0, restRect: null },
];

// Capture resting rects after page load (transform is 0 at this point)
window.addEventListener('load', () => {
    FISH_DEFS.forEach(fish => {
        fish.restRect = fish.el.getBoundingClientRect();
    });
});

function triggerFishSwim() {
    const vw = window.innerWidth;

    FISH_DEFS.forEach(fish => {
        // Use stored rest rect; if not yet captured, grab it now
        if (!fish.restRect) fish.restRect = fish.el.getBoundingClientRect();
        const rest = fish.restRect;

        // Advance by one step
        const nextOffset = fish.offset + fish.dir * STEP_PX;

        // Where will the fish actually be on screen after this offset?
        const nextLeft  = rest.left  + nextOffset;
        const nextRight = rest.right + nextOffset;

        const offLeft  = fish.dir < 0 && nextRight <= 0;
        const offRight = fish.dir > 0 && nextLeft  >= vw;

        if (offLeft || offRight) {
            // ── Instant teleport to opposite edge, no transition ──
            fish.el.style.transition = 'none';

            let wrapOffset;
            if (offLeft) {
                // Fish exited left → place it just off the right edge
                wrapOffset = vw - rest.left + 10;
            } else {
                // Fish exited right → place it just off the left edge
                wrapOffset = -rest.right - 10;
            }

            fish.offset = wrapOffset;
            fish.el.style.transform = `translateX(${fish.offset}px)`;

            // Force reflow so browser commits the instant jump before we add transition
            fish.el.getBoundingClientRect(); // eslint-disable-line no-unused-expressions

            // Now take the step from the wrapped position, with transition
            fish.offset += fish.dir * STEP_PX;
            fish.el.style.transition = `transform ${SWIM_MS}ms ease-in-out`;
            fish.el.style.transform  = `translateX(${fish.offset}px)`;
        } else {
            // Normal animated step
            fish.offset = nextOffset;
            fish.el.style.transition = `transform ${SWIM_MS}ms ease-in-out`;
            fish.el.style.transform  = `translateX(${fish.offset}px)`;
        }
    });
}