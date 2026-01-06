// Bloxbusters client script

// Set copyright year
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

// Mobile navigation toggle (resilient)
const menuBtn =
  document.querySelector('[data-menu-btn], #menuBtn, #navToggle');
const mobileNav =
  document.querySelector('[data-mobile-nav], #mobileNav, #navMenu');

if (menuBtn && mobileNav) {
  // Ensure it's a button for accessibility; if it's an <a>, prevent jump
  menuBtn.addEventListener('click', (e) => {
    if (menuBtn.tagName === 'A') e.preventDefault();

    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    const next = !expanded;

    menuBtn.setAttribute('aria-expanded', String(next));

    // Use both the hidden attribute and a class in case your CSS uses either
    mobileNav.hidden = !next;
    mobileNav.classList.toggle('is-open', next);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      menuBtn.click();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (
      menuBtn.getAttribute('aria-expanded') === 'true' &&
      !mobileNav.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      menuBtn.click();
    }
  });

  // Start state: hide unless aria-expanded="true" is present in HTML
  const startOpen = menuBtn.getAttribute('aria-expanded') === 'true';
  mobileNav.hidden = !startOpen;
  mobileNav.classList.toggle('is-open', startOpen);
}


  // Cookie banner
  const cookieBanner = document.getElementById('cookie');
  const acceptBtn = document.getElementById('cookieAccept');
  const rejectBtn = document.getElementById('cookieReject');
  if (cookieBanner && acceptBtn && rejectBtn) {
    const cookieKey = 'bloxbusters-cookie-consent';
    const consent = localStorage.getItem(cookieKey);
    if (!consent) {
      cookieBanner.hidden = false;
    }
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem(cookieKey, 'accepted');
      cookieBanner.hidden = true;
    });
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem(cookieKey, 'rejected');
      cookieBanner.hidden = true;
    });
  }

  // Countdown timer
  const targetDate = new Date('2026-01-12T23:59:59Z'); // placeholder launch date
  const dd = document.getElementById('dd');
  const hh = document.getElementById('hh');
  const mm = document.getElementById('mm');
  const ss = document.getElementById('ss');
  function updateCountdown() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    if (diff <= 0) {
      // Countdown finished
      dd.textContent = '0';
      hh.textContent = '0';
      mm.textContent = '0';
      ss.textContent = '0';
      return;
    }
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    dd.textContent = String(days).padStart(2, '0');
    hh.textContent = String(hours).padStart(2, '0');
    mm.textContent = String(minutes).padStart(2, '0');
    ss.textContent = String(seconds).padStart(2, '0');
  }
  if (dd && hh && mm && ss) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
});
