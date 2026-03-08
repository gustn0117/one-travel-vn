document.addEventListener('DOMContentLoaded', () => {

    // Scroll fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Mobile nav toggle
    const menuBtn = document.getElementById('navMenu');
    const navLinks = document.querySelector('.nav__links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('open'));
        });
    }

    // Nav background on scroll
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.style.background = window.scrollY > 50
                ? 'rgba(255,255,255,0.95)'
                : 'rgba(255,255,255,0.92)';
        });
    }

    // Gallery carousel
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!track || !prevBtn || !nextBtn) return;

    let position = 0;

    function getSlidesVisible() {
        const w = window.innerWidth;
        if (w <= 768) return 1;
        if (w <= 1024) return 2;
        return 3;
    }

    function getMaxPosition() {
        const totalSlides = track.children.length;
        return Math.max(0, totalSlides - getSlidesVisible());
    }

    function updateCarousel() {
        const visible = getSlidesVisible();
        const slideWidth = 100 / visible;
        const gapPercent = 16 / track.parentElement.offsetWidth * 100;
        track.style.transform = `translateX(-${position * (slideWidth + gapPercent / visible)}%)`;
    }

    nextBtn.addEventListener('click', () => {
        if (position < getMaxPosition()) { position++; updateCarousel(); }
    });

    prevBtn.addEventListener('click', () => {
        if (position > 0) { position--; updateCarousel(); }
    });

    window.addEventListener('resize', () => {
        position = Math.min(position, getMaxPosition());
        updateCarousel();
    });
});
