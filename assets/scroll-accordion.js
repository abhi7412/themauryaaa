/**
 * SCROLL-DRIVEN ACCORDION – "What I Do" section
 * ─────────────────────────────────────────────
 * Sequence (driven by scroll progress through .whatIDO):
 *   enter  → all collapsed
 *   ~15 %  → box 1 opens
 *   ~42 %  → box 1 closes, box 2 opens
 *   ~67 %  → box 2 closes, box 3 opens
 *   ~88 %  → box 3 closes (section exiting)
 */
(function () {
  'use strict';

  var currentActive = -1;   // index of the open box, -1 = none
  var items = [];   // the three .what-content elements
  var initialized = false;
  var retries = 0;

  /* ── helpers ─────────────────────────────────────────── */

  function setActive(index) {
    if (index === currentActive) return;   // no change needed
    currentActive = index;

    items.forEach(function (item, i) {
      item.classList.remove('what-content-active', 'what-sibling');
      if (i === index) {
        item.classList.add('what-content-active');
      } else if (index >= 0) {
        // every other box gets the "collapsed sibling" class
        item.classList.add('what-sibling');
      }
    });
  }

  /* ── scroll handler with requestAnimationFrame (60fps/120fps sync) ── */

  var ticking = false;

  function updateAccordion() {
    var boxIn = document.querySelector('.what-box-in');
    if (!boxIn || !items.length) return;

    var rect = boxIn.getBoundingClientRect();
    if (rect.height <= 0) return;

    // Viewport vertical center (50% of screen)
    var vCenter = window.innerHeight / 2;

    // relPos: 0 = container top at screen center, 1 = container bottom at screen center
    // Box 1 center = ~0.17, Box 2 center = ~0.50, Box 3 center = ~0.83
    var relPos = (vCenter - rect.top) / rect.height;

    if      (relPos < 0.05) { setActive(-1); }  // container entering (below center)
    else if (relPos < 0.35) { setActive(0);  }  // Box 1 centered on screen
    else if (relPos < 0.65) { setActive(1);  }  // Box 2 centered on screen
    else if (relPos < 0.95) { setActive(2);  }  // Box 3 centered on screen
    else                    { setActive(-1); }  // container exiting (above center)
  }

  /* ── floating social icons visibility control ────────── */

  function checkSocialVisibility() {
    var contact = document.querySelector('.contact-section') || document.getElementById('contact');
    var social = document.querySelector('.social-icons') || document.getElementById('social');
    if (!contact || !social) return;

    var rect = contact.getBoundingClientRect();
    var vh = window.innerHeight;

    // Hide floating social icons when contact section approaches the viewport
    if (rect.top < vh - 60) {
      social.classList.add('social-icons-hidden');
    } else {
      social.classList.remove('social-icons-hidden');
    }
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateAccordion();
        checkSocialVisibility();
        ticking = false;
      });
      ticking = true;
    }
  }



  /* ── block existing click handlers (touch devices) ───── */

  function blockClick(e) {
    // capture phase → fires before the React bubble-phase listener
    e.stopPropagation();
  }

  /* ── initialise ──────────────────────────────────────── */

  function init() {
    var boxIn = document.querySelector('.what-box-in');
    if (!boxIn) return false;

    var found = boxIn.querySelectorAll('.what-content');
    if (found.length < 3) return false;

    items = Array.from(found);
    initialized = true;

    items.forEach(function (item) {
      /*
       * Desktop: the element keeps the 'what-noTouch' class so the
       * CSS :hover rule still fires. Remove it so hover no longer
       * triggers expansion – scroll drives everything instead.
       */
      item.classList.remove('what-noTouch');

      /*
       * Touch / mobile: React adds a click listener in bubble phase.
       * Our capture-phase listener fires first and stops propagation.
       */
      item.addEventListener('click', blockClick, true);
    });

    /* initial state (handles page-load mid-scroll) */
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchmove', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return true;
  }

  function tryInit() {
    if (initialized) return;
    if (!init()) {
      retries++;
      if (retries < 50) {                // up to ~15 s of retries
        setTimeout(tryInit, 300);
      }
    }
  }

  /* ── entry point ─────────────────────────────────────── */

  if (document.readyState === 'complete') {
    setTimeout(tryInit, 800);
  } else {
    window.addEventListener('load', function () {
      setTimeout(tryInit, 800);
    });
  }

})();
