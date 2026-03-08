document.addEventListener('DOMContentLoaded', function() {

    // Scroll fade-in
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    var fadeEls = document.querySelectorAll('.fade-in');
    for (var i = 0; i < fadeEls.length; i++) {
        observer.observe(fadeEls[i]);
    }

    // Mobile nav toggle
    var menuBtn = document.getElementById('navMenu');
    var navLinks = document.getElementById('navLinks');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
        var links = navLinks.querySelectorAll('a');
        for (var j = 0; j < links.length; j++) {
            links[j].addEventListener('click', function() {
                navLinks.classList.remove('open');
            });
        }
    }

    // Gallery carousel
    var track = document.getElementById('carouselTrack');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');

    if (!track || !prevBtn || !nextBtn) return;

    var position = 0;

    function getSlidesVisible() {
        var w = window.innerWidth;
        if (w <= 768) return 1;
        if (w <= 1024) return 2;
        return 3;
    }

    function getMaxPosition() {
        var totalSlides = track.children.length;
        return Math.max(0, totalSlides - getSlidesVisible());
    }

    function updateCarousel() {
        var visible = getSlidesVisible();
        var slideWidth = 100 / visible;
        var gap = 16;
        var viewportWidth = track.parentElement.offsetWidth;
        var gapPercent = (gap / viewportWidth) * 100;
        track.style.transform = 'translateX(-' + (position * (slideWidth + gapPercent / visible)) + '%)';
    }

    nextBtn.addEventListener('click', function() {
        if (position < getMaxPosition()) { position++; updateCarousel(); }
    });

    prevBtn.addEventListener('click', function() {
        if (position > 0) { position--; updateCarousel(); }
    });

    window.addEventListener('resize', function() {
        position = Math.min(position, getMaxPosition());
        updateCarousel();
    });
});
