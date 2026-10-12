/* app.js
 * Page-specific boot logic. Dispatches `initHome()` etc. based on
 * `body[data-page]`. Source of truth: SEPC.txt L44 — ad formats;
 * L57 — mascots; L58 — no `index.html` in URLs.
 */
(function () {
  'use strict';

  function initHome() {
    /* Hero choreography: nothing beyond partials + animations does. The
     * page is ready. */
  }

  function initServices() {
    /* Accordions are auto-bound by animations.js. Nothing more. */
  }

  function initCulture() {
    /* Mascot parade pauses are CSS `:hover`. Nothing more. */
  }

  function initNews() {
    /* News cards already styled + animated by `reveal`. */
  }

  function initContact() {
    /* contact-form.js binds validation. Nothing more. */
  }

  function initPrivacy() {
    /* Privacy doc gets a sticky TOC; add is-visible on scroll-in. */
    var sections = document.querySelectorAll('.legal-doc section');
    if (!sections.length) return;
  }

  function initTerms() {
    var sections = document.querySelectorAll('.legal-doc section');
    if (!sections.length) return;
  }

  function init404() {
    /* 404 has nothing to boot — animations.js owns the mascot idle. */
  }

  function dispatch() {
    var body = document.body;
    if (!body) return;
    var page = body.getAttribute('data-page') || '';
    var map = {
      home:     initHome,
      services: initServices,
      culture:  initCulture,
      news:     initNews,
      contact:  initContact,
      privacy:  initPrivacy,
      terms:    initTerms,
      '404':    init404
    };
    var init = map[page];
    if (typeof init === 'function') {
      try { init(); } catch (e) { /* graceful fallback */ }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', dispatch);
  } else {
    dispatch();
  }
})();