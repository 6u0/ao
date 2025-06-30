// p5.jsによるインタラクティブな背景
let particles = [];
const numParticles = 150;

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('interactive-canvas');
    canvas.style('display', 'block');
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    clear();
    background(240, 245, 255, 10);
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
        this.size = random(3, 6);
        this.color = color(30, 136, 229, 80);
    }

    update() {
        this.pos.add(this.vel);
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
    }

    display() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

// LEDデモのアニメーション
const ledDemo = document.querySelector('.led-demo');
let ledBrightness = 0;
let increasing = true;

function animateLED() {
    if (increasing) {
        ledBrightness += 1;
        if (ledBrightness >= 100) increasing = false;
    } else {
        ledBrightness -= 1;
        if (ledBrightness <= 0) increasing = true;
    }
    ledDemo.style.background = `rgba(30, 136, 229, ${ledBrightness / 100})`;
    requestAnimationFrame(animateLED);
}

// プルシアンブルーのデモ
const colorDemo = document.querySelector('.color-demo');
colorDemo.addEventListener('mousemove', (e) => {
    const rect = colorDemo.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const hue = map(x, 0, rect.width, 200, 220);
    const saturation = map(y, 0, rect.height, 50, 100);
    colorDemo.style.background = `hsl(${hue}, ${saturation}%, 30%)`;
});

// 印象デモ
const impressionDemo = document.querySelector('.impression-demo');
const impressions = [
    '冷静', '信頼', '平和', '知性', '誠実'
];
let currentImpression = 0;

function updateImpression() {
    impressionDemo.textContent = impressions[currentImpression];
    impressionDemo.style.fontSize = '2rem';
    impressionDemo.style.display = 'flex';
    impressionDemo.style.alignItems = 'center';
    impressionDemo.style.justifyContent = 'center';
    impressionDemo.style.color = 'var(--deep-blue)';
    currentImpression = (currentImpression + 1) % impressions.length;
    setTimeout(updateImpression, 2000);
}

// 作品ギャラリー
const artworks = [
    { title: '青の時代', artist: 'ピカソ', year: '1901-1904' },
    { title: '星月夜', artist: 'ゴッホ', year: '1889' },
    { title: '青の単色画', artist: 'イヴ・クライン', year: '1960' }
];

const gallery = document.querySelector('.artwork-gallery');
artworks.forEach(artwork => {
    const card = document.createElement('div');
    card.className = 'artwork-card';
    card.innerHTML = `
        <h3>${artwork.title}</h3>
        <p>${artwork.artist}</p>
        <p>${artwork.year}</p>
    `;
    gallery.appendChild(card);
});

// スクロールアニメーション
gsap.from('.content-section', {
    scrollTrigger: {
        trigger: '.content-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});

// 初期化
window.addEventListener('load', () => {
    animateLED();
    updateImpression();
});

// リサイズ対応
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// 青色のサンプリング
const blueColors = [
    {
        name: 'コバルトブルー',
        code: '#0047AB',
        description: '深みのある鮮やかな青色。絵画や陶磁器の顔料として広く使用されています。'
    },
    {
        name: 'プルシアンブルー',
        code: '#003153',
        description: '1704年にベルリンで発見された世界初の人工青色顔料。'
    },
    {
        name: 'セルリアンブルー',
        code: '#007BA7',
        description: '空の色を思わせる明るい青色。セルリアン（空色）の名の通り、空の色を表現するのに適しています。'
    },
    {
        name: 'ネイビーブルー',
        code: '#000080',
        description: '深い紺色。海軍の制服に使用されることからこの名がつきました。'
    },
    {
        name: 'ターコイズブルー',
        code: '#40E0D0',
        description: 'トルコ石を思わせる青緑色。エジプトの装飾品などで古くから使用されています。'
    },
    {
        name: 'サファイアブルー',
        code: '#0F52BA',
        description: 'サファイアの宝石のような深い青色。高貴で神秘的な印象を与えます。'
    },
    {
        name: 'スカイブルー',
        code: '#87CEEB',
        description: '晴れた空のような明るい青色。爽やかで清々しい印象を与えます。'
    },
    {
        name: 'ロイヤルブルー',
        code: '#4169E1',
        description: '王族を思わせる高貴な青色。イギリスの王室で使用されたことからこの名がつきました。'
    },
    {
        name: 'ミッドナイトブルー',
        code: '#191970',
        description: '深夜の空のような深い青色。落ち着きと神秘性を感じさせます。'
    },
    {
        name: 'コーンフラワーブルー',
        code: '#6495ED',
        description: 'ヤグルマギクの花のような明るい青色。フランスの国花にちなんで名付けられました。'
    },
    {
        name: 'スレートブルー',
        code: '#708090',
        description: 'スレート（粘板岩）のような青みがかった灰色。落ち着いた印象を与えます。'
    },
    {
        name: 'アイスブルー',
        code: '#B0E0E6',
        description: '氷のような透明感のある淡い青色。清涼感と爽やかさを表現します。'
    }
];

const colorGrid = document.querySelector('.color-grid');
const selectedColor = document.querySelector('.selected-color');
const colorName = document.querySelector('.color-name');
const colorCode = document.querySelector('.color-code');
const colorDescription = document.querySelector('.color-description');

// カラースウォッチの作成
blueColors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = color.code;
    swatch.addEventListener('click', () => {
        // アニメーション効果
        gsap.to(selectedColor, {
            backgroundColor: color.code,
            duration: 0.5,
            ease: 'power2.out'
        });
        
        gsap.fromTo(colorName, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
        );
        
        gsap.fromTo(colorCode, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.1 }
        );
        
        gsap.fromTo(colorDescription, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
        );

        // 情報の更新
        colorName.textContent = color.name;
        colorCode.textContent = color.code;
        colorDescription.textContent = color.description;
    });
    colorGrid.appendChild(swatch);
});

// 初期表示
if (blueColors.length > 0) {
    const firstColor = blueColors[0];
    selectedColor.style.backgroundColor = firstColor.code;
    colorName.textContent = firstColor.name;
    colorCode.textContent = firstColor.code;
    colorDescription.textContent = firstColor.description;
}

document.addEventListener('DOMContentLoaded', () => {
    // ヒーローセクションのアニメーション
    const heroContent = document.querySelector('.hero-content');
    gsap.from(heroContent, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });

    // ポータルカードのアニメーション
    const cards = document.querySelectorAll('.portal-card');
    
    cards.forEach((card, index) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out'
        });

        // ホバーエフェクト
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // スクロールアニメーション
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        observer.observe(section);
    });
}); 