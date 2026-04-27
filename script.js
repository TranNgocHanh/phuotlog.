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

    // --- HỆ THỐNG BẢN ĐỒ TƯƠNG TÁC ---
    const mapContainer = document.getElementById('vietnam-map');
    if (mapContainer) {
        fetch('https://raw.githubusercontent.com/highcharts/map-collection-dist/master/countries/vn/vn-all.svg')
            .then(res => res.text())
            .then(svgText => {
                mapContainer.innerHTML = svgText;
                const svg = mapContainer.querySelector('svg');
                svg.style.height = '90%';
                svg.style.width = 'auto';
                
                // --- TỰ ĐỘNG THÊM HOÀNG SA & TRƯỜNG SA ---
                if (!svg.querySelector('#vn-hs')) {
                    const hoangSa = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                    hoangSa.setAttribute('id', 'vn-hs');
                    hoangSa.setAttribute('class', 'vn-hs island-group');
                    hoangSa.innerHTML = `
                        <circle cx="480" cy="280" r="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
                        <circle cx="490" cy="290" r="2.5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
                        <circle cx="500" cy="275" r="3.5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
                        <text x="510" y="270" font-size="12" fill="#fff" font-weight="bold" style="pointer-events:none;">Hoàng Sa</text>
                    `;
                    svg.querySelector('g').appendChild(hoangSa);
                }
                if (!svg.querySelector('#vn-ts')) {
                    const truongSa = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                    truongSa.setAttribute('id', 'vn-ts');
                    truongSa.setAttribute('class', 'vn-ts island-group');
                    truongSa.innerHTML = `
                        <circle cx="550" cy="580" r="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
                        <circle cx="570" cy="600" r="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
                        <circle cx="590" cy="630" r="2.5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
                        <circle cx="610" cy="650" r="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
                        <circle cx="560" cy="640" r="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
                        <text x="620" y="640" font-size="12" fill="#fff" font-weight="bold" style="pointer-events:none;">Trường Sa</text>
                    `;
                    svg.querySelector('g').appendChild(truongSa);
                }

                // Xóa triệt để dòng chữ bản quyền của Highcharts
                const allTexts = svg.querySelectorAll('text');
                allTexts.forEach(t => {
                    if (t.textContent.includes('Highsoft') || t.textContent.includes('Natural Earth')) {
                        t.remove();
                    }
                });

                // Style mặc định cho tất cả các tỉnh
                const paths = svg.querySelectorAll('path');
                paths.forEach(path => {
                    path.style.fill = 'rgba(255, 255, 255, 0.1)';
                    path.style.stroke = 'rgba(255, 255, 255, 0.2)';
                    path.style.strokeWidth = '0.5';
                    path.style.transition = 'all 0.5s ease';
                });

                // Lấy danh sách các tỉnh đã đi từ mục "Quản lý bản đồ" riêng biệt
                const visitedProvinces = JSON.parse(localStorage.getItem('visitedProvinces')) || [];

                // Tô màu các tỉnh đã đi
                const colors = ['#ff6b6b', '#4ecdc4', '#feca57', '#ff9f43', '#0abde3', '#ee5253', '#10ac84'];
                let colorIdx = 0;
                
                visitedProvinces.forEach(provinceId => {
                    const element = svg.querySelector(`path[id="${provinceId}"], .${provinceId}, g[id="${provinceId}"]`);
                    if (element) {
                        const color = colors[colorIdx % colors.length];
                        if (element.tagName.toLowerCase() === 'g') {
                            element.querySelectorAll('circle').forEach(c => {
                                c.style.fill = color;
                                c.style.filter = `drop-shadow(0 0 5px ${color})`;
                            });
                        } else {
                            element.style.fill = color;
                            element.style.filter = `drop-shadow(0 0 5px ${color})`;
                        }
                        colorIdx++;
                    }
                });
            });
    }

    window.createHeart = (e) => {
        const h = document.createElement('div');
        h.className = 'heart'; h.innerHTML = '❤️';
        h.style.left = e.clientX + 'px'; h.style.top = e.clientY + 'px';
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 2000);
    };
});
