"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. FAST PRELOADER
    ===================================== */

    const preloader = document.getElementById("preloader");

    function hidePreloader() {
        if (!preloader) return;

        preloader.classList.add("loaded");

        // Remove it from the page after the fade-out.
        setTimeout(function () {
            preloader.style.display = "none";
        }, 400);
    }

    // Hide the loader immediately after HTML is ready.
    hidePreloader();

    // Fallback in case another script interferes.
    window.addEventListener("load", hidePreloader, { once: true });


    /* =====================================
       2. FOOTER YEAR
    ===================================== */

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================
       3. MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation) {

        function closeMenu() {
            navigation.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }

        menuToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        });

        // Close after selecting a navigation link.
        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close when Escape is pressed.
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close when clicking outside the menu.
        document.addEventListener("click", function (event) {
            if (
                navigation.classList.contains("open") &&
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Close the mobile menu when returning to desktop width.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 800) {
                closeMenu();
            }
        });
    }


    /* =====================================
       4. HEADER SCROLL EFFECT
    ===================================== */

    const header = document.getElementById("header");

    if (header) {
        let ticking = false;

        window.addEventListener("scroll", function () {
            if (ticking) return;

            ticking = true;

            window.requestAnimationFrame(function () {
                header.classList.toggle("scrolled", window.scrollY > 30);
                ticking = false;
            });
        }, { passive: true });
    }


    /* =====================================
       5. AUTOMATIC ACTIVE NAVIGATION
    ===================================== */

    const currentPage = (
        window.location.pathname.split("/").pop() || "index.html"
    ).toLowerCase();

    document.querySelectorAll("#navigation .nav-link").forEach(function (link) {
        const linkPage = link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        const isActive = linkPage === currentPage;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });


    /* =====================================
       6. LIGHTWEIGHT REVEAL ANIMATIONS
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".about-card, .skill-card, .project-card, .service-card"
    );

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

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

});