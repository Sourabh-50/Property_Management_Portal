// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) with proper configuration
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            disable: window.innerWidth < 768 // Disable on mobile
        });
    }

    // Initialize tooltips with proper error handling
    try {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
                trigger: 'hover focus'
            });
        });
    } catch (error) {
        console.warn('Tooltips initialization failed:', error);
    }

    // Search functionality with debounce and error handling
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        let searchTimeout;
        const searchInput = searchForm.querySelector('input[type="search"]');
        
        const performSearch = (term) => {
            try {
                // Implement search functionality here
                console.log('Searching for:', term);
                // You can add AJAX call to search API here
            } catch (error) {
                console.error('Search failed:', error);
            }
        };

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    performSearch(searchTerm);
                }
            }, 300);
        });

        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }

    // Add keyboard navigation for dropdowns with error handling
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        try {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                toggle.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (!dropdown.contains(e.target)) {
                        menu.classList.remove('show');
                    }
                });
            }
        } catch (error) {
            console.warn('Dropdown initialization failed:', error);
        }
    });

    // Add smooth scrolling for anchor links with error handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            try {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (error) {
                console.warn('Smooth scrolling failed:', error);
            }
        });
    });

    // Add focus styles for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Back to Top Button with error handling
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        try {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });

            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        } catch (error) {
            console.warn('Back to top button initialization failed:', error);
        }
    }

    // Counter Animation with error handling
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        try {
            const speed = 200;

            function animateCounter(counter) {
                try {
                    const target = +counter.innerText.replace(/,/g, '');
                    const count = +counter.innerText.replace(/,/g, '');
                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment).toLocaleString();
                        setTimeout(() => animateCounter(counter), 1);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                } catch (error) {
                    console.warn('Counter animation failed:', error);
                }
            }

            // Intersection Observer for counter animation
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        } catch (error) {
            console.warn('Counter initialization failed:', error);
        }
    }

    // Newsletter Form Submission with error handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        try {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                if (email) {
                    // Show loading state
                    const submitButton = this.querySelector('button[type="submit"]');
                    const originalText = submitButton.innerHTML;
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Subscribing...';

                    // Simulate API call
                    setTimeout(() => {
                        try {
                            // Reset button state
                            submitButton.disabled = false;
                            submitButton.innerHTML = originalText;
                            
                            // Show success message
                            const successMessage = document.createElement('div');
                            successMessage.className = 'alert alert-success mt-3';
                            successMessage.textContent = 'Thank you for subscribing!';
                            this.appendChild(successMessage);

                            // Clear input
                            emailInput.value = '';

                            // Remove success message after 3 seconds
                            setTimeout(() => {
                                successMessage.remove();
                            }, 3000);
                        } catch (error) {
                            console.error('Newsletter submission failed:', error);
                            submitButton.disabled = false;
                            submitButton.innerHTML = originalText;
                        }
                    }, 1500);
                }
            });
        } catch (error) {
            console.warn('Newsletter form initialization failed:', error);
        }
    }

    // FAQ Accordion Animation with error handling
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        try {
            accordionItems.forEach(item => {
                const button = item.querySelector('.accordion-button');
                const content = item.querySelector('.accordion-collapse');

                if (button && content) {
                    button.addEventListener('click', function() {
                        try {
                            if (content.classList.contains('show')) {
                                content.style.maxHeight = content.scrollHeight + 'px';
                                setTimeout(() => {
                                    content.style.maxHeight = '0';
                                }, 10);
                            } else {
                                content.style.maxHeight = content.scrollHeight + 'px';
                                setTimeout(() => {
                                    content.style.maxHeight = 'none';
                                }, 300);
                            }
                        } catch (error) {
                            console.warn('Accordion animation failed:', error);
                        }
                    });
                }
            });
        } catch (error) {
            console.warn('Accordion initialization failed:', error);
        }
    }

    // Add hover effect to cards with error handling
    const cards = document.querySelectorAll('.card, .service-card, .news-card, .stat-card');
    if (cards.length > 0) {
        try {
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                });

                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        } catch (error) {
            console.warn('Card hover effects initialization failed:', error);
        }
    }

    // Session timeout warning with error handling
    let timeoutWarning;
    const sessionTimeout = 30 * 60 * 1000; // 30 minutes
    const warningTime = 5 * 60 * 1000; // 5 minutes

    function resetSessionTimer() {
        clearTimeout(timeoutWarning);
        timeoutWarning = setTimeout(showTimeoutWarning, sessionTimeout - warningTime);
    }

    function showTimeoutWarning() {
        try {
            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Session Timeout Warning</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p>Your session will expire in 5 minutes. Would you like to extend your session?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Logout</button>
                            <button type="button" class="btn btn-primary" id="extendSession">Extend Session</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();

            document.getElementById('extendSession').addEventListener('click', function() {
                resetSessionTimer();
                modalInstance.hide();
                setTimeout(() => modal.remove(), 300);
            });

            modal.addEventListener('hidden.bs.modal', function() {
                window.location.href = '/logout';
            });
        } catch (error) {
            console.error('Session timeout warning failed:', error);
            // Fallback to basic alert
            if (confirm('Your session will expire in 5 minutes. Would you like to extend your session?')) {
                resetSessionTimer();
            } else {
                window.location.href = '/logout';
            }
        }
    }

    // Reset timer on user activity
    ['mousemove', 'keydown', 'click', 'scroll'].forEach(event => {
        document.addEventListener(event, resetSessionTimer);
    });

    // Initialize session timer
    resetSessionTimer();

    // Add loading states to buttons with error handling
    document.querySelectorAll('button[type="submit"]').forEach(button => {
        try {
            button.addEventListener('click', function() {
                this.disabled = true;
                this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
            });
        } catch (error) {
            console.warn('Button loading state initialization failed:', error);
        }
    });

    // Handle form validation with error handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        try {
            form.addEventListener('submit', function(e) {
                if (!this.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                this.classList.add('was-validated');
            });
        } catch (error) {
            console.warn('Form validation initialization failed:', error);
        }
    });

    // Add ARIA live regions for dynamic content
    try {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.classList.add('visually-hidden');
        document.body.appendChild(liveRegion);

        // Function to announce changes to screen readers
        window.announceToScreenReader = function(message) {
            liveRegion.textContent = message;
        };
    } catch (error) {
        console.warn('ARIA live region initialization failed:', error);
    }

    // Property Registration Form Handling
    const propertyRegistrationForm = document.getElementById('propertyRegistrationForm');
    const propertyRegistrationModal = document.getElementById('propertyRegistrationModal');

    if (propertyRegistrationForm) {
        propertyRegistrationForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            // Show loading state on submit button
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';

            try {
                // Gather form data
                const formData = new FormData();
                formData.append('ownerName', document.getElementById('ownerName').value);
                formData.append('contactNumber', document.getElementById('contactNumber').value);
                formData.append('email', document.getElementById('email').value);
                formData.append('idProof', document.getElementById('idProof').value);
                formData.append('propertyType', document.getElementById('propertyType').value);
                formData.append('propertyArea', document.getElementById('propertyArea').value);
                formData.append('propertyAddress', document.getElementById('propertyAddress').value);
                formData.append('city', document.getElementById('city').value);
                formData.append('state', document.getElementById('state').value);
                formData.append('pincode', document.getElementById('pincode').value);

                // Handle file uploads
                const propertyDeed = document.getElementById('propertyDeed').files[0];
                const taxReceipt = document.getElementById('taxReceipt').files[0];
                if (propertyDeed) formData.append('propertyDeed', propertyDeed);
                if (taxReceipt) formData.append('taxReceipt', taxReceipt);

                // Send data to backend
                const response = await fetch('/api/property-registration', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Registration failed');
                }

                const result = await response.json();

                // Show success message
                const successAlert = document.createElement('div');
                successAlert.className = 'alert alert-success alert-dismissible fade show';
                successAlert.innerHTML = `
                    <strong>Success!</strong> Your property registration has been submitted successfully. Registration ID: ${result.registrationId}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;

                // Insert alert before form
                propertyRegistrationForm.insertBefore(successAlert, propertyRegistrationForm.firstChild);

                // Reset form and validation state
                propertyRegistrationForm.reset();
                propertyRegistrationForm.classList.remove('was-validated');

                // Close modal after 2 seconds
                setTimeout(() => {
                    const modalInstance = bootstrap.Modal.getInstance(propertyRegistrationModal);
                    modalInstance.hide();
                }, 2000);

            } catch (error) {
                // Show error message
                const errorAlert = document.createElement('div');
                errorAlert.className = 'alert alert-danger alert-dismissible fade show';
                errorAlert.innerHTML = `
                    <strong>Error!</strong> Failed to submit registration. Please try again.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;
                propertyRegistrationForm.insertBefore(errorAlert, propertyRegistrationForm.firstChild);
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }

    // File input validation
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const maxSize = 5 * 1024 * 1024; // 5MB
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            
            if (this.files.length > 0) {
                const file = this.files[0];
                if (file.size > maxSize) {
                    this.value = '';
                    alert('File size should not exceed 5MB');
                    return;
                }
                if (!allowedTypes.includes(file.type)) {
                    this.value = '';
                    alert('Only PDF, JPEG, and PNG files are allowed');
                    return;
                }
            }
        });
    });

    // Phone number validation
    const phoneInput = document.getElementById('contactNumber');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+\-\s]/g, '');
        });
    }

    // PIN code validation
    const pincodeInput = document.getElementById('pincode');
    if (pincodeInput) {
        pincodeInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length > 6) {
                this.value = this.value.slice(0, 6);
            }
        });
    }
});

// Translation Configuration
const translationConfig = {
    apiKey: '--------------------------------', // hidden because of privacy reasons 
    supportedLanguages: {
        'en': 'English',
        'hi': 'हिंदी',
        'mr': 'मराठी'
    },
    defaultLanguage: 'en'
};

// Initialize translation functionality
function initializeTranslation() {
    // Load user's preferred language from localStorage if available
    const savedLanguage = localStorage.getItem('preferredLanguage') || translationConfig.defaultLanguage;
    changeLanguage(savedLanguage);

    // Add event listeners to language selector
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const langCode = e.target.getAttribute('data-lang');
            changeLanguage(langCode);
        });
    });
}

// Change language function
async function changeLanguage(targetLang) {
    try {
        if (targetLang === translationConfig.defaultLanguage) {
            resetToOriginalContent();
            return;
        }

        const elements = document.querySelectorAll('[data-translate]');
        
        for (const element of elements) {
            const originalText = element.getAttribute('data-original-text') || element.textContent;
            if (!element.getAttribute('data-original-text')) {
                element.setAttribute('data-original-text', originalText);
            }

            const translatedText = await translateText(originalText, targetLang);
            element.textContent = translatedText;
        }

        // Save preference
        localStorage.setItem('preferredLanguage', targetLang);
        
        // Update UI to show active language
        updateLanguageUI(targetLang);

    } catch (error) {
        console.error('Translation error:', error);
        alert('Translation failed. Please try again later.');
    }
}

// Reset content to original language
function resetToOriginalContent() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const originalText = element.getAttribute('data-original-text');
        if (originalText) {
            element.textContent = originalText;
        }
    });
}

// Update UI to show active language
function updateLanguageUI(activeLang) {
    document.querySelectorAll('.language-option').forEach(option => {
        const langCode = option.getAttribute('data-lang');
        option.classList.toggle('active', langCode === activeLang);
    });
}

// Translate text using Google Cloud Translation API
async function translateText(text, targetLang) {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${translationConfig.apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            target: targetLang
        })
    });

    if (!response.ok) {
        throw new Error('Translation request failed');
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTranslation);

// Export functions for use in other files

window.changeLanguage = changeLanguage; 
