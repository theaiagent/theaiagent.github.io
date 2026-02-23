/* ============================================
   main.js — Navigation & UI helpers
   ============================================ */

(function () {
  'use strict';

  /* --- Mobile hamburger toggle --- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  function openNav() {
    toggle.classList.add('open');
    navLinks.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    toggle.classList.remove('open');
    navLinks.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      navLinks.classList.contains('active') ? closeNav() : openNav();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  // Close nav when a link is clicked (mobile)
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  /* --- Active page highlight --- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  /* --- Navbar shadow on scroll --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* --- Animate progress bars on scroll --- */
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  if (progressBars.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    progressBars.forEach(function (bar) {
      bar.dataset.width = bar.style.width;
      bar.style.width = '0';
      observer.observe(bar);
    });
  }
})();
