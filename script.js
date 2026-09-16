const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const yearElement = document.getElementById('year');
const revealItems = document.querySelectorAll('.reveal');
const certCards = document.querySelectorAll('.cert-card');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

certCards.forEach((card) => {
  const toggle = card.querySelector('.cert-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = card.classList.contains('is-open');

    certCards.forEach((item) => {
      item.classList.remove('is-open');
      const button = item.querySelector('.cert-toggle');
      if (button) button.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      card.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));
