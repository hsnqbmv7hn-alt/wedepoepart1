/*
  Main JavaScript for Green Horizons
  - Mobile nav toggle
  - Projects filter
  - Simple form handling (prevent default + basic validation)
  - FAQ accordion behavior
*/
document.addEventListener('DOMContentLoaded', function () {
  // Mobile navigation toggle (defensive)
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      navList.style.display = isOpen ? 'block' : 'none';
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Ensure nav is visible again when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        navList.style.display = '';
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Projects filter (uses data-status on project cards)
  const filters = document.querySelectorAll('.filters .tag');
  const projectCards = document.querySelectorAll('.project-card');
  if (filters.length) {
    const applyFilter = (status) => {
      projectCards.forEach(card => {
        const s = card.dataset.status;
        if (status === 'all' || s === status) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    };

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        const status = filter.dataset.filter;
        applyFilter(status);
      });
    });

    // initialize based on the active filter (if any)
    const active = Array.from(filters).find(f => f.classList.contains('active'));
    applyFilter(active ? active.dataset.filter : 'all');
  }

  // Simple form handlers to prevent page reload and show a console message
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      // Basic validation example
      const required = form.querySelectorAll('[required]');
      let ok = true;
      required.forEach(r => { if (!r.value || !r.value.trim()) ok = false });
      if (!ok) {
        alert('Please fill all required fields.');
        return;
      }
      // Here you'd integrate with backend or third-party services
      alert('Thank you! Your submission was received (demo only).');
      form.reset();
    });
  });

  // FAQ accordion (defensive)
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (item) item.classList.toggle('open');
    });
  });

});
