"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. FAST PRELOADER
    ========================================= */

    const preloader = document.getElementById("preloader");

    function hidePreloader() {
        if (!preloader) return;

        preloader.classList.add("loaded");

        // Ensure the preloader cannot block the page
        setTimeout(function () {
            preloader.style.display = "none";
        }, 300);
    }

    // Hide immediately when the HTML is ready
    hidePreloader();

    // Extra fallback
    window.addEventListener("load", hidePreloader, { once: true });


    /* =========================================
       2. AUTOMATIC FOOTER YEAR
    ========================================= */

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =========================================
       3. MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation) {

        function closeMenu() {
            navigation.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        }

        menuToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        });

        // Close navigation after selecting a link
        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close navigation when Escape is pressed
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close navigation when clicking outside it
        document.addEventListener("click", function (event) {
            if (
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });
    }


    /* =========================================
       4. HEADER SCROLL EFFECT
    ========================================= */

    const header = document.getElementById("header");

    if (header) {
        function updateHeader() {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 30
            );
        }

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

        updateHeader();
    }


    /* =========================================
       5. ACTIVE NAVIGATION LINK
    ========================================= */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    document.querySelectorAll("#navigation a").forEach(function (link) {
        const href = link.getAttribute("href");

        if (!href) return;

        const linkPage = href.split("?")[0]
            .split("#")[0]
            .split("/")
            .pop()
            .toLowerCase();

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });


    /* =========================================
       6. SCROLL REVEAL ANIMATIONS
    ========================================= */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, currentObserver) {

                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

                        // Stop observing visible elements
                        currentObserver.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px 30px 0px"
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }


    /* =========================================
       7. SERVICE LINK PERSONALIZATION
       Reads ?service= from the URL and fills
       matching fields on contact.html.
    ========================================= */

    const parameters = new URLSearchParams(window.location.search);
    const selectedService = parameters.get("service");

    if (selectedService) {
        const serviceField = document.querySelector(
            '#contact-form [name="subject"], ' +
            '#contact-form [name="service"]'
        );

        if (serviceField) {
            serviceField.value = selectedService;
        }

        const serviceHeading = document.getElementById(
            "selected-service"
        );

        if (serviceHeading) {
            serviceHeading.textContent =
                "Enquiry about: " + selectedService;
        }
    }


    /* =========================================
       8. BACK-TO-TOP BUTTON
       Optional: works if #back-to-top exists.
    ========================================= */

    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {

        function updateBackToTop() {
            backToTop.classList.toggle(
                "visible",
                window.scrollY > 350
            );
        }

        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        backToTop.addEventListener("click", function () {
            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "auto" : "smooth"
            });
        });

        updateBackToTop();
    }


    /* =========================================
       9. OPTIONAL SERVICE CARD INTERACTION
    ========================================= */

    document.querySelectorAll(".service-card").forEach(function (card) {
        card.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                card.blur();
            }
        });
    });


    /* =========================================
       10. REDUCED MOTION SUPPORT
    ========================================= */

    if (window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

});