/* partials.js
 * Injects shared <header> and <footer> markup into every page.
 * Reads `body[data-page="..."]` to highlight the active nav link.
 * Source of truth: SEPC.txt L2, L4, L8, L16, L23, L57, L58.
 *
 * The header and footer markup live here as plain template strings. The
 * partials use the active data-page to set aria-current="page" on the
 * right nav anchor.
 */
(function () {
  'use strict';

  var COMPANY = 'PHARMINCEPT INDUSTRIAL CO., LIMITED';
  var OFFICE  = 'Room 2, LG1, Mirror Tower, 61 Mody Road, Tsim Sha Tsui, Hong Kong';
  var EMAIL_SUPPORT = 'support@famingsai.com';
  var EMAIL_KEY     = 'zengzhiyong@famingsai.com';
  var SITE_URL = 'https://famingsai.com';
  var YEAR = new Date().getFullYear();

  var NAV_ITEMS = [
    { key: 'home',     label: 'Home',     href: 'index.html' },
    { key: 'services', label: 'Services', href: 'services.html' },
    { key: 'culture',  label: 'Culture',  href: 'culture.html' },
    { key: 'news',     label: 'News',     href: 'news.html' },
    { key: 'contact',  label: 'Contact',  href: 'contact.html' }
  ];

  var LEGAL_ITEMS = [
    { label: 'Privacy Policy',   href: 'privacy.html' },
    { label: 'Terms of Service', href: 'terms.html' },
    { label: 'app-ads.txt',      href: 'app-ads.txt' }
  ];

  /**
   * Determine the active page key from body[data-page]. Falls back to ''
   * when the attribute is missing.
   */
  function getActivePage() {
    var body = document.body;
    if (!body) return '';
    return body.getAttribute('data-page') || '';
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function buildHeader(activePage) {
    var navLinks = NAV_ITEMS.map(function (item) {
      var isActive = item.key === activePage;
      var ariaCurrent = isActive ? ' aria-current="page"' : '';
      return '<li><a href="' + item.href + '"' + ariaCurrent + '>' + escapeHtml(item.label) + '</a></li>';
    }).join('\n          ');

    var themeModifier = activePage === 'culture' || activePage === 'privacy' || activePage === 'terms'
      ? ' site-header--light'
      : '';

    return '' +
      '<header class="site-header' + themeModifier + '" data-theme="dark" role="banner">' +
        '<div class="container site-header__bar">' +
          '<a href="index.html" class="site-header__brand" aria-label="' + escapeHtml(COMPANY) + ' home">' +
            '<img src="images/logo/pharmincept-mark.svg" alt="" class="brand-mark" width="40" height="40">' +
            '<span class="brand-word">PHARMINCEPT</span>' +
          '</a>' +
          '<nav class="site-header__nav" aria-label="Primary">' +
            '<ul>' + navLinks + '</ul>' +
          '</nav>' +
          '<div class="site-header__actions">' +
            '<a href="contact.html" class="button button--primary button--sm button--magnetic">' +
              '<span>Get a quote</span>' +
              '<svg class="icon" aria-hidden="true"><use href="images/icons/sprite.svg#arrow-up-right"/></svg>' +
            '</a>' +
            '<button class="icon-button" type="button" aria-label="Open menu" data-menu-toggle aria-expanded="false">' +
              '<svg class="icon icon--md" aria-hidden="true"><use href="images/icons/sprite.svg#menu"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<div class="site-header__progress" data-scroll-progress aria-hidden="true"></div>' +
      '</header>' +
      '<div class="site-header__drawer" data-drawer aria-hidden="true">' +
        '<div class="container">' +
          '<button class="icon-button" type="button" aria-label="Close menu" data-drawer-close style="color:var(--color-paper)">' +
            '<svg class="icon icon--md" aria-hidden="true"><use href="images/icons/sprite.svg#close"/></svg>' +
          '</button>' +
          '<ul>' + NAV_ITEMS.map(function (item) {
            return '<li><a href="' + item.href + '">' + escapeHtml(item.label) + '</a></li>';
          }).join('') + '</ul>' +
        '</div>' +
      '</div>';
  }

  function buildFooter() {
    var navLinks = NAV_ITEMS.map(function (item) {
      return '<li><a href="' + item.href + '">' + escapeHtml(item.label) + '</a></li>';
    }).join('\n            ');

    var legalLinks = LEGAL_ITEMS.map(function (item) {
      return '<li><a href="' + item.href + '">' + escapeHtml(item.label) + '</a></li>';
    }).join('\n            ');

    return '' +
      '<footer class="site-footer" role="contentinfo">' +
        '<div class="container">' +
          '<div class="site-footer__grid">' +
            '<div class="site-footer__brand">' +
              '<img src="images/logo/pharmincept-wordmark-light.svg" alt="PHARMINCEPT" width="200" height="34">' +
              '<p>Industrial sourcing, hardware parts, electronic components, building materials, machinery — plus the mobile suite that keeps every order in your pocket.</p>' +
            '</div>' +
            '<nav aria-label="Sitemap">' +
              '<h4 class="site-footer__heading">Explore</h4>' +
              '<ul>' + navLinks + '</ul>' +
            '</nav>' +
            '<nav aria-label="Legal">' +
              '<h4 class="site-footer__heading">Legal</h4>' +
              '<ul>' + legalLinks + '</ul>' +
            '</nav>' +
            '<div class="site-footer__contact">' +
              '<h4 class="site-footer__heading">Reach us</h4>' +
              '<p><strong>Office</strong><br>' + escapeHtml(OFFICE) + '</p>' +
              '<p><strong>Support</strong> <a href="mailto:' + EMAIL_SUPPORT + '">' + EMAIL_SUPPORT + '</a></p>' +
              '<p><strong>Key accounts</strong> <a href="mailto:' + EMAIL_KEY + '">' + EMAIL_KEY + '</a></p>' +
            '</div>' +
          '</div>' +
          '<img src="images/animals/fox.svg" alt="" width="160" height="160" class="site-footer__mascot mascot mascot--idle mascot--idle-slow" aria-hidden="true">' +
          '<p class="site-footer__legal">' +
            '© ' + YEAR + ' ' + escapeHtml(COMPANY) + '. All rights reserved. · ' +
            '<a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a> · ' +
            '<span class="mono">famingsai.com</span>' +
          '</p>' +
        '</div>' +
      '</footer>';
  }

  function mount() {
    var activePage = getActivePage();
    var headerHost = document.querySelector('[data-partial-header]');
    var footerHost = document.querySelector('[data-partial-footer]');

    if (headerHost) {
      headerHost.outerHTML = buildHeader(activePage);
    }
    if (footerHost) {
      footerHost.outerHTML = buildFooter();
    }

    /* Highlight active nav link via aria-current. Header HTML is regenerated
     * server-side via template string, but the drawer also needs awareness. */
    var drawer = document.querySelector('[data-drawer]');
    var toggle = document.querySelector('[data-menu-toggle]');
    var close  = document.querySelector('[data-drawer-close]');
    if (drawer && toggle) {
      toggle.addEventListener('click', function () {
        var open = drawer.getAttribute('aria-hidden') === 'true';
        drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
    }
    if (drawer && close) {
      close.addEventListener('click', function () {
        drawer.setAttribute('aria-hidden', 'true');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();