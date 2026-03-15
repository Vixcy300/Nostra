// ============================================
// CONTACT PAGE - Form handling
// ============================================

// --- Get the form elements ---
var contactForm = document.querySelector('.contact-form form');
var newsletterForm = document.querySelector('.newsletter__form');

// --- Contact form: when user clicks Submit ---
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Stop form from reloading the page

        var nameInput = document.getElementById('contact-name');
        var emailInput = document.getElementById('contact-email');
        var messageInput = document.getElementById('contact-message');

        // Show a thank you message (simple alert for now)
        alert('Thank you! We have received your message.');

        // Clear the form fields
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    });
}

// --- Newsletter form: when user clicks Subscribe ---
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var emailInput = document.getElementById('newsletter-email');

        alert('Thanks for subscribing!');

        emailInput.value = '';
    });
}
