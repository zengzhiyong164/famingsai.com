/* contact-form.js
 * Front-end validation + simulated submit. No backend this round.
 * Source of truth: SEPC.txt L40 — mobile narrative integration.
 */
(function () {
  'use strict';

  function onSubmit(form, evt) {
    evt.preventDefault();
    clearErrors(form);

    var valid = true;
    var required = form.querySelectorAll('[required]');
    Array.prototype.forEach.call(required, function (input) {
      var label = input.closest('.field');
      if (!input.value || !String(input.value).trim()) {
        markError(label, 'Required.');
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        markError(label, 'Enter a valid email address.');
      } else {
        if (label) label.classList.remove('field--error');
      }
    });

    Array.prototype.forEach.call(form.querySelectorAll('.field--error'), function () { valid = false; });

    var region = form.querySelector('[name="region"]');
    if (region && !region.value) {
      markError(region.closest('.field'), 'Select a region.');
      valid = false;
    }

    if (!valid) {
      var first = form.querySelector('.field--error .field__input');
      if (first) first.focus();
      return false;
    }

    /* Simulated submit — show a toast and reset */
    showToast(form, 'Quote request received.', 'Our Hong Kong team will reply within 24 hours.');
    form.reset();
    return false;
  }

  function markError(label, message) {
    if (!label) return;
    label.classList.add('field--error');
    var hint = label.querySelector('.field__hint');
    if (hint) hint.textContent = message;
  }

  function clearErrors(form) {
    Array.prototype.forEach.call(form.querySelectorAll('.field--error'), function (label) {
      label.classList.remove('field--error');
      var hint = label.querySelector('.field__hint');
      if (hint) hint.textContent = hint.getAttribute('data-default') || hint.textContent;
    });
  }

  function showToast(form, title, body) {
    var existing = document.querySelector('.toast--success');
    if (existing) existing.remove();

    var toast = document.createElement('aside');
    toast.className = 'toast toast--success';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML =
      '<svg class="icon icon--md" aria-hidden="true"><use href="images/icons/sprite.svg#check-circle"/></svg>' +
      '<div><strong>' + title + '</strong><p>' + body + '</p></div>' +
      '<button class="icon-button" type="button" aria-label="Dismiss" data-dismiss>' +
        '<svg class="icon icon--md" aria-hidden="true"><use href="images/icons/sprite.svg#close"/></svg>' +
      '</button>';

    document.body.appendChild(toast);
    toast.querySelector('[data-dismiss]').addEventListener('click', function () { toast.remove(); });
    setTimeout(function () { if (toast.parentNode) toast.remove(); }, 6000);
  }

  function init() {
    var forms = document.querySelectorAll('[data-validate]');
    Array.prototype.forEach.call(forms, function (form) {
      /* Stash default hints so we can restore them after clearing errors. */
      Array.prototype.forEach.call(form.querySelectorAll('.field__hint'), function (hint) {
        if (!hint.getAttribute('data-default')) hint.setAttribute('data-default', hint.textContent);
      });
      form.addEventListener('submit', function (e) { onSubmit(form, e); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();