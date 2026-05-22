/* ================================================================
   SHUKRAH ADESOLA-OLABIYI — PORTFOLIO JAVASCRIPT
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ───────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) preloader.classList.add('hidden');
    }, 2200);
  });
  // Fallback
  setTimeout(() => {
    if (preloader) preloader.classList.add('hidden');
  }, 4000);


  /* ── CUSTOM CURSOR ───────────────────────────────────────── */
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  if (cursor && follower) {
    let cx = 0, cy = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => {
      cx = e.clientX; cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
    });
    // Smooth follower
    (function animFollow() {
      fx += (cx - fx) * 0.12;
      fy += (cy - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(animFollow);
    })();
    // Expand on interactive elements
    document.querySelectorAll('a, button, .r-card, .skill-block, .award-card, .p-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('expanded');
        follower.classList.add('expanded');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('expanded');
        follower.classList.remove('expanded');
      });
    });
  }


  /* ── PARTICLES CANVAS ────────────────────────────────────── */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const PARTICLE_COUNT = 60;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speed = Math.random() * 0.4 + 0.1;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.hue = Math.random() < 0.3 ? 'rgba(200,150,62,' : 'rgba(18,165,204,';
      }
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.angle += (Math.random() - 0.5) * 0.02;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.hue + this.opacity + ')';
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(200,150,62,${0.06 * (1 - dist/100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(animParticles);
    }
    animParticles();

    window.addEventListener('resize', () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
  }


  /* ── NAV SCROLL ──────────────────────────────────────────── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });


  /* ── MOBILE MENU ─────────────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'fixed';
      navLinks.style.top = '60px';
      navLinks.style.left = '0'; navLinks.style.right = '0';
      navLinks.style.background = 'rgba(6,15,30,0.98)';
      navLinks.style.padding = '2rem';
      navLinks.style.gap = '1.5rem';
      navLinks.style.zIndex = '400';
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => { navLinks.style.display = 'none'; });
    });
  }


  /* ── SCROLL REVEAL ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── LIGHTBOX ────────────────────────────────────────────── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  document.querySelectorAll('.p-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      if (lightboxImg) lightboxImg.src = src;
      if (lightbox) lightbox.classList.add('open');
    });
  });
  if (lightboxClose) lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
  if (lightbox) lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox) lightbox.classList.remove('open');
  });


  /* ── MARQUEE DUPLICATION (for seamless loop) ─────────────── */
  const tracks = document.querySelectorAll('.gallery-track');
  tracks.forEach(track => {
    const items = track.innerHTML;
    track.innerHTML = items + items; // duplicate for seamless loop
  });


  /* ── COUNTER ANIMATION ───────────────────────────────────── */
  function animateCounter(el, target, duration = 1600) {
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));


  /* ── SMOOTH ANCHOR SCROLL ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
