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