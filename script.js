// EmailJS config — create a free account at emailjs.com, connect your mailbox
// (e.g. Gmail), and replace these three values from your EmailJS dashboard.
const EMAILJS_PUBLIC_KEY = 'yv3ksZKKJLRauCrYW';
const EMAILJS_SERVICE_ID = 'service_buhbz2m';
const EMAILJS_TEMPLATE_ID = 'template_z2kosxp';

if (window.emailjs) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-form__status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    contactStatus.textContent = 'Sending...';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
      .then(() => {
        contactStatus.textContent = 'Message sent — we\'ll be in touch.';
        contactForm.reset();
      })
      .catch((err) => {
        contactStatus.textContent = 'Something went wrong. Try emailing us directly.';
        console.error(err);
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });
}

const heroEl = document.querySelector('.hero');
if (heroEl) {
  window.addEventListener('mousemove', (e) => {
    heroEl.style.setProperty('--glow-x', `${e.clientX}px`);
    heroEl.style.setProperty('--glow-y', `${e.clientY}px`);
  });

  const heroGlowObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      heroEl.classList.toggle('is-glow-active', entry.isIntersecting);
    });
  }, { threshold: 0 });
  heroGlowObserver.observe(heroEl);
}

const sections = document.querySelectorAll('.section, .hero');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

sections.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

const navLinks = document.querySelectorAll('.nav__links a');
const navTargets = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

navTargets.forEach((el) => navObserver.observe(el));

const navToggle = document.getElementById('nav-toggle');
const navLinksList = document.getElementById('nav-links');

if (navToggle && navLinksList) {
  const closeMenu = () => {
    navToggle.classList.remove('is-open');
    navLinksList.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinksList.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinksList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}
