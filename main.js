document.addEventListener('DOMContentLoaded', function () {
    var navToggle = document.querySelector('.nav-toggle');
    var navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            var isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        var navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    var smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                var target = document.querySelector(href);

                if (target) {
                    var headerOffset = 80;
                    var elementPosition = target.getBoundingClientRect().top;
                    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    var sections = document.querySelectorAll('section[id]');
    var navLinksForActive = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        var scrollY = window.pageYOffset;

        sections.forEach(function (section) {
            var sectionHeight = section.offsetHeight;
            var sectionTop = section.offsetTop - 100;
            var sectionId = section.getAttribute('id');
            var navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinksForActive.forEach(function (link) {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    var scrollToTopBtn = document.getElementById('scrollToTop');

    function handleScroll() {
        if (scrollToTopBtn) {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    var contactForm = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var formData = new FormData(contactForm);
            var data = {};
            formData.forEach(function (value, key) {
                data[key] = value;
            });

            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(function () {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';

                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                showNotification('Message sent successfully!', 'success');
            }, 1500);
        });
    }

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        var existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        var notification = document.createElement('div');
        notification.className = 'notification ' + type;
        notification.innerHTML = '<span>' + message + '</span><button class="notification-close"><i class="fas fa-times"></i></button>';

        notification.style.cssText = 'position: fixed; top: 100px; right: 20px; padding: 16px 24px; background: ' + (type === 'success' ? '#10b981' : '#ef4444') + '; color: white; border-radius: 8px; display: flex; align-items: center; gap: 12px; z-index: 10000; animation: slideIn 0.3s ease; font-size: 14px;';

        if (!document.querySelector('#notification-styles')) {
            var style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = '@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }';
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        var closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = 'background: none; border: none; color: white; cursor: pointer; padding: 4px;';
        closeBtn.addEventListener('click', function () {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(function () {
                notification.remove();
            }, 300);
        });

        setTimeout(function () {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(function () {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                var skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(function (bar) {
                    bar.style.width = bar.style.getPropertyValue('--progress');
                });
            }
        });
    }, observerOptions);

    var fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(function (element) {
        observer.observe(element);
    });

    var heroShape = document.querySelector('.hero-shape');

    if (heroShape) {
        window.addEventListener('scroll', function () {
            var scrolled = window.pageYOffset;
            var heroSection = document.querySelector('.hero');

            if (scrolled < window.innerHeight) {
                heroShape.style.transform = 'translateY(' + (scrolled * 0.1) + 'px)';
            }
        });
    }

    var navbar = document.querySelector('.navbar');

    function handleNavbarBackground() {
        if (navbar) {
            if (window.pageYOffset > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        }
    }

    window.addEventListener('scroll', handleNavbarBackground);

    function debounce(func, wait) {
        var timeout;
        return function executedFunction() {
            var context = this;
            var args = arguments;
            var later = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function throttle(func, limit) {
        var inThrottle;
        return function () {
            var args = arguments;
            var context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function () {
                    inThrottle = false;
                }, limit);
            }
        };
    }

    handleScroll();
    handleNavbarBackground();
    updateActiveNav();

    console.log('%c Anmol Panda Portfolio', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
    console.log('%c Built with passion and code', 'font-size: 12px; color: #a0a0a0;');
});
