/* ===========================
   APP.JS — SHOPBUILDBD
   Interactions & Animations
   =========================== */

// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === MOBILE MENU ===
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileNavLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

function openMobileMenu() {
  mobileMenu.classList.add('active');
  mobileToggle.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  mobileToggle.classList.remove('active');
  document.body.style.overflow = '';
}

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

if (mobileClose) {
  mobileClose.addEventListener('click', closeMobileMenu);
}

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

if (mobileMenu) {
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
  });
}

// === BOTTOM BAR ACTIVE STATE ===
const bottomBarItems = document.querySelectorAll('.bottom-bar-item');
const allSections = document.querySelectorAll('section[id]');

function updateBottomBar() {
  let current = 'home';
  allSections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  bottomBarItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    if (href && href.includes('#')) {
      const section = href.split('#')[1];
      if (section === current || (current === 'home' && section === 'home')) {
        item.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', updateBottomBar);
updateBottomBar();

// === TAB SWITCHING (Removed - Features section converted to stacked alternating showcase) ===


// === COUNTER ANIMATION ===
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('bn-BD') + suffix;
  }, 16);
}

// === INTERSECTION OBSERVER for counters ===
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// === COUNTDOWN TIMER (Flash Sale) ===
function startTimer() {
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  if (!hoursEl) return;

  let totalSeconds = 2 * 3600 + 45 * 60 + 30;

  setInterval(() => {
    totalSeconds--;
    if (totalSeconds < 0) totalSeconds = 3 * 3600;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

startTimer();

// === SCROLL REVEAL ANIMATION ===
const revealEls = document.querySelectorAll('.why-card, .pain-card, .stat-card, .demo-card, .testimonial-card, .more-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 80 * i);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// === SMOOTH ANCHOR SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === BAR CHART ANIMATION ===
const bars = document.querySelectorAll('.bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      bars.forEach(bar => {
        const h = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => {
          bar.style.transition = 'height 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          bar.style.height = h;
        }, 100);
      });
      barObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const barChart = document.querySelector('.bar-chart');
if (barChart) barObserver.observe(barChart);

// === ACTIVE NAV LINK ON SCROLL ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links > li > a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

console.log('🛒 ShopBuildBD — Ready to help your business grow!');

// === MOCKUP SLIDER (cross-fade) ===
const slider = document.getElementById('mockupSlider');
if (slider) {
  const slides = slider.querySelectorAll('.mockup-slide');
  const dots = document.querySelectorAll('.slider-dot');
  let current = 0;

  function goToSlide(index) {
    current = index;
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    dots.forEach((d, i) => {
      if (i === index) {
        d.classList.add('active');
      } else {
        d.classList.remove('active');
      }
    });
  }

  // Auto slide — loop smoothly
  setInterval(() => {
    const next = (current + 1) % slides.length;
    goToSlide(next);
  }, 4000);

  // Dot click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.slide));
    });
  });
}
