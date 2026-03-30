// Slider Functionality
let slideIndex = 1;
let slideTimer;
let startX = 0;
let endX = 0;
const SWIPE_THRESHOLD = 50;
let progressInterval;

// Initialize slider
function initSlider() {
    showSlides(slideIndex);
    startProgress();
    // Auto-advance slides every 5 seconds
    slideTimer = setInterval(() => {
        plusSlides(1);
    }, 5000);
    
    // Add touch events for swipe
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', handleTouchStart, false);
        sliderContainer.addEventListener('touchmove', handleTouchMove, false);
        sliderContainer.addEventListener('touchend', handleTouchEnd, false);
    }
}

function startProgress() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.animation = 'none';
        progressBar.offsetHeight; /* trigger reflow */
        progressBar.style.animation = 'progressBar 5s linear infinite';
    }
}

// Next/previous controls
function changeSlide(n) {
    clearInterval(slideTimer);
    plusSlides(n);
    slideTimer = setInterval(() => {
        plusSlides(1);
    }, 5000);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
    startProgress();
}

// Thumbnail image controls
function currentSlide(n) {
    clearInterval(slideTimer);
    showSlides(slideIndex = n);
    startProgress();
    slideTimer = setInterval(() => {
        plusSlides(1);
    }, 5000);
}

function showSlides(n) {
    let i;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return;
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    // Remove all directional classes
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active', 'prev', 'next');
    }
    
    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // Set directional classes for carousel effect
    const currentSlide = slides[slideIndex - 1];
    currentSlide.classList.add('active');
    
    // Add prev/next classes for context
    if (slideIndex > 1) {
        slides[slideIndex - 2].classList.add('prev');
    } else {
        slides[slides.length - 1].classList.add('prev');
    }
    
    if (slideIndex < slides.length) {
        slides[slideIndex].classList.add('next');
    } else {
        slides[0].classList.add('next');
    }
    
    // Activate dot
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Pause slider on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideTimer = setInterval(() => {
            plusSlides(1);
        }, 5000);
    });
}

// Touch/Swipe handlers for mobile
function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    endX = e.touches[0].clientX;
}

function handleTouchEnd() {
    if (startX - endX > SWIPE_THRESHOLD) {
        // Swipe left - next slide
        plusSlides(1);
        resetTimer();
    } else if (endX - startX > SWIPE_THRESHOLD) {
        // Swipe right - previous slide
        plusSlides(-1);
        resetTimer();
    }
}

function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
        plusSlides(1);
    }, 5000);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and stat items
document.querySelectorAll('.card, .stat-item, .option, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation to donation container
const donationContainer = document.querySelector('.donation-container');
if (donationContainer) {
    donationContainer.style.opacity = '0';
    donationContainer.style.transform = 'scale(0.9)';
    donationContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(donationContainer);
}

// QR code zoom effect on hover
const qrCodeImg = document.querySelector('.qr-code img');
if (qrCodeImg) {
    qrCodeImg.addEventListener('mouseenter', () => {
        qrCodeImg.style.transform = 'scale(1.05)';
        qrCodeImg.style.transition = 'transform 0.3s ease';
    });
    
    qrCodeImg.addEventListener('mouseleave', () => {
        qrCodeImg.style.transform = 'scale(1)';
    });
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--primary-color)';
                } else {
                    link.style.color = 'var(--text-color)';
                }
            });
        }
    });
});

// Phone number click handler for mobile devices
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Not a mobile device, show confirmation
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            if (confirm(`Would you like to call ${phoneNumber}?`)) {
                window.location.href = `tel:${phoneNumber}`;
            }
        }
    });
});

// WhatsApp click handler
document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.stopPropagation();
        // Let the link open normally in a new tab
    });
});

// Email click handler
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.stopPropagation();
        // Let the mail client open normally
    });
});

// Social media links handler
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.stopPropagation();
        // Let the social media link open normally in a new tab
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});

// Console welcome message
console.log('%c Welcome to Annapurna Food Trust! ', 
    'background: #1e3a8a; color: white; font-size: 16px; padding: 10px;', 
    'Join us in fighting hunger and feeding hope!'
);

// Loading Screen Handler - 2 Second Unique Animation
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Set minimum 2 seconds display time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Logo Click Handler - Scroll to top
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Impact Counter Animation - Special Feature
let counterAnimated = false;

function animateCounter() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200; // The higher the slower
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, '');
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment).toLocaleString();
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
}

// Trigger counter animation when in view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counterAnimated = true;
            animateCounter();
        }
    });
}, { threshold: 0.3 });

const impactCounter = document.querySelector('.impact-counter');
if (impactCounter) {
    counterObserver.observe(impactCounter);
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});
