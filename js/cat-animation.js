// Animaciones del gatito
class CatAnimation {
    constructor() {
        this.cat = document.querySelector('.sad-cat');
        this.eyes = document.querySelectorAll('.eye');
        this.ears = document.querySelectorAll('.ear');
        this.paws = document.querySelectorAll('.paw');
        this.tears = document.querySelectorAll('.tear');
        this.init();
    }

    init() {
        this.addEventListeners();
        this.startRandomAnimations();
    }

    addEventListeners() {
        // El gatito mira al cursor
        document.addEventListener('mousemove', (e) => {
            this.followCursor(e);
        });

        // El gatito parpadea cuando se hace clic
        document.addEventListener('click', () => {
            this.blink();
        });

        // Efecto especial cuando el ratón pasa sobre el gatito
        this.cat.addEventListener('mouseenter', () => {
            this.cat.style.transform = 'scale(1.1)';
            this.showHearts();
        });

        this.cat.addEventListener('mouseleave', () => {
            this.cat.style.transform = 'scale(1)';
        });
    }

    followCursor(e) {
        const eyes = document.querySelectorAll('.eye');
        const catRect = this.cat.getBoundingClientRect();
        const catCenterX = catRect.left + catRect.width / 2;
        const catCenterY = catRect.top + catRect.height / 2;

        eyes.forEach(eye => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;

            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            const distance = Math.min(5, 
                Math.sqrt(Math.pow(e.clientX - eyeCenterX, 2) + Math.pow(e.clientY - eyeCenterY, 2)) / 50
            );

            const pupil = eye.querySelector('.pupil') || this.createPupil(eye);
            pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        });
    }

    createPupil(eye) {
        const pupil = document.createElement('div');
        pupil.className = 'pupil';
        pupil.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            top: 4px;
            left: 4px;
            transition: transform 0.1s ease;
        `;
        eye.appendChild(pupil);
        return pupil;
    }

    blink() {
        this.eyes.forEach(eye => {
            eye.style.animation = 'none';
            eye.offsetHeight; // Trigger reflow
            eye.style.animation = 'blink 4s infinite';
        });
    }

    startRandomAnimations() {
        // Movimiento aleatorio de orejas
        setInterval(() => {
            this.ears.forEach(ear => {
                ear.style.animation = 'none';
                ear.offsetHeight;
                ear.style.animation = 'earTwitch 3s ease-in-out infinite';
            });
        }, 5000);

        // Lágrimas intermitentes
        setInterval(() => {
            this.tears.forEach(tear => {
                tear.style.animation = 'none';
                tear.offsetHeight;
                tear.style.animation = 'cry 2s ease-in-out infinite';
            });
        }, 8000);

        // Movimiento de patas
        setInterval(() => {
            this.paws.forEach(paw => {
                paw.style.animation = 'none';
                paw.offsetHeight;
                paw.style.animation = 'pawMove 3s ease-in-out infinite';
            });
        }, 4000);
    }

    showHearts() {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createFloatingHeart();
            }, i * 300);
        }
    }

    createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
            position: absolute;
            font-size: 20px;
            pointer-events: none;
            z-index: 100;
            left: ${this.cat.offsetLeft + this.cat.offsetWidth / 2}px;
            top: ${this.cat.offsetTop}px;
            animation: float 2s ease-out forwards;
        `;
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2000);
    }

    // Cambiar a gatito feliz cuando lo perdonan
    makeHappy() {
        this.cat.style.animation = 'bounce 1s ease-in-out';
        this.tears.forEach(tear => tear.style.display = 'none');
        
        // Cambiar expresión
        const mouth = document.querySelector('.mouth');
        mouth.style.borderBottom = 'none';
        mouth.style.width = '25px';
        mouth.style.height = '15px';
        mouth.style.borderRadius = '50%';
        mouth.style.background = '#333';
        mouth.style.clipPath = 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)';
        
        // Cambiar mensaje
        const message = document.querySelector('.cat-message');
        message.textContent = '😻 ¡Gracias! Te amo 💖';
        message.style.background = 'rgba(255, 235, 59, 0.9)';
        
        // Mostrar muchos corazones
        for (let i = 0; i < 10; i++) {
            setTimeout(() => this.createFloatingHeart(), i * 200);
        }
    }
}

// Inicializar animaciones del gatito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.catAnimation = new CatAnimation();
});