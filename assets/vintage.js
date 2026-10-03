(() => {
  'use strict';

  const video = document.querySelector('.hero-film');
  const toggle = document.querySelector('.film-toggle');
  const mobile = window.matchMedia('(max-width: 700px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const constrainedConnection = connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType);
  let userPaused = false;
  let playRequested = false;

  function updateToggle() {
    const playing = !video.paused;
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? 'Pause background animation' : 'Play background animation');
    toggle.title = toggle.getAttribute('aria-label');
    toggle.textContent = playing ? '||' : '>';
  }

  function playFilm() {
    if (document.hidden || userPaused || ((reducedMotion.matches || constrainedConnection) && !playRequested)) return;
    video.play().catch(() => {
      video.classList.remove('is-playing');
      updateToggle();
    });
  }

  function selectFilm() {
    video.pause();
    video.classList.remove('is-playing');
    const poster = mobile.matches ? 'assets/panorama-mobile.webp' : 'assets/panorama-desktop.webp';
    const source = mobile.matches ? 'Animations/MobileView.mp4' : 'Animations/WebView.mp4';
    video.poster = poster;
    if ((reducedMotion.matches || constrainedConnection) && !playRequested) {
      video.removeAttribute('src');
      video.load();
      updateToggle();
      return;
    }
    video.src = source;
    video.load();
    playFilm();
  }

  video.addEventListener('playing', () => {
    video.classList.add('is-playing');
    updateToggle();
  });
  video.addEventListener('pause', updateToggle);
  video.addEventListener('error', () => {
    video.classList.remove('is-playing');
    updateToggle();
  });
  toggle.addEventListener('click', () => {
    if (video.paused) {
      userPaused = false;
      playRequested = true;
      if (!video.getAttribute('src')) selectFilm();
      else playFilm();
    } else {
      userPaused = true;
      video.pause();
    }
  });
  mobile.addEventListener('change', selectFilm);
  reducedMotion.addEventListener('change', () => {
    playRequested = false;
    selectFilm();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else playFilm();
  });
  function startFilmWhenIdle() {
    const start = () => {
      if (!video.getAttribute('src')) selectFilm();
    };
    if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1500 });
    else window.setTimeout(start, 200);
  }
  if (document.readyState === 'complete') startFilmWhenIdle();
  else window.addEventListener('load', startFilmWhenIdle, { once: true });

  document.getElementById('year').textContent = new Date().getFullYear();
  const dialog = document.querySelector('.photo-dialog');
  const photograph = document.getElementById('photo-full');
  let lastPhotoButton;
  document.querySelectorAll('.memory').forEach(button => {
    button.addEventListener('click', () => {
      lastPhotoButton = button;
      photograph.src = button.dataset.image;
      photograph.alt = button.querySelector('img').alt;
      dialog.showModal();
      document.body.classList.add('dialog-open');
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dialog.open) {
      event.preventDefault();
      dialog.close();
    }
  });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    if (lastPhotoButton) lastPhotoButton.focus({ preventScroll: true });
  });

  if (window.gsap && !reducedMotion.matches) {
    const intro = window.gsap.from('.hero-content > *', { opacity: 0, y: 16, duration: 1.3, stagger: .16, ease: 'power2.out', clearProps: 'all' });
    const animations = new Set([intro]);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const animation = window.gsap.from(entry.target, { opacity: 0, y: 22, duration: 1.1, ease: 'power2.out', clearProps: 'all' });
        animations.add(animation);
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    reducedMotion.addEventListener('change', () => {
      if (!reducedMotion.matches) return;
      observer.disconnect();
      animations.forEach(animation => animation.progress(1));
    });
  }
})();