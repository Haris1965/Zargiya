document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const petals = document.querySelectorAll('.petal');
    const rose = document.querySelector('.rose');
    const colorButtons = document.querySelectorAll('.color-btn');
    const bloomBtn = document.getElementById('bloom-btn');
    const resetBtn = document.getElementById('reset-btn');
    const loveBtn = document.getElementById('love-btn');
    const sparkles = document.querySelectorAll('.sparkle');
    const distanceKm = document.getElementById('distance-km');
    const lovePercent = document.getElementById('love-percent');

    // Bloom animation
    function bloomRose() {
        // Reset first
        petals.forEach(petal => {
            petal.style.opacity = '0';
            petal.style.transform = 'scale(0) rotate(var(--rotation))';
        });

        // Animate each petal with delay
        petals.forEach((petal, index) => {
            setTimeout(() => {
                const rotation = (index * 45) + 'deg';
                petal.style.setProperty('--rotation', rotation);
                petal.style.opacity = '1';
                petal.style.transform = `scale(1) rotate(${rotation})`;
                petal.style.transition = 'all 1s ease';
            }, index * 100);
        });

        // Animate sparkles
        sparkles.forEach((sparkle, index) => {
            setTimeout(() => {
                sparkle.style.opacity = '1';
            }, 500 + index * 200);
        });

        // Add gentle sway animation
        rose.style.animation = 'sway 3s ease-in-out infinite';
        
        // Create CSS for sway animation if not exists
        if (!document.getElementById('sway-animation')) {
            const style = document.createElement('style');
            style.id = 'sway-animation';
            style.textContent = `
                @keyframes sway {
                    0%, 100% { transform: scale(0.8) rotate(0deg); }
                    50% { transform: scale(0.8) rotate(2deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Update counters with animation
        animateCounter(distanceKm, 0, 3841, 2000);
        createHeartRain();
    }

    // Send love effect
    function sendLove() {
        createHeartExplosion();
        
        // Add message effect
        const messageContent = document.querySelector('.message-content');
        messageContent.style.boxShadow = '0 0 30px rgba(255, 107, 139, 0.5)';
        setTimeout(() => {
            messageContent.style.boxShadow = 'none';
        }, 1000);
        
        // Update love counter
        lovePercent.textContent = "24/7";
        lovePercent.style.color = '#ff6b8b';
        lovePercent.style.transform = 'scale(1.2)';
        setTimeout(() => {
            lovePercent.style.transform = 'scale(1)';
        }, 300);
    }

    // Create heart explosion effect
    function createHeartExplosion() {
        for (let i = 0; i < 50; i++) {
            createFloatingHeart(true);
        }
    }

    // Create heart rain effect
    function createHeartRain() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createFloatingHeart(false), i * 100);
        }
    }

    // Create floating heart
    function createFloatingHeart(isExplosion) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        
        if (isExplosion) {
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.opacity = '1';
            
            // Explosion effect
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 5 + 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let x = 50;
            let y = 50;
            const animate = () => {
                x += vx;
                y += vy;
                heart.style.left = x + '%';
                heart.style.top = y + '%';
                heart.style.opacity = parseFloat(heart.style.opacity) - 0.02;
                
                if (parseFloat(heart.style.opacity) > 0) {
                    requestAnimationFrame(animate);
                } else {
                    heart.remove();
                }
            };
            requestAnimationFrame(animate);
        } else {
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.opacity = '0.7';
            heart.style.animation = `floatHeart ${Math.random() * 5 + 5}s linear forwards`;
        }
        
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        heart.style.userSelect = 'none';
        
        document.body.appendChild(heart);
        
        if (!isExplosion) {
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }
    }

    // Counter animation function
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Change rose color
    function changeRoseColor(color) {
        petals.forEach(petal => {
            petal.style.background = `linear-gradient(45deg, ${color}, ${lightenColor(color, 30)})`;
        });
        
        // Update active button
        colorButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Add color transition effect
        rose.style.filter = 'brightness(1.2)';
        setTimeout(() => {
            rose.style.filter = 'brightness(1)';
        }, 300);
    }

    // Helper function to lighten color
    function lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }

    // Reset rose to initial state
    function resetRose() {
        petals.forEach(petal => {
            petal.style.opacity = '0';
            petal.style.transform = 'scale(0) rotate(var(--rotation))';
            petal.style.transition = 'none';
        });
        
        sparkles.forEach(sparkle => {
            sparkle.style.opacity = '0';
        });
        
        rose.style.animation = 'none';
        
        // Reset to red rose
        changeRoseColor('#ff6b8b');
        colorButtons.forEach(btn => btn.classList.remove('active'));
        document.getElementById('red-rose').classList.add('active');
        
        // Reset counters
        distanceKm.textContent = '3,841';
        lovePercent.textContent = '24/7';
        lovePercent.style.color = '';
    }

    // Event Listeners
    bloomBtn.addEventListener('click', bloomRose);
    resetBtn.addEventListener('click', resetRose);
    loveBtn.addEventListener('click', sendLove);
    
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            changeRoseColor(this.getAttribute('data-color'));
        });
    });

    // Auto-bloom on page load
    setTimeout(bloomRose, 1000);

    // Create floating hearts animation CSS
    if (!document.getElementById('heart-animation')) {
        const style = document.createElement('style');
        style.id = 'heart-animation';
        style.textContent = `
            @keyframes floatHeart {
                0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Create floating hearts periodically
    setInterval(() => createFloatingHeart(false), 3000);

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'b') {
            event.preventDefault();
            bloomRose();
        }
        if (event.ctrlKey && event.key === 'r') {
            event.preventDefault();
            resetRose();
        }
        if (event.ctrlKey && event.key === 'l') {
            event.preventDefault();
            sendLove();
        }
    });

    // Add click effect on message
    const messageContent = document.querySelector('.message-content');
    messageContent.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        createHeartExplosion();
    });

    // Initialize with a bloomed rose
    bloomRose();
});
