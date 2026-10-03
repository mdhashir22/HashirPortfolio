document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("matrixCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;


    /* ========================================
       MATRIX SETTINGS
       ======================================== */

    const characters =
        "01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\$#@*+=ASP.NETCOREMVC";

    let fontSize = 15;

    let columns = 0;
    let drops = [];

    let canvasWidth = 0;
    let canvasHeight = 0;

    let animationFrameId = null;

    let lastFrameTime = 0;

    const frameInterval = 45;


    /* ========================================
       RESPONSIVE FONT SIZE
       ======================================== */

    function getFontSize() {

        const width = window.innerWidth;

        if (width <= 480) {
            return 12;
        }

        if (width <= 768) {
            return 13;
        }

        if (width <= 1200) {
            return 14;
        }

        return 15;
    }


    /* ========================================
       CANVAS RESIZE
       ======================================== */

    function resizeCanvas() {

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;

        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;

        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        fontSize = getFontSize();

        columns = Math.ceil(canvasWidth / fontSize);

        drops = Array.from(
            { length: columns },
            () => Math.floor(Math.random() * -60)
        );

        /* Clear after resize */

        ctx.fillStyle = "#020403";

        ctx.fillRect(
            0,
            0,
            canvasWidth,
            canvasHeight
        );
    }


    /* ========================================
       DRAW MATRIX
       ======================================== */

    function drawMatrix() {

        ctx.fillStyle = "rgba(2, 4, 3, 0.075)";

        ctx.fillRect(
            0,
            0,
            canvasWidth,
            canvasHeight
        );


        ctx.font = `${fontSize}px "Courier New", monospace`;

        ctx.textBaseline = "top";


        for (let i = 0; i < drops.length; i++) {

            const randomIndex =
                Math.floor(Math.random() * characters.length);

            const character = characters[randomIndex];

            const x = i * fontSize;

            const y = drops[i] * fontSize;


            /* Slight variation in brightness */

            const brightCharacter = Math.random() > 0.96;

            ctx.fillStyle = brightCharacter
                ? "#b8ffc4"
                : "#39ff5a";


            ctx.fillText(
                character,
                x,
                y
            );


            /*
                Random reset creates different
                stream lengths
            */

            if (
                y > canvasHeight &&
                Math.random() > 0.975
            ) {

                drops[i] =
                    Math.floor(Math.random() * -20);
            }

            drops[i]++;
        }
    }


    /* ========================================
       ANIMATION LOOP
       ======================================== */

    function animate(currentTime) {

        animationFrameId =
            requestAnimationFrame(animate);


        const elapsed =
            currentTime - lastFrameTime;


        if (elapsed < frameInterval) {
            return;
        }


        lastFrameTime =
            currentTime - (elapsed % frameInterval);


        drawMatrix();
    }


    /* ========================================
       RESIZE PERFORMANCE
       ======================================== */

    let resizeTimer;


    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            resizeCanvas();

        }, 150);

    });


    /* ========================================
       TAB PERFORMANCE
       ======================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                if (animationFrameId) {

                    cancelAnimationFrame(
                        animationFrameId
                    );

                    animationFrameId = null;
                }

            } else {

                lastFrameTime = 0;

                animationFrameId =
                    requestAnimationFrame(animate);
            }
        }
    );


    /* ========================================
       START
       ======================================== */

    resizeCanvas();

    animationFrameId =
        requestAnimationFrame(animate);

});
/* =========================================================
   HERO TYPING EFFECT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const typingElement =
        document.getElementById("typingText");

    if (!typingElement) return;


    const roles = [
        "ASP.NET Core Developer",
        "C# Developer",
        "MVC Developer",
        "Full Stack Web Developer"
    ];


    let roleIndex = 0;
    let characterIndex = 0;

    let deleting = false;


    function typeRole() {

        const currentRole =
            roles[roleIndex];


        if (!deleting) {

            characterIndex++;

            typingElement.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex ===
                currentRole.length
            ) {

                deleting = true;

                setTimeout(
                    typeRole,
                    1700
                );

                return;
            }

        } else {

            characterIndex--;

            typingElement.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );


            if (characterIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1)
                    % roles.length;
            }
        }


        const speed =
            deleting ? 45 : 80;


        setTimeout(
            typeRole,
            speed
        );

    }


    typeRole();

});

/* =========================================================
SAFE SCROLL REVEAL ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
       JS successfully load hone ke baad hi
       animation system activate hoga.
    */

    document.documentElement.classList.add("reveal-ready");


    const revealElements =
        document.querySelectorAll("[data-reveal]");


    /*
       Agar browser IntersectionObserver support
       nahi karta to content visible hi rahega.
    */

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("reveal-visible");
        });

        return;
    }


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        /*
                           Sirf first time animate hoga.
                           Wapas scroll karne par repeat nahi.
                        */

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -45px 0px"
            }
        );


    revealElements.forEach(element => {

        /*
           Jo elements page load par already viewport
           mein hain unko unnecessarily hide nahi karna.
        */

        const rect =
            element.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.92) {

            element.classList.add(
                "reveal-visible"
            );

        } else {

            revealObserver.observe(
                element
            );
        }

    });

});
/* =========================================================
   NAVBAR ACTIVE SECTION / SCROLL SPY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navLinks =
        document.querySelectorAll(".nav-link-custom[href^='#']");

    if (!navLinks.length) return;


    /* -----------------------------------------
       Get sections connected to navbar links
       ----------------------------------------- */

    const sections = [];

    navLinks.forEach(link => {

        const sectionId =
            link.getAttribute("href");

        if (!sectionId || sectionId === "#") return;

        const section =
            document.querySelector(sectionId);

        if (section) {
            sections.push({
                section: section,
                link: link
            });
        }

    });


    if (!sections.length) return;


    /* -----------------------------------------
       Set active navbar item
       ----------------------------------------- */

    function setActiveLink(activeLink) {

        navLinks.forEach(link => {
            link.classList.remove("active");
        });

        if (activeLink) {
            activeLink.classList.add("active");
        }

    }


    /* -----------------------------------------
       Detect current section while scrolling
       ----------------------------------------- */

    function updateActiveSection() {

        /*
           Navbar height + small offset.
           This creates a detection line below navbar.
        */

        const header =
            document.getElementById("siteHeader");

        const headerHeight =
            header ? header.offsetHeight : 70;

        const scrollPosition =
            window.scrollY + headerHeight + 120;


        let currentLink =
            sections[0].link;


        sections.forEach(item => {

            if (
                scrollPosition >=
                item.section.offsetTop
            ) {
                currentLink = item.link;
            }

        });


        /*
           When user reaches very bottom,
           force last navbar section active.
        */

        const reachedBottom =
            window.innerHeight +
            window.scrollY >=
            document.documentElement.scrollHeight - 5;


        if (reachedBottom) {
            currentLink =
                sections[sections.length - 1].link;
        }


        setActiveLink(currentLink);
    }


    /* -----------------------------------------
       Navbar click
       ----------------------------------------- */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            setActiveLink(link);

        });

    });


    /* -----------------------------------------
       Optimized scroll listener
       ----------------------------------------- */

    let ticking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(() => {

                    updateActiveSection();

                    ticking = false;

                });

                ticking = true;
            }

        },
        {
            passive: true
        }
    );


    /* -----------------------------------------
       Resize
       ----------------------------------------- */

    window.addEventListener(
        "resize",
        updateActiveSection
    );


    /* -----------------------------------------
       Initial state
       ----------------------------------------- */

    updateActiveSection();

});

/* =========================================================
   MOBILE / TABLET NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton =
        document.getElementById("mobileMenuBtn");

    const navMenu =
        document.getElementById("navMenu");

    if (!menuButton || !navMenu) return;


    function openMenu() {

        navMenu.classList.add("mobile-open");
        menuButton.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        menuButton.setAttribute(
            "aria-label",
            "Close navigation"
        );
    }


    function closeMenu() {

        navMenu.classList.remove("mobile-open");
        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation"
        );
    }


    menuButton.addEventListener("click", (event) => {

        event.stopPropagation();

        if (navMenu.classList.contains("mobile-open")) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* Close after clicking navigation link */
    navMenu
        .querySelectorAll(".nav-link-custom")
        .forEach(link => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


    /* Close when clicking outside */
    document.addEventListener("click", (event) => {

        if (
            !navMenu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            closeMenu();
        }

    });


    /* Desktop par resize hone par reset */
    window.addEventListener("resize", () => {

        if (window.innerWidth > 991) {
            closeMenu();
        }

    });

});