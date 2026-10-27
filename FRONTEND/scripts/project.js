"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       1. FAST PRELOADER
       Prevents the loading screen from staying
       visible indefinitely.
    ========================================== */

    const preloader = document.getElementById("preloader");
    let preloaderRemoved = false;

    function removePreloader() {
        if (preloaderRemoved) return;

        preloaderRemoved = true;

        if (preloader) {
            preloader.classList.add("loaded");

            // Fallback: completely remove the preloader
            setTimeout(function () {
                preloader.style.display = "none";
            }, 350);
        }
    }

    // Remove it as soon as the HTML is ready
    removePreloader();

    // Additional safety fallback
    window.addEventListener("load", removePreloader, { once: true });

    // Never leave the loading screen visible indefinitely
    setTimeout(removePreloader, 1500);


    /* ==========================================
       2. AUTOMATIC FOOTER YEAR
    ========================================== */

    const yearElements = document.querySelectorAll(
        "#current-year, #year"
    );

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* ==========================================
       3. MOBILE NAVIGATION
    ========================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation) {

        function closeMenu() {
            navigation.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close menu when a navigation link is clicked
        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close menu when clicking outside it
        document.addEventListener("click", function (event) {
            if (
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Close menu when Escape is pressed
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }


    /* ==========================================
       4. HEADER SCROLL EFFECT
    ========================================== */

    const header = document.getElementById("header");

    if (header) {
        let ticking = false;

        function updateHeader() {
            header.classList.toggle("scrolled", window.scrollY > 30);
            ticking = false;
        }

        window.addEventListener("scroll", function () {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });

        updateHeader();
    }


    /* ==========================================
       5. ACTIVE NAVIGATION LINK
    ========================================== */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    document.querySelectorAll("#navigation a").forEach(function (link) {
        const linkPage = link.getAttribute("href");

        if (!linkPage) return;

        const normalizedLink = linkPage.split("/").pop().toLowerCase();

        if (
            normalizedLink === currentPage &&
            !link.hasAttribute("data-no-active")
        ) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });


    /* ==========================================
       6. SCROLL REVEAL ANIMATIONS
       Uses IntersectionObserver for efficiency.
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-up, .reveal-left, .reveal-right"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.10,
                rootMargin: "0px 0px 40px 0px"
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {
        // Fallback for older browsers
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }


    /* ==========================================
       7. BACK-TO-TOP BUTTON
       Works if your HTML contains #back-to-top.
    ========================================== */

    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {

        function updateBackToTop() {
            backToTop.classList.toggle("visible", window.scrollY > 350);
        }

        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth"
            });
        });

        updateBackToTop();
    }


    /* ==========================================
       8. CONTACT FORM VALIDATION
       This validates forms locally. It does not
       send messages to an email or database.
    ========================================== */

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = contactForm.querySelector('[name="name"]');
            const email = contactForm.querySelector('[name="email"]');
            const subject = contactForm.querySelector('[name="subject"]');
            const message = contactForm.querySelector('[name="message"]');
            const consent = contactForm.querySelector('[name="consent"]');

            function showStatus(text, success) {
                if (!formStatus) return;

                formStatus.textContent = text;
                formStatus.classList.toggle("success", success);
                formStatus.classList.toggle("error", !success);
                formStatus.setAttribute("role", "status");
            }

            if (!name || !email || !subject || !message) {
                showStatus(
                    "The form is missing required fields. Please check the HTML.",
                    false
                );
                return;
            }

            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !subject.value.trim() ||
                !message.value.trim()
            ) {
                showStatus(
                    "Please fill in all required fields.",
                    false
                );
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email.value.trim())) {
                showStatus(
                    "Please enter a valid email address.",
                    false
                );
                email.focus();
                return;
            }

            if (consent && !consent.checked) {
                showStatus(
                    "Please agree to the privacy notice before continuing.",
                    false
                );
                consent.focus();
                return;
            }

            showStatus(
                "Your form is valid, but message delivery requires a backend or form service.",
                true
            );
        });
    }


    /* ==========================================
       9. DISABLE REVEAL ANIMATIONS WHEN REQUESTED
    ========================================== */

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

});