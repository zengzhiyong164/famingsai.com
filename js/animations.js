/* animations.js
 * All progressive-enhancement animations for famingsai.com.
 * Honours `prefers-reduced-motion`. No external dependencies.
 * Source of truth: SEPC.txt L56, L57 — rich motion, mascots.
 */
(function () {
  'use strict';

  var prefersReducedMotion = false;
  try {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) { /* old browsers */ }

  /* ----- Reveal-on-scroll via IntersectionObserver ----- */
  function initReveal() {
    var nodes = document.querySelectorAll('.reveal, [data-reveal], [data-split-text]');
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      Array.prototype.forEach.call(nodes, function (n) {
        n.classList.add('is-visible', 'is-ready');
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.hasAttribute('data-split-text')) {
          el.classList.add('is-ready');
        }
        if (el.classList.contains('reveal') || el.hasAttribute('data-reveal')) {
          el.classList.add('is-visible');
        }
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
  }

  /* ----- Split-text kinetic headline ----- */
  function initSplitText() {
    if (prefersReducedMotion) return;
    var nodes = document.querySelectorAll('[data-split-text]');
    Array.prototype.forEach.call(nodes, function (node) {
      var children = node.children;
      var stagger = 0;
      Array.prototype.forEach.call(children, function (line) {
        /* Wrap each visible word in <span><span>word</span></span> */
        var text = line.textContent || '';
        line.textContent = '';
        var words = text.split(/(\s+)/);
        words.forEach(function (word) {
          if (!word) return;
          if (/^\s+$/.test(word)) {
            line.appendChild(document.createTextNode(word));
            return;
          }
          var outer = document.createElement('span');
          var inner = document.createElement('span');
          inner.textContent = word;
          inner.style.setProperty('--stagger', stagger + 'ms');
          outer.appendChild(inner);
          line.appendChild(outer);
          stagger += 80;
        });
      });
    });
  }

  /* ----- Scroll-progress bar ----- */
  function initScrollProgress() {
    var bar = document.querySelector('[data-scroll-progress]');
    if (!bar) return;

    var ticking = false;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var progress = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      bar.style.setProperty('--progress', String(progress));
      var header = document.querySelector('.site-header');
      if (header) {
        if (h.scrollTop > 12) header.setAttribute('data-scrolled', 'true');
        else header.removeAttribute('data-scrolled');
      }
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  }

  /* ----- Parallax (hero + section media) ----- */
  function initParallax() {
    if (prefersReducedMotion) return;
    var nodes = document.querySelectorAll('[data-parallax]');
    if (!nodes.length) return;

    var speedAttr = function (el) {
      var v = parseFloat(el.getAttribute('data-parallax'));
      return isNaN(v) ? 0.12 : v;
    };

    function update() {
      var viewportH = window.innerHeight || document.documentElement.clientHeight;
      Array.prototype.forEach.call(nodes, function (el) {
        var rect = el.getBoundingClientRect();
        var center = rect.top + rect.height / 2;
        var offset = (center - viewportH / 2) * speedAttr(el);
        var inner = el.querySelector('img') || el;
        inner.style.setProperty('--shift', offset.toFixed(2) + 'px');
      });
    }
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () { update(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ----- Magnetic CTAs ----- */
  function initMagnetic() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    var nodes = document.querySelectorAll('.button--magnetic');
    Array.prototype.forEach.call(nodes, function (btn) {
      var resetTimer;
      function onMove(e) {
        var rect = btn.getBoundingClientRect();
        var x = (e.clientX - rect.left) - rect.width / 2;
        var y = (e.clientY - rect.top) - rect.height / 2;
        var tx = Math.max(-12, Math.min(12, x * 0.18));
        var ty = Math.max(-12, Math.min(12, y * 0.22));
        btn.style.transform = 'translate3d(' + tx.toFixed(1) + 'px, ' + ty.toFixed(1) + 'px, 0)';
      }
      function reset() {
        btn.style.transform = '';
      }
      btn.addEventListener('pointermove', onMove);
      btn.addEventListener('pointerleave', function () {
        clearTimeout(resetTimer);
        resetTimer = setTimeout(reset, 80);
      });
      btn.addEventListener('blur', reset);
    });
  }

  /* ----- Accordion ----- */
  function initAccordion() {
    var groups = document.querySelectorAll('[data-accordion]');
    Array.prototype.forEach.call(groups, function (group) {
      var items = group.querySelectorAll('.accordion__item');
      Array.prototype.forEach.call(items, function (item) {
        var trigger = item.querySelector('.accordion__trigger');
        var panel   = item.querySelector('.accordion__panel');
        if (!trigger || !panel) return;
        trigger.addEventListener('click', function () {
          var open = trigger.getAttribute('aria-expanded') === 'true';
          trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
          if (open) {
            panel.setAttribute('hidden', '');
          } else {
            panel.removeAttribute('hidden');
          }
          item.setAttribute('aria-expanded', open ? 'false' : 'true');
        });
      });
    });
  }

  /* ----- Tabs ----- */
  function initTabs() {
    var groups = document.querySelectorAll('[data-tabs]');
    Array.prototype.forEach.call(groups, function (group) {
      var tabs = group.querySelectorAll('[role="tab"]');
      var panels = group.querySelectorAll('[role="tabpanel"]');
      Array.prototype.forEach.call(tabs, function (tab) {
        tab.addEventListener('click', function () {
          Array.prototype.forEach.call(tabs, function (t) { t.setAttribute('aria-selected', 'false'); });
          Array.prototype.forEach.call(panels, function (p) { p.setAttribute('hidden', ''); });
          tab.setAttribute('aria-selected', 'true');
          var id = tab.getAttribute('aria-controls');
          var panel = id ? document.getElementById(id) : null;
          if (panel) panel.removeAttribute('hidden');
        });
      });
    });
  }

  /* ----- Kinetic numbers ----- */
  function initKineticNumber() {
    if (prefersReducedMotion) return;
    var nodes = document.querySelectorAll('[data-kinetic-number]');
    if (!nodes.length) return;
    if (!('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var from = parseFloat(el.getAttribute('data-from')) || 0;
        var to   = parseFloat(el.getAttribute('data-to')) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 900;
        var start = null;
        function step(ts) {
          if (start === null) start = ts;
          var t = Math.min(1, (ts - start) / dur);
          var eased = 1 - Math.pow(1 - t, 3);
          var current = Math.round(from + (to - from) * eased);
          el.textContent = current.toLocaleString('en-US') + suffix;
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });

    Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
  }

  /* ----- Tilt cards ----- */
  function initTilt() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    var nodes = document.querySelectorAll('[data-tilt]');
    Array.prototype.forEach.call(nodes, function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        var rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
        var ry = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
        card.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ----- Current year stamp (safety if partials.js didn't run) ----- */
  function initYear() {
    var stamp = document.querySelector('[data-year]');
    if (stamp) stamp.textContent = String(new Date().getFullYear());
  }

  function init() {
    initYear();
    initSplitText();
    initReveal();
    initScrollProgress();
    initParallax();
    initMagnetic();
    initAccordion();
    initTabs();
    initKineticNumber();
    initTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();