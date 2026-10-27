"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. AUTOMATIC COPYRIGHT YEAR
    ===================================== */

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================
       2. MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation) {

        const menuIcon = menuToggle.querySelector("i");

        function closeMenu() {
            navigation.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }
        }

        menuToggle.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            if (menuIcon) {
                menuIcon.classList.toggle("fa-bars", !isOpen);
                menuIcon.classList.toggle("fa-xmark", isOpen);
            }
        });

        // Close the menu after selecting a navigation link.
        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when the Escape key is pressed.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close the mobile menu when returning to desktop width.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        }, { passive: true });
    }


    /* =====================================
       3. SCROLL REVEAL ANIMATIONS
    ===================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reduceMotion ||
        !("IntersectionObserver" in window)
    ) {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    } else {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

                        // Stop observing an element after revealing it.
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }


    /* =====================================
       4. BACK-TO-TOP BUTTON
    ===================================== */

    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {

        let scrollPending = false;

        function updateBackToTop() {
            backToTop.classList.toggle(
                "show",
                window.scrollY > 300
            );

            scrollPending = false;
        }

        window.addEventListener(
            "scroll",
            () => {

                if (!scrollPending) {
                    window.requestAnimationFrame(updateBackToTop);
                    scrollPending = true;
                }

            },
            { passive: true }
        );

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth"
            });

        });

        // Set the correct initial button visibility.
        updateBackToTop();
    }

});