(() => {
  const canvas = document.getElementById('dots');
  const ctx = canvas.getContext('2d');
  const DOT_COUNT = 480;
  const JELLY_LERP = 0.12;
  const COLORS = [
    [234, 182, 118],  // warm gold/peach
    [210, 160, 200],  // soft pink
    [180, 140, 220],  // lavender
    [140, 170, 230],  // periwinkle blue
    [120, 200, 220],  // cyan/teal
    [220, 130, 170],  // hot pink
  ];
  const dots = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createDots() {
    const pageH = document.documentElement.scrollHeight;
    dots.length = 0;
    for (let i = 0; i < DOT_COUNT; i++) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      dots.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * pageH,
        r: 0.5 + Math.random() * 0.8,
        depth: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        jellyLerp: JELLY_LERP + Math.random() * 0.08,
        color,
        currentY: 0,
        initialized: false,
      });
    }
  }

  resize();
  createDots();
  window.addEventListener('resize', () => { resize(); createDots(); });

  let time = 0;
  let lastFrame = performance.now();

  function draw(now) {
    const dt = (now - lastFrame) / 1000;
    lastFrame = now;
    time += dt;
    const scrollTop = window.scrollY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const dot of dots) {
      const targetY = dot.y - scrollTop * dot.depth;

      if (!dot.initialized) {
        dot.currentY = targetY;
        dot.initialized = true;
      } else {
        dot.currentY += (targetY - dot.currentY) * dot.jellyLerp;
      }

      if (dot.currentY < -20 || dot.currentY > canvas.height + 20) continue;

      const twinkle = 0.5 + 0.5 * Math.sin(time * dot.twinkleSpeed + dot.phase);
      const alpha = 0.4 + twinkle * 0.6;

      ctx.beginPath();
      ctx.arc(dot.x, dot.currentY, dot.r, 0, Math.PI * 2);
      const [r, g, b] = dot.color;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
