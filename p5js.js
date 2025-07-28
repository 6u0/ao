let redCircles = []; 
let maxAttempts = 10000;
let count = 0;
let animationComplete = false;
let fadeOutStarted = false;
let fadeOpacity = 1;
let targetCircleCount = 15; 


let isReload = false;


window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('isReloading', 'true');
});

function setup() {
 
  if (!localStorage.getItem('hasVisited')) {
    
    localStorage.setItem('hasVisited', 'true');
  }

 
  if (sessionStorage.getItem('isReloading') || !localStorage.getItem('hasLoaded')) {
    sessionStorage.removeItem('isReloading');
    localStorage.setItem('hasLoaded', 'true');
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('loading-screen');
    background(255);
    frameRate(60);
    startNewSet();
  } else {
 
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('main-content').classList.add('visible');
  }
}

function draw() {
  if (fadeOutStarted) {
    fadeOpacity -= 0.04;
    if (fadeOpacity <= 0) {
      animationComplete = true;
      const loadingScreen = document.getElementById('loading-screen');
      const mainContent = document.getElementById('main-content');
      
      
      loadingScreen.style.opacity = '0';
      
     
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        
        mainContent.classList.add('visible');
      }, 300);
      return;
    }
    document.getElementById('loading-screen').style.opacity = fadeOpacity;
    return;
  }

  if (frameCount % (60 * 0.2) === 0) {
    let newRedD = random(100, 200);
    let last = redCircles[redCircles.length - 1];

    let found = false;
    for (let i = 0; i < maxAttempts; i++) {
      let angle = random(TWO_PI);
      let distance = (last.d + newRedD) / 2;
      let newX = last.x + cos(angle) * distance;
      let newY = last.y + sin(angle) * distance;

      if (
        newX - newRedD / 2 < 0 ||
        newX + newRedD / 2 > width ||
        newY - newRedD / 2 < 0 ||
        newY + newRedD / 2 > height
      ) {
        continue;
      }

      let overlapping = redCircles.some(c => {
        let minDist = (c.d + newRedD) / 2;
        let actualDist = dist(c.x, c.y, newX, newY);
        return actualDist < minDist - 1;
      });

      if (!overlapping) {
        let withSet = (count % 3 === 0);
        drawCircleSet(newX, newY, newRedD, withSet);
        redCircles.push({ x: newX, y: newY, d: newRedD });
        count++;
        found = true;
        break;
      }
    }

    if (!found) {
      fadeOutStarted = true;
    }
  }
}

function drawCircleSet(rX, rY, rD, withSet) {
  noStroke();
  fill(230, 57, 70);
  circle(rX, rY, rD);

  if (withSet) {
    let wD = rD / 2;
    let wR = (rD - wD) / 2;
    let wX = random(rX - wR, rX + wR);
    let wY = random(rY - wR, rY + wR);
    fill(255);
    circle(wX, wY, wD);

    let bD = wD / 2;
    let bR = (wD - bD) / 2;
    let bX = random(wX - bR, wX + bR);
    let bY = random(wY - bR, wY + bR);
    fill(29, 53, 150);
    circle(bX, bY, bD);
  }
}

function resetAndRestart() {
  background(100);
  redCircles = [];
  count = 0;
  startNewSet();
}

function startNewSet() {
  let redD = random(100, 200);
  let redX = random(redD / 2, width - redD / 2);
  let redY = random(redD / 2, height - redD / 2);
  redCircles.push({ x: redX, y: redY, d: redD });
  drawCircleSet(redX, redY, redD, true);
  count++;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (!animationComplete) {
    resetAndRestart();
  }
}
