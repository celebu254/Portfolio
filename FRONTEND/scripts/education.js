/* =========================================
   EDUCATION PAGE - JAVASCRIPT
   Portfolio: Caleb Makori
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =========================================
       1. REVEAL ANIMATIONS
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".education-hero, .education-card, .learning-card, .development-content, .education-cta"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {
        const observer = new IntersectionObserver(
            function (entries, currentObserver) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach(function (element) {
            element.classList.add("reveal");
            observer.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

    /* =========================================
       2. MOBILE NAVIGATION
       Only attach if shared script.js has not
       already attached navigation behavior.
    ========================================= */

    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation && !menuToggle.dataset.educationInitialized) {
        menuToggle.dataset.educationInitialized = "true";

        menuToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            });
        });

        document.addEventListener("click", function (event) {
            if (
                navigation.classList.contains("open") &&
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            }
        });
    }

    /* =========================================
       3. AUTOMATIC FOOTER YEAR
    ========================================= */

    const currentYear = document.getElementById("current-year");

    if (currentYear && !currentYear.textContent.trim()) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* =========================================
       4. BACK-TO-TOP BUTTON
    ========================================= */

    const backToTop = document.getElementById("back-to-top");

    if (backToTop && !backToTop.dataset.educationInitialized) {
        backToTop.dataset.educationInitialized = "true";

        function updateBackToTop() {
            backToTop.classList.toggle("show", window.scrollY > 350);
        }

        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        updateBackToTop();

        backToTop.addEventListener("click", function (event) {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth"
            });
        });
    }

    /* =========================================
       5. CURRENT PAGE NAVIGATION HIGHLIGHT
    ========================================= */

    if (navigation) {
        navigation.querySelectorAll("a").forEach(function (link) {
            const linkPage = link.getAttribute("href");

            if (linkPage && linkPage.toLowerCase() === "education.html") {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

});