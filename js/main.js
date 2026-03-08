/**
 * ONE TRAVEL SERVER VN CO.,LTD
 * Main JavaScript — Scroll animations & Carousel
 */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Scroll Fade-In Animation ───
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


    // ─── Image Carousel ───
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!track || !prevBtn || !nextBtn) return;

    let position = 0;

    function getSlidePercent() {
        const w = window.innerWidth;
        if (w <= 809)  return 50;     // 2 slides visible
        if (w <= 1199) return 33.33;  // 3 slides visible
        return 25;                     // 4 slides visible
    }

    function getMaxPosition() {
        const w = window.innerWidth;
        if (w <= 809)  return 4;
        if (w <= 1199) return 3;
        return 2;
    }

    function updateCarousel() {
        const pct = getSlidePercent();
        track.style.transform = `translateX(-${position * (pct + 1.2)}%)`;
    }

    nextBtn.addEventListener('click', () => {
        if (position < getMaxPosition()) {
            position++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (position > 0) {
            position--;
            updateCarousel();
        }
    });

    // Reset on resize
    window.addEventListener('resize', () => {
        position = Math.min(position, getMaxPosition());
        updateCarousel();
    });

});
