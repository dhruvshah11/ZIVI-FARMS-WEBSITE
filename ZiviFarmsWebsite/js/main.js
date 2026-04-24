document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', revealOnScroll);

    // 2. Hardware-Software Loop Animation Logic
    const nodes = document.querySelectorAll('.node-rotator .loop-node');
    let activeNode = 0;

    const animateNodes = () => {
        nodes.forEach((node, index) => {
            if (index === activeNode) {
                node.style.borderColor = 'var(--color-primary)';
                node.style.boxShadow = '0 0 20px var(--color-primary-glow)';
                node.parentElement.style.zIndex = '10';
            } else {
                node.style.borderColor = 'var(--glass-border)';
                node.style.boxShadow = 'none';
                node.parentElement.style.zIndex = '5';
            }
        });

        activeNode = (activeNode + 1) % nodes.length;
    };

    // Animate loop nodes every 2 seconds
    setInterval(animateNodes, 2000);

    // 3. Smooth Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Navbar Blur on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'hsla(0, 0%, 100%, 0.95)';
            navbar.style.height = '70px';
        } else {
            navbar.style.background = 'hsla(0, 0%, 100%, 0.8)';
            navbar.style.height = '80px';
        }
    });

    // 5. Form Handling (Simple demo)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            // The mailto action will handle the submission, 
            // but we can add a simple feedback here.
            console.log('Transmission initiated...');
            // alert('Your request is being transmitted via your mail client.');
        });
    }

    // 6. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});
