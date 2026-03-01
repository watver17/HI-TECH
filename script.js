// Image upload functionality for hero image
const imageInput = document.getElementById('imageInput');
const braceletImage = document.getElementById('braceletImage');

if (imageInput) {
    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                braceletImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Package details data
const packageDetails = {
    basic: {
        name: 'BASIC Package – "Starter Health"',
        suitable: 'Suitable for: First-time buyers',
        includes: [
            '• 1 Health Bracelet',
            '• All Basic features (step counter, heart rate monitor, sleep tracking) + calorie tracking + sports mode',
            '• User Manual',
            '• Standard warranty',
            '• Magnetic USB Charger'
        ],
        price: 129,
        priceText: 'RM129 (Affordable price)'
    },
    plus: {
        name: 'PLUS Package – "Active Lifestyle"',
        suitable: 'Suitable for: Fitness-focused customers',
        includes: [
            '• 1 Health Bracelet',
            '• All basic features (Steps counter, heart rate monitor, sleep tracking) + calorie tracking + sports mode',
            '• Free extra strap (different color)',
            '• Premium box packaging',
            '• 1 year warranty',
            '• User Manual',
            '• Magnetic USB Charger'
        ],
        price: 159,
        priceText: 'RM159 (Best Value ⭐)'
    },
    premium: {
        name: 'PREMIUM Package – "Total Wellness"',
        suitable: 'Suitable for: Serious health tracking users',
        includes: [
            '• 1 Health Bracelet (Full feature version)',
            '• All basic features (Steps counter, heart rate monitor, sleep tracking) + calorie tracking + sports mode + blood oxygen (SpO2)',
            '• 2 extra straps',
            '• Gift box packaging',
            '• 18 month warranty',
            '• Screen protector',
            '• User Manual',
            '• Magnetic USB Charger',

        ],
        price: 179,
        priceText: 'RM179 (Premium)'
    }
};

// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Package selection functionality
const packageSelect = document.getElementById('package');
const colorSelect = document.getElementById('color');

packageSelect.addEventListener('change', function() {
    const selectedPackage = this.value;
    
    // Remove existing package details display if any
    const existingDetails = document.querySelector('.package-details');
    if (existingDetails) {
        existingDetails.remove();
    }
    
    // Remove existing price display if any
    const existingPrice = document.querySelector('.selected-price');
    if (existingPrice) {
        existingPrice.remove();
    }
    
    if (selectedPackage && packageDetails[selectedPackage]) {
        const pkg = packageDetails[selectedPackage];
        
        // Create package details element
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'package-details';
        detailsDiv.innerHTML = `
            <div class="package-info">
                <h4>${pkg.name}</h4>
                <p class="package-suitable">${pkg.suitable}</p>
                <ul class="package-includes">
                    ${pkg.includes.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <p class="package-price">💰RM ${pkg.price}</p>
            </div>
        `;
        
        // Insert after the package select
        packageSelect.parentNode.parentNode.insertBefore(detailsDiv, packageSelect.parentNode.nextSibling);
        
        // Update submit button text
        const submitBtn = document.querySelector('.submit-button');
        submitBtn.textContent = `Reserve with ${pkg.name}`;

        // Show price breakdown
        const priceBreakdown = document.getElementById('price-breakdown');
        if (priceBreakdown) {
            priceBreakdown.style.display = 'block';
            document.getElementById('original-price').textContent = pkg.price;
            document.getElementById('discount-amount').textContent = '0';
            document.getElementById('total-price').textContent = pkg.price;
        }
    }
});

// Promo code input handler
const promoCodeInput = document.getElementById('promo-code');
promoCodeInput.addEventListener('input', function() {
    const selectedPackage = packageSelect.value;
    if (selectedPackage && packageDetails[selectedPackage]) {
        const pkg = packageDetails[selectedPackage];
        const promoCode = this.value.trim();
        let discountAmount = 0;
        if (promoCode.toUpperCase() === 'SYOK10') {
            discountAmount = 15;
        }
        const priceBreakdown = document.getElementById('price-breakdown');
        if (priceBreakdown) {
            document.getElementById('original-price').textContent = pkg.price;
            document.getElementById('discount-amount').textContent = discountAmount;
            const totalPrice = pkg.price * (1 - discountAmount / 100);
            document.getElementById('total-price').textContent = totalPrice.toFixed(2);
        }
    }
});

// Interest level change handler - show/hide payment section
const interestRadios = document.querySelectorAll('input[name="interest"]');
const paymentSection = document.getElementById('payment-section');

interestRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'ready') {
            paymentSection.style.display = 'block';
            // Add required attributes to payment fields
            document.getElementById('card-name').required = true;
            document.getElementById('card-number').required = true;
            document.getElementById('expiry').required = true;
            document.getElementById('cvv').required = true;
            
            // Scroll to payment section
            setTimeout(() => {
                paymentSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        } else {
            paymentSection.style.display = 'none';
            // Remove required attributes from payment fields
            document.getElementById('card-name').required = false;
            document.getElementById('card-number').required = false;
            document.getElementById('expiry').required = false;
            document.getElementById('cvv').required = false;
        }
    });
});

// Form validation and submission
const form = document.getElementById('reservation-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const packageValue = document.getElementById('package').value;
    const color = document.getElementById('color').value;
    const interest = document.querySelector('input[name="interest"]:checked');
    const comments = document.getElementById('comments').value.trim();

    // Basic validation
    if (!name || !email || !packageValue) {
        alert('Please fill in all required fields (Name, Email, and Package).');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Get payment details if user is ready to buy
    let paymentDetails = null;
    let discountApplied = false;
    let discountAmount = 0;

    if (interest && interest.value === 'ready') {
        const promoCode = document.getElementById('promo-code').value.trim();
        const cardName = document.getElementById('card-name').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiry = document.getElementById('expiry').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (!cardName || !cardNumber || !expiry || !cvv) {
            alert('Please fill in all payment details.');
            return;
        }

        // Validate promotion code
        if (promoCode && promoCode.toUpperCase() === 'SYOK10') {
            discountApplied = true;
            discountAmount = 15; // 15% discount
        } else if (promoCode && promoCode.toUpperCase() !== 'SYOK10') {
            alert('Invalid promotion code. Please try again or leave blank.');
            return;
        }

        paymentDetails = {
            cardName,
            cardNumber: cardNumber.replace(/\s/g, '').slice(-4), // Only store last 4 digits
            expiry,
            cvv,
            promoCode: promoCode || null,
            discountApplied,
            discountAmount
        };
    }

    // Get package info
    const pkg = packageDetails[packageValue];

    // Simulate form submission
    console.log('Form submitted:', {
        name,
        email,
        phone,
        package: pkg ? pkg.name : '',
        color,
        interest: interest ? interest.value : '',
        payment: paymentDetails,
        comments
    });

    // Show appropriate success message
    if (interest && interest.value === 'ready') {
        successMessage.innerHTML = `
            <strong>🎉 Payment Successful!</strong><br><br>
            Thank you for your purchase of the <strong>${pkg.name}</strong>!<br>
            We'll send a confirmation email to <strong>${email}</strong> with delivery details.
        `;
    } else {
        successMessage.innerHTML = `
            Thank you for your interest in the <strong>${pkg.name}</strong>!<br>
            We'll contact you soon with more information about HealthBand Pro.
        `;
    }
    
    successMessage.style.display = 'block';
    form.reset();
    
    // Hide payment section after reset
    paymentSection.style.display = 'none';
    
    // Remove package details
    const existingDetails = document.querySelector('.package-details');
    if (existingDetails) {
        existingDetails.remove();
    }

    // Scroll to success message
    successMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    // Hide success message after 7 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 7000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and spec cards
document.querySelectorAll('.feature-card, .spec-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Floating animation for hero image
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
    heroImage.style.animation = 'floating 3s ease-in-out infinite';
}

// Add loading animation to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// Add hover effects to cards
document.querySelectorAll('.feature-card, .spec-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form input focus effects
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});
