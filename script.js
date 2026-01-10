// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Skip portfolio cards on mobile
        if (entry.target.classList.contains('project-card') && window.innerWidth <= 768) {
            return;
        }
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Check if mobile and handle portfolio cards accordingly
function handlePortfolioCards() {
    const projectCards = document.querySelectorAll('.project-card');
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        projectCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
            observer.observe(card);
        });
    } else {
        // On mobile, ensure cards are immediately visible without animation
        projectCards.forEach(card => {
            // Remove fade-in class immediately and prevent it from being added
            card.classList.remove('fade-in');
            card.classList.remove('visible');
            // Use setAttribute to force inline styles that override everything
            card.setAttribute('style', 'opacity: 1 !important; transform: none !important; visibility: visible !important; display: block !important; transition: none !important;');
            
            // Also ensure images are visible with inline styles
            const img = card.querySelector('img');
            if (img) {
                img.setAttribute('style', 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100% !important; height: auto !important;');
            }
        });
        
        // Also ensure portfolio section is visible
        const portfolioSection = document.querySelector('.portfolio');
        if (portfolioSection) {
            portfolioSection.setAttribute('style', 'display: block !important; visibility: visible !important; opacity: 1 !important;');
        }
        
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            portfolioGrid.setAttribute('style', 'display: grid !important; visibility: visible !important; opacity: 1 !important;');
        }
    }
}

// Run immediately and on resize
handlePortfolioCards();
window.addEventListener('resize', handlePortfolioCards);

// Observe service categories
const serviceCategories = document.querySelectorAll('.service-category, .experience-card');
serviceCategories.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    item.classList.add('fade-in');
    observer.observe(item);
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);


// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Add click animation to buttons
const buttons = document.querySelectorAll('.cta-button, .hire-button');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Image Lightbox Modal
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');
const projectImages = document.querySelectorAll('.project-image img');

// Open lightbox when clicking on project images
projectImages.forEach(img => {
    img.addEventListener('click', function() {
        lightboxImage.src = this.src;
        lightboxImage.alt = this.alt;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close lightbox when clicking the close button
lightboxClose.addEventListener('click', () => {
    closeLightbox();
});

// Close lightbox when clicking outside the image
lightboxModal.addEventListener('click', function(e) {
    if (e.target === lightboxModal) {
        closeLightbox();
    }
});

// Close lightbox with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for any initial animations
    document.body.classList.add('loaded');
    
    // Highlight first navigation item
    if (window.pageYOffset < 100) {
        navLinks[0].classList.add('active');
    }
    
    // On mobile, ensure portfolio is visible immediately and stays visible
    if (window.innerWidth <= 768) {
        const portfolioCards = document.querySelectorAll('.project-card');
        portfolioCards.forEach(card => {
            // Remove fade-in class and prevent it from being re-added
            card.classList.remove('fade-in');
            card.classList.remove('visible');
            // Use setAttribute to force inline styles
            card.setAttribute('style', 'opacity: 1 !important; transform: none !important; visibility: visible !important; display: block !important; transition: none !important;');
            
            const img = card.querySelector('img');
            if (img) {
                img.setAttribute('style', 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100% !important; height: auto !important;');
            }
        });
        
        // Continuously check and fix if fade-in gets added back
        setInterval(() => {
            if (window.innerWidth <= 768) {
                portfolioCards.forEach(card => {
                    if (card.classList.contains('fade-in')) {
                        card.classList.remove('fade-in');
                        card.setAttribute('style', 'opacity: 1 !important; transform: none !important; visibility: visible !important; display: block !important; transition: none !important;');
                    }
                    const img = card.querySelector('img');
                    if (img && img.style.opacity !== '1') {
                        img.setAttribute('style', 'opacity: 1 !important; visibility: visible !important; display: block !important;');
                    }
                });
            }
        }, 100);
    }
});

