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
  heroEl.addEventListener('mousemove', (e) => {
    const rect = heroEl.getBoundingClientRect();
    heroEl.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
    heroEl.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
  });
}

const terminalLine = document.getElementById('terminal-line');
const terminalLog = [
  '> scanning workflow... 14 slow steps found',
  '> biggest delay found: customers waiting 38% too long',
  '> fixing the process...',
  '> turning on automation... done',
  '> process running smoothly. time saved: 42%',
];

if (terminalLine) {
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = terminalLog[lineIndex];
    if (!deleting) {
      charIndex++;
      terminalLine.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      terminalLine.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % terminalLog.length;
      }
    }
    setTimeout(tick, deleting ? 20 : 35);
  };

  tick();
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
