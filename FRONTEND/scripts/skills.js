"use strict";

/* =========================================
   CALEB MAKORI PORTFOLIO
   SKILLS PAGE - LIGHTWEIGHT JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Update the footer year
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // 2. Hide the preloader immediately
    const preloader = document.getElementById("preloader");

    if (preloader) {
        preloader.classList.add("loaded");

        // Remove it from the page after its fade-out animation
        window.setTimeout(() => {
            preloader.remove();
        }, 400);
    }


    // 3. Animate skill progress bars
    const progressBars = document.querySelectorAll(".progress-fill");

    function animateProgressBar(bar) {
        const progress = Number(bar.dataset.progress);

        if (!Number.isFinite(progress)) return;

        const safeProgress = Math.min(100, Math.max(0, progress));

        bar.style.setProperty("--progress-width", safeProgress + "%");
        bar.classList.add("animated");
    }

    // Animate immediately when the page has no observer support
    if (!("IntersectionObserver" in window)) {
        progressBars.forEach(animateProgressBar);
    } else {
        const progressObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBar(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        progressBars.forEach(bar => progressObserver.observe(bar));
    }


    // 4. Reveal cards as they enter the screen
    const revealItems = document.querySelectorAll(
        ".overview-card, .skill-card, .creative-card, .workflow-step"
    );

    // Show everything if animations are unavailable or not wanted
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach(item => item.classList.add("visible"));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08
        });

        revealItems.forEach(item => revealObserver.observe(item));
    }


    // 5. Back-to-top button
    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {
        let scrollScheduled = false;

        function updateBackToTop() {
            backToTop.classList.toggle("show", window.scrollY > 350);
            scrollScheduled = false;
        }

        window.addEventListener("scroll", () => {
            if (!scrollScheduled) {
                scrollScheduled = true;
                window.requestAnimationFrame(updateBackToTop);
            }
        }, { passive: true });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "auto" : "smooth"
            });
        });

        // Set the correct initial state
        updateBackToTop();
    }

});