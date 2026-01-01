// 1. Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease Out Quart
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// 2. Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// HERO SECTION: Staggered Text Reveal
const revealElements = document.querySelectorAll(".reveal-text");
gsap.to(revealElements, {
    y: 0,
    opacity: 1,
    duration: 1.5,
    stagger: 0.3,
    ease: "power4.out",
    delay: 0.5
});

// HERO FADE OUT on Scroll
gsap.to(".hero", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    opacity: 0,
    y: -50
});

// NARRATIVE SECTION: Image Parallax
gsap.utils.toArray(".photo").forEach((photo, i) => {
    gsap.from(photo, {
        scrollTrigger: {
            trigger: photo,
            start: "top 90%",
            end: "top 20%",
            scrub: 1
        },
        y: 100,
        opacity: 0
    });
});

// HORIZONTAL SCROLL (The Chaos)
const race = document.querySelector(".horizontal-scroll");
const pinWrap = document.querySelector(".pin-wrap");

gsap.to(".pin-wrap", {
    scrollTrigger: {
        trigger: ".horizontal-scroll",
        start: "top top",
        end: () => "+=" + (pinWrap.scrollWidth - window.innerWidth), // Dynamic scroll length based on content
        pin: true,
        scrub: 1,
    },
    x: () => -(pinWrap.scrollWidth - window.innerWidth),
    ease: "none"
});

// COLLAGE: Parallax Floating Images
gsap.utils.toArray(".floating-img").forEach((img, i) => {
    const speed = i % 2 === 0 ? 50 : -50; // Alternate directions
    gsap.to(img, {
        scrollTrigger: {
            trigger: ".collage",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        y: speed * 2 // Move up or down based on scroll
    });
});

// MEMORY DUMP: Grid Reveal (For the extra 20-30 photos)
gsap.utils.toArray(".memory-item").forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 70%",
            scrub: 1
        },
        y: 50,
        opacity: 0
    });
});

// GRATITUDE: Spotlight Reveal
gsap.from(".gratitude blockquote", {
    scrollTrigger: {
        trigger: ".gratitude",
        start: "top 70%",
        end: "top 40%",
        scrub: 1
    },
    opacity: 0,
    scale: 0.9,
    filter: "blur(10px)"
});