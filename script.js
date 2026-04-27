// Legendary Features for Web Phượt
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Typewriter Intro
    const typewriter = document.getElementById('typewriter');
    const introText = "Tôi là một kẻ mộng mơ đi tìm sự tự do...";
    let i = 0;
    const type = () => {
        if (i < introText.length) {
            typewriter.innerHTML += introText.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    };
    setTimeout(type, 2500); // Start after loading screen

    // 2. Music Player Logic
    const playBtn = document.getElementById('playBtn');
    const musicDisc = document.getElementById('musicDisc');
    let isMusicPlaying = false;
    
    playBtn.addEventListener('click', () => {
        isMusicPlaying = !isMusicPlaying;
        playBtn.innerText = isMusicPlaying ? '⏸️' : '▶️';
        musicDisc.classList.toggle('playing', isMusicPlaying);
    });

    // 3. Easter Egg (Type "PHUOT")
    let keys = '';
    document.addEventListener('keydown', (e) => {
        keys += e.key.toUpperCase();
        if (keys.includes('PHUOT')) {
            keys = '';
            createFireworks();
            alert('🎉 CHÚC MỪNG PHƯỢT THỦ HUYỀN THOẠI! 🎉');
        }
        if (keys.length > 10) keys = '';
    });

    const createFireworks = () => {
        for (let j = 0; j < 30; j++) {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            firework.style.left = Math.random() * 100 + 'vw';
            firework.style.top = Math.random() * 100 + 'vh';
            firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            document.body.appendChild(firework);
            setTimeout(() => firework.remove(), 1000);
        }
    };

    // --- REUSE & SYNC ALL PREVIOUS FEATURES ---
    
    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.style.display = 'none', 1000);
        }, 1500);
    });

    // Cursor Trail
    document.addEventListener('mousemove', (e) => {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px';
        p.style.background = ['#ff6b6b', '#4ecdc4', '#feca57'][Math.floor(Math.random() * 3)];
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    document.querySelectorAll('.card-front img, .map-placeholder img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
        });
    });
    lightbox.addEventListener('click', () => lightbox.style.display = 'none');

    // Scroll to Top Rocket
    const rocket = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        rocket.style.display = window.pageYOffset > 500 ? 'flex' : 'none';
    });
    rocket.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Quote Generator
    const quotes = ["\"Đường đi ở dưới chân mình...\"", "\"Đi để thấy thế giới rộng lớn...\"", "\"Hạnh phúc là những cung đường...\""];
    const quoteDisplay = document.getElementById('quote-display');
    setInterval(() => {
        const q = quotes[Math.floor(Math.random() * quotes.length)];
        quoteDisplay.style.opacity = '0';
        setTimeout(() => { quoteDisplay.innerText = q; quoteDisplay.style.opacity = '1'; }, 500);
    }, 5000);

    // Side Indicator
    const sections = document.querySelectorAll('.year-block');
    const dots = document.querySelectorAll('.year-dot');
    window.addEventListener('scroll', () => {
        let curr = '';
        sections.forEach(s => { if (pageYOffset >= (s.offsetTop - s.clientHeight / 3)) curr = s.id; });
        dots.forEach(d => { d.classList.remove('active'); if (d.getAttribute('onclick').includes(curr)) d.classList.add('active'); });
    });

    // Dynamic Theme
    const updateTheme = () => {
        const h = new Date().getHours();
        document.body.className = (h >= 17 && h < 19) ? 'theme-sunset' : (h >= 19 || h < 5) ? 'theme-night' : 'theme-day';
    };
    updateTheme();

    // Stats Animation
    const stats = document.querySelectorAll('.stat-number');
    const animate = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText.replace(/,/g, '');
        if (count < target) {
            el.innerText = Math.ceil(count + target / 50).toLocaleString();
            setTimeout(() => animate(el), 20);
        } else el.innerText = target.toLocaleString();
    };
    const obs = new IntersectionObserver((es) => {
        es.forEach(e => {
            if (e.isIntersecting) {
                if (e.target.classList.contains('stat-number')) animate(e.target);
                else { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
            }
        });
    }, { threshold: 0.1 });
    stats.forEach(s => obs.observe(s));
    document.querySelectorAll('.content-card-wrapper').forEach(c => {
        c.style.opacity = '0'; c.style.transform = 'translateY(50px)'; c.style.transition = 'all 1s ease';
        obs.observe(c);
    });

    window.createHeart = (e) => {
        const h = document.createElement('div');
        h.className = 'heart'; h.innerHTML = '❤️';
        h.style.left = e.clientX + 'px'; h.style.top = e.clientY + 'px';
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 2000);
    };
});
