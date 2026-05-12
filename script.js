function setActiveNav(pageId) {
  document.querySelectorAll('#nav-menu a[data-page]').forEach((link) => {
    const isActive = link.getAttribute('data-page') === pageId;
    link.classList.toggle('active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

function applyRevealAnimations(scopeEl) {
  const revealTargets = [
    '.skill-tag',
    '.project-card',
    '.certification-card',
    '.social-card',
    '.info-item',
  ];

  revealTargets.forEach((selector) => {
    scopeEl.querySelectorAll(selector).forEach((el) => el.classList.add('reveal'));
  });

  const candidates = Array.from(scopeEl.querySelectorAll('.reveal')).filter(
    (el) => !el.classList.contains('show')
  );

  if (candidates.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    candidates.forEach((el) => el.classList.add('show'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  candidates.forEach((el) => observer.observe(el));
}

function navigate(pageId, { updateHash = true } = {}) {
  document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));

  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    setActiveNav(pageId);
    applyRevealAnimations(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (updateHash) history.replaceState(null, '', `#${pageId}`);
  }

  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('active');
}

function toggleMenu(force) {
  const navMenu = document.getElementById('nav-menu');
  if (typeof force === 'boolean') navMenu.classList.toggle('active', force);
  else navMenu.classList.toggle('active');
}

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    bar.style.width = `${percent}%`;
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const update = () => btn.classList.toggle('show', (window.scrollY || 0) > 420);
  update();

  window.addEventListener('scroll', update, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initA11yShortcuts() {
  const logo = document.querySelector('.logo-container');
  const menuToggle = document.querySelector('.menu-toggle');

  const toKeyHandler = (fn) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn();
    }
  };

  if (logo) logo.addEventListener('keydown', toKeyHandler(() => navigate('home')));
  if (menuToggle) menuToggle.addEventListener('keydown', toKeyHandler(() => toggleMenu()));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('nav-menu');
    const clickedInsideNav = !!e.target.closest('#nav-menu');
    const clickedToggle = !!e.target.closest('.menu-toggle');
    if (navMenu?.classList.contains('active') && !clickedInsideNav && !clickedToggle) toggleMenu(false);
  });
}

function initHashRouting() {
  const hash = (window.location.hash || '').replace('#', '').trim();
  if (hash && document.getElementById(hash)) navigate(hash, { updateHash: false });
  else navigate('home', { updateHash: true });

  window.addEventListener('hashchange', () => {
    const next = (window.location.hash || '').replace('#', '').trim();
    if (next && document.getElementById(next)) navigate(next, { updateHash: false });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initHashRouting();
  initScrollProgress();
  initBackToTop();
  initA11yShortcuts();
});
