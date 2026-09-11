/**
 * Mahdi Créations — Main Client-Side Logic
 * Pure Vanilla JavaScript (Zero Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Scroll Reveal Animations (.reveal -> .is-visible) ──
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      );

      reveals.forEach((el) => {
        // If element is already in initial viewport, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    } else {
      reveals.forEach((el) => el.classList.add('is-visible'));
    }
  }

  // ── 2. Mobile Menu Toggle ──
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (menuBtn && mobileNav) {
    const openMenu = () => {
      mobileNav.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Fermer le menu de navigation');
      mobileNav.setAttribute('aria-hidden', 'false');
      if (menuIcon) menuIcon.style.display = 'none';
      if (closeIcon) closeIcon.style.display = 'block';
    };

    const closeMenu = (returnFocus = false) => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Ouvrir le menu de navigation');
      mobileNav.setAttribute('aria-hidden', 'true');
      if (menuIcon) menuIcon.style.display = 'block';
      if (closeIcon) closeIcon.style.display = 'none';

      if (returnFocus) {
        menuBtn.focus();
      }
    };

    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    // Close on Escape key and return focus to menu button
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMenu(true);
      }
    });

    // Close on navigation link click
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu(false);
      });
    });

    // Close if resizing above mobile breakpoint (lg = 1024px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && mobileNav.classList.contains('open')) {
        closeMenu(false);
      }
    });
  }

  // ── 3. Scroll to Top Button ──
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 300) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      },
      { passive: true }
    );

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── 4. FAQ Accordion ──
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const answer = item ? item.querySelector('.faq-answer') : null;
      if (!item || !answer) return;

      const isOpen = item.classList.contains('open');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          const openAnswer = openItem.querySelector('.faq-answer');
          if (openAnswer) openAnswer.classList.remove('open');
          const openTrigger = openItem.querySelector('.faq-trigger');
          if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked item
      if (isOpen) {
        item.classList.remove('open');
        answer.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ── 5. Portfolio Filtering ──
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update button styles
        filterButtons.forEach((b) => {
          b.className =
            'px-6 py-2.5 rounded-full text-sm font-body font-medium transition-all cursor-pointer border border-white/10 text-text-muted hover:border-gold/30 hover:text-gold';
        });
        btn.className =
          'px-6 py-2.5 rounded-full text-sm font-body font-medium transition-all cursor-pointer bg-gold-gradient text-dark shadow-md';

        // Filter cards
        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'Tous' || category === filter) {
            card.classList.remove('hidden-card');
          } else {
            card.classList.add('hidden-card');
          }
        });
      });
    });
  }

  // ── 6. Contact Form Submission ──
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const phoneInput = document.getElementById('contact-phone');
      const serviceInput = document.getElementById('contact-service');
      const messageInput = document.getElementById('contact-message');

      const btnText = document.getElementById('contact-btn-text');
      const btnSpinner = document.getElementById('contact-btn-spinner');
      const errorBox = document.getElementById('contact-error');
      const successBox = document.getElementById('contact-success');
      const formWrapper = document.getElementById('contact-form-wrapper');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const service = serviceInput ? serviceInput.value : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !phone) {
        if (errorBox) {
          errorBox.textContent = 'Veuillez renseigner votre nom et votre numéro de téléphone.';
          errorBox.style.display = 'block';
        }
        return;
      }

      if (errorBox) errorBox.style.display = 'none';
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.style.display = 'none';
      if (btnSpinner) btnSpinner.style.display = 'inline-flex';

      try {
        const response = await fetch('/contact/send-mail.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'contact', name, email, phone, service, message }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          if (formWrapper) formWrapper.style.display = 'none';
          if (successBox) successBox.style.display = 'flex';
          contactForm.reset();
        } else {
          throw new Error(data.error || "Une erreur est survenue lors de l'envoi.");
        }
      } catch (err) {
        if (errorBox) {
          errorBox.textContent =
            err.message || 'Erreur de connexion. Veuillez réessayer ou nous contacter sur WhatsApp.';
          errorBox.style.display = 'block';
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline-flex';
        if (btnSpinner) btnSpinner.style.display = 'none';
      }
    });
  }

  // ── 7. Callback Form Submission ("Laissez-nous vous contacter") ──
  const callbackForms = document.querySelectorAll('.callback-form');
  callbackForms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const wrapper = form.closest('.callback-wrapper');
      const nameInput = form.querySelector('input[data-field="name"]');
      const phoneInput = form.querySelector('input[data-field="phone"]');
      const dateInput = form.querySelector('input[data-field="callDate"]');

      const errorBanner = form.querySelector('.form-error-banner');
      const successBox = wrapper ? wrapper.querySelector('.callback-success') : null;
      const submitBtn = form.querySelector('button[type="submit"]');
      const btnText = form.querySelector('.btn-text');
      const btnSpinner = form.querySelector('.btn-spinner');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const callDate = dateInput ? dateInput.value : '';

      if (!name || !phone) {
        if (errorBanner) {
          errorBanner.textContent = 'Veuillez renseigner votre nom et votre numéro de téléphone.';
          errorBanner.style.display = 'block';
        }
        return;
      }

      if (errorBanner) errorBanner.style.display = 'none';
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.style.display = 'none';
      if (btnSpinner) btnSpinner.style.display = 'inline-flex';

      try {
        const response = await fetch('/contact/send-mail.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'callback',
            name,
            phone,
            callDate,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          form.style.display = 'none';
          if (successBox) {
            successBox.style.display = 'flex';
          }
          form.reset();
        } else {
          throw new Error(data.error || "Une erreur est survenue lors de l'envoi.");
        }
      } catch (err) {
        if (errorBanner) {
          errorBanner.textContent =
            err.message || 'Erreur de connexion. Veuillez réessayer ou nous contacter sur WhatsApp.';
          errorBanner.style.display = 'block';
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline-flex';
        if (btnSpinner) btnSpinner.style.display = 'none';
      }
    });
  });

  // ── 8. Dynamic Copyright Year ──
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // ── 9. Hero Background Slideshow (Deferred Loading) ──
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

    const getAppropriateBg = (slide) => {
      if (isMobile && slide.dataset.bgMobile) return slide.dataset.bgMobile;
      if (isTablet && slide.dataset.bgTablet) return slide.dataset.bgTablet;
      return slide.dataset.bg || '';
    };

    const nextHeroSlide = () => {
      const nextIndex = (currentSlide + 1) % heroSlides.length;
      const nextSlide = heroSlides[nextIndex];
      const bg = getAppropriateBg(nextSlide);

      if (bg && !nextSlide.style.backgroundImage) {
        nextSlide.style.backgroundImage = `url('${bg}')`;
      }

      heroSlides[currentSlide].classList.remove('active');
      nextSlide.classList.add('active');
      currentSlide = nextIndex;
    };

    // Defer rotation start by 8 seconds so it never competes with initial load
    setTimeout(() => {
      setInterval(nextHeroSlide, 8000);
    }, 4000);
  }
});

