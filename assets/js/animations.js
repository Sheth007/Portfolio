// ---------------------------------------------------------------------------
// 1. Scroll-reveal
// ---------------------------------------------------------------------------
(function () {
  const els = document.querySelectorAll('.reveal, .section-heading');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// ---------------------------------------------------------------------------
// 2. Smooth cursor glow
// ---------------------------------------------------------------------------
(function () {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function tick() {
    cx += (mx - cx) * 0.09;
    cy += (my - cy) * 0.09;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(tick);
  })();
})();

// ---------------------------------------------------------------------------
// 3. 3-D tilt on project cards
// ---------------------------------------------------------------------------
(function () {
  const cards = document.querySelectorAll('.proj-cell:not(.proj-cell--placeholder)');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;  // -0.5 → 0.5
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), background 0.2s ease, box-shadow 0.3s ease';
      card.style.transform  = '';
      // Clear the fast transition override after the animation settles
      setTimeout(() => { card.style.transition = ''; }, 500);
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.08s linear, background 0.2s ease, box-shadow 0.3s ease';
    });
  });
})();

// ---------------------------------------------------------------------------
// 4. Hero text character scramble on load
//    Randomises each character then settles into the real text
// ---------------------------------------------------------------------------
(function () {
  const el = document.querySelector('.hero .overview');
  if (!el) return;

  const originalText = el.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const rand = () => chars[Math.floor(Math.random() * chars.length)];

  let frame = 0;
  const totalFrames = 28;

  function scramble() {
    frame++;
    const progress = frame / totalFrames;
    const revealUpTo = Math.floor(progress * originalText.length);

    el.textContent = originalText
      .split('')
      .map((ch, i) => {
        if (ch === ' ' || ch === '\n') return ch;
        if (i < revealUpTo) return ch;
        return rand();
      })
      .join('');

    if (frame < totalFrames) {
      requestAnimationFrame(scramble);
    } else {
      el.textContent = originalText;
    }
  }

  // Start after a short delay so the fade-in has already begun
  setTimeout(() => requestAnimationFrame(scramble), 300);
})();

// ---------------------------------------------------------------------------
// 5. Magnetic bio links — follow cursor slightly
// ---------------------------------------------------------------------------
(function () {
  const links = document.querySelectorAll('.bio-links a');
  links.forEach(link => {
    link.addEventListener('mousemove', e => {
      const r = link.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.25;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.25;
      link.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    link.addEventListener('mouseleave', () => {
      link.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)';
      link.style.transform  = '';
      setTimeout(() => { link.style.transition = ''; }, 400);
    });
  });
})();

// ---------------------------------------------------------------------------
// 6. Chips — ripple on click
// ---------------------------------------------------------------------------
(function () {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', e => {
      const ripple = document.createElement('span');
      const r = chip.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      ripple.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        width:${size}px; height:${size}px;
        left:${e.clientX - r.left - size/2}px;
        top:${e.clientY - r.top  - size/2}px;
        background:currentColor; opacity:0.15;
        transform:scale(0);
        animation:chip-ripple 0.5s ease-out forwards;
      `;
      chip.style.position = 'relative';
      chip.style.overflow = 'hidden';
      chip.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // Inject keyframe once
  if (!document.getElementById('chip-ripple-kf')) {
    const s = document.createElement('style');
    s.id = 'chip-ripple-kf';
    s.textContent = '@keyframes chip-ripple { to { transform:scale(2.5); opacity:0; } }';
    document.head.appendChild(s);
  }
})();

// ── Ambient Sphere Interactive Parallax Engine ──────────────────────────────
(function () {
  const spheres = document.querySelectorAll('.gradient-sphere');
  if (!spheres.length) return;

  window.addEventListener('mousemove', (e) => {
    // Calculate fractional center offsets (-0.5 to 0.5 range)
    const moveX = (e.clientX / window.innerWidth - 0.5) * 25;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 25;

    spheres.forEach((sphere, index) => {
      // Offset depth multipliers slightly across different layers for natural depth parallax
      const depthFactor = (index + 1) * 0.75; 
      sphere.style.transform = `translate(${moveX * depthFactor}px, ${moveY * depthFactor}px)`;
    });
  });
})();