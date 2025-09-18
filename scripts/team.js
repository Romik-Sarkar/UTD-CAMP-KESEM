// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Select all the sidebar links and content sections
    const navLinks = document.querySelectorAll('.nav-link-sidebar');
    const sections = document.querySelectorAll('.leadership-tier[id], .committee-section[id]');

    // Set an offset to account for the sticky navigation bar height
    const topOffset = 150; 

    // This function will be called whenever the user scrolls
    const highlightNavLinkOnScroll = () => {
        let currentSectionId = '';

        // Loop through each section to see which one is currently in view
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            // Check if the section's top edge is at or above the offset
            // and its bottom edge is below the offset. This means it's the current section.
            if (sectionTop <= topOffset) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Now, update the 'active' class on the sidebar links
        navLinks.forEach(link => {
            // First, remove the active class from all links
            link.classList.remove('active');
            
            // Then, add the active class to the link that corresponds to the current section
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    // Add an event listener to the window to call our function on every scroll event
    window.addEventListener('scroll', highlightNavLinkOnScroll);

    // Also, call the function once on page load to set the initial state
    highlightNavLinkOnScroll();
});