document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
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

    const scrollToTopButton = document.getElementById('scroll-to-top');

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

    const genderSelect = document.getElementById('gender');
    const otherInputContainer = document.getElementById('otherInputContainer');

    genderSelect.addEventListener('change', function () {
        if (this.value === 'other') {
            otherInputContainer.style.display = 'block';
        } else {
            otherInputContainer.style.display = 'none';
            document.getElementById('other').value = '';
        }
    });
});

