// Efectos especiales y partículas
class SpecialEffects {
    constructor() {
        this.heartsRain = document.querySelector('.hearts-rain');
        this.sparkles = document.querySelector('.sparkles');
        this.floatingHearts = document.querySelector('.floating-hearts');
        this.floatingTexts = document.querySelector('.floating-texts');
        this.init();
    }

    init() {
        this.startHeartsRain();
        this.createSparkles();
        this.createFloatingTexts();
    }

    // Lluvia constante de corazones
    startHeartsRain() {
        setInterval(() => {
            this.createRainHeart();
        }, 300);
    }

    createRainHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = this.getRandomHeart();
        heart.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 20 + 15}px;
            pointer-events: none;
            z-index: 2;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: float ${Math.random() * 10 + 10}s linear forwards;
        `;
        this.heartsRain.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 15000);
    }

    getRandomHeart() {
        const hearts = ['❤️', '💖', '💕', '💗', '💓', '💔', '💘', '💝', '💞', '🧡', '💛', '💚', '💙', '💜'];
        return hearts[Math.floor(Math.random() * hearts.length)];
    }

    // Crear brillos aleatorios
    createSparkles() {
        setInterval(() => {
            this.createSparkle();
        }, 500);
    }

    createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation-delay: ${Math.random() * 2}s;
        `;
        this.sparkles.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }

    // Textos flotantes románticos
    createFloatingTexts() {
        const texts = [
            "Te Amo", "Eres mi todo", "Perdóname", "Mi corazón es tuyo",
            "Eres hermosa", "No puedo sin ti", "Mi princesa", "Para siempre",
            "Eres perfecta", "Mi vida", "Mi amor", "Te necesito"
        ];

        setInterval(() => {
            this.createFloatingText(texts[Math.floor(Math.random() * texts.length)]);
        }, 4000);
    }

    createFloatingText(text) {
        const textElement = document.createElement('div');
        textElement.textContent = text;
        textElement.style.cssText = `
            position: fixed;
            bottom: 0;
            left: ${Math.random() * 100}vw;
            color: rgba(255, 255, 255, 0.7);
            font-size: ${Math.random() * 16 + 14}px;
            font-weight: bold;
            pointer-events: none;
            z-index: 2;
            text-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
            animation: textFloat ${Math.random() * 10 + 8}s ease-out forwards;
            white-space: nowrap;
        `;
        this.floatingTexts.appendChild(textElement);

        setTimeout(() => {
            textElement.remove();
        }, 12000);
    }

    // Efecto de explosión de corazones
    createHeartExplosion(x, y, count = 30) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = this.getRandomHeart();
                heart.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    font-size: ${Math.random() * 25 + 15}px;
                    pointer-events: none;
                    z-index: 100;
                    animation: 
                        heartExplosion ${Math.random() * 2 + 1}s ease-out forwards,
                        heartFade ${Math.random() * 2 + 1}s ease-out forwards;
                `;

                // Dirección aleatoria
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 200 + 100;
                heart.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
                heart.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);

                document.body.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 50);
        }
    }

    // Efecto de confeti
    createConfetti(x, y, count = 100) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    pointer-events: none;
                    z-index: 100;
                    animation: confettiFall ${Math.random() * 3 + 2}s ease-out forwards;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    transform: rotate(${Math.random() * 360}deg);
                `;

                // Dirección aleatoria
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 300 + 100;
                confetti.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
                confetti.style.setProperty('--end-y', `${Math.sin(angle) * distance + 200}px`);

                document.body.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 20);
        }
    }
}

// CSS para efectos adicionales
const additionalStyles = `
@keyframes heartExplosion {
    0% {
        transform: translate(0, 0) scale(0) rotate(0deg);
    }
    100% {
        transform: translate(var(--end-x), var(--end-y)) scale(1) rotate(360deg);
    }
}

@keyframes heartFade {
    0%, 70% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@keyframes confettiFall {
    0% {
        transform: translate(0, 0) rotate(0deg);
    }
    100% {
        transform: translate(var(--end-x), var(--end-y)) rotate(720deg);
    }
}
`;

// Añadir estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Inicializar efectos
document.addEventListener('DOMContentLoaded', () => {
    window.specialEffects = new SpecialEffects();
});