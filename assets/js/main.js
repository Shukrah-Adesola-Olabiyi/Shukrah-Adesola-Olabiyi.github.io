/* ================================================================
   SHUKRAH ADESOLA-OLABIYI — PORTFOLIO JAVASCRIPT
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ───────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => { if (preloader) preloader.classList.add('hidden'); }, 2200);
  });
  setTimeout(() => { if (preloader) preloader.classList.add('hidden'); }, 4000);


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
    (function animFollow() {
      fx += (cx - fx) * 0.12;
      fy += (cy - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(animFollow);
    })();
    document.querySelectorAll('a, button, .r-card, .skill-block, .award-card, .p-item').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('expanded'); follower.classList.add('expanded'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('expanded'); follower.classList.remove('expanded'); });
    });
  }


  /* ── PARTICLES CANVAS ────────────────────────────────────── */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();

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
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
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
    window.addEventListener('resize', resizeCanvas);
  }


  /* ── NAV SCROLL ──────────────────────────────────────────── */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }


  /* ── MOBILE MENU ─────────────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks   = document.querySelector('.nav-links');
  let mobileOpen   = false;

  function closeMobileMenu() {
    mobileOpen = false;
    if (navLinks) navLinks.classList.remove('mobile-open');
    if (hamburger) hamburger.classList.remove('active');
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      mobileOpen = !mobileOpen;
      navLinks.classList.toggle('mobile-open', mobileOpen);
      hamburger.classList.toggle('active', mobileOpen);
    });
    // Close when a nav link is clicked — but ONLY on mobile
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 900) closeMobileMenu();
      });
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (mobileOpen && !nav.contains(e.target)) closeMobileMenu();
    });
  }


  /* ── SMOOTH ANCHOR SCROLL ────────────────────────────────── */
  // Only intercept real hash-section links (not mailto:, tel:, external)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return; // skip empty hashes
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


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
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = lightbox ? lightbox.querySelector('img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  document.querySelectorAll('.p-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      if (lightboxImg) lightboxImg.src = src;
      if (lightbox) lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });


  /* ── MARQUEE DUPLICATION ─────────────────────────────────── */
  document.querySelectorAll('.gallery-track').forEach(track => {
    const items = track.innerHTML;
    track.innerHTML = items + items;
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
        animateCounter(entry.target, parseInt(entry.target.dataset.count, 10));
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

});
