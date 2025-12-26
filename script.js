const giftBtn = document.getElementById("giftBtn");
const reveal = document.getElementById("reveal");
const flipBtn = document.getElementById("flipBtn");
const flipBtnBack = document.getElementById("flipBtnBack");
const cardContainer = document.getElementById("cardContainer");
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Flip card functionality
function flipCard() {
  cardContainer.classList.toggle('flipped');
  
  const superSizeBtn = document.getElementById('superSizeBtn');
  const grinchBtn = document.getElementById('grinchBtn');
  
  // Show/hide buttons based on flip state
  if (cardContainer.classList.contains('flipped')) {
    // Card is flipped (showing tree), show buttons after delay
    setTimeout(() => {
      superSizeBtn.style.opacity = '1';
      superSizeBtn.style.visibility = 'visible';
      superSizeBtn.style.pointerEvents = 'auto';
      
      grinchBtn.style.opacity = '1';
      grinchBtn.style.visibility = 'visible';
      grinchBtn.style.pointerEvents = 'auto';
    }, 400);
  } else {
    // Card is front (showing gift), hide buttons
    superSizeBtn.style.opacity = '0';
    superSizeBtn.style.visibility = 'hidden';
    superSizeBtn.style.pointerEvents = 'none';
    
    grinchBtn.style.opacity = '0';
    grinchBtn.style.visibility = 'hidden';
    grinchBtn.style.pointerEvents = 'none';
  }
  
  // Add sparkle effect on flip
  const rect = cardContainer.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      createSparkle(
        centerX + (Math.random() - 0.5) * 200,
        centerY + (Math.random() - 0.5) * 200
      );
    }, i * 50);
  }
}

flipBtn.addEventListener('click', flipCard);
flipBtnBack.addEventListener('click', flipCard);

// Loading animation
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.classList.remove('loading');
  }, 2000);
});

// Add loading class initially
document.body.classList.add('loading');

// Create twinkling stars
function createStars() {
  const starsContainer = document.getElementById('stars');
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (Math.random() * 2 + 2) + 's';
    starsContainer.appendChild(star);
  }
}

function createSnow() {
  const snow = document.getElementById('snow');
  const snowflakes = ['❄', '❅', '❆'];
  const count = isMobile ? 30 : 50;
  
  for (let i = 0; i < count; i++) {
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    flake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
    flake.style.left = Math.random() * 100 + '%';
    
    // Varied sizes for depth
    const size = Math.random() * 2 + 0.5;
    flake.style.fontSize = size + 'em';
    
    // Bigger flakes fall slower
    const duration = size > 1.5 ? Math.random() * 5 + 8 : Math.random() * 3 + 5;
    flake.style.animationDuration = duration + 's';
    flake.style.animationDelay = Math.random() * 5 + 's';
    flake.style.opacity = Math.random() * 0.6 + 0.4;
    
    // Add blur to some for depth
    if (Math.random() > 0.5) {
      flake.style.filter = 'blur(1px)';
    } else if (size > 1.5) {
      flake.style.filter = 'blur(0.5px)';
    }
    
    snow.appendChild(flake);
  }
}

// Sparkle effect
function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.textContent = '✨';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  sparkle.style.fontSize = (Math.random() * 10 + 12) + 'px';
  document.body.appendChild(sparkle);
  
  setTimeout(() => sparkle.remove(), 1000);
}

// Fireflies - gentle floating glowing dots ✨
function createFirefly() {
  const firefly = document.createElement('div');
  firefly.className = 'firefly';
  
  // Random starting position
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  
  // Random curved path (gentle floating movement)
  const midX = startX + (Math.random() - 0.5) * 200;
  const midY = startY + (Math.random() - 0.5) * 150;
  const endX = startX + (Math.random() - 0.5) * 300;
  const endY = startY + (Math.random() - 0.5) * 200;
  
  // Random duration and delay
  const duration = 8 + Math.random() * 7; // 8-15 seconds
  const delay = Math.random() * 5; // 0-5 second delay
  
  firefly.style.setProperty('--start-x', startX + 'px');
  firefly.style.setProperty('--start-y', startY + 'px');
  firefly.style.setProperty('--mid-x', midX + 'px');
  firefly.style.setProperty('--mid-y', midY + 'px');
  firefly.style.setProperty('--end-x', endX + 'px');
  firefly.style.setProperty('--end-y', endY + 'px');
  firefly.style.setProperty('--duration', duration + 's');
  firefly.style.setProperty('--delay', delay + 's');
  
  document.body.appendChild(firefly);
  
  // Remove and recreate after animation completes
  setTimeout(() => {
    firefly.remove();
    createFirefly(); // Create a new one to keep population constant
  }, (duration + delay) * 1000);
}

// Create initial fireflies (15 gentle glowing dots)
for (let i = 0; i < 15; i++) {
  setTimeout(() => createFirefly(), i * 500);
}

// Moon explosion - click to explode! 🌙💥
const moon = document.getElementById('moon');
let moonExploded = false;

moon.addEventListener('click', function() {
  if (moonExploded) return;
  
  moonExploded = true;
  
  // Add exploding class
  this.classList.add('exploding');
  
  // Flash effect
  const flash = document.createElement('div');
  flash.className = 'moon-flash';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 400);
  
  // Explosion sound
  playMoonExplosionSound();
  
  // Moon pieces - drinks and desserts! 🍷🍰
  const pieces = ['🍷', '🍺', '🍻', '🥃', '🍾', '🎁', '🍪', '🧁', '🎂', '🍰'];
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const piece = document.createElement('div');
      piece.className = 'moon-piece';
      piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
      piece.style.left = '85px'; // Moon center
      piece.style.top = '85px';
      
      // Random explosion direction
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const distance = 200 + Math.random() * 200;
      const flyX = Math.cos(angle) * distance;
      const flyY = Math.sin(angle) * distance;
      const rotate = Math.random() * 1080 - 540;
      
      piece.style.setProperty('--fly-x', flyX + 'px');
      piece.style.setProperty('--fly-y', flyY + 'px');
      piece.style.setProperty('--rotate', rotate + 'deg');
      
      document.body.appendChild(piece);
      
      setTimeout(() => piece.remove(), 2000);
    }, i * 40);
  }
  
  // Screen shake
  document.body.style.animation = 'shake 0.3s ease-in-out';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 300);
  
  // Moon respawns after 3 seconds
  setTimeout(() => {
    this.classList.remove('exploding');
    this.style.animation = 'moonBounceBack 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) backwards';
    
    // Add bounce back animation
    if (!document.getElementById('moonBounceStyle')) {
      const bounceStyle = document.createElement('style');
      bounceStyle.id = 'moonBounceStyle';
      bounceStyle.textContent = `
        @keyframes moonBounceBack {
          0% {
            transform: scale(0) rotate(180deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.2) rotate(-10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(bounceStyle);
    }
    
    moonExploded = false;
  }, 3000);
});

// Moon explosion sound
function playMoonExplosionSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Deep boom
    const boom = audioContext.createOscillator();
    const boomGain = audioContext.createGain();
    boom.connect(boomGain);
    boomGain.connect(audioContext.destination);
    boom.type = 'sine';
    boom.frequency.setValueAtTime(80, now);
    boom.frequency.exponentialRampToValueAtTime(30, now + 0.5);
    boomGain.gain.setValueAtTime(0.5, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    boom.start(now);
    boom.stop(now + 0.5);
    
    // High pitched crack
    const crack = audioContext.createOscillator();
    const crackGain = audioContext.createGain();
    crack.connect(crackGain);
    crackGain.connect(audioContext.destination);
    crack.type = 'square';
    crack.frequency.setValueAtTime(2000, now + 0.1);
    crack.frequency.exponentialRampToValueAtTime(500, now + 0.3);
    crackGain.gain.setValueAtTime(0.3, now + 0.1);
    crackGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    crack.start(now + 0.1);
    crack.stop(now + 0.3);
  } catch(e) {
    console.log('Audio not available');
  }
}

// Mouse sparkles (desktop)
if (!isMobile) {
  document.addEventListener('mousemove', (e) => {
    // Regular sparkles
    if (Math.random() > 0.8) {
      createSparkle(e.pageX, e.pageY);
    }
    
    // Particle trail
    if (Math.random() > 0.85) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const colors = ['#ff2a6d', '#43ffd7', '#ffd700', '#a78bfa'];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = e.pageX + 'px';
      particle.style.top = e.pageY + 'px';
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 800);
    }
  });
}

// Touch sparkles (mobile)
document.addEventListener('touchmove', (e) => {
  if (Math.random() > 0.7) {
    const touch = e.touches[0];
    createSparkle(touch.pageX, touch.pageY);
  }
}, { passive: true });

// Tap anywhere sparkles (mobile)
document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  createSparkle(touch.pageX, touch.pageY);
}, { passive: true });

// Confetti explosion
function createConfetti(x, y) {
  const colors = ['#ff2a6d', '#43ffd7', '#ffd700', '#ff6b9d', '#00ff88', '#a78bfa'];
  const confettiCount = isMobile ? 60 : 100;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = x + 'px';
    confetti.style.top = y + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    const angle = (Math.random() * 360) * (Math.PI / 180);
    const velocity = Math.random() * 150 + 80;
    const xVel = Math.cos(angle) * velocity;
    const yVel = Math.sin(angle) * velocity;
    
    confetti.animate([
      { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${xVel}px, ${yVel}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
      duration: 2500,
      easing: 'cubic-bezier(0, .9, .57, 1)'
    });
    
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2500);
  }
}

// Sound effect
function playChime() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const frequencies = [523.25, 659.25, 783.99];
    const now = audioContext.currentTime;
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
      
      oscillator.start(now + index * 0.1);
      oscillator.stop(now + 1.5);
    });
  } catch(e) {
    console.log('Audio not available');
  }
}

// Ornament click sound - magical bell
function playOrnamentSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // High pitched bell sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 1047; // High C
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    oscillator.start(now);
    oscillator.stop(now + 0.4);
  } catch(e) {
    console.log('Audio not available');
  }
}

// Gift box pop sound
function playGiftSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Pop sound - low to high
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(150, now);
    oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    oscillator.start(now);
    oscillator.stop(now + 0.2);
  } catch(e) {
    console.log('Audio not available');
  }
}

// Gift button click
giftBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  playChime();
  
  const rect = giftBtn.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  createConfetti(x, y);
  
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createSparkle(
        x + (Math.random() - 0.5) * 100,
        y + (Math.random() - 0.5) * 100
      );
    }, i * 100);
  }
  
  setTimeout(() => {
    reveal.classList.add("show");
    giftBtn.textContent = "Opened 🎄";
    giftBtn.disabled = true;
    
    const chips = document.querySelectorAll('.chip');
    
    // Sequential chip reveal
    chips.forEach((chip, index) => {
      setTimeout(() => {
        chip.classList.add('show');
      }, index * 200);
    });
    
    // Add click handlers
    chips.forEach(chip => {
      chip.addEventListener('click', function() {
        this.classList.remove('wiggle');
        void this.offsetWidth;
        this.classList.add('wiggle');
        
        const rect = this.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            createSparkle(
              rect.left + rect.width / 2 + (Math.random() - 0.5) * 50,
              rect.top + rect.height / 2 + (Math.random() - 0.5) * 50
            );
          }, i * 50);
        }
      });
    });
  }, 200);
});

createSnow();
createStars();

// Decorate the Christmas tree
function decorateTree() {
  const tree = document.getElementById('christmasTree');
  
  // Ornament positions (positioned on the single triangle tree)
  const ornamentPositions = [
    // Top section
    { left: '45%', top: '80px', color: '#ff2a6d', delay: 2.3 },
    { left: '55%', top: '90px', color: '#43ffd7', delay: 2.5 },
    
    // Upper-middle section
    { left: '35%', top: '130px', color: '#ffd700', delay: 2.7 },
    { left: '50%', top: '140px', color: '#ff6b9d', delay: 2.9 },
    { left: '65%', top: '135px', color: '#00ff88', delay: 3.1 },
    
    // Middle section
    { left: '30%', top: '180px', color: '#a78bfa', delay: 3.3 },
    { left: '50%', top: '190px', color: '#43ffd7', delay: 3.5 },
    { left: '70%', top: '185px', color: '#ff2a6d', delay: 3.7 },
    
    // Lower-middle section
    { left: '25%', top: '230px', color: '#ffd700', delay: 3.9 },
    { left: '45%', top: '240px', color: '#00ff88', delay: 4.1 },
    { left: '55%', top: '235px', color: '#ff6b9d', delay: 4.3 },
    { left: '75%', top: '228px', color: '#a78bfa', delay: 4.5 }
  ];
  
  // Light positions (smaller, more scattered)
  const lightPositions = [
    { left: '40%', top: '70px', color: '#ffd700', delay: 4.7 },
    { left: '60%', top: '75px', color: '#ff2a6d', delay: 4.75 },
    { left: '48%', top: '105px', color: '#43ffd7', delay: 4.8 },
    { left: '38%', top: '115px', color: '#00ff88', delay: 4.85 },
    { left: '62%', top: '110px', color: '#a78bfa', delay: 4.9 },
    
    { left: '32%', top: '155px', color: '#ffd700', delay: 4.95 },
    { left: '50%', top: '165px', color: '#ff6b9d', delay: 5.0 },
    { left: '68%', top: '160px', color: '#43ffd7', delay: 5.05 },
    
    { left: '28%', top: '205px', color: '#ff2a6d', delay: 5.1 },
    { left: '48%', top: '215px', color: '#00ff88', delay: 5.15 },
    { left: '72%', top: '210px', color: '#ffd700', delay: 5.2 },
    
    { left: '23%', top: '250px', color: '#a78bfa', delay: 5.25 },
    { left: '42%', top: '260px', color: '#43ffd7', delay: 5.3 },
    { left: '58%', top: '258px', color: '#ff6b9d', delay: 5.35 },
    { left: '77%', top: '252px', color: '#00ff88', delay: 5.4 }
  ];
  
  // Add ornaments
  ornamentPositions.forEach(pos => {
    const ornament = document.createElement('div');
    ornament.className = 'tree-ornament';
    ornament.style.left = pos.left;
    ornament.style.top = pos.top;
    ornament.style.backgroundColor = pos.color;
    ornament.style.animationDelay = pos.delay + 's';
    
    ornament.addEventListener('click', function() {
      const rect = this.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      // Play bell sound
      playOrnamentSound();
      
      // Create confetti burst from ornament
      createConfetti(x, y);
      
      // Add a few sparkles too for extra effect
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          createSparkle(x, y);
        }, i * 30);
      }
    });
    
    tree.appendChild(ornament);
  });
  
  // Add lights
  lightPositions.forEach(pos => {
    const light = document.createElement('div');
    light.className = 'tree-lights';
    light.style.left = pos.left;
    light.style.top = pos.top;
    light.style.backgroundColor = pos.color;
    light.style.animationDelay = pos.delay + 's,' + (pos.delay + 0.5) + 's';
    
    tree.appendChild(light);
  });
}

// Start decorating after a short delay
setTimeout(decorateTree, 100);

// Make gift boxes interactive
setTimeout(() => {
  const giftBoxItems = document.querySelectorAll('.gift-box-item');
  giftBoxItems.forEach((giftBox, index) => {
    giftBox.addEventListener('click', function(e) {
      e.stopPropagation();
      const rect = this.getBoundingClientRect();
      
      // Confetti burst from gift
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      // Play gift pop sound
      playGiftSound();
      
      // If it's the left gift (index 0), pop out a cupcake!
      if (index === 0) {
        const cupcake = document.createElement('div');
        cupcake.className = 'cupcake';
        cupcake.textContent = '🧁';
        cupcake.style.left = x + 'px';
        cupcake.style.top = y + 'px';
        document.body.appendChild(cupcake);
        
        // Remove after animation
        setTimeout(() => cupcake.remove(), 1500);
        
        // Extra sparkles for the cupcake
        for (let i = 0; i < 25; i++) {
          setTimeout(() => {
            createSparkle(
              x + (Math.random() - 0.5) * 100,
              y - 80 + (Math.random() - 0.5) * 80
            );
          }, i * 25);
        }
      }
      
      // If it's the middle gift (index 1), pop out a wine bottle!
      if (index === 1) {
        const wineBottle = document.createElement('div');
        wineBottle.className = 'wine-bottle';
        wineBottle.textContent = '🍷';
        wineBottle.style.left = x + 'px';
        wineBottle.style.top = y + 'px';
        document.body.appendChild(wineBottle);
        
        // Remove after animation
        setTimeout(() => wineBottle.remove(), 1500);
        
        // Extra sparkles for the wine bottle
        for (let i = 0; i < 30; i++) {
          setTimeout(() => {
            createSparkle(
              x + (Math.random() - 0.5) * 120,
              y - 100 + (Math.random() - 0.5) * 100
            );
          }, i * 30);
        }
      }
      
      // If it's the right gift (index 2), pop out a llama!
      if (index === 2) {
        // First show the wine bottle tipping over
        const wineSpill = document.createElement('div');
        wineSpill.style.position = 'fixed';
        wineSpill.style.left = x + 'px';
        wineSpill.style.top = y + 'px';
        wineSpill.style.fontSize = '2rem';
        wineSpill.style.zIndex = '9999';
        wineSpill.textContent = '🍷💦';
        wineSpill.style.animation = 'wineSpill 0.8s ease-out forwards';
        document.body.appendChild(wineSpill);
        
        setTimeout(() => wineSpill.remove(), 800);
        
        // Then the drunk llama appears!
        setTimeout(() => {
          const llama = document.createElement('div');
          llama.className = 'llama';
          llama.style.left = x + 'px';
          llama.style.top = y + 'px';
          document.body.appendChild(llama);
          
          // Llama with wine glass
          const llamaFace = document.createElement('div');
          llamaFace.textContent = '🦙';
          llamaFace.style.display = 'inline-block';
          llama.appendChild(llamaFace);
          
          const wineGlass = document.createElement('div');
          wineGlass.textContent = '🍷';
          wineGlass.style.display = 'inline-block';
          wineGlass.style.marginLeft = '-10px';
          wineGlass.style.animation = 'wineSwing 0.3s ease-in-out infinite';
          llama.appendChild(wineGlass);
          
          // Add hiccup text bubbles
          const hiccups = ['*hic*', '*burp*', '🥴'];
          hiccups.forEach((text, i) => {
            setTimeout(() => {
              const bubble = document.createElement('div');
              bubble.textContent = text;
              bubble.style.position = 'fixed';
              bubble.style.left = (x + 40) + 'px';
              bubble.style.top = (y - 60 - i * 40) + 'px';
              bubble.style.fontSize = '1.2rem';
              bubble.style.zIndex = '9998';
              bubble.style.animation = 'bubbleFloat 1s ease-out forwards';
              document.body.appendChild(bubble);
              setTimeout(() => bubble.remove(), 1000);
            }, 500 + i * 400);
          });
          
          // Remove after animation
          setTimeout(() => llama.remove(), 2500);
        }, 400);
        
        // Extra sparkles for the drunk llama
        for (let i = 0; i < 35; i++) {
          setTimeout(() => {
            createSparkle(
              x + (Math.random() - 0.5) * 140,
              y - 120 + (Math.random() - 0.5) * 120
            );
          }, i * 35);
        }
      }
      
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          createSparkle(
            x + (Math.random() - 0.5) * 80,
            y + (Math.random() - 0.5) * 80
          );
        }, i * 20);
      }
      
      // Wiggle animation
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = '';
      }, 10);
    });
  });
}, 7000);

// Create shooting stars periodically
function createShootingStar() {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  
  star.style.left = Math.random() * 70 + '%';
  star.style.top = Math.random() * 40 + '%';
  star.style.animation = 'shoot 1.5s linear forwards';
  
  document.getElementById('stars').appendChild(star);
  
  setTimeout(() => star.remove(), 1500);
}

function scheduleShootingStar() {
  createShootingStar();
  const nextInterval = Math.random() * 3000 + 3000;
  setTimeout(scheduleShootingStar, nextInterval);
}

createShootingStar();
setTimeout(scheduleShootingStar, 3000);

// Glow on scroll effect
let scrollTimeout;
window.addEventListener('scroll', () => {
  const card = document.querySelector('.card');
  const title = document.querySelector('.title');
  
  card.classList.add('scroll-glow');
  title.classList.add('scroll-glow');
  
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    card.classList.remove('scroll-glow');
    title.classList.remove('scroll-glow');
  }, 500);
});

// Shake detection for snow burst
let lastX = 0, lastY = 0, lastZ = 0;
let shakeThreshold = 15;
let lastShakeTime = 0;

if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', (e) => {
    const acc = e.accelerationIncludingGravity;
    if (!acc) return;

    const deltaX = Math.abs(acc.x - lastX);
    const deltaY = Math.abs(acc.y - lastY);
    const deltaZ = Math.abs(acc.z - lastZ);

    if ((deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold)) {
      const now = Date.now();
      if (now - lastShakeTime > 1000) {
        snowBurst();
        lastShakeTime = now;
      }
    }

    lastX = acc.x;
    lastY = acc.y;
    lastZ = acc.z;
  });
}

// Desktop shake detection
let mouseShakeCount = 0;
let lastMouseX = 0;
let shakeResetTimeout;

document.addEventListener('mousemove', (e) => {
  const deltaX = Math.abs(e.clientX - lastMouseX);
  
  if (deltaX > 100) {
    mouseShakeCount++;
    
    if (mouseShakeCount > 3) {
      snowBurst();
      mouseShakeCount = 0;
    }
    
    clearTimeout(shakeResetTimeout);
    shakeResetTimeout = setTimeout(() => {
      mouseShakeCount = 0;
    }, 500);
  }
  
  lastMouseX = e.clientX;
});

// Snow burst effect
function snowBurst() {
  const snow = document.getElementById('snow');
  const snowflakes = ['❄', '❅', '❆'];
  const burstCount = 30;
  
  for (let i = 0; i < burstCount; i++) {
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    flake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
    flake.style.left = Math.random() * 100 + '%';
    flake.style.top = '-20px';
    flake.style.fontSize = (Math.random() * 2 + 1) + 'em';
    flake.style.animationDuration = (Math.random() * 2 + 2) + 's';
    flake.style.animationDelay = (Math.random() * 0.3) + 's';
    flake.style.opacity = Math.random() * 0.8 + 0.5;
    
    snow.appendChild(flake);
    
    setTimeout(() => flake.remove(), 4000);
  }
  
  document.body.style.animation = 'shake 0.3s';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 300);
}

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

// Simple Snowman - Click to Melt
const simpleSnowman = document.getElementById('simpleSnowman');
let snowmanMelted = false;

simpleSnowman.addEventListener('click', function() {
  if (snowmanMelted) return;
  
  snowmanMelted = true;
  
  // Add melting class
  this.classList.add('melting');
  
  // Sparkle/water droplets as it melts
  const rect = this.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Create water droplets 💧
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const droplet = document.createElement('div');
      droplet.textContent = '💧';
      droplet.style.position = 'fixed';
      droplet.style.left = (centerX + (Math.random() - 0.5) * 60) + 'px';
      droplet.style.top = centerY + 'px';
      droplet.style.fontSize = '1.5rem';
      droplet.style.zIndex = '10000';
      droplet.style.pointerEvents = 'none';
      
      const dropAnim = document.createElement('style');
      dropAnim.textContent = `
        @keyframes waterDrop${i} {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          20% { transform: translateY(10px) scale(1); opacity: 1; }
          100% { transform: translateY(80px) scale(0.8); opacity: 0; }
        }
      `;
      document.head.appendChild(dropAnim);
      droplet.style.animation = `waterDrop${i} 1.5s ease-out forwards`;
      
      document.body.appendChild(droplet);
      setTimeout(() => {
        droplet.remove();
        dropAnim.remove();
      }, 1500);
    }, i * 100);
  }
  
  // Reset after melting
  setTimeout(() => {
    this.classList.remove('melting');
    this.style.animation = 'snowmanBounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) backwards';
    snowmanMelted = false;
  }, 2500);
});

// Grinch Mode Button - MEGA EXPLOSION MODE 💥
const grinchBtn = document.getElementById('grinchBtn');
let isGrinched = false;

grinchBtn.addEventListener('click', function() {
  if (isGrinched) return;
  
  isGrinched = true;
  const tree = document.getElementById('christmasTree');
  const cardContainer = document.getElementById('cardContainer');
  
  // Change button
  grinchBtn.textContent = 'BOOM! 💥';
  grinchBtn.style.background = 'linear-gradient(135deg, #ff4500, #ff0000)';
  grinchBtn.style.color = '#fff';
  
  // IMMEDIATELY turn tree brown (before shake)
  tree.classList.add('grinch-mode');
  
  // Turn off lights immediately
  const lights = tree.querySelectorAll('.tree-lights');
  lights.forEach(light => {
    light.style.opacity = '0';
    light.style.animation = 'none';
  });
  
  // STEP 1: TREE SHAKES (0-0.5s warning)
  tree.classList.add('grinch-shake');
  
  setTimeout(() => {
    tree.classList.remove('grinch-shake');
    
    // STEP 2: BOOM SOUND + SCREEN SHAKE (0.5s)
    playExplosionBoom();
    cardContainer.classList.add('screen-shake');
    
    setTimeout(() => {
      cardContainer.classList.remove('screen-shake');
    }, 500);
    
    // STEP 3 & 4: EVERYTHING EXPLODES (0.5-2s)
    
    // Get elements
    const ornaments = tree.querySelectorAll('.tree-ornament');
    const star = tree.querySelector('.tree-star');
    const gifts = document.querySelectorAll('.gift-box-item');
    const pot = tree.querySelector('.tree-pot');
    const treeRect = tree.getBoundingClientRect();
    const centerX = treeRect.left + treeRect.width / 2;
    const centerY = treeRect.top + treeRect.height / 2;
    
    // ORNAMENTS EXPLODE IN ALL DIRECTIONS
    ornaments.forEach((ornament, index) => {
      const angle = (index / ornaments.length) * Math.PI * 2;
      const distance = 400 + Math.random() * 200;
      const explodeX = Math.cos(angle) * distance;
      const explodeY = Math.sin(angle) * distance;
      const explodeRot = Math.random() * 1080 - 540;
      
      ornament.style.setProperty('--explode-x', explodeX + 'px');
      ornament.style.setProperty('--explode-y', explodeY + 'px');
      ornament.style.setProperty('--explode-rot', explodeRot + 'deg');
      
      setTimeout(() => {
        ornament.classList.add('ornament-explode');
      }, index * 30);
    });
    
    // STAR EXPLODES UPWARD
    setTimeout(() => {
      star.classList.add('star-explode');
      
      // Star explosion particles
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        particle.textContent = '✨';
        particle.style.left = centerX + 'px';
        particle.style.top = (centerY - 100) + 'px';
        
        const angle = (i / 8) * Math.PI * 2;
        const dist = 150;
        particle.style.setProperty('--particle-x', (Math.cos(angle) * dist) + 'px');
        particle.style.setProperty('--particle-y', (Math.sin(angle) * dist) + 'px');
        particle.style.setProperty('--particle-rot', (Math.random() * 360) + 'deg');
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
      }
    }, 100);
    
    // GIFTS EXPLODE SIDEWAYS
    gifts.forEach((gift, index) => {
      const direction = index === 0 ? -1 : index === 1 ? 0 : 1;
      const giftX = direction * (300 + Math.random() * 200);
      const giftY = Math.random() * 200 - 100;
      const giftRot = Math.random() * 720 - 360;
      
      gift.style.setProperty('--gift-x', giftX + 'px');
      gift.style.setProperty('--gift-y', giftY + 'px');
      gift.style.setProperty('--gift-rot', giftRot + 'deg');
      
      setTimeout(() => {
        gift.classList.add('gift-explode');
      }, 150 + index * 50);
    });
    
    // EXPLOSION EMOJIS 💥
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const boom = document.createElement('div');
        boom.className = 'explosion-particle';
        boom.textContent = '💥';
        boom.style.left = (centerX + (Math.random() - 0.5) * 200) + 'px';
        boom.style.top = (centerY + (Math.random() - 0.5) * 200) + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const dist = 200 + Math.random() * 100;
        boom.style.setProperty('--particle-x', (Math.cos(angle) * dist) + 'px');
        boom.style.setProperty('--particle-y', (Math.sin(angle) * dist) + 'px');
        boom.style.setProperty('--particle-rot', (Math.random() * 720) + 'deg');
        boom.style.fontSize = '3rem';
        
        document.body.appendChild(boom);
        setTimeout(() => boom.remove(), 1500);
      }, i * 80);
    }
    
    // SMOKE CLOUDS 💨
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const smoke = document.createElement('div');
        smoke.className = 'explosion-particle';
        smoke.textContent = '💨';
        smoke.style.left = (centerX + (Math.random() - 0.5) * 150) + 'px';
        smoke.style.top = (centerY + (Math.random() - 0.5) * 150) + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const dist = 150;
        smoke.style.setProperty('--particle-x', (Math.cos(angle) * dist) + 'px');
        smoke.style.setProperty('--particle-y', (Math.sin(angle) * dist) + 'px');
        smoke.style.setProperty('--particle-rot', '0deg');
        
        document.body.appendChild(smoke);
        setTimeout(() => smoke.remove(), 1500);
      }, i * 150);
    }
    
    // Tree is already brown from the start, just let it wilt after explosion
    // (The wilt animation has a 0.5s delay built into CSS)
    
    // STEP 6: GRINCH EMOJIS (1.5s after explosion)
    setTimeout(() => {
      playSadSound();
      
      // Grinch emojis instead of tears
      const grinchEmojis = ['😈', '👹', '😠', '💚', '🎄💔'];
      
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          const grinch = document.createElement('div');
          grinch.textContent = grinchEmojis[Math.floor(Math.random() * grinchEmojis.length)];
          grinch.style.position = 'fixed';
          grinch.style.left = (centerX + (Math.random() - 0.5) * 100) + 'px';
          grinch.style.top = (centerY - 50) + 'px';
          grinch.style.fontSize = '2.5rem';
          grinch.style.zIndex = '9999';
          grinch.style.pointerEvents = 'none';
          
          const grinchAnim = document.createElement('style');
          grinchAnim.textContent = `
            @keyframes grinchFloat${i} {
              0% { transform: translateY(0) rotate(0deg) scale(0); opacity: 0; }
              20% { transform: translateY(30px) rotate(${Math.random() * 60 - 30}deg) scale(1.2); opacity: 1; }
              100% { transform: translateY(500px) rotate(${Math.random() * 360}deg) scale(0.8); opacity: 0; }
            }
          `;
          document.head.appendChild(grinchAnim);
          grinch.style.animation = `grinchFloat${i} 2.5s ease-in forwards`;
          
          document.body.appendChild(grinch);
          setTimeout(() => {
            grinch.remove();
            grinchAnim.remove();
          }, 2500);
        }, i * 200);
      }
    }, 1500);
    
    // STEP 7: TREE FALLS OVER (after 4s - right before reset)
    setTimeout(() => {
      // Make tree fall over
      tree.classList.add('falling-over');
      
      // Crash sound
      playCrashSound();
      
      // Pot breaks into pieces
      setTimeout(() => {
        const pot = tree.querySelector('.tree-pot');
        const potRect = pot.getBoundingClientRect();
        const potCenterX = potRect.left + potRect.width / 2;
        const potCenterY = potRect.top + potRect.height / 2;
        
        // Create pot crack pieces
        const crackPieces = ['💥', '💔', '⚡', '💨'];
        for (let i = 0; i < 8; i++) {
          const piece = document.createElement('div');
          piece.className = 'pot-crack';
          piece.textContent = crackPieces[Math.floor(Math.random() * crackPieces.length)];
          piece.style.left = potCenterX + 'px';
          piece.style.top = potCenterY + 'px';
          
          const angle = (i / 8) * Math.PI * 2;
          const dist = 100 + Math.random() * 50;
          piece.style.setProperty('--crack-x', (Math.cos(angle) * dist) + 'px');
          piece.style.setProperty('--crack-y', (Math.sin(angle) * dist) + 'px');
          piece.style.setProperty('--crack-rot', (Math.random() * 360) + 'deg');
          
          document.body.appendChild(piece);
          setTimeout(() => piece.remove(), 2000);
        }
      }, 300);
    }, 4000);
    
    // STEP 8: EVERYTHING RETURNS (after 6s - extended from 5s)
    setTimeout(() => {
      // Remove all classes
      tree.classList.remove('grinch-mode', 'falling-over');
      star.classList.remove('star-explode');
      
      // Reset ornaments
      ornaments.forEach(ornament => {
        ornament.classList.remove('ornament-explode');
        ornament.style.opacity = '1';
        ornament.style.animation = '';
      });
      
      // Reset gifts
      gifts.forEach(gift => {
        gift.classList.remove('gift-explode');
        gift.style.opacity = '1';
        gift.style.animation = '';
      });
      
      // Reset lights
      const lights = tree.querySelectorAll('.tree-lights');
      lights.forEach(light => {
        light.style.opacity = '';
        light.style.animation = '';
      });
      
      // Reset button
      grinchBtn.textContent = 'GRINCH MODE 😈';
      grinchBtn.style.background = 'linear-gradient(135deg, #2d5d1e, #1a4d2e)';
      grinchBtn.style.color = '#8b0000';
      isGrinched = false;
    }, 6000);
    
  }, 500);
});

// BOOM explosion sound
function playExplosionBoom() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Deep BOOM
    const boom = audioContext.createOscillator();
    const boomGain = audioContext.createGain();
    boom.connect(boomGain);
    boomGain.connect(audioContext.destination);
    boom.type = 'sine';
    boom.frequency.setValueAtTime(60, now);
    boom.frequency.exponentialRampToValueAtTime(20, now + 0.5);
    boomGain.gain.setValueAtTime(0.6, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    boom.start(now);
    boom.stop(now + 0.5);
    
    // High CRACK
    const crack = audioContext.createOscillator();
    const crackGain = audioContext.createGain();
    crack.connect(crackGain);
    crackGain.connect(audioContext.destination);
    crack.type = 'square';
    crack.frequency.setValueAtTime(1000, now + 0.1);
    crack.frequency.exponentialRampToValueAtTime(200, now + 0.3);
    crackGain.gain.setValueAtTime(0.4, now + 0.1);
    crackGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    crack.start(now + 0.1);
    crack.stop(now + 0.3);
  } catch(e) {
    console.log('Audio not available');
  }
}

// Sad trombone sound
function playSadSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    const notes = [
      { freq: 220, time: 0, duration: 0.4 },
      { freq: 196, time: 0.35, duration: 0.4 },
      { freq: 165, time: 0.7, duration: 0.6 }
    ];
    
    notes.forEach(note => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'triangle';
      oscillator.frequency.value = note.freq;
      
      gainNode.gain.setValueAtTime(0.25, now + note.time);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + note.time + note.duration);
      
      oscillator.start(now + note.time);
      oscillator.stop(now + note.time + note.duration);
    });
  } catch(e) {
    console.log('Audio not available');
  }
}

// Crash sound when tree falls over
function playCrashSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Crash/thud sound
    const crash = audioContext.createOscillator();
    const crashGain = audioContext.createGain();
    crash.connect(crashGain);
    crashGain.connect(audioContext.destination);
    crash.type = 'sawtooth';
    crash.frequency.setValueAtTime(80, now);
    crash.frequency.exponentialRampToValueAtTime(30, now + 0.3);
    crashGain.gain.setValueAtTime(0.5, now);
    crashGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    crash.start(now);
    crash.stop(now + 0.3);
    
    // Glass breaking sound
    setTimeout(() => {
      const shatter = audioContext.createOscillator();
      const shatterGain = audioContext.createGain();
      shatter.connect(shatterGain);
      shatterGain.connect(audioContext.destination);
      shatter.type = 'square';
      shatter.frequency.setValueAtTime(2000, now + 0.15);
      shatter.frequency.exponentialRampToValueAtTime(500, now + 0.4);
      shatterGain.gain.setValueAtTime(0.3, now + 0.15);
      shatterGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      shatter.start(now + 0.15);
      shatter.stop(now + 0.4);
    }, 150);
  } catch(e) {
    console.log('Audio not available');
  }
}

// Super Size Tree Button
const superSizeBtn = document.getElementById('superSizeBtn');
let isSupersized = false;

superSizeBtn.addEventListener('click', function() {
  if (isSupersized) return; // Prevent multiple clicks
  
  isSupersized = true;
  const tree = document.getElementById('christmasTree');
  
  // Change button text
  superSizeBtn.textContent = 'OH NO! 😱';
  superSizeBtn.style.background = 'linear-gradient(135deg, #ff6b00, #ff2a00)';
  
  // Play explosion sound
  playExplosionSound();
  
  // Make tree grow HUGE
  tree.classList.add('super-grow');
  
  // After 2 seconds, shake and explode
  setTimeout(() => {
    tree.classList.remove('super-grow');
    tree.classList.add('exploding');
    
    // Explosion effect
    setTimeout(() => {
      // Create explosion pieces (ornaments, gifts, tree parts flying everywhere)
      const pieces = [
        '🎄', '🎄', '🎄',
        '⭐', '⭐',
        '🔴', '🔵', '🟡', '🟣', '🟢', '🟠',
        '🎁', '🎁', '🎁',
        '🧁', '🍷', '🦙',
        '💥', '💥', '💥',
        '✨', '✨', '✨',
        '❄️', '❄️', '❄️'
      ];
      
      const treeRect = tree.getBoundingClientRect();
      const centerX = treeRect.left + treeRect.width / 2;
      const centerY = treeRect.top + treeRect.height / 2;
      
      pieces.forEach((emoji, i) => {
        const piece = document.createElement('div');
        piece.className = 'explosion-piece';
        piece.textContent = emoji;
        piece.style.left = centerX + 'px';
        piece.style.top = centerY + 'px';
        
        // Random explosion direction
        const angle = (i / pieces.length) * Math.PI * 2;
        const distance = 300 + Math.random() * 500;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const rot = Math.random() * 720 - 360;
        
        piece.style.setProperty('--tx', tx + 'px');
        piece.style.setProperty('--ty', ty + 'px');
        piece.style.setProperty('--rot', rot + 'deg');
        piece.style.animationDelay = (Math.random() * 0.2) + 's';
        
        document.body.appendChild(piece);
        
        setTimeout(() => piece.remove(), 2200);
      });
      
      // Hide tree temporarily
      tree.style.opacity = '0';
      tree.classList.remove('exploding');
      
      // Reset after 3 seconds
      setTimeout(() => {
        tree.style.opacity = '1';
        tree.style.transform = '';
        tree.classList.remove('super-grow', 'exploding');
        superSizeBtn.textContent = 'SUPER SIZE! 🎄';
        superSizeBtn.style.background = 'linear-gradient(135deg, #ff2a6d, #ff6b9d)';
        isSupersized = false;
      }, 3000);
      
    }, 300);
  }, 2000);
});

// Explosion sound effect
function playExplosionSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Low boom
    const boom = audioContext.createOscillator();
    const boomGain = audioContext.createGain();
    boom.connect(boomGain);
    boomGain.connect(audioContext.destination);
    boom.type = 'sine';
    boom.frequency.setValueAtTime(80, now);
    boom.frequency.exponentialRampToValueAtTime(20, now + 0.5);
    boomGain.gain.setValueAtTime(0.5, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    boom.start(now);
    boom.stop(now + 0.5);
    
    // High crack
    setTimeout(() => {
      const crack = audioContext.createOscillator();
      const crackGain = audioContext.createGain();
      crack.connect(crackGain);
      crackGain.connect(audioContext.destination);
      crack.type = 'square';
      crack.frequency.setValueAtTime(800, now + 0.1);
      crack.frequency.exponentialRampToValueAtTime(100, now + 0.3);
      crackGain.gain.setValueAtTime(0.3, now + 0.1);
      crackGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      crack.start(now + 0.1);
      crack.stop(now + 0.3);
    }, 100);
  } catch(e) {
    console.log('Audio not available');
  }
}