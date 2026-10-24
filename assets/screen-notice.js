(() => {
  'use strict';

  const storageKey = 'portfolio-screen-notice-dismissed';
  const displayDuration = 5000;

  if (window.screenNoticeInitialized) return;
  window.screenNoticeInitialized = true;

  try {
    if (window.sessionStorage.getItem(storageKey) === 'true') return;
  } catch {}

  const dialog = document.createElement('dialog');
  dialog.className = 'screen-notice';
  dialog.setAttribute('aria-labelledby', 'screen-notice-title');
  dialog.setAttribute('aria-describedby', 'screen-notice-description');
  dialog.innerHTML = `
    <section class="screen-notice__paper">
      <button class="screen-notice__close" type="button" aria-label="Close screen-size notice" title="Close notice">&times;</button>
      <div class="screen-notice__copy">
        <p class="screen-notice__label">THIS PORTFOLIO SHINES</p>
        <h2 id="screen-notice-title">On a bigger <em>screen</em></h2>
        <p class="screen-notice__description" id="screen-notice-description">For the best experience, please view on a laptop or desktop.</p>
        <div class="screen-notice__route" aria-hidden="true">
          <svg class="screen-notice__plane" viewBox="0 0 20 16" fill="none" focusable="false">
            <path d="M1 6.1 18.5 1l-5.8 14-3.1-5.2L1 6.1Z" fill="currentColor" stroke="currentColor" stroke-width=".7" stroke-linejoin="round"/>
            <path d="m9.6 9.8 4.8-4.5" stroke="#fbf3e6" stroke-width=".7" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
      <svg class="screen-notice__sprig" viewBox="0 0 180 170" fill="none" aria-hidden="true" focusable="false">
        <path d="M139 157C127 128 113 105 97 83 81 61 66 39 54 13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M107 98C127 91 140 78 146 59 128 62 114 74 107 98Z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M94 81C75 81 60 73 49 57 67 54 82 62 94 81Z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M82 64C100 56 110 43 112 24 96 31 86 44 82 64Z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M69 46C52 44 39 35 31 19 48 19 61 28 69 46Z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M119 121C137 118 151 108 160 91 142 92 128 102 119 121Z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M119 120C109 119 101 116 94 110M107 98C103 95 99 90 96 86M82 64C78 59 74 53 72 48" stroke="currentColor" stroke-width=".8" stroke-linecap="round"/>
        <path d="M139 157 150 162M139 157 137 168" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
      </svg>
    </section>`;

  const closeButton = dialog.querySelector('.screen-notice__close');
  let closing = false;
  let cleaned = false;
  let dismissTimer;
  let closeTimer;

  function dismiss() {
    if (closing || !dialog.open) return;
    closing = true;
    window.clearTimeout(dismissTimer);
    closeButton.disabled = true;
    try {
      window.sessionStorage.setItem(storageKey, 'true');
    } catch {}
    dialog.classList.add('is-closing');
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180;
    closeTimer = window.setTimeout(() => dialog.close(), delay);
  }

  function onKeydown(event) {
    if (event.key !== 'Escape' || !dialog.open) return;
    event.preventDefault();
    dismiss();
  }

  function onCancel(event) {
    event.preventDefault();
    dismiss();
  }

  function onBackdropClick(event) {
    if (event.target === dialog) dismiss();
  }

  function cleanup() {
    if (cleaned) return;
    cleaned = true;
    window.clearTimeout(dismissTimer);
    window.clearTimeout(closeTimer);
    document.removeEventListener('keydown', onKeydown);
    window.removeEventListener('pagehide', cleanup);
    dialog.removeEventListener('cancel', onCancel);
    dialog.removeEventListener('click', onBackdropClick);
    dialog.removeEventListener('close', cleanup);
    if (dialog.open) dialog.close();
    dialog.remove();
  }

  closeButton.addEventListener('click', dismiss);
  document.addEventListener('keydown', onKeydown);
  window.addEventListener('pagehide', cleanup, { once: true });
  dialog.addEventListener('cancel', onCancel);
  dialog.addEventListener('click', onBackdropClick);
  dialog.addEventListener('close', cleanup, { once: true });

  document.body.append(dialog);
  dialog.showModal();
  dialog.classList.add('is-timing');
  dismissTimer = window.setTimeout(dismiss, displayDuration);
})();