// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the mobile menu functionality
    initMobileMenu();
    
    // Initialize the project slider
    initProjectSlider();
    
    // Initialize the testimonial slider
    initTestimonialSlider();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize popup functionality
    initPopup();
    
    // Read More button functionality
    initReadMore();
    
    // Initialize Newsletter form
    initNewsletterForm();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a navigation link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Project Slider Functionality
function initProjectSlider() {
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    if (!slides.length) return;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and active dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Previous slide button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            showSlide(currentSlide);
        });
    }
    
    // Next slide button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
    }
    
    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            currentSlide = slideIndex;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide change
    setInterval(function() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }, 5000);
}

// Testimonial Slider Functionality
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    
    if (!testimonials.length) return;
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current testimonial and active dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const testimonialIndex = parseInt(this.getAttribute('data-index'));
            currentTestimonial = testimonialIndex;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto testimonial change
    setInterval(function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 7000);
}

// Form Validation Functionality
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Reset previous error messages
        resetErrors();
        
        // Validate inputs
        let valid = true;
        
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            valid = false;
        }
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            valid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            valid = false;
        }
        
        if (subjectInput.value.trim() === '') {
            showError(subjectInput, 'Subject is required');
            valid = false;
        }
        
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            valid = false;
        }
        
        // If form is valid, show success message
        if (valid) {
            // In a real application, you would send the form data to the server here
            // For this demo, we'll just show a success message
            showPopup();
            contactForm.reset();
        }
    });
    
    // Function to display error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        input.classList.add('error');
        errorMessage.textContent = message;
    }
    
    // Function to reset all error messages
    function resetErrors() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        const errorMessages = contactForm.querySelectorAll('.error-message');
        
        inputs.forEach(input => {
            input.classList.remove('error');
        });
        
        errorMessages.forEach(message => {
            message.textContent = '';
        });
    }
    
    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Popup Functionality
function initPopup() {
    const popup = document.getElementById('popup');
    const closePopup = document.querySelector('.close-popup');
    
    if (!popup || !closePopup) return;
    
    // Close popup when clicking the close button
    closePopup.addEventListener('click', function() {
        popup.classList.remove('show');
    });
    
    // Close popup when clicking outside the popup content
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.classList.remove('show');
        }
    });
}

// Function to show popup
function showPopup() {
    const popup = document.getElementById('popup');
    
    if (popup) {
        popup.classList.add('show');
    }
}

// Read More Button Functionality
function initReadMore() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, you might load more content or expand a collapsed section
            // For this demo, we'll show an alert
            alert('More content about our company would be displayed here!');
        });
    }
}

// Newsletter Form Functionality
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() === '') {
                alert('Please enter your email address');
                return;
            }
            
            // In a real application, you would send the email to the server here
            // For this demo, we'll just show a success message
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href') === ('#' + current)) {
            link.classList.add('active');
        }
    });
});

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});
window.onload = () => {
  if (localStorage.getItem("theme") === "dark") { document.body.classList.add("dark-mode"); }
};

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the DOM elements
    const logo = document.getElementById('logo');
    const modal = document.getElementById('welcomeModal');
    const closeBtn = document.getElementById('closeModal');

    // Function to open the modal
    function openModal() {
        modal.style.display = 'flex';
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Event listeners
    logo.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close the modal when pressing the Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});


