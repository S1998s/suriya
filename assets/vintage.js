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

  const chapterLink = document.querySelector('.scroll-chapter-link');
  if (chapterLink) {
    const chapterNumber = chapterLink.querySelector('.scroll-chapter-link__number');
    const chapterLabel = chapterLink.querySelector('.scroll-chapter-link__label');
    const chapterAction = chapterLink.querySelector('.scroll-chapter-link__action');
    const chapters = [
      { id: 'professional', href: 'professional/', number: 'I', label: 'Professional', description: 'Explore the full professional journey' },
      { id: 'personal', href: 'personal/', number: 'II', label: 'Personal', description: 'Explore the full personal journey' }
    ];
    let activeChapter = null;
    let chapterFrame = 0;
    const updateChapterLink = () => {
      chapterFrame = 0;
      const readingLine = window.innerHeight * .52;
      const active = chapters.find(chapter => {
        const section = document.getElementById(chapter.id);
        if (!section) return false;
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      }) || null;
      if (active === activeChapter) return;
      activeChapter = active;
      if (!active) {
        chapterLink.classList.remove('is-visible');
        chapterLink.setAttribute('aria-hidden', 'true');
        chapterLink.tabIndex = -1;
        return;
      }
      chapterLink.href = active.href;
      chapterLink.setAttribute('aria-label', active.description);
      chapterLink.setAttribute('aria-hidden', 'false');
      chapterLink.tabIndex = 0;
      chapterNumber.textContent = active.number;
      chapterLabel.textContent = active.label;
      chapterAction.textContent = 'Open';
      chapterLink.classList.add('is-visible');
    };
    const scheduleChapterUpdate = () => {
      if (!chapterFrame) chapterFrame = requestAnimationFrame(updateChapterLink);
    };
    window.addEventListener('scroll', scheduleChapterUpdate, { passive: true });
    window.addEventListener('resize', scheduleChapterUpdate, { passive: true });
    scheduleChapterUpdate();
  }
})();