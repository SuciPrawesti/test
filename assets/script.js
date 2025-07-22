// Navigation Setup
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");
const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenuBackdrop.classList.toggle("active");
    hamburger.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    hamburger.setAttribute("aria-expanded", navLinks.classList.contains("active"));
});

mobileMenuBackdrop.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenuBackdrop.classList.remove("active");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.setAttribute("aria-expanded", "false");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove("active");
            mobileMenuBackdrop.classList.remove("active");
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.setAttribute("aria-expanded", "false");
        }
    });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll <= 10) {
        navbar.classList.remove("scrolled");
    } else if (currentScroll > 50) {
        navbar.classList.add("scrolled");
    }
});

// Responsive adjustments
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove("active");
        mobileMenuBackdrop.classList.remove("active");
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        hamburger.setAttribute("aria-expanded", "false");
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute("href");
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = document.getElementById('navbar').offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without page jump
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        location.hash = targetId;
      }
    }
  });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Scroll Animation
const scrollElements = document.querySelectorAll('[data-scroll]');

const elementInView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
  );
};

const displayScrollElement = (element) => {
  element.classList.add('is-visible');
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el)) {
      displayScrollElement(el);
    }
  });
};

// Initialize scroll animation
window.addEventListener('load', () => {
  // Immediately show hero elements
  document.querySelectorAll('#hero [data-scroll]').forEach(el => {
    el.classList.add('is-visible');
  });
  
  // Check other elements
  handleScrollAnimation();
});

window.addEventListener('scroll', () => {
  handleScrollAnimation();
});