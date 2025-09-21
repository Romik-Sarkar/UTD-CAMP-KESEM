// Function to initialize mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    console.log('Initializing mobile menu...'); // Debug log
    console.log('Hamburger:', hamburger); // Debug log
    console.log('Nav menu:', navMenu); // Debug log

    if (hamburger && navMenu) {
        // Remove any existing event listeners to prevent duplicates
        hamburger.removeEventListener('click', toggleMobileMenu);
        hamburger.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        console.log('Mobile menu initialized successfully!'); // Debug log
    } else {
        console.log('Mobile menu elements not found yet...'); // Debug log
    }
}

// Toggle function for mobile menu
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Close mobile menu function
function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Function to wait for navbar to load and then initialize
function waitForNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder && navbarPlaceholder.innerHTML.trim() !== '') {
        initializeMobileMenu();
    } else {
        // Check again in 50ms
        setTimeout(waitForNavbar, 50);
    }
}

// Fetch the navbar content and insert it into its placeholder
fetch('navbar.html')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            navbarPlaceholder.innerHTML = data;
            // Initialize mobile menu after navbar is loaded
            setTimeout(initializeMobileMenu, 100); // Small delay to ensure DOM is ready
        }
    })
    .catch(error => {
        console.error('Error loading navbar:', error);
        // Try to initialize anyway in case navbar is already there
        initializeMobileMenu();
    });

// Fetch the footer content and insert it into its placeholder
fetch('footer.html')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = data;
        }
    })
    .catch(error => {
        console.error('Error loading footer:', error);
    });

// Initialize mobile menu on page load as fallback
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit longer and try multiple times
    setTimeout(initializeMobileMenu, 200);
    setTimeout(initializeMobileMenu, 500);
    setTimeout(initializeMobileMenu, 1000);
    
    // Also try waiting for navbar specifically
    waitForNavbar();
});

// Handle window resize to ensure proper mobile menu behavior
window.addEventListener('resize', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});