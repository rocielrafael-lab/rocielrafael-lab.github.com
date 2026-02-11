// Funcionalidad principal
document.addEventListener('DOMContentLoaded', function() {
    const forgiveBtn = document.getElementById('forgiveBtn');
    const dontForgiveBtn = document.getElementById('dontForgiveBtn');
    const message = document.getElementById('message');
    
    let dontForgiveBtnMoved = false;
    let mouseX = 0;
    let mouseY = 0;
    let escapeCount = 0;

    // Verificar que los botones existan
    if (!forgiveBtn || !dontForgiveBtn) {
        console.error('No se encontraron los botones');
        return;
    }

    console.log('Botones cargados correctamente');

    // Seguir el movimiento del ratón para el botón "No"
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!dontForgiveBtnMoved) {
            checkProximity();
        }
    });

    // Verificar proximidad al botón "No"
    function checkProximity() {
        const btnRect = dontForgiveBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - btnCenterX, 2) + 
            Math.pow(mouseY - btnCenterY, 2)
        );
        
        // Si el ratón está a menos de 100px, mover el botón
        if (distance < 100) {
            moveDontForgiveButton();
            escapeCount++;
            
            // Efectos especiales después de varios escapes
            if (escapeCount % 3 === 0) {
                createEscapeEffects(btnCenterX, btnCenterY);
            }
        }
    }

    // Mover el botón "No" a una posición aleatoria
    function moveDontForgiveButton() {
        dontForgiveBtnMoved = true;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const btnWidth = dontForgiveBtn.offsetWidth;
        const btnHeight = dontForgiveBtn.offsetHeight;
        
        let newX, newY;
        let attempts = 0;
        const maxAttempts = 15;
        
        // Buscar una posición que no esté cerca del ratón
        do {
            newX = Math.random() * (windowWidth - btnWidth - 40) + 20;
            newY = Math.random() * (windowHeight - btnHeight - 40) + 20;
            attempts++;
            
            const distanceToMouse = Math.sqrt(
                Math.pow(mouseX - (newX + btnWidth/2), 2) + 
                Math.pow(mouseY - (newY + btnHeight/2), 2)
            );
            
            if (distanceToMouse > 200 || attempts >= maxAttempts) {
                break;
            }
        } while (true);
        
        // Aplicar animación de movimiento
        dontForgiveBtn.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        dontForgiveBtn.style.transform = 'scale(1.1)';
        dontForgiveBtn.style.position = 'fixed';
        dontForgiveBtn.style.left = `${newX}px`;
        dontForgiveBtn.style.top = `${newY}px`;
        dontForgiveBtn.style.zIndex = '1000';
        
        // Restaurar escala después de la animación
        setTimeout(() => {
            dontForgiveBtn.style.transform = 'scale(1)';
        }, 300);
        
        // Permitir que se mueva de nuevo después de 1 segundo
        setTimeout(() => {
            dontForgiveBtnMoved = false;
        }, 1000);
    }

    // Efectos especiales cuando el botón escapa
    function createEscapeEffects(x, y) {
        if (window.specialEffects) {
            window.specialEffects.createHeartExplosion(x, y, 15);
        }
        playEscapeSound();
    }

    // EVENTO PRINCIPAL: Cuando hacen clic en "Sí, te perdono"
    forgiveBtn.addEventListener('click', function() {
        console.log('Botón "Sí" clickeado');
        
        // 1. OCULTAR EL BOTÓN "NO" - ESTA ES LA PARTE CORREGIDA
        dontForgiveBtn.style.transition = 'all 0.5s ease-in-out';
        dontForgiveBtn.style.opacity = '0';
        dontForgiveBtn.style.transform = 'scale(0.8) translateY(20px)';
        dontForgiveBtn.style.pointerEvents = 'none';
        dontForgiveBtn.style.visibility = 'hidden';
        
        // 2. Deshabilitar permanentemente el movimiento del botón "No"
        dontForgiveBtnMoved = true;
        
        // 3. Mostrar mensaje de agradecimiento
        message.style.display = 'block';
        message.style.animation = 'fadeIn 1s ease-out forwards';
        
        // 4. Cambiar el texto y estilo del botón "Sí"
        this.innerHTML = '<i class="fas fa-heart"></i> ¡Te Amo Eternamente! <i class="fas fa-heart"></i>';
        this.style.background = 'linear-gradient(135deg, #4caf50, #8bc34a)';
        this.disabled = true;
        this.style.animation = 'none'; // Detener el pulso
        
        // 5. Efectos especiales de celebración
        createCelebrationEffects();
        
        // 6. Hacer feliz al gatito
        if (window.catAnimation) {
            setTimeout(() => {
                window.catAnimation.makeHappy();
            }, 500);
        }
        
        // 7. Reproducir sonidos de celebración
        playCelebrationSound();
        
        // 8. Eliminar completamente el evento de movimiento del ratón para el botón "No"
        document.removeEventListener('mousemove', checkProximity);
        
        // 9. Mostrar mensaje final después de 3 segundos
        setTimeout(() => {
            showFinalMessage();
        }, 3000);
        
        // 10. Asegurar que el botón "No" desaparezca completamente
        setTimeout(() => {
            dontForgiveBtn.style.display = 'none';
        }, 500);
    });

    // EVENTO: Cuando logran hacer clic en "No te perdono"
    dontForgiveBtn.addEventListener('click', function() {
        console.log('Botón "No" clickeado - Moviéndose de nuevo');
        moveDontForgiveButton();
        
        // Efecto visual de rechazo
        this.style.background = 'linear-gradient(135deg, #ff4757, #ff3742)';
        setTimeout(() => {
            this.style.background = 'linear-gradient(135deg, #6b6bff, #8e8eff)';
        }, 1000);
        
        // El gatito se pone más triste
        if (window.catAnimation) {
            window.catAnimation.blink();
        }
    });

    // Efectos de celebración cuando acepta el perdón
    function createCelebrationEffects() {
        if (window.specialEffects) {
            // Explosión grande de corazones en la posición del botón
            const rect = forgiveBtn.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            window.specialEffects.createHeartExplosion(x, y, 50);
            window.specialEffects.createConfetti(x, y, 150);
        }
        
        // Textos de celebración flotantes
        const celebrationTexts = [
            "¡Eres la mejor!", "¡Te amo!", "¡Para siempre!", 
            "¡Mi princesa!", "¡Eres perfecta!", "¡Gracias!"
        ];
        
        celebrationTexts.forEach((text, index) => {
            setTimeout(() => {
                createCelebrationText(text);
            }, index * 500);
        });
    }

    function createCelebrationText(text) {
        const textElement = document.createElement('div');
        textElement.textContent = text;
        textElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            font-weight: bold;
            color: #ff6b6b;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
            z-index: 1000;
            pointer-events: none;
            animation: celebrationText 2s ease-out forwards;
        `;
        document.body.appendChild(textElement);
        
        setTimeout(() => {
            textElement.remove();
        }, 2000);
    }

    function showFinalMessage() {
        const finalMessage = document.createElement('div');
        finalMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 1s ease-out;
            ">
                <div style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 40px;
                    border-radius: 20px;
                    text-align: center;
                    color: white;
                    max-width: 500px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                ">
                    <div style="font-size: 4rem; margin-bottom: 20px;">💖</div>
                    <h2 style="font-size: 2.5rem; margin-bottom: 20px;">¡Nuestro Amor es Eterno!</h2>
                    <p style="font-size: 1.2rem; line-height: 1.6;">
                        Este momento quedará grabado para siempre en mi corazón. 
                        Prometo hacerte feliz cada día de nuestra vida juntos.
                    </p>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        margin-top: 30px;
                        padding: 15px 30px;
                        background: rgba(255,255,255,0.2);
                        border: 2px solid white;
                        color: white;
                        border-radius: 50px;
                        font-size: 1.1rem;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='rgba(255,255,255,0.3)'"
                    onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                        Cerrar y Disfrutar Nuestro Amor
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(finalMessage);
    }

    // Funciones de audio
    function playCelebrationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Melodía feliz
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                    
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.5);
                }, index * 200);
            });
        } catch (e) {
            console.log("Audio no disponible");
        }
    }

    function playEscapeSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            console.log("Audio no disponible");
        }
    }

    // Efecto hover especial para el botón Sí
    forgiveBtn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.background = `radial-gradient(circle at ${x}px ${y}px, 
            rgba(255, 107, 107, 0.9) 0%, 
            rgba(255, 142, 142, 0.9) 100%)`;
    });

    forgiveBtn.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
    });
});

// Asegurarse de que las animaciones estén definidas
const celebrationStyles = `
@keyframes celebrationText {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
    }
    50% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
    }
}

@keyframes fadeIn {
    from { 
        opacity: 0; 
        transform: translateY(20px); 
    }
    to { 
        opacity: 1; 
        transform: translateY(0); 
    }
}

@keyframes heartExplosion {
    0% {
        transform: translate(0, 0) scale(0) rotate(0deg);
    }
    100% {
        transform: translate(var(--end-x), var(--end-y)) scale(1) rotate(360deg);
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

/* Nueva animación para desaparecer el botón */
@keyframes fadeOutScale {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.8) translateY(20px);
    }
}
`;

// Inyectar los estilos de animación
const celebrationStyleSheet = document.createElement('style');
celebrationStyleSheet.textContent = celebrationStyles;
document.head.appendChild(celebrationStyleSheet);