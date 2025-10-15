        let slideIndex = 1;
        
        // Initialize slideshow
        showSlide(slideIndex);

        // Auto-advance slideshow every 5 seconds
        setInterval(() => {
            slideIndex++;
            const slides = document.querySelectorAll('.slide');
            if (slideIndex > slides.length) {
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