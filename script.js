
/* =========================================================
   KHALIZETH CREATIVES
   MAIN JAVASCRIPT
========================================================= */


/* LOADER */
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    if (loader) {
        setTimeout(() => loader.classList.add("hide"), 600);
    }
});


/* MOBILE MENU */
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("show");
    });

    document.querySelectorAll("#menu a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("show");
        });
    });
}


/* NAVBAR SCROLL */
const navbar = document.getElementById("navbar");

function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();


/* ACTIVE SECTION + ORANGE NAVIGATION DOT */
const navLinks = [...document.querySelectorAll('#menu a[href^="#"]')];

const sections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

function updateActiveSection() {
    if (!sections.length) return;

    const navHeight = navbar ? navbar.offsetHeight : 82;
    const position = window.scrollY + navHeight + 100;

    let activeSection = sections[0];

    sections.forEach(section => {
        if (section.offsetTop <= position) {
            activeSection = section;
        }
    });

    navLinks.forEach(link => {
        const isActive =
            link.getAttribute("href") === `#${activeSection.id}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("resize", updateActiveSection);
window.addEventListener("load", updateActiveSection);


/* SCROLL REVEAL */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("show"));
}


/* HERO IMAGE ROTATION */
const heroImage = document.getElementById("heroImage");
const imageNumber = document.getElementById("imageNumber");

const heroImages = [
    "images/hero1.jpg",
    "images/hero2.jpg",
    "images/hero3.jpg"
];

let currentImage = 0;

if (heroImage && heroImages.length > 1) {
    setInterval(() => {
        heroImage.classList.add("fade");

        setTimeout(() => {
            currentImage = (currentImage + 1) % heroImages.length;

            heroImage.onload = () => {
                heroImage.classList.remove("fade");
            };

            heroImage.onerror = () => {
                heroImage.classList.remove("fade");
                console.warn("Hero image could not be loaded:", heroImage.src);
            };

            heroImage.src = heroImages[currentImage];

            if (imageNumber) {
                imageNumber.textContent =
                    String(currentImage + 1).padStart(2, "0");
            }
        }, 400);
    }, 5000);
}


/* 3D HERO MOUSE INTERACTION */
const heroVisual = document.querySelector(".hero-visual");
const heroImageWrap = document.getElementById("heroImageWrap");

if (heroVisual && heroImageWrap) {
    heroVisual.addEventListener("mousemove", event => {
        const rect = heroVisual.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((event.clientX - rect.left - centerX) / centerX) * 8;
        const rotateX = ((centerY - (event.clientY - rect.top)) / centerY) * 8;

        heroImageWrap.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroVisual.addEventListener("mouseleave", () => {
        heroImageWrap.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
}


/* PORTFOLIO FILTER */
const filters = document.querySelectorAll(".filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        filters.forEach(button => button.classList.remove("active"));
        filter.classList.add("active");

        const selected = filter.dataset.filter;

        portfolioItems.forEach(item => {
            const matches =
                selected === "all" || item.classList.contains(selected);

            if (matches) {
                item.style.display = "block";

                requestAnimationFrame(() => {
                    item.style.opacity = "1";
                });
            } else {
                item.style.opacity = "0";

                setTimeout(() => {
                    if (item.style.opacity === "0") {
                        item.style.display = "none";
                    }
                }, 250);
            }
        });
    });
});


/* BUTTON RIPPLE EFFECT */
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", event => {
        const ripple = document.createElement("span");

        ripple.className = "button-ripple";
        ripple.style.left =
            `${event.clientX - button.getBoundingClientRect().left}px`;
        ripple.style.top =
            `${event.clientY - button.getBoundingClientRect().top}px`;

        button.appendChild(ripple);

        ripple.animate(
            [
                { transform: "scale(0)", opacity: 0.5 },
                { transform: "scale(20)", opacity: 0 }
            ],
            { duration: 500, easing: "ease-out" }
        );

        setTimeout(() => ripple.remove(), 500);
    });
});


/* IMAGE ERROR HANDLING */
document.querySelectorAll("img").forEach(image => {
    image.addEventListener("error", () => {
        console.warn("Image could not be loaded:", image.src);
    });
});