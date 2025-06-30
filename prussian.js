document.addEventListener('DOMContentLoaded', () => {
    // GSAPアニメーション
    gsap.from('.prussian-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.prussian-animation', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.5
    });

    // カードのアニメーション
    const cards = document.querySelectorAll('.history-card, .usage-card');
    cards.forEach((card, index) => {
        gsap.from(card, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            delay: index * 0.2
        });
    });

    // スクロールアニメーション
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    duration: 1,
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out'
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.history-card, .usage-card').forEach(card => {
        observer.observe(card);
    });
}); 