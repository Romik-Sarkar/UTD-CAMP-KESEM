// Function to initialize mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Fetch the navbar content and insert it into its placeholder
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            navbarPlaceholder.innerHTML = data;
            // Initialize mobile menu after navbar is loaded
            initializeMobileMenu();
        }
    })
    .catch(error => {
        console.error('Error loading navbar:', error);
    });

// Fetch the footer content and insert it into its placeholder
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = data;
        }
    })
    .catch(error => {
        console.error('Error loading footer:', error);
    });

// Initialize mobile menu on page load as fallback (in case navbar is already loaded)
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all content is loaded
    setTimeout(initializeMobileMenu, 100);
});