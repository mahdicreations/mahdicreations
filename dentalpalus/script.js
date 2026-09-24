/* ==========================================================================
   ELWAFA DENTAL - JavaScript Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial check


    // 2. Mobile Menu (Hamburger) Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuOverlay = document.getElementById('menuOverlay');

    if (menuToggle && navMenu) {
        const toggleMenu = () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (menuOverlay) menuOverlay.classList.toggle('active');
            // Prevent body scroll when menu is open on mobile
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        };

        const closeMenu = () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        menuToggle.addEventListener('click', toggleMenu);

        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }


    // 3. Active Nav Link on Scroll (Intersection Observer)
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the main viewport area
        threshold: 0
    };

    const observerCallback = (entries) => {
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
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));


    // 4. Services Fluid Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesGrid = document.getElementById('servicesGrid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button styling
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Apply fade-out animation to grid
            servicesGrid.style.opacity = '0';
            servicesGrid.style.transform = 'translateY(10px)';
            servicesGrid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

            setTimeout(() => {
                serviceCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Fade back in
                servicesGrid.style.opacity = '1';
                servicesGrid.style.transform = 'translateY(0)';
            }, 300);
        });
    });


    // 5. Booking Modal Logic
    const bookingModal = document.getElementById('bookingModal');
    const openModalBtns = document.querySelectorAll('.open-booking-modal');
    const closeModalBtn = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    const bookServiceSelect = document.getElementById('bookService');

    const openModal = (serviceName = '') => {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock screen scroll

        // Select the service in the dropdown if matched
        if (serviceName && bookServiceSelect) {
            // Find option by custom text or value
            const options = Array.from(bookServiceSelect.options);
            const matchedOption = options.find(opt => 
                opt.text.toLowerCase().includes(serviceName.toLowerCase()) || 
                opt.value.toLowerCase().includes(serviceName.toLowerCase())
            );
            if (matchedOption) {
                bookServiceSelect.value = matchedOption.value;
            }
        }
    };

    const closeModal = () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
        // Clear potential form messages
        const bookingStatus = document.getElementById('bookingStatus');
        if (bookingStatus) {
            bookingStatus.style.display = 'none';
            bookingStatus.className = 'form-status';
        }
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceAttr = btn.getAttribute('data-service') || '';
            openModal(serviceAttr);
        });
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('active')) {
            closeModal();
        }
    });


    // 6. Interactive Form Handling (Simulated premium feedback)
    
    // A. Contact Form
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Loading visual
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';

            // Simulate server network latency
            setTimeout(() => {
                const name = document.getElementById('formName').value;
                
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `<strong>Merci ${name} !</strong> Votre message a bien été envoyé. Notre équipe vous recontactera très rapidement.`;
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                contactForm.reset();
                
                // Hide status message after 10s
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 10000);
            }, 1200);
        });
    }

    // B. Booking Form
    const bookingForm = document.getElementById('bookingForm');
    const bookingStatus = document.getElementById('bookingStatus');

    if (bookingForm && bookingStatus) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Traitement de la demande...';

            setTimeout(() => {
                const cabinet = document.getElementById('bookCabinet').value;
                const phone = document.getElementById('bookPhone').value;
                const service = bookServiceSelect.options[bookServiceSelect.selectedIndex].text;
                
                bookingStatus.className = 'form-status success';
                bookingStatus.innerHTML = `<strong>Demande enregistrée !</strong><br>Merci <strong>${cabinet}</strong>, votre demande pour <strong>${service}</strong> a bien été prise en compte.<br>Un technicien vous contactera au <strong>${phone}</strong> sous peu pour coordonner le cas clinique.`;
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                bookingForm.reset();
                
                // Close modal after 4 seconds
                setTimeout(() => {
                    closeModal();
                }, 4500);
            }, 1500);
        });
    }


    // 7. Scroll Reveal Animation for a premium interactive feel
    const revealElements = document.querySelectorAll('.service-card, .why-card, .about-text-content, .about-visual, .training-card, .tech-card, .gallery-item');
    
    const revealOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Animate once
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

});
