document.addEventListener('DOMContentLoaded', () => {
    // GSAPアニメーション
    gsap.from('.artworks-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // 作品カードのアニメーション
    const artworkCards = document.querySelectorAll('.artwork-card');
    artworkCards.forEach((card, index) => {
        gsap.from(card, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            delay: index * 0.2
        });
    });

    // 影響カードのアニメーション
    const influenceCards = document.querySelectorAll('.influence-card');
    influenceCards.forEach((card, index) => {
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

    document.querySelectorAll('.artwork-card, .influence-card').forEach(card => {
        observer.observe(card);
    });

    // 作品カードのホバーエフェクト
    artworkCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // 影響カードのホバーエフェクト
    influenceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}); 