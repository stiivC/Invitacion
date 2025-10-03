// Pantalla de carga y reproducción de música
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const openButton = document.getElementById('openButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const confettiContainer = document.getElementById('confetti-container');
    
    // Configurar volumen inicial
    backgroundMusic.volume = 0.5;
    
    // Función para crear confeti
    const createConfetti = () => {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confettiContainer.appendChild(confetti);
            
            // Remover confeti después de la animación
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }
    };
    
    // Función para abrir la aplicación
    const openApp = () => {
        // Ocultar pantalla de carga con animación
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'flex';
            
            // Reproducir música después de mostrar el contenido
            backgroundMusic.play().then(() => {
                console.log('Música reproducida correctamente');
                updatePlayPauseButton();
            }).catch(error => {
                console.log('Error al reproducir música:', error);
            });
            
            // Crear confeti de celebración
            createConfetti();
            
            // Crear más confeti cada 5 segundos
            setInterval(createConfetti, 5000);
        }, 500);
    };
    
    // Función para actualizar el botón de play/pause
    const updatePlayPauseButton = () => {
        playPauseBtn.textContent = backgroundMusic.paused ? '▶️' : '⏸️';
    };
    
    // Control de play/pause
    playPauseBtn.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
        updatePlayPauseButton();
    });
    
    // Control de volumen
    volumeSlider.addEventListener('input', (e) => {
        backgroundMusic.volume = e.target.value / 100;
    });
    
    // Event listener para el botón abrir
    openButton.addEventListener('click', openApp);
    
    // También permitir abrir con tecla Enter
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && loadingScreen.style.display !== 'none') {
            openApp();
        }
    });
    
    // Actualizar botón cuando cambie el estado del audio
    backgroundMusic.addEventListener('play', updatePlayPauseButton);
    backgroundMusic.addEventListener('pause', updatePlayPauseButton);
});
