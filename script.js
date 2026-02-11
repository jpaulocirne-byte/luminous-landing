// ===================================
// Smooth Scroll & Navigation
// ===================================
document.querySelectorAll('a[href^="#"]:not(.btn-interesse)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
});

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe product cards
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create WhatsApp message
    // eslint-disable-next-line
    const whatsappMessage = `Olá! Meu nome é ${name}.%0A%0AEmail: ${email}%0A%0AMensagem: ${message}`;
    const whatsappNumber = '558499710385'; // Substitua pelo número real
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Show success message
    alert('Obrigada pelo contato! Você será redirecionada para o WhatsApp.');

    // Reset form
    contactForm.reset();
});

// ===================================
// Product Interest Buttons - Função Global Simples
// ===================================
function abrirWhatsApp(button) {
    try {
        const productCard = button.closest('.product-card');
        if (productCard) {
            const productName = productCard.querySelector('h3').textContent.trim();
            const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse no produto *${productName}*.\n\nPoderia me dar mais informações?`);
            const whatsappNumber = '558499710385';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

            window.open(whatsappURL, '_blank');
        }
    } catch (error) {
        console.error('Erro ao abrir WhatsApp:', error);
        alert('Erro ao abrir WhatsApp. Por favor, tente novamente.');
    }
}

// ===================================
// Parallax Effect on Hero
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.floating-card');

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===================================
// Add hover effect to stats
// ===================================
document.querySelectorAll('.stat').forEach(stat => {
    stat.addEventListener('mouseenter', () => {
        stat.style.transform = 'scale(1.05)';
        stat.style.transition = 'transform 0.3s ease';
    });

    stat.addEventListener('mouseleave', () => {
        stat.style.transform = 'scale(1)';
    });
});

// ===================================
// Animated Counter for Stats
// ===================================
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;

            // Extract number from text (e.g., "500+" -> 500)
            const number = parseInt(text.replace(/\D/g, ''));

            if (!isNaN(number)) {
                statNumber.textContent = '0';
                setTimeout(() => {
                    animateCounter(statNumber, number);
                    // Add back the suffix if it exists
                    if (text.includes('+')) {
                        setTimeout(() => {
                            statNumber.textContent = number + '+';
                        }, 2000);
                    } else if (text.includes('%')) {
                        setTimeout(() => {
                            statNumber.textContent = number + '%';
                        }, 2000);
                    }
                }, 200);
            }

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// Mobile Menu Toggle (for future implementation)
// ===================================
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        display: none;
        font-size: 1.5rem;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--color-text-primary);
    `;

    // Add mobile menu button on small screens
    if (window.innerWidth <= 968) {
        document.querySelector('.navbar .container').appendChild(menuButton);
        menuButton.style.display = 'block';

        menuButton.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
    }
};

// Initialize on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

console.log('🕯️ Luminous Velas Aromáticas - Landing Page carregada com sucesso!');
