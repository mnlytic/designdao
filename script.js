const LERP_FACTOR = 0.1;
const MAX_ANGLE = 60;

const sections = [];

document.querySelectorAll('.video-section').forEach((el) => {
  sections.push({
    el: el,
    container: el.querySelector('.video-container'),
    currentAngle: MAX_ANGLE,
  });
});

function getProgress(section) {
  const rect = section.el.getBoundingClientRect();
  const sectionCenter = rect.top + rect.height / 2;
  const viewportCenter = window.innerHeight / 2;
  // progress: 0 = section center is at bottom of viewport, 1 = at top
  const raw = 1 - (sectionCenter / window.innerHeight);
  return Math.max(0, Math.min(1, raw));
}

function animate() {
  for (const section of sections) {
    const progress = getProgress(section);
    // 0 → +60deg (folded back), 0.5 → 0deg (frontal), 1 → -60deg (folded forward)
    const targetAngle = MAX_ANGLE - progress * (MAX_ANGLE * 2);
    section.currentAngle += (targetAngle - section.currentAngle) * LERP_FACTOR;
    section.container.style.transform =
      `perspective(1000px) rotateX(${section.currentAngle}deg)`;
  }
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
