// script.js

// Prevent scrolling when cover is active
document.body.style.overflow = 'hidden';

document.addEventListener("DOMContentLoaded", () => {
    // 1. Animasi CSS (Fade, Slide, Zoom on scroll)
    const animElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .zoom-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => observer.observe(el));

    // Initialize Audio Icons state
    const audio = document.getElementById('bg-music');
    const playIcon = document.getElementById('audio-icon-play');
    const pauseIcon = document.getElementById('audio-icon-pause');

    if(audio.paused) {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    } else {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }
});

// 2. Tombol salin Dana JS
function copyDana() {
    const danaNumber = document.getElementById('dana-number').innerText;
    navigator.clipboard.writeText(danaNumber).then(() => {
        alert('Nomor Dana berhasil disalin ke clipboard!');
    }).catch(err => {
        console.error('Gagal menyalin teks:', err);
        alert('Gagal menyalin nomor. Silakan salin secara manual.');
    });
}

// 3. Tombol RSVP JS (sendPrompt)
function sendPrompt(message) {
    alert("RSVP: " + message);
}

// 4. Musik toggle JS
function toggleAudio() {
    const audio = document.getElementById('bg-music');
    const playIcon = document.getElementById('audio-icon-play');
    const pauseIcon = document.getElementById('audio-icon-pause');
    
    if (audio.paused) {
        audio.play().then(() => {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }).catch(e => {
            console.log("Auto-play was prevented by browser.", e);
        });
    } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// 5. Buka Undangan JS (Tutup Cover & Autoplay Musik)
function openInvitation() {
    const coverPage = document.getElementById('cover-page');
    const audio = document.getElementById('bg-music');
    const playIcon = document.getElementById('audio-icon-play');
    const pauseIcon = document.getElementById('audio-icon-pause');
    
    // Sembunyikan cover
    if (coverPage) {
        coverPage.classList.add('hidden');
    }
    
    // Kembalikan scroll
    document.body.style.overflow = 'auto';
    
    // Putar musik langsung tepat di lirik "Janbak wa li-akher..." 
    if (audio && audio.paused) {
        audio.currentTime = 184.0;
        audio.play().then(() => {
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
        }).catch(e => {
            console.log("Auto-play failed even after interaction.", e);
        });
    }
    
    // Scroll otomatis sedikit ke bawah untuk efek dramatis (opsional)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 6. Matikan musik otomatis saat tab ditutup/diminimize
let wasPlayingBeforeHidden = false;
document.addEventListener('visibilitychange', () => {
    const audio = document.getElementById('bg-music');
    const playIcon = document.getElementById('audio-icon-play');
    const pauseIcon = document.getElementById('audio-icon-pause');
    
    if (audio) {
        if (document.hidden) {
            wasPlayingBeforeHidden = !audio.paused;
            if (wasPlayingBeforeHidden) {
                audio.pause();
                if (playIcon) playIcon.style.display = 'block';
                if (pauseIcon) pauseIcon.style.display = 'none';
            }
        } else {
            if (wasPlayingBeforeHidden) {
                audio.play().then(() => {
                    if (playIcon) playIcon.style.display = 'none';
                    if (pauseIcon) pauseIcon.style.display = 'block';
                }).catch(e => console.log(e));
            }
        }
    }
});
