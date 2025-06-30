document.addEventListener('DOMContentLoaded', () => {
    // LEDアニメーションの強化
    const ledAnimation = document.querySelector('.led-animation');
    
    // マウスオーバー時のエフェクト
    ledAnimation.addEventListener('mouseover', () => {
        gsap.to(ledAnimation, {
            scale: 1.2,
            boxShadow: '0 0 80px #2196f3',
            duration: 0.3
        });
    });

    ledAnimation.addEventListener('mouseout', () => {
        gsap.to(ledAnimation, {
            scale: 1,
            boxShadow: '0 0 50px #2196f3',
            duration: 0.3
        });
    });

    // カードのアニメーション
    const cards = document.querySelectorAll('.science-card, .application-card');
    
    cards.forEach((card, index) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out'
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