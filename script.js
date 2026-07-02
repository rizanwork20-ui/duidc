document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation Scroll Effect ---
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 50;

  function handleNavbarScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Initial check in case of page reload half-scrolled

  // --- Mobile Hamburger Menu ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksList.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksList.classList.remove('active');
    });
  });

  // --- Active Nav Link Highlighting & Reveal on Scroll ---
  const sections = document.querySelectorAll('section');
  const revealElements = document.querySelectorAll('.reveal');

  // Intersection Observer for active navigation links
  const navObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the mid-screen area
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    if (section.getAttribute('id')) {
      navObserver.observe(section);
    }
  });

  // Intersection Observer for scroll animations (.reveal elements)
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, we don't need to observe it again
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
});
