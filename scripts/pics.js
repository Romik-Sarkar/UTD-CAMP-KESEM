
        let slideIndex = 1;
        
        // Initialize slideshow
        showSlide(slideIndex);

        // Auto-advance slideshow every 5 seconds
        setInterval(() => {
            slideIndex++;
            if (slideIndex > document.querySelectorAll('.slide').length) {
                slideIndex = 1;
            }
            showSlide(slideIndex);
        }, 5000);

        function changeSlide(n) {
            showSlide(slideIndex += n);
        }

        function currentSlide(n) {
            showSlide(slideIndex = n);
        }

        function showSlide(n) {
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.dot');
            
            if (n > slides.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slides.length; }
            
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show current slide
            if (slides[slideIndex - 1]) {
                slides[slideIndex - 1].classList.add('active');
                dots[slideIndex - 1].classList.add('active');
            }
        }

        // Mobile menu toggle functionality
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

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
\