// LOADING
const preloader = document.querySelector('.preloader');
window.addEventListener('load', () => {
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// SCROLL PROGRESS
window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollTop;
    const heightTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTotal / heightTotal) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
});

/* 
   REMOVED CUSTOM CURSOR LISTENER FOR 'BIASA AJA' FEEL.
   We now rely on default browser cursor.
*/

// SCROLL REVEAL (Optimized)
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// PORTFOLIO FILTERS
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// 3D TILT EFFECT
const tiltElements = document.querySelectorAll('.project-card, .hype-card');
tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// PRICING TABS LOGIC
const tabBtns = document.querySelectorAll('.tab-btn');
const pricingContents = document.querySelectorAll('.pricing-content');

if (tabBtns) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            pricingContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });

            const dataTab = btn.getAttribute('data-tab');
            const targetId = dataTab + '-pricing';
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
                targetContent.classList.add('active');
            }
        });
    });
}

// MOBILE MENU & SMOOTH SCROLL
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isFlex = nav.style.display === 'flex';
        nav.style.display = isFlex ? 'none' : 'flex';

        if (!isFlex) {
            nav.style.position = 'absolute';
            nav.style.top = '80px';
            nav.style.left = '50%';
            nav.style.transform = 'translateX(-50%)';
            nav.style.width = '90%';
            nav.style.background = 'white';
            nav.style.flexDirection = 'column';
            nav.style.padding = '20px';
            nav.style.borderRadius = '20px';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            nav.style.textAlign = 'center';
            nav.style.zIndex = '1000';
        }
    });
}

// SMOOTH SCROLL FOR ANCHOR LINKS (PREMIUM FEEL)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Offset for fixed header
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Close mobile menu if open
            if (window.innerWidth <= 1024 && nav) {
                nav.style.display = 'none';
            }
        }
    });
});

// === VIDEO MODAL LOGIC ===
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.close-modal');

if (modal && modalVideo && closeModal) {
    // Open Modal logic
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoSrc = card.getAttribute('data-video-src');
            if (videoSrc) {
                modalVideo.src = videoSrc;
                modal.classList.add('active');
                modalVideo.play().catch(e => console.log('Autoplay blocked:', e));
            }
        });
    });

    // Close Modal Logic
    const closeVideoModal = () => {
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = ""; // Clear src to stop buffering
    };

    closeModal.addEventListener('click', closeVideoModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

// === AI CHAT LOGIC ===
const aiWindow = document.getElementById('ai-chat-window');
const aiMessages = document.getElementById('ai-messages');
const aiInput = document.getElementById('ai-input');

function toggleAIChat() {
    if (aiWindow) {
        aiWindow.classList.toggle('active');
        if (aiWindow.classList.contains('active')) {
            aiInput.focus();
        }
    }
}

function handleEnter(e) {
    if (e.key === 'Enter') {
        sendAI();
    }
}

async function sendAI() {
    const message = aiInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    aiInput.value = '';

    // Typing indicator
    const typingId = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message bot typing';
    typingDiv.id = typingId;
    typingDiv.innerHTML = `<div class="message-content">...</div>`;
    aiMessages.appendChild(typingDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;

    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();

        // Remove typing
        document.getElementById(typingId).remove();

        if (data.reply) {
            addMessage(data.reply, 'bot');
        } else {
            addMessage("Maaf, sepertinya sedang ada gangguan koneksi. / Sorry, there seems to be a connection issue.", 'bot');
        }
    } catch (error) {
        document.getElementById(typingId).remove();
        addMessage("AI sedang offline untuk sementara. / AI is currently offline.", 'bot');
    }
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-message ${sender}`;
    msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
    aiMessages.appendChild(msgDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

function quickChat(theme) {
    aiInput.value = `I want to know more about ${theme}`;
    sendAI();
}

// === COMMUNITY HUB LOGIC ===
const commentForm = document.getElementById('comment-form');
const commentContainer = document.getElementById('comment-container');

function handleCommentSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('comment-name').value;
    const text = document.getElementById('comment-text').value;
    const isAdmin = document.getElementById('admin-code')?.value === 'ZSTUDIO25';

    const card = document.createElement('div');
    card.className = 'comment-card';
    card.style.background = '#fff';
    card.style.padding = '20px';
    card.style.borderRadius = '20px';
    card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
    card.style.border = isAdmin ? '2px solid var(--fg)' : '1px solid rgba(0,0,0,0.05)';

    card.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <strong style="color: var(--fg);">${name} ${isAdmin ? '👑' : ''}</strong>
            <span style="font-size: 0.8rem; color: #9ca3af;">Just now</span>
        </div>
        <p style="color: #4b5563;">${text}</p>
    `;

    commentContainer.prepend(card);
    commentForm.reset();
}

// === RANDOM DECORATION ANIMATION (JS Controlled Randomness) ===
const stars = document.querySelectorAll('.decor-star');
if (stars.length > 0) {
    setInterval(() => {
        stars.forEach(star => {
            const randomX = (Math.random() - 0.5) * 50;
            const randomY = (Math.random() - 0.5) * 50;
            const randomScale = 0.8 + Math.random() * 0.4;
            star.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
            star.style.transition = 'transform 3s ease-in-out';
        });
    }, 3000);
}
