document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const btnMenu = document.getElementById('btn-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconMenu = document.getElementById('icon-menu');
    const iconClose = document.getElementById('icon-close');

    if (btnMenu && mobileMenu) {
        btnMenu.addEventListener('click', () => {
            const isExpanded = btnMenu.getAttribute('aria-expanded') === 'true';
            btnMenu.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            if (iconMenu && iconClose) {
                iconMenu.classList.toggle('hidden');
                iconClose.classList.toggle('hidden');
            }
        });
    }

    // 2. Fixed Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('bg-dark/95', 'shadow-md', 'backdrop-blur-md');
                header.classList.remove('bg-transparent', 'py-4');
                header.classList.add('py-2');
            } else {
                header.classList.remove('bg-dark/95', 'shadow-md', 'backdrop-blur-md', 'py-2');
                header.classList.add('bg-transparent', 'py-4');
            }
        });
    }

    // 3. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.add('opacity-100');
            } else {
                scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.remove('opacity-100');
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. FAQ Accordion
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('svg');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            button.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('mt-4');
                if (icon) icon.style.transform = "rotate(180deg)";
            } else {
                content.style.maxHeight = "0px";
                content.classList.remove('mt-4');
                if (icon) icon.style.transform = "rotate(0deg)";
            }
        });
    });

    // 5. Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const statusDiv = document.getElementById('form-status');
            
            if (submitBtn) submitBtn.disabled = true;
            if (statusDiv) {
                statusDiv.className = 'mt-4 p-3 rounded text-sm text-center bg-gray-800 text-gray-300';
                statusDiv.textContent = 'Envoi en cours...';
            }

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            data.type = 'contact'; // For the backend to know it's the main form

            try {
                const response = await fetch('/contact/send-mail.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    if (statusDiv) {
                        statusDiv.className = 'mt-4 p-3 rounded text-sm text-center bg-green-900/50 text-green-300 border border-green-800';
                        statusDiv.textContent = 'Merci ! Votre message a été envoyé avec succès.';
                    }
                    contactForm.reset();
                } else {
                    throw new Error(result.error || 'Erreur lors de l\'envoi');
                }
            } catch (error) {
                if (statusDiv) {
                    statusDiv.className = 'mt-4 p-3 rounded text-sm text-center bg-red-900/50 text-red-300 border border-red-800';
                    statusDiv.textContent = error.message;
                }
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    // 6. Intersection Observer for Fade-In Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
            observer.observe(el);
        });
    }
});
