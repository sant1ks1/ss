// Создание анимированного фона с частицами
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные размеры
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Случайные позиции
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100 + 100}%`;
        
        // Случайная скорость анимации
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Случайный цвет
        const colors = [
            'linear-gradient(45deg, #667eea, #764ba2)',
            'linear-gradient(45deg, #0088cc, #00bfff)',
            'linear-gradient(45deg, #ff6b6b, #ff8e53)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Класс для управления аудио
class AudioManager {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.isPlaying = false;
        this.isMuted = false;
        this.soundIcon = document.getElementById('soundIcon');
        this.soundControl = document.getElementById('soundControl');
        this.init();
    }

    init() {
        this.setupEventListeners();
        // Не пытаемся воспроизвести автоматически, ждем клика пользователя
        this.updateSoundIcon();
    }

    setupEventListeners() {
        this.soundControl.addEventListener('click', () => {
            this.toggleSound();
        });

        // Обработка ошибок воспроизведения
        this.audio.addEventListener('error', () => {
            console.log('Audio playback failed');
            this.soundIcon.className = 'fas fa-volume-mute';
            this.isMuted = true;
        });
    }

    async toggleSound() {
        if (!this.isPlaying) {
            try {
                await this.audio.play();
                this.isPlaying = true;
                this.isMuted = false;
            } catch (error) {
                console.log('Playback failed:', error);
                this.isPlaying = false;
                this.isMuted = true;
            }
        } else {
            this.isMuted = !this.isMuted;
            this.audio.muted = this.isMuted;
        }
        this.updateSoundIcon();
    }

    updateSoundIcon() {
        if (!this.isPlaying) {
            this.soundIcon.className = 'fas fa-volume-off';
        } else if (this.isMuted) {
            this.soundIcon.className = 'fas fa-volume-mute';
        } else {
            this.soundIcon.className = 'fas fa-volume-up';
        }
    }
}

// Класс для управления анимациями и интерактивностью
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        createParticles();
        new AudioManager();
        this.addScrollAnimations();
        this.addButtonHoverEffects();
        this.addPageLoadAnimation();
    }

    // Анимации при прокрутке
    addScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);

        // Наблюдаем за всеми основными элементами
        const elementsToAnimate = [
            document.querySelector('.avatar'),
            document.querySelector('h1'),
            document.querySelector('.tagline'),
            document.querySelector('.bio'),
            ...document.querySelectorAll('.link-btn')
        ];

        elementsToAnimate.forEach((el, index) => {
            if (el) {
                el.classList.add(`delay-${index}`);
                observer.observe(el);
            }
        });
    }

    // Эффекты при наведении на кнопки
    addButtonHoverEffects() {
        const buttons = document.querySelectorAll('.link-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                // Добавляем вибрацию при наведении на кнопку поддержки
                if (button.classList.contains('donate')) {
                    button.style.animation = 'none';
                    setTimeout(() => {
                        button.style.animation = 'pulse 2s infinite';
                    }, 10);
                }
            });

            button.addEventListener('mouseleave', () => {
                if (button.classList.contains('donate')) {
                    button.style.animation = 'none';
                }
            });
        });
    }

    // Анимация загрузки страницы
    addPageLoadAnimation() {
        // Плавное появление всего контента
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
}

// Инициализация портфолио при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    
    // Добавляем пульсацию для кнопки доната
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.4); }
            70% { box-shadow: 0 0 0 12px rgba(255, 107, 107, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); }
        }
    `;
    document.head.appendChild(style);
});

// Защита от выделения текста на мобильных устройствах (опционально)
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});
