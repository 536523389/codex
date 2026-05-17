const bubbleLayer = document.querySelector('.bubble-layer');
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let bubbleInterval = null;
const bubbleCount = 26;

function spawnBubble() {
  if (!bubbleLayer) return;

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

function startBubbles() {
  if (prefersReducedMotion.matches || bubbleInterval || !bubbleLayer) return;

  for (let i = 0; i < bubbleCount; i += 1) {
    spawnBubble();
  }

  bubbleInterval = setInterval(() => {
    if (document.visibilityState === 'visible') {
      spawnBubble();
    }
  }, 1200);
}

function stopBubbles() {
  if (bubbleInterval) {
    clearInterval(bubbleInterval);
    bubbleInterval = null;
  }

  if (bubbleLayer) {
    bubbleLayer.innerHTML = '';
  }
}

prefersReducedMotion.addEventListener('change', (event) => {
  if (event.matches) {
    stopBubbles();
  } else {
    startBubbles();
  }
});

startBubbles();

function setMenuState(isOpen) {
  if (!navLinks || !menuToggle) return;

  navLinks.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    setMenuState(!isOpen);
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setMenuState(false);
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (
      target instanceof Element &&
      !navLinks.contains(target) &&
      !menuToggle.contains(target)
    ) {
      setMenuState(false);
    }
  });
}
