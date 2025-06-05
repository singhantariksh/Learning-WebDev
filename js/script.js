document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.add('dark-theme');
            if (!savedTheme) {
                localStorage.setItem('theme', 'dark');
            }
        }

        themeToggle.addEventListener('click', function () {
            if (document.documentElement.classList.contains('dark-theme')) {
                document.documentElement.classList.remove('dark-theme');
                document.documentElement.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else if (document.documentElement.classList.contains('light-theme')) {
                document.documentElement.classList.remove('light-theme');
                document.documentElement.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('light-theme');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.documentElement.classList.add('dark-theme');
                    localStorage.setItem('theme', 'dark');
                }
            }
        });
    }

    // Scroll to top functionality
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (scrollToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });

        scrollToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smart Navbar functionality
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('top');
    } else {
        navbar.classList.add('top');
        navbar.classList.remove('scrolled');
    }
    });
    window.dispatchEvent(new Event('scroll'));

    // Gender select functionality
    const genderSelect = document.getElementById('gender');
    const otherInputContainer = document.getElementById('otherInputContainer');
    if (genderSelect && otherInputContainer) {
        genderSelect.addEventListener('change', function () {
            if (this.value === 'other') {
                otherInputContainer.style.display = 'block';
            } else {
                otherInputContainer.style.display = 'none';
                const otherInput = document.getElementById('other');
                if (otherInput) {
                    otherInput.value = '';
                }
            }
        });
    }

    // Section visibility on scroll
    const sections = document.querySelectorAll('section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {threshold: 0.2});

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Last updated date
    const lastUpdated = document.getElementById('last-updated');
    if (lastUpdated) {
        const updatedDate = new Date(document.lastModified);
        lastUpdated.textContent = `Last updated on: ${updatedDate.toLocaleDateString()}`;
    }

    // Calculate and display reading time
    if (document.getElementById('article-content')) {
        calculateReadingTime();
    }

    // if (document.querySelector('.web-dev-guide')) {
    //     calculateReadingTime('.web-dev-guide', '.dev-guide-reading-time');
    // }
});

function calculateReadingTime(contentSelector = '#article-content', displaySelector = '#reading-time') {
    const articleContent = document.querySelector(contentSelector);
    const readingTimeElement = document.querySelector(displaySelector);

    if (articleContent && readingTimeElement) {
        const text = articleContent.innerText;
        const wordCount = text.split(/\s+/).length;

        // Calculate total seconds based on average reading speed (238 words per minute)
        const totalSeconds = Math.round((wordCount / 238) * 60);

        // Extract minutes and seconds
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // Format as M:SS with padding for seconds if needed
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        readingTimeElement.innerText = `${wordCount} Words & ${formattedTime} est. read`;
    }
}