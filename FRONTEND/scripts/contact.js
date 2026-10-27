"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // 1. SELECT HTML ELEMENTS
    const preloader = document.getElementById("preloader");
    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("navigation");
    const currentYear = document.getElementById("current-year");
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    // 2. PRELOADER
    function hidePreloader() {
        if (preloader) {
            preloader.classList.add("loaded");
        }
    }

    if (document.readyState === "complete") {
        hidePreloader();
    } else {
        window.addEventListener("load", hidePreloader, { once: true });
    }

    // Fallback in case the load event is delayed.
    window.setTimeout(hidePreloader, 4000);

    // 3. MOBILE NAVIGATION
    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        });

        // Close menu when a link is clicked.
        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });

        // Close menu when clicking outside it.
        document.addEventListener("click", function (event) {
            if (
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        // Close menu when switching to desktop view.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    // 4. HEADER SCROLL EFFECT
    function updateHeader() {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 30);
        }
    }

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    // 5. AUTOMATIC FOOTER YEAR
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // 6. ACTIVE NAVIGATION LINK
    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    if (navigation) {
        navigation.querySelectorAll("a[href]").forEach(function (link) {
            const linkPage = link.getAttribute("href")
                .split("/")
                .pop()
                .toLowerCase();

            if (linkPage === currentPage) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            }
        });
    }

    // 7. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".contact-info-card, " +
        ".contact-form-card, " +
        ".contact-info-item, " +
        ".contact-social-section, " +
        ".contact-cta-content"
    );

    // Enable animation styles only when JavaScript is available.
    document.documentElement.classList.add("js-enabled");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(function (element, index) {
            element.classList.add("reveal");
            element.style.transitionDelay = (index % 4) * 100 + "ms";
            observer.observe(element);
        });

    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

    // 8. FORM STATUS MESSAGE
    function showFormStatus(message, type) {
        if (!formStatus) {
            alert(message);
            return;
        }

        formStatus.textContent = message;
        formStatus.className = "form-status " + type;
        formStatus.setAttribute("role", "status");
        formStatus.setAttribute("aria-live", "polite");
    }

    // 9. CONTACT FORM VALIDATION
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = contactForm.querySelector('[name="name"]');
            const emailInput = contactForm.querySelector('[name="email"]');
            const subjectInput = contactForm.querySelector('[name="subject"]');
            const messageInput = contactForm.querySelector('[name="message"]');
            const consentInput = contactForm.querySelector('[name="consent"]');

            if (!nameInput || !emailInput || !subjectInput || !messageInput) {
                showFormStatus(
                    "Error: Check that your form contains the name, email, subject and message fields.",
                    "error"
                );
                return;
            }

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();

            if (!name || !email || !subject || !message) {
                showFormStatus(
                    "Please fill in all required fields.",
                    "error"
                );
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                showFormStatus(
                    "Please enter a valid email address.",
                    "error"
                );
                emailInput.focus();
                return;
            }

            if (message.length < 10) {
                showFormStatus(
                    "Your message must contain at least 10 characters.",
                    "error"
                );
                messageInput.focus();
                return;
            }

            if (consentInput && !consentInput.checked) {
                showFormStatus(
                    "Please accept the consent checkbox before continuing.",
                    "error"
                );
                consentInput.focus();
                return;
            }

            showFormStatus(
                "Validation successful! To deliver your message, connect this form to a PHP backend or a form service.",
                "info"
            );
        });
    }

    // 10. INITIALIZATION MESSAGE
    console.log("Contact page JavaScript loaded successfully.");

});