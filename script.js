import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCWwqbO7zNoUT-_NvJ12oPzzrkNJbv_xco",
    authDomain: "phuotlog.firebaseapp.com",
    projectId: "phuotlog",
    storageBucket: "phuotlog.firebasestorage.app",
    messagingSenderId: "349647181935",
    appId: "1:349647181935:web:360d32ac7a0ebcb28fd59a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Typewriter Intro
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const introText = "Tôi là một kẻ mộng mơ đi tìm sự tự do...";
        let i = 0;
        const type = () => {
            if (i < introText.length) {
                typewriter.innerHTML += introText.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        setTimeout(type, 2500);
    }

    // 2. Music Player Logic
    const playBtn = document.getElementById('playBtn');
    const musicDisc = document.getElementById('musicDisc');
    if (playBtn && musicDisc) {
        let isMusicPlaying = false;
        playBtn.addEventListener('click', () => {
            isMusicPlaying = !isMusicPlaying;
            playBtn.innerText = isMusicPlaying ? '⏸️' : '▶️';
            musicDisc.classList.toggle('playing', isMusicPlaying);
        });
    }

    // 3. Vietnam Map Initialization (Firebase Cloud)
    const mapContainer = document.getElementById('vietnam-map');
    if (mapContainer) {
        fetch('https://code.highcharts.com/mapdata/countries/vn/vn-all.topo.json')
            .then(r => r.json())
            .then(async topoData => {
                Highcharts.mapChart('vietnam-map', {
                    chart: { backgroundColor: 'transparent' },
                    title: { text: null },
                    credits: { enabled: false },
                    mapNavigation: { enabled: true },
                    series: [{
                        data: [],
                        mapData: topoData,
                        joinBy: 'hc-key',
                        name: 'Tỉnh thành',
                        states: { hover: { color: '#feca57' } }
                    }]
                });

                // Lấy dữ liệu tỉnh từ Firebase
                let visited = [];
                try {
                    const snap = await getDoc(doc(db, "settings", "map"));
                    if (snap.exists()) visited = snap.data().provinces || [];
                } catch (e) { console.error(e); }

                const observer = new MutationObserver(() => {
                    const svg = mapContainer.querySelector('svg');
                    if (svg) {
                        observer.disconnect();
                        
                        // Xóa bản quyền & style mặc định
                        svg.querySelectorAll('text').forEach(t => {
                            if (t.textContent.includes('Highsoft')) t.remove();
                        });

                        // Thêm Hoàng Sa & Trường Sa
                        injectIslands(svg);

                        // Tô màu các tỉnh đã đi
                        const colors = ['#ff6b6b', '#4ecdc4', '#feca57', '#ff9f43', '#0abde3'];
                        let cIdx = 0;
                        visited.forEach(id => {
                            const el = svg.querySelector(`path[id="${id}"], .${id}, g[id="${id}"]`);
                            if (el) {
                                const color = colors[cIdx % colors.length];
                                if (el.tagName === 'g') {
                                    el.querySelectorAll('circle').forEach(c => c.style.fill = color);
                                } else {
                                    el.style.fill = color;
                                }
                                cIdx++;
                            }
                        });
                    }
                });
                observer.observe(mapContainer, { childList: true, subtree: true });
            });
    }

    function injectIslands(svg) {
        if (!svg.querySelector('#vn-hs')) {
            const hs = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            hs.setAttribute('id', 'vn-hs');
            hs.innerHTML = `<circle cx="480" cy="280" r="4" fill="rgba(255,255,255,0.2)"/><text x="490" y="275" font-size="12" fill="#fff">Hoàng Sa</text>`;
            svg.querySelector('g').appendChild(hs);
        }
        if (!svg.querySelector('#vn-ts')) {
            const ts = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            ts.setAttribute('id', 'vn-ts');
            ts.innerHTML = `<circle cx="580" cy="600" r="5" fill="rgba(255,255,255,0.2)"/><text x="590" y="595" font-size="12" fill="#fff">Trường Sa</text>`;
            svg.querySelector('g').appendChild(ts);
        }
    }
});
