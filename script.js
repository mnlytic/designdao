const LERP_FACTOR = 0.25;
const INTRO_LERP = 0.03;
const INTRO_DURATION = 1500;
const MAX_ANGLE = 60;

const loadTime = performance.now();
const sections = [];

document.querySelectorAll('.video-section').forEach((el) => {
  sections.push({
    el: el,
    sticky: el.querySelector('.video-sticky'),
    wrap: el.querySelector('.video-wrap'),
    container: el.querySelector('.video-container'),
    fade: el.querySelector('.video-fade'),
    currentAngle: MAX_ANGLE,
  });
});

function getProgress(section) {
  const rect = section.el.getBoundingClientRect();
  const raw = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
  return Math.max(0, Math.min(1, raw));
}

function animate() {
  for (const section of sections) {
    const progress = getProgress(section);
    const t = progress * 2 - 1;
    const curved = t * t * t;
    const targetAngle = -MAX_ANGLE * curved;
    const elapsed = performance.now() - loadTime;
    const introT = Math.min(elapsed / INTRO_DURATION, 1);
    const lerp = INTRO_LERP + (LERP_FACTOR - INTRO_LERP) * introT;
    section.currentAngle += (targetAngle - section.currentAngle) * lerp;
    const tiltRatio = Math.abs(section.currentAngle) / MAX_ANGLE;
    // 3D tilt + opacity
    const tx = `perspective(1500px) rotateX(${section.currentAngle}deg)`;
    const op = 1 - tiltRatio * 0.5;
    if (section.wrap) {
      section.wrap.style.transform = tx;
      section.wrap.style.transformOrigin = 'center center';
      section.container.style.opacity = op;
    } else {
      section.container.style.transform = tx;
      section.container.style.opacity = op;
    }
    // gradient fade
    section.fade.style.opacity = tiltRatio;
  }
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Logo: show nav logo when hero logo scrolls out
const heroLogo = document.querySelector('.logo-hero');
const navLogo = document.querySelector('.logo-nav');

new IntersectionObserver(([entry]) => {
  navLogo.classList.toggle('visible', !entry.isIntersecting);
}).observe(heroLogo);
