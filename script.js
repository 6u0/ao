// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // GSAPとScrollTriggerの初期化
    gsap.registerPlugin(ScrollTrigger);

    // 初期状態の設定
    gsap.set('.hero-background', { opacity: 0 });
    gsap.set('.hero-content h1', { opacity: 0, y: 50 });
    gsap.set('.hero-content p', { opacity: 0, y: 30 });

    // ヒーローセクションのアニメーション
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

    heroTimeline
        .to('.hero-background', {
            opacity: 1,
            duration: 1.5
        })
        .to('.hero-content h1', {
            opacity: 1,
            y: 0,
            duration: 1
        }, '-=0.5')
        .to('.hero-content p', {
            opacity: 1,
            y: 0,
            duration: 1
        }, '-=0.5');

    // FullPage.jsの初期化
    new fullpage('#fullpage', {
        // 基本設定
        autoScrolling: true,
        scrollHorizontally: false,
        navigation: true,
        navigationPosition: 'right',
        showActiveTooltip: true,
        slidesNavigation: true,
        controlArrows: true,
        fitToSection: true,
        scrollBar: true,
        
        // アニメーション設定
        scrollingSpeed: 1000,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        
        // レスポンシブ設定
        responsiveWidth: 900,
        responsiveHeight: 600,
        
        // セクション設定
        sectionsColor: ['#000', '#fff', '#fbfbfd', '#fff', '#fbfbfd'],
        
        // コールバック
        afterLoad: function(origin, destination, direction) {
            // セクション読み込み後のアニメーション
            const currentSection = destination.item;
            const elements = currentSection.querySelectorAll('.hero-content, .feature-item, .showcase-content, .gallery-item, .cta');
            
            gsap.fromTo(elements, 
                {
                    opacity: 0,
                    y: direction === 'down' ? 50 : -50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power2.out'
                }
            );
        },
        
        onLeave: function(origin, destination, direction) {
            // セクション離脱時のアニメーション
            const leavingSection = origin.item;
            const elements = leavingSection.querySelectorAll('.hero-content, .feature-item, .showcase-content, .gallery-item, .cta');
            
            gsap.to(elements, {
                opacity: 0,
                y: direction === 'down' ? -50 : 50,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.in'
            });
        }
    });

    // モバイルメニュー
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-button');
    menuButton.innerHTML = '<span></span><span></span><span></span>';
    document.querySelector('nav').prepend(menuButton);

    menuButton.addEventListener('click', () => {
        document.querySelector('nav ul').classList.toggle('active');
        menuButton.classList.toggle('active');
    });
});

// ヘッダーのスクロール制御
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// モバイルメニュー
const menuButton = document.createElement('button');
menuButton.classList.add('menu-button');
menuButton.innerHTML = '<span></span><span></span><span></span>';
document.querySelector('nav').prepend(menuButton);

menuButton.addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('active');
    menuButton.classList.toggle('active');
}); 

document.querySelector(".contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const url = "https://script.google.com/macros/s/AKfycbw17W-b067x7FHSrD3s0AW0aER2hNZBH40S5BTz0w-p4rhHXxmIzrXz3C7WombHMqcb/exec";
  
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
    };
  
    fetch(url, {
      method: "POST",
      mode: "no-cors",  // CORS回避用
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(() => {
      alert("送信完了しました！");
      document.querySelector(".contact-form").reset();
    })
    .catch(error => {
      console.error("送信失敗:", error);
      alert("送信に失敗しました。");
    });
  });
  