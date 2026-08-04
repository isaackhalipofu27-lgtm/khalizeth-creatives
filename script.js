// ================= LOADER FIX =================
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if(loader){
        loader.style.display = "none";
    }
});

// ================= MOBILE MENU =================
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
});

// ================= TYPING EFFECT =================
const typingText = document.querySelector(".typing");

const words = ["Web Design", "Branding", "Creative Content", "Digital Experiences"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(isDeleting){
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentWord.substring(0, charIndex);

    if(!isDeleting && charIndex === currentWord.length){
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
    }

    if(isDeleting && charIndex === 0){
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();

// ================= SCROLL REVEAL =================
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });

}, { threshold: 0.15 });

document.querySelectorAll(".section, .card, .service-box").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

// ================= PORTFOLIO FILTER =================
function filterWork(category){

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        if(category === "all"){
            card.style.display = "block";
        } else {
            card.style.display = card.classList.contains(category)
                ? "block"
                : "none";
        }

    });

}

// ================= LIGHTBOX =================
const lightbox = document.querySelector(".lightbox");

document.querySelectorAll(".card img").forEach(img => {

    img.addEventListener("click", () => {
        lightbox.classList.add("show");
        lightbox.innerHTML = `<img src="${img.src}">`;
    });

});

lightbox.addEventListener("click", () => {
    lightbox.classList.remove("show");
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('nav a[href^="#"]').forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        if(target){
            target.scrollIntoView({ behavior:"smooth" });
        }

        menu.classList.remove("show");

    });

});
window.addEventListener("DOMContentLoaded", () => {

    const bg = document.querySelector(".bg-animation");

    if(bg){

        for(let i = 0; i < 12; i++){

            const span = document.createElement("span");

            span.style.left = Math.random() * 100 + "%";
            span.style.animationDuration = (5 + Math.random() * 10) + "s";
            span.style.width = span.style.height = (10 + Math.random() * 20) + "px";

            bg.appendChild(span);
        }

    }

});