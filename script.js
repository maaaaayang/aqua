// ================================
// TEAM AQUA — site interactions
// ================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initSonarLayer();
  initScrollReveal();
  initStatCounters();
  initJoinForm();
});

/* ---------- Mobile nav toggle ---------- */
function initNavToggle(){
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    nav.style.display = isOpen ? 'flex' : '';
    if (isOpen){
      nav.style.position = 'fixed';
      nav.style.top = '64px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.flexDirection = 'column';
      nav.style.background = 'rgba(6,22,32,0.98)';
      nav.style.padding = '24px 28px';
      nav.style.gap = '20px';
      nav.style.borderBottom = '1px solid rgba(234,246,244,0.12)';
    }
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 860){
        nav.classList.remove('is-open');
        nav.style.display = '';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* ---------- Sonar ping signature layer ----------
   Emits an expanding ring wherever the visitor clicks,
   plus a slow ambient ping so the page feels like it's
   quietly listening for Kyogre. */
function initSonarLayer(){
  const layer = document.getElementById('sonarLayer');
  if (!layer) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  function spawnRing(x, y){
    const ring = document.createElement('div');
    ring.className = 'sonar-ring';
    ring.style.setProperty('--x', x + 'px');
    ring.style.setProperty('--y', y + 'px');
    layer.appendChild(ring);
    ring.addEventListener('animationend', () => ring.remove());
  }

  document.addEventListener('click', (e) => {
    spawnRing(e.clientX, e.clientY);
  });

  // ambient ping near the hero every few seconds
  setInterval(() => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return; // only while hero visible
    const x = rect.left + rect.width * (0.65 + Math.random() * 0.2);
    const y = rect.top + rect.height * (0.35 + Math.random() * 0.2);
    spawnRing(x, y);
  }, 3400);
}

/* ---------- Scroll reveal for sections ---------- */
function initScrollReveal(){
  const targets = document.querySelectorAll(
    '.mission-card, .admin-card, .news-card, .ops-row, .leader-feature'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

/* ---------- Animated stat counters ---------- */
function initStatCounters(){
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();

    function step(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString('ko-KR');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  nums.forEach(el => observer.observe(el));
}

/* ---------- Join form (client-side only) ---------- */
function initJoinForm(){
  const form = document.getElementById('joinForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();

    if (!name){
      status.textContent = '이름을 입력해주세요.';
      status.style.color = '#ff5d5d';
      return;
    }

    status.style.color = '#35d0ff';
    status.textContent = `${name}님, 지원서가 접수되었습니다. 곧 관측소에서 연락드리겠습니다.`;
    form.reset();
  });
}
