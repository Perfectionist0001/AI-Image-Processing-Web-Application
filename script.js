/* ===== Dark / Light Toggle ===== */
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    toggle.textContent = saved === 'light' ? '🌙' : '☀️';
    toggle.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        toggle.textContent = next === 'light' ? '🌙' : '☀️';
    });
}

/* ===== Navbar Scroll Effect ===== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
}

/* ===== Scroll Reveal ===== */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal, .feature-card, .step-card').forEach(el => observer.observe(el));
}

/* ===== Toast Notifications ===== */
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || '💬'}</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/* ===== Animated Counter ===== */
function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                animateCounter(el, parseInt(el.dataset.count), el.dataset.suffix || '');
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

/* ===== Compare Slider ===== */
function initCompareSlider() {
    const container = document.querySelector('.compare-wrap');
    if (!container) return;
    const afterClip = container.querySelector('.compare-after-clip');
    const line = container.querySelector('.compare-line');
    const knob = container.querySelector('.compare-knob');
    let dragging = false;

    function setPosition(x) {
        const rect = container.getBoundingClientRect();
        const pct = Math.max(5, Math.min(95, ((x - rect.left) / rect.width) * 100));
        afterClip.style.width = pct + '%';
        line.style.left = pct + '%';
        knob.style.left = pct + '%';
    }

    container.addEventListener('mousedown', e => { dragging = true; setPosition(e.clientX); });
    container.addEventListener('touchstart', e => { dragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });
    window.addEventListener('touchmove', e => { if (dragging) setPosition(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mouseup', () => dragging = false);
    window.addEventListener('touchend', () => dragging = false);
}

/* ===== Range Slider Track Fill ===== */
function initRangeSliders() {
    document.querySelectorAll('input[type="range"]').forEach(slider => {
        const update = () => {
            const min = +slider.min || 0, max = +slider.max || 100, val = +slider.value;
            const pct = ((val - min) / (max - min)) * 100;
            slider.style.setProperty('--val', pct + '%');
            const display = slider.parentElement.querySelector('span');
            if (display) display.textContent = val;
        };
        slider.addEventListener('input', update);
        update();
    });
}

/* ===== Init All ===== */
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavbar();
    initScrollReveal();
    initCounters();
    initCompareSlider();
    initRangeSliders();
});
