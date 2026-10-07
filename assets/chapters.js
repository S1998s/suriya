(() => {
  'use strict';

  const photos = [
    { title: 'Personal Moment 1', category: 'Family', image: 'childhood-1__w640.avif', full: 'childhood-1__w1200.avif', description: 'A childhood memory.' },
    { title: 'Personal Moment 2', category: 'Portraits', image: 'portraits-1__w640.avif', full: 'portraits-1__w1200.avif', description: 'A portrait, remembered.' },
    { title: 'Personal Moment 3', category: 'Portraits', image: 'portraits-3__w640.avif', full: 'portraits-3__w1200.avif', description: 'An urban moment.' },
    { title: 'Cricket Action 1', category: 'Childhood', image: 'childhood-2__w640.avif', full: 'childhood-2__w1200.avif', description: 'A cricket-playing moment.' },
    { title: 'Sports Moment', category: 'Candid', image: 'candid-1__w640.avif', full: 'candid-1__w1200.avif', description: 'A moment from the sports and fitness journey.' },
    { title: 'Family Moment 1', category: 'Sports', image: 'sports-1__w640.avif', full: 'sports-1__w1200.avif', description: 'A family gathering.' },
    { title: 'Family Moment 2', category: 'Sports', image: 'sports-2__w640.avif', full: 'sports-2__w1200.avif', description: 'A family celebration.' },
    { title: 'Family Moment 3', category: 'Sports', image: 'sports-3__w640.avif', full: 'sports-3__w1200.avif', description: 'A family memory.' },
    { title: 'Transformation Before 2', category: 'Transformation', phase: 'Before', image: 'transformation-before-2__w640.jpg', full: 'transformation-before-2__w1200.jpg', description: 'A portrait from an earlier stage of a personal transformation.' },
    { title: 'Transformation Before 3', category: 'Transformation', phase: 'Before', image: 'transformation-before-3__w640.jpg', full: 'transformation-before-3__w1200.jpg', description: 'A portrait from an earlier stage of a personal transformation.' },
    { title: 'Personal Moment 7', category: 'Family', image: 'family-1__w640.avif', full: 'family-1__w1200.avif', description: 'A moment from the family album.' },
    { title: 'Special Photo', category: 'Portraits', image: 'portraits-4__w640.avif', full: 'portraits-4__w1200.avif', description: 'A portrait from the collection.' },
    { title: 'Special Photo', category: 'Transformation', phase: 'After', image: 'transformation-after-1__w640.avif', full: 'transformation-after-1__w1200.avif', description: 'A new chapter in the transformation journey.' },
    { title: 'Special Photo', category: 'Candid', image: 'candid-2__w640.avif', full: 'candid-2__w1200.avif', description: 'An everyday moment, remembered.' },
    { title: 'Special Photo', category: 'Transformation', phase: 'After', image: 'transformation-after-2__w640.avif', full: 'transformation-after-2__w1200.avif', description: 'Another step in a personal transformation.' },
    { title: 'Special Photo', category: 'Transformation', phase: 'After', image: 'transformation-after-3__w640.avif', full: 'transformation-after-3__w1200.avif', description: 'A later chapter in the transformation journey.' },
  ];

  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('.chapter-nav').forEach(navigation => {
    navigation.classList.add('js-ready');
    const toggle = navigation.querySelector('.chapter-menu-toggle');
    const links = navigation.querySelector('.chapter-links');
    if (!toggle || !links) return;
    const closeMenu = () => {
      navigation.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open chapter navigation');
    };
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') !== 'true';
      navigation.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close chapter navigation' : 'Open chapter navigation');
    });
    links.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    navigation.querySelector('.chapter-sidepaths')?.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });
  });

  const grid = document.querySelector('[data-photo-grid]');
  if (grid) {
    const categories = ['All', ...new Set(photos.map(photo => photo.category))];
    const filters = document.querySelector('[data-gallery-filters]');
    const phaseFilters = document.querySelector('[data-phase-filters]');
    const count = document.querySelector('[data-gallery-count]');
    let selected = 'All';
    let selectedPhase = 'All';
    const phases = ['All', 'Before', 'After'];
    const phaseButtons = phaseFilters ? phases.map(phase => {
      const button = document.createElement('button');
      button.className = 'gallery-filter';
      button.type = 'button';
      button.textContent = phase;
      button.setAttribute('aria-pressed', String(phase === selectedPhase));
      button.addEventListener('click', () => {
        selectedPhase = phase;
        phaseButtons.forEach(filter => filter.setAttribute('aria-pressed', String(filter.textContent === selectedPhase)));
        renderPhotos();
      });
      phaseFilters.append(button);
      return button;
    }) : [];
    const buttons = categories.map(category => {
      const button = document.createElement('button');
      button.className = 'gallery-filter';
      button.type = 'button';
      button.textContent = category;
      button.setAttribute('aria-pressed', String(category === selected));
      button.addEventListener('click', () => {
        selected = category;
        selectedPhase = 'All';
        buttons.forEach(filter => filter.setAttribute('aria-pressed', String(filter.textContent === selected)));
        phaseButtons.forEach(filter => filter.setAttribute('aria-pressed', String(filter.textContent === selectedPhase)));
        if (phaseFilters) phaseFilters.hidden = selected !== 'Transformation';
        renderPhotos();
      });
      filters.append(button);
      return button;
    });
    const renderPhotos = () => {
      window.portfolioMotion?.unobserveAll(grid.querySelectorAll('.photo-open'));
      grid.replaceChildren();
      const visible = photos.filter(photo => (selected === 'All' || photo.category === selected) && (selected !== 'Transformation' || selectedPhase === 'All' || photo.phase === selectedPhase));
      count.textContent = `${visible.length} ${visible.length === 1 ? 'photograph' : 'photographs'} · ${selected === 'All' ? 'all collections' : selected}`;
      visible.forEach((photo, index) => {
        const button = document.createElement('button');
        button.className = 'story-photo photo-open';
        button.type = 'button';
        button.dataset.image = `../../images/personal/${photo.full}`;
        button.dataset.caption = photo.title;
        button.setAttribute('aria-label', `View ${photo.title}, ${photo.category}`);
        const image = document.createElement('img');
        image.src = `../../images/personal/${photo.image}`;
        image.alt = photo.description;
        image.loading = index < 4 ? 'eager' : 'lazy';
        image.width = 640;
        image.height = 640;
        button.append(image);
        grid.append(button);
      });
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.textContent === selected)));
      window.portfolioMotion?.observeAll(grid.querySelectorAll('.photo-open'), 'photo');
    };
    renderPhotos();
  }

  const dialog = document.querySelector('.photo-dialog');
  if (!dialog) return;
  const fullImage = dialog.querySelector('#photo-full');
  let previousButton;
  let photoRequest = 0;
  const clearPhoto = () => {
    photoRequest += 1;
    document.body.classList.remove('dialog-open');
    window.portfolioMotion?.closeDialogPhoto();
    dialog.removeAttribute('aria-busy');
    fullImage.style.visibility = 'hidden';
    fullImage.removeAttribute('src');
  };
  const closePhotoViewer = () => {
    if (!dialog.open) return;
    clearPhoto();
    dialog.close();
    previousButton?.focus({ preventScroll: true });
    previousButton = null;
  };
  document.addEventListener('click', async event => {
    const button = event.target.closest('.photo-open');
    if (!button) return;
    const request = ++photoRequest;
    previousButton = button;
    const thumbnail = button.querySelector('img');
    fullImage.alt = thumbnail?.alt || button.dataset.caption || 'Personal photograph';
    fullImage.style.visibility = 'hidden';
    fullImage.removeAttribute('src');
    dialog.showModal();
    dialog.setAttribute('aria-busy', 'true');
    document.body.classList.add('dialog-open');
    const imageReady = new Promise(resolve => {
      const finish = () => {
        fullImage.removeEventListener('load', finish);
        fullImage.removeEventListener('error', finish);
        resolve();
      };
      fullImage.addEventListener('load', finish, { once: true });
      fullImage.addEventListener('error', finish, { once: true });
    });
    fullImage.src = button.dataset.image;
    await imageReady;
    if (request !== photoRequest || !dialog.open) return;
    fullImage.style.visibility = '';
    dialog.removeAttribute('aria-busy');
    window.portfolioMotion?.revealDialogPhoto(fullImage, button.dataset.image);
  });
  dialog.querySelector('.dialog-close').addEventListener('click', closePhotoViewer);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dialog.open) {
      event.preventDefault();
      closePhotoViewer();
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closePhotoViewer();
  });
  dialog.addEventListener('close', () => {
    if (dialog.open) return;
    clearPhoto();
    previousButton?.focus({ preventScroll: true });
    previousButton = null;
  });
})();