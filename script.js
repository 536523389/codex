const bubbleLayer = document.querySelector('.bubble-layer');
const bubbleCount = 26;

function spawnBubble() {
  const bubble = document.createElement('span');
  bubble.className = 'bubble';

  const size = Math.random() * 12 + 6;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;

  const duration = Math.random() * 6 + 8;
  bubble.style.animationDuration = `${duration}s`;
  bubble.style.animationDelay = `${Math.random() * 4}s`;

  bubbleLayer.appendChild(bubble);

  bubble.addEventListener('animationend', () => bubble.remove());
}

for (let i = 0; i < bubbleCount; i += 1) {
  spawnBubble();
}

setInterval(() => {
  if (document.visibilityState === 'visible') {
    spawnBubble();
  }
}, 1200);
