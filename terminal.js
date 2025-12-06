/* ============================================
   PROJECT TERRA - CYBERPUNK TERMINAL SCRIPT
   ============================================ */

class TerraTerminal {
    constructor() {
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        this.setupTerminalAnimation();
        this.setupNavigationClock();
        this.setupMobileMenu();
        this.setupCounterAnimation();
        this.setupScrollAnimations();
        this.setupBinaryRain();
        this.setupFormValidation();
        this.setupButtons();
    }

    /* ============================================
       TERMINAL TYPING ANIMATION
       ============================================ */

    setupTerminalAnimation() {
        const terminalLine = document.getElementById('terminalLine');
        if (!terminalLine) return;

        const text = "INITIALIZING TERRA SYSTEM...";
        let index = 0;

        const typeCharacter = () => {
            if (index < text.length) {
                terminalLine.innerHTML = `<span style="color: #00f3ff; text-shadow: 0 0 10px #00f3ff;">${text.substring(0, index)}</span><span class="cursor">▌</span>`;
                index++;
                setTimeout(typeCharacter, 100);
            } else {
                terminalLine.innerHTML = `<span style="color: #00f3ff; text-shadow: 0 0 10px #00f3ff;">${text}</span><span class="cursor">▌</span>`;
            }
        };

        typeCharacter();
    }

    /* ============================================
       DIGITAL CLOCK IN NAVBAR
       ============================================ */

    setupNavigationClock() {
        const navClock = document.getElementById('navClock');
        if (!navClock) return;

        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            navClock.textContent = `${hours}:${minutes}:${seconds}`;
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    /* ============================================
       MOBILE HAMBURGER MENU
       ============================================ */

    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ============================================
       ANIMATED COUNTER FOR STATS
       ============================================ */

    setupCounterAnimation() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animatedElements.add(entry.target);
                    this.animateCounter(entry.target);
                }
            });
        }, observerOptions);

        // Observe all stat numbers
        document.querySelectorAll('[data-target]').forEach(element => {
            observer.observe(element);
        });

        // Observe impact numbers
        document.querySelectorAll('.impact-number[data-target]').forEach(element => {
            observer.observe(element);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        const isLarge = target > 10000;
        const increment = isLarge ? Math.ceil(target / 50) : Math.ceil(target / 50);

        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(target * progress);

            // Add commas for large numbers
            if (isLarge) {
                element.textContent = current.toLocaleString();
            } else {
                element.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                if (isLarge) {
                    element.textContent = target.toLocaleString();
                } else {
                    element.textContent = target;
                }
            }
        };

        updateCounter();
    }

    /* ============================================
       SCROLL TRIGGERED ANIMATIONS
       ============================================ */

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Add animation keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    /* ============================================
       BINARY RAIN EFFECT
       ============================================ */

    setupBinaryRain() {
        const binaryRain = document.getElementById('binaryRain');
        if (!binaryRain) return;

        const binaryChars = '01';
        const rainLines = 50;

        for (let i = 0; i < rainLines; i++) {
            const line = document.createElement('div');
            const randomString = Array.from({ length: 50 })
                .map(() => binaryChars[Math.floor(Math.random() * 2)])
                .join('');
            
            line.textContent = randomString;
            line.style.position = 'absolute';
            line.style.left = Math.random() * 100 + '%';
            line.style.top = Math.random() * -100 + '%';
            line.style.opacity = Math.random() * 0.5;
            line.style.animation = `binary-fall ${5 + Math.random() * 5}s linear infinite`;
            line.style.fontSize = '12px';
            line.style.lineHeight = '1.2';
            line.style.whiteSpace = 'pre';
            
            binaryRain.appendChild(line);
        }

        // Add keyframes for binary fall
        const style = document.createElement('style');
        style.textContent = `
            @keyframes binary-fall {
                to {
                    transform: translateY(100vh);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Also populate binary footer
        this.setupBinaryFooter();
    }

    setupBinaryFooter() {
        const binaryFooter = document.getElementById('binaryFooter');
        if (!binaryFooter) return;

        const binaryChars = '01';
        const footerText = Array.from({ length: 500 })
            .map(() => binaryChars[Math.floor(Math.random() * 2)])
            .join('');

        binaryFooter.textContent = footerText;
    }

    /* ============================================
       FORM VALIDATION & SUBMISSION
       ============================================ */

    setupFormValidation() {
        const submitBtn = document.getElementById('formSubmit');
        const formName = document.getElementById('formName');
        const formOrg = document.getElementById('formOrg');
        const formMsg = document.getElementById('formMsg');

        if (!submitBtn) return;

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const name = formName?.value.trim();
            const org = formOrg?.value.trim();
            const msg = formMsg?.value.trim();

            // Simple validation
            if (!name) {
                this.showTerminalAlert('ERROR: NAME REQUIRED');
                return;
            }
            if (!org) {
                this.showTerminalAlert('ERROR: ORGANIZATION REQUIRED');
                return;
            }
            if (!msg) {
                this.showTerminalAlert('ERROR: MESSAGE REQUIRED');
                return;
            }

            // Simulate form submission
            this.showTerminalAlert(`SUCCESS: TRANSMISSION RECEIVED FROM ${name.toUpperCase()}`);
            
            // Reset form
            setTimeout(() => {
                formName.value = '';
                formOrg.value = '';
                formMsg.value = '';
            }, 1000);
        });
    }

    showTerminalAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(10, 10, 15, 0.95);
            border: 2px solid #00f3ff;
            color: #00f3ff;
            padding: 2rem;
            border-radius: 4px;
            z-index: 10000;
            font-family: 'Orbitron', sans-serif;
            text-align: center;
            box-shadow: 0 0 30px rgba(0, 243, 255, 0.6);
            letter-spacing: 2px;
        `;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => alertDiv.remove(), 500);
        }, 2000);

        // Add fadeOut animation if not exists
        if (!document.querySelector('style:contains("fadeOut")')) {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeOut {
                    to {
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /* ============================================
       BUTTON INTERACTIONS
       ============================================ */

    setupButtons() {
        // CTA Buttons
        document.querySelectorAll('.btn-neon, .btn-profile, .btn-submit').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.createScanEffect(btn);
            });
        });

        // Profile buttons
        document.querySelectorAll('.btn-profile').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.team-card');
                const name = card.querySelector('.team-name').textContent;
                this.showTerminalAlert(`PROFILE ACCESSED: ${name}`);
            });
        });

        // CTA buttons in hero
        document.querySelectorAll('.cta-buttons .btn-neon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const text = btn.textContent;
                this.showTerminalAlert(`INITIATING: ${text}`);
            });
        });
    }

    createScanEffect(element) {
        const scan = document.createElement('div');
        scan.style.cssText = `
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.5), transparent);
            animation: scan 0.5s ease forwards;
            pointer-events: none;
        `;

        if (element.style.position === 'static') {
            element.style.position = 'relative';
        }

        element.appendChild(scan);
        setTimeout(() => scan.remove(), 500);
    }
}

/* ============================================
   SMOOTH SCROLL BEHAVIOR (FALLBACK)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize terminal
    new TerraTerminal();

    // Handle smooth scroll for browsers that don't support it natively
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scan effect animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scan {
            0% {
                left: -100%;
            }
            100% {
                left: 100%;
            }
        }

        /* CRT Monitor Scanlines (Optional) */
        .crt-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                rgba(0, 243, 255, 0.03),
                rgba(0, 243, 255, 0.03) 1px,
                transparent 1px,
                transparent 2px
            );
            pointer-events: none;
            z-index: 999;
            animation: scanlines 8s linear infinite;
        }

        @keyframes scanlines {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(10px);
            }
        }
    `;
    document.head.appendChild(style);
});

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Add glitch effect to elements on demand
function addGlitchEffect(element) {
    const original = element.textContent;
    const glitchChars = '!@#$%^&*';

    const glitch = () => {
        const chars = original.split('');
        const glitched = chars.map((char, i) => {
            return Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char;
        }).join('');
        element.textContent = glitched;
    };

    let glitchInterval = setInterval(glitch, 50);

    setTimeout(() => {
        clearInterval(glitchInterval);
        element.textContent = original;
    }, 200);
}

// Particle effect for clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('button, a, .interactive')) {
        createParticleEffect(e.clientX, e.clientY);
    }
});

function createParticleEffect(x, y) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 5px;
            height: 5px;
            background: #00f3ff;
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 10px #00f3ff;
            animation: particle-fly 1s ease-out forwards;
            z-index: 10000;
        `;

        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
    }
}

// Add particle animation keyframes
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle-fly {
        to {
            transform: translate(var(--tx), var(--ty));
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle responsive behavior
    }, 250);
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imgObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   ============================================ */

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Alt + Home to jump to top
    if (e.altKey && e.key === 'Home') {
        document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Alt + End to jump to footer
    if (e.altKey && e.key === 'End') {
        document.querySelector('.footer')?.scrollIntoView({ behavior: 'smooth' });
    }
});

console.log('%c TERRA SYSTEM ONLINE', 'color: #00f3ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00f3ff;');
console.log('%c Tracking And Environmental Real-Time Response Apparatus', 'color: #9d00ff; font-size: 14px; text-shadow: 0 0 5px #9d00ff;');
