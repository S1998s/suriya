(() => {
  'use strict';

  const video = document.querySelector('.hero-film');
  const toggle = document.querySelector('.film-toggle');
  const mobile = window.matchMedia('(max-width: 900px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const constrainedConnection = connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType);
  let userPaused = false;
  let playRequested = false;
  let chapterReturn = 0;
  let chapterAnimation;

  document.querySelectorAll('.chapter-connection a').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      const request = ++chapterReturn;
      chapterAnimation?.cancel();
      if (location.hash !== link.hash) history.pushState(null, '', link.hash);
      target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
      if (reducedMotion.matches) return;
      let previousPosition = target.getBoundingClientRect().top;
      let stableFrames = 0;
      const started = performance.now();
      const settle = () => {
        if (request !== chapterReturn || reducedMotion.matches) return;
        const position = target.getBoundingClientRect().top;
        stableFrames = Math.abs(position - previousPosition) < .5 ? stableFrames + 1 : 0;
        previousPosition = position;
        if (stableFrames < 5 && performance.now() - started < 2000) {
          requestAnimationFrame(settle);
          return;
        }
        chapterAnimation = target.animate([
          { transform: 'none', boxShadow: '3px 3px 0 rgba(93,67,37,.12)' },
          { transform: 'translateY(-6px) rotate(-.8deg)', boxShadow: '8px 10px 14px rgba(93,67,37,.18)', offset: .35 },
          { transform: 'none', boxShadow: '3px 3px 0 rgba(93,67,37,.12)' }
        ], { duration: 900, easing: 'ease-in-out' });
      };
      requestAnimationFrame(settle);
    });
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) chapterAnimation?.cancel();
  });

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
    const poster = mobile.matches ? 'assets/panorama-mobile.webp?v=2' : 'assets/panorama-desktop.webp';
    const source = mobile.matches ? 'Animations/FinalMobileView.mp4' : 'Animations/WebView.mp4';
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
  if (mobile.matches) selectFilm();
  else if (document.readyState === 'complete') startFilmWhenIdle();
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
      window.portfolioMotion?.revealDialogPhoto(photograph, button.dataset.image);
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
    window.portfolioMotion?.closeDialogPhoto();
    if (lastPhotoButton) lastPhotoButton.focus({ preventScroll: true });
  });

})();