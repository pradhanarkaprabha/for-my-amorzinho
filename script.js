document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Music Toggle Logic ---
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<span class="icon">🎵</span> Play Music';
            musicBtn.style.animation = 'none';
        } else {
            bgMusic.volume = 0;
            bgMusic.play();
            let vol = 0;
            const fadeIn = setInterval(() => {
                if (vol < 1) { vol += 0.05; bgMusic.volume = vol; } 
                else { clearInterval(fadeIn); }
            }, 200);
            musicBtn.innerHTML = '<span class="icon">⏸</span> Pause Music';
            musicBtn.style.animation = 'pulse 2s infinite';
        }
        isPlaying = !isPlaying;
    });

    // --- 2. Gallery Generation (FIXED FOR MOBILE) ---
    const galleryGrid = document.getElementById('gallery-grid');
    const totalImages = 32;

    for (let i = 1; i <= totalImages; i++) {
        const img = document.createElement('img');
        
        // --- CRITICAL FIX FOR MOBILE: Using .jpeg ---
        img.src = `images/pic${i}.jpeg`; 
        
        img.alt = `Our Memory ${i}`;
        img.classList.add('gallery-item');
        img.loading = "lazy"; 
        img.dataset.index = i;
        
        img.addEventListener('click', () => openLightbox(i));
        galleryGrid.appendChild(img);
    }

    // --- 3. Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        // Using .jpeg here too
        lightboxImg.src = `images/pic${currentIndex}.jpeg`;
        lightbox.classList.add('active');
    }

    function closeBox() { lightbox.classList.remove('active'); }

    function showNext() {
        currentIndex = currentIndex === totalImages ? 1 : currentIndex + 1;
        lightboxImg.src = `images/pic${currentIndex}.jpeg`;
    }

    function showPrev() {
        currentIndex = currentIndex === 1 ? totalImages : currentIndex - 1;
        lightboxImg.src = `images/pic${currentIndex}.jpeg`;
    }

    closeLightbox.addEventListener('click', closeBox);
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeBox(); });

    // --- 4. Scroll Reveal Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.querySelector('.line')) {
                    const lines = entry.target.querySelectorAll('.line');
                    lines.forEach((line, index) => {
                        setTimeout(() => { line.classList.add('visible'); }, index * 300);
                    });
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // --- 5. Surprise Modal ---
    const surpriseBtn = document.getElementById('surprise-btn');
    const surpriseModal = document.getElementById('surprise-modal');
    const closeModal = document.querySelector('.close-modal');

    surpriseBtn.addEventListener('click', () => { surpriseModal.classList.add('active'); });
    closeModal.addEventListener('click', () => { surpriseModal.classList.remove('active'); });
    surpriseModal.addEventListener('click', (e) => { if (e.target === surpriseModal) surpriseModal.classList.remove('active'); });

    // --- 6. Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
        setTimeout(() => { follower.style.left = e.clientX + 'px'; follower.style.top = e.clientY + 'px'; }, 100);
    });

    document.querySelectorAll('a, button, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.borderColor = '#c9184a';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = '#ff8fa3';
        });
    });

    // --- 7. Particles ---
    function createParticles() {
        const container = document.getElementById('particles-container');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 10 + 5 + 'px';
            particle.style.width = size; particle.style.height = size;
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.animationDuration = Math.random() * 10 + 10 + 's';
            container.appendChild(particle);
        }
    }
    createParticles();
});

// --- 8. Global Copy Code Function ---
function copyCode() {
    const code = document.getElementById("gift-code").innerText;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector(".action-btn");
        const originalText = btn.innerText;
        btn.innerText = "✅ Copied!";
        btn.style.background = "#d4edda"; btn.style.color = "#155724";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "white"; btn.style.color = "#fc2779";
        }, 2000);
    });
}