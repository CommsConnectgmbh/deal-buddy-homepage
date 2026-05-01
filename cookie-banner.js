/* DealBuddy Homepage — Minimal Cookie Banner
 * No tracking, only technically necessary cookies. Stores acknowledgement in
 * localStorage so the banner does not reappear after a single click.
 */
(function () {
  'use strict';
  var STORAGE_KEY = 'db_homepage_cookie_ack';
  try {
    if (window.localStorage.getItem(STORAGE_KEY) === '1') return;
  } catch (e) {
    // localStorage unavailable (e.g. privacy mode) — show banner each visit, nothing else to do.
  }

  function build() {
    var wrap = document.createElement('div');
    wrap.id = 'db-cookie-banner';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('aria-label', 'Cookie-Hinweis');

    var title = document.createElement('div');
    title.className = 'db-cb-title';
    title.textContent = 'Cookie-Hinweis';

    var text = document.createElement('p');
    text.className = 'db-cb-text';
    text.textContent =
      'Diese Seite verwendet nur technisch notwendige Cookies. Kein Tracking, kein Drittanbieter.';

    var actions = document.createElement('div');
    actions.className = 'db-cb-actions';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'db-cb-btn';
    btn.textContent = 'Verstanden';
    btn.addEventListener('click', function () {
      try {
        window.localStorage.setItem(STORAGE_KEY, '1');
      } catch (e) {
        /* ignore */
      }
      wrap.style.transition = 'opacity 0.25s ease-out, transform 0.25s ease-out';
      wrap.style.opacity = '0';
      wrap.style.transform = 'translateY(20px)';
      setTimeout(function () {
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      }, 260);
    });

    actions.appendChild(btn);
    wrap.appendChild(title);
    wrap.appendChild(text);
    wrap.appendChild(actions);
    document.body.appendChild(wrap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
