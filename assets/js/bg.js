/* ============================================================================== */
/* bg.js — Premium Floating Dust Particle Engine                                 */
/* Lightweight micro-nodes drifting seamlessly through space behind content      */
/* ============================================================================== */

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const CONFIG = {
    particleCount: 45,        // Subtle number of ambient particles 🎛️
    maxRadius: 2.5,           // Tiny minimalist node scale
    minRadius: 0.8
  };

  function getTheme() {
    const isDark = document.body.classList.contains('scheme-midnight');
    return {
      particleColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(71, 85, 105, 0.35)'
    };
  }

  let W, H;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let particles = [];
  function DustParticle() {
    this.reset();
    this.y = Math.random() * H; // Random initial vertical distribution
  }

  DustParticle.prototype.reset = function() {
    this.x = Math.random() * W;
    this.y = H + Math.random() * 20; // Spawn perfectly off screen bottom boundary
    this.r = Math.random() * (CONFIG.maxRadius - CONFIG.minRadius) + CONFIG.minRadius;
    this.vy = -(Math.random() * 0.3 + 0.1); // Steady upward drift speed 🎈
    this.vx = (Math.random() - 0.5) * 0.15; // Mild horizontal draft sway
  };

  DustParticle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;

    // Recirculate node if it drifts past top window framework bounds
    if (this.y + this.r < 0 || this.x < 0 || this.x > W) {
      this.reset();
    }
  };

  DustParticle.prototype.draw = function(color) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };

  function init() {
    particles = Array.from({ length: CONFIG.particleCount }, () => new DustParticle());
  }
  init();

  function loop() {
    ctx.clearRect(0, 0, W, H);
    const theme = getTheme();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(theme.particleColor);
    }

    requestAnimationFrame(loop);
  }
  loop();
})();