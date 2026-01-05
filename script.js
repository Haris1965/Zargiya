document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const petals = document.querySelectorAll('.petal');
    const rose = document.querySelector('.rose');
    const updateBtn = document.getElementById('update-btn');
    const customMessage = document.getElementById('custom-message');
    const messageText = document.getElementById('message-text');
    const colorButtons = document.querySelectorAll('.color-btn');
    const bloomBtn = document.getElementById('bloom-btn');
    const resetBtn = document.getElementById('reset-btn');
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
        animateCounter(lovePercent, 0, 100, 1500, '%');
    }

    // Counter animation function
    function animateCounter(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Update message function
    function updateMessage() {
        const newMessage = customMessage.value.trim();
        if (newMessage) {
            messageText.innerHTML = newMessage.replace(/\n/g, '<br>');
            
            // Add visual feedback
            const messageContent = document.querySelector('.message-content');
            messageContent.style.transform = 'scale(1.05)';
            setTimeout(() => {
                messageContent.style.transform = 'scale(1)';
            }, 300);
            
            // Add heart animation
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = '2rem';
            heart.style.animation = 'floatUp 2s ease-out forwards';
            messageContent.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
            
            // Create float animation if not exists
            if (!document.getElementById('float-animation')) {
                const style = document.createElement('style');
                style.id = 'float-animation';
                style.textContent = `
                    @keyframes floatUp {
                        0% { opacity: 1; transform: translateY(0) scale(1); }
                        100% { opacity: 0; transform: translateY(-100px) scale(0.5); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
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
        distanceKm.textContent = '3841';
        lovePercent.textContent = '100%';
    }

    // Event Listeners
    updateBtn.addEventListener('click', updateMessage);
    
    bloomBtn.addEventListener('click', bloomRose);
    
    resetBtn.addEventListener('click', resetRose);
    
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            changeRoseColor(this.getAttribute('data-color'));
        });
    });

    // Auto-bloom on page load
    setTimeout(bloomRose, 1000);

    // Add floating hearts randomly
    function createFloatingHearts() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.opacity = '0.7';
        heart.style.zIndex = '-1';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `floatHeart ${Math.random() * 5 + 5}s linear forwards`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    // Create floating hearts animation
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
    setInterval(createFloatingHearts, 2000);
    createFloatingHearts();

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
    });

    // Initialize with a bloomed rose
    bloomRose();
});