"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. PRELOADER
    // ==========================================

    const preloader = document.getElementById("preloader");

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add("hidden");
        }
    }

    // Hide the preloader when the page finishes loading
    window.addEventListener("load", hidePreloader);

    // Fallback: hide it after four seconds
    setTimeout(hidePreloader, 4000);


    // ==========================================
    // 2. MOBILE NAVIGATION MENU
    // ==========================================

    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("navigation");

    function closeMenu() {
        if (!menuToggle || !navigation) return;

        navigation.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }

    function openMenu() {
        if (!menuToggle || !navigation) return;

        navigation.classList.add("open");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }
    }

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            const menuIsOpen = navigation.classList.contains("open");

            if (menuIsOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        // Close the menu after clicking a navigation link
        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when clicking outside it
        document.addEventListener("click", function (event) {

            const clickedInsideNavigation =
                navigation.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (!clickedInsideNavigation && !clickedMenuButton) {
                closeMenu();
            }

        });

        // Close the menu using the Escape key
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close the mobile menu when the screen becomes wider
        window.addEventListener("resize", function () {

            if (window.innerWidth > 850) {
                closeMenu();
            }

        });

    }


    // ==========================================
    // 3. HEADER SCROLL EFFECT
    // ==========================================

    const header = document.getElementById("header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // ==========================================
    // 4. ACTIVE NAVIGATION LINK
    // ==========================================

    const navigationLinks = document.querySelectorAll(
        "#navigation a"
    );

    navigationLinks.forEach(function (link) {

        const linkUrl = new URL(link.href, window.location.href);

        const currentPage =
            window.location.pathname.split("/").pop() || "index.html";

        const linkedPage =
            linkUrl.pathname.split("/").pop() || "index.html";

        if (
            currentPage.toLowerCase() === linkedPage.toLowerCase() &&
            !link.hash
        ) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else if (!link.classList.contains("active")) {
            link.removeAttribute("aria-current");
        }

    });


    // ==========================================
    // 5. SCROLL REVEAL ANIMATIONS
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".mission-card, " +
        ".interest-card, " +
        ".value-item"
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
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        // Display all elements in older browsers
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    // ==========================================
    // 6. AUTOMATIC FOOTER YEAR
    // ==========================================

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ==========================================
    // 7. PROFILE IMAGE FALLBACK
    // ==========================================

    const profileImage = document.querySelector(
        ".about-profile-image"
    );

    const profilePlaceholder = document.querySelector(
        ".image-placeholder"
    );

    function showImagePlaceholder() {

        if (profileImage) {
            profileImage.style.display = "none";
        }

        if (profilePlaceholder) {
            profilePlaceholder.style.display = "flex";
        }

    }

    if (profileImage) {

        profileImage.addEventListener("error", showImagePlaceholder);

        profileImage.addEventListener("load", function () {

            profileImage.style.display = "block";

            if (profilePlaceholder) {
                profilePlaceholder.style.display = "none";
            }

        });

        // Handle images that have already finished loading
        if (profileImage.complete) {

            if (profileImage.naturalWidth === 0) {
                showImagePlaceholder();
            } else {
                profileImage.style.display = "block";

                if (profilePlaceholder) {
                    profilePlaceholder.style.display = "none";
                }
            }

        }

    }


    // ==========================================
    // 8. SMOOTH SCROLLING
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            // Ignore empty placeholder links
            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ==========================================
    // 9. BUTTON INTERACTION
    // ==========================================

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(function (button) {

        button.addEventListener("mouseenter", function () {

            button.style.setProperty("--button-hover", "1");

        });

        button.addEventListener("mouseleave", function () {

            button.style.removeProperty("--button-hover");

        });

    });


    // ==========================================
    // 10. PAGE INITIALIZATION
    // ==========================================

    document.body.classList.add("page-loaded");

    console.log("Caleb Makori About Me page loaded successfully.");

});