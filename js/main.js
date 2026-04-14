/* =============================================
   SUJAL KHAMAR PORTFOLIO — MAIN JS
   ============================================= */

/* ---- Dark Mode ---- */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateCharts();
});

/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---- Sticky Navbar ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- Typewriter ---- */
const phrases = [
  'Student Developer',
  'Python Enthusiast',
  'Data Storyteller',
  'Problem Solver',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    typeEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, deleting ? 60 : 100);
}
typeWriter();

/* ---- Scroll Reveal ---- */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* ---- Skill Bars ---- */
const skillBars = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObs.observe(bar));

/* ---- Counters ---- */
const counters = document.querySelectorAll('.counter');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObs.observe(c));

function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1500;
  const start = performance.now();
  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ---- Project Filters ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        // Re-trigger reveal
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ---- Charts ---- */
let heroChart, revenueChart, categoryChart, acquisitionChart;

function getChartDefaults() {
  const dark = html.getAttribute('data-theme') === 'dark';
  return {
    gridColor: dark ? 'rgba(240,236,230,0.08)' : 'rgba(26,23,20,0.06)',
    textColor: dark ? '#7a736a' : '#7a736a',
    tickColor: dark ? '#c4bdb5' : '#4a4540',
  };
}

function initHeroChart() {
  const ctx = document.getElementById('heroChart');
  if (!ctx) return;
  const d = getChartDefaults();
  heroChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
      datasets: [{
        data: [22, 35, 28, 58, 45, 72],
        borderColor: '#c4622d',
        backgroundColor: 'rgba(196, 98, 45, 0.1)',
        fill: true,
        tension: 0.45,
        pointRadius: 3,
        pointBackgroundColor: '#c4622d',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
      scales: {
        x: { grid: { color: d.gridColor }, ticks: { color: d.textColor, font: { family: 'DM Mono', size: 10 } } },
        y: { grid: { color: d.gridColor }, ticks: { color: d.textColor, font: { family: 'DM Mono', size: 10 } } }
      }
    }
  });
}

function initDashboardCharts() {
  const d = getChartDefaults();

  // Revenue Chart
  const rev = document.getElementById('revenueChart');
  if (rev) {
    revenueChart = new Chart(rev, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue (₹L)',
          data: [1.2, 1.4, 1.1, 1.8, 2.1, 1.9, 1.5, 2.3, 2.0, 2.8, 4.1, 2.4],
          borderColor: '#c4622d',
          backgroundColor: 'rgba(196, 98, 45, 0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#c4622d',
          borderWidth: 2.5,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: d.gridColor }, ticks: { color: d.tickColor, font: { family: 'DM Mono', size: 10 } } },
          y: { grid: { color: d.gridColor }, ticks: { color: d.tickColor, font: { family: 'DM Mono', size: 10 } } }
        }
      }
    });
  }

  // Category Chart (Donut)
  const cat = document.getElementById('categoryChart');
  if (cat) {
    categoryChart = new Chart(cat, {
      type: 'doughnut',
      data: {
        labels: ['Electronics', 'Fashion', 'Home', 'Books', 'Other'],
        datasets: [{
          data: [34, 27, 18, 11, 10],
          backgroundColor: ['#c4622d', '#e8a07a', '#4a9b8f', '#7bc8c0', '#d4a843'],
          borderWidth: 0,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: d.tickColor, font: { family: 'DM Mono', size: 10 }, boxWidth: 10, padding: 10 }
          }
        }
      }
    });
  }

  // Acquisition Chart (Bar)
  const acq = document.getElementById('acquisitionChart');
  if (acq) {
    acquisitionChart = new Chart(acq, {
      type: 'bar',
      data: {
        labels: ['Organic', 'Referral', 'Paid', 'Social', 'Email'],
        datasets: [{
          label: 'Customers',
          data: [980, 720, 610, 480, 427],
          backgroundColor: ['#c4622d', '#e8a07a', '#4a9b8f', '#7bc8c0', '#d4a843'],
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: d.gridColor }, ticks: { color: d.tickColor, font: { family: 'DM Mono', size: 10 } } },
          y: { grid: { display: false }, ticks: { color: d.tickColor, font: { family: 'DM Mono', size: 10 } } }
        }
      }
    });
  }
}

function updateCharts() {
  [heroChart, revenueChart, categoryChart, acquisitionChart].forEach(c => {
    if (c) c.destroy();
  });
  initHeroChart();
  initDashboardCharts();
}

// Wait for DOM then init charts
document.addEventListener('DOMContentLoaded', () => {
  initHeroChart();
});

// Init dashboard charts when section is visible
const dashSection = document.getElementById('dashboard');
if (dashSection) {
  const dashObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      initDashboardCharts();
      dashObs.disconnect();
    }
  }, { threshold: 0.1 });
  dashObs.observe(dashSection);
}

/* ---- Contact Form ---- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const status = document.getElementById('formStatus');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const data = new FormData(contactForm);
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        status.textContent = '✓ Message sent! I\'ll get back to you soon.';
        status.style.color = '#22c55e';
        contactForm.reset();
      } else {
        throw new Error();
      }
    } catch {
      status.textContent = '✗ Something went wrong. Please email me directly.';
      status.style.color = '#ef4444';
    } finally {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
    }
  });
}

/* ---- Active Nav Link on Scroll ---- */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (navLink) {
      navLink.style.color = scrollY >= top && scrollY < bottom
        ? 'var(--accent)'
        : '';
    }
  });
});
