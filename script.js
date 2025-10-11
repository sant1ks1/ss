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
        this.attemptPlay();
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

        // Когда аудио готово к воспроизведению
        this.audio.addEventListener('canplaythrough', () => {
            this.attemptPlay();
        });
    }

    async attemptPlay() {
        try {
            // Попытка воспроизведения (для обхода autoplay policy)
            await this.audio.play();
            this.isPlaying = true;
            this.isMuted = false;
            this.updateSoundIcon();
        } catch (error) {
            console.log('Autoplay blocked, waiting for user interaction');
            this.isPlaying = false;
            this.updateSoundIcon();
        }
    }

    toggleSound() {
        if (!this.isPlaying) {
            this.attemptPlay();
            return;
        }

        this.isMuted = !this.isMuted;
        this.audio.muted = this.isMuted;
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
});        ];

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

    // Копирование ссылок в буфер обмена (альтернативный способ)
    addCopyToClipboard() {
        // Добавляем возможность копирования ссылок по клику с зажатой клавишей Ctrl
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                const links = document.querySelectorAll('.link-btn');
                links.forEach(link => {
                    link.style.border = '2px dashed #a855f7';
                });
            }
        });

        document.addEventListener('keyup', () => {
            const links = document.querySelectorAll('.link-btn');
            links.forEach(link => {
                link.style.border = 'none';
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

    // Метод для показа уведомлений (можно использовать в будущем)
    showNotification(message, type = 'info') {
        // Создаем временное уведомление
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
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
});                console.log('Main content visible');
            } else {
                mainContent.classList.remove('visible');
                console.log('Main content hidden');
            }
        }
    });

    // Музыкальный плеер
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const albumArt = document.querySelector('.album-art');
    const progressBar = document.querySelector('.progress-bar');

    let isPlaying = false;

    if (playPauseBtn) {
        // Устанавливаем начальный класс
        playPauseBtn.classList.add('play');

        playPauseBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                playPauseBtn.classList.remove('play');
                playPauseBtn.classList.add('pause');
                if (albumArt) albumArt.classList.add('playing');
                simulateProgress();
            } else {
                playPauseBtn.classList.remove('pause');
                playPauseBtn.classList.add('play');
                if (albumArt) albumArt.classList.remove('playing');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            resetProgress();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            resetProgress();
        });
    }

    // Прогресс бар симуляция
    function simulateProgress() {
        if (!isPlaying || !progressBar) return;
        
        let width = parseInt(progressBar.style.width) || 0;
        if (width < 100) {
            width += 0.5;
            progressBar.style.width = width + '%';
            setTimeout(simulateProgress, 100);
        } else {
            // Следующий трек при завершении
            resetProgress();
            if (isPlaying) {
                setTimeout(simulateProgress, 500);
            }
        }
    }

    function resetProgress() {
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    }

    // Клик по прогресс бару
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            if (!isPlaying || !progressBar) return;
            
            const clickPosition = e.offsetX;
            const containerWidth = progressContainer.offsetWidth;
            const progressPercent = (clickPosition / containerWidth) * 100;
            
            progressBar.style.width = progressPercent + '%';
        });
    }

    // Параллакс эффект для частиц
    window.addEventListener('scroll', () => {
        const particles = document.getElementById('particles-container');
        if (particles) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            particles.style.transform = `translate3d(0px, ${rate}px, 0px)`;
        }
    });

    // Анимация появления при загрузке
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);

    // Авто-скролл к контенту при клике на индикатор
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Респонсив поведение
    function handleResize() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            if (window.innerWidth <= 1000) {
                mainContent.classList.add('mobile');
            } else {
                mainContent.classList.remove('mobile');
            }
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    console.log('All scripts loaded');
});sBar.style.width = width + '%';
        setTimeout(simulateProgress, 100);
    } else {
        // Следующий трек при завершении
        resetProgress();
        if (isPlaying) {
            setTimeout(simulateProgress, 500);
        }
    }
}

function resetProgress() {
    if (progressBar) {
        progressBar.style.width = '0%';
    }
}

// Клик по прогресс бару
const progressContainer = document.querySelector('.progress-container');
if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
        if (!isPlaying) return;
        
        const clickPosition = e.offsetX;
        const containerWidth = progressContainer.offsetWidth;
        const progressPercent = (clickPosition / containerWidth) * 100;
        
        if (progressBar) {
            progressBar.style.width = progressPercent + '%';
        }
    });
}

// Параллакс эффект для частиц
window.addEventListener('scroll', () => {
    const particles = document.getElementById('particles-container');
    if (particles) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        particles.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    }
});

// Анимация появления при загрузке
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);

    // Авто-скролл к контенту при клике на индикатор
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});

// Респонсив поведение
function handleResize() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        if (window.innerWidth <= 1000) {
            mainContent.classList.add('mobile');
        } else {
            mainContent.classList.remove('mobile');
        }
    }
}

window.addEventListener('resize', handleResize);
handleResize();const albumArt = document.querySelector('.album-art');
const progressBar = document.querySelector('.progress-bar');

let isPlaying = false;

if (playPauseBtn) {
    // Устанавливаем начальный класс
    playPauseBtn.classList.add('play');

    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playPauseBtn.classList.remove('play');
            playPauseBtn.classList.add('pause');
            if (albumArt) albumArt.classList.add('playing');
            simulateProgress();
        } else {
            playPauseBtn.classList.remove('pause');
            playPauseBtn.classList.add('play');
            if (albumArt) albumArt.classList.remove('playing');
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        resetProgress();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        resetProgress();
    });
}

// Прогресс бар симуляция
function simulateProgress() {
    if (!isPlaying) return;
    
    let width = parseInt(progressBar.style.width) || 0;
    if (width < 100) {
        width += 0.5;
        progressBar.style.width = width + '%';
        setTimeout(simulateProgress, 100);
    } else {
        // Следующий трек при завершении
        resetProgress();
        if (isPlaying) {
            setTimeout(simulateProgress, 500);
        }
    }
}

function resetProgress() {
    if (progressBar) {
        progressBar.style.width = '0%';
    }
}

// Клик по прогресс бару
const progressContainer = document.querySelector('.progress-container');
if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
        if (!isPlaying) return;
        
        const clickPosition = e.offsetX;
        const containerWidth = progressContainer.offsetWidth;
        const progressPercent = (clickPosition / containerWidth) * 100;
        
        if (progressBar) {
            progressBar.style.width = progressPercent + '%';
        }
    });
}

// Параллакс эффект для частиц
window.addEventListener('scroll', () => {
    const particles = document.getElementById('particles-container');
    if (particles) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        particles.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    }
});

// Анимация появления при загрузке
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);

    // Авто-скролл к контенту при клике на индикатор
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});

// Респонсив поведение
function handleResize() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        if (window.innerWidth <= 1000) {
            mainContent.classList.add('mobile');
        } else {
            mainContent.classList.remove('mobile');
        }
    }
}

window.addEventListener('resize', handleResize);
handleResize();    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playPauseBtn.classList.remove('play');
        playPauseBtn.classList.add('pause');
        albumArt.classList.add('playing');
        simulateProgress();
    } else {
        playPauseBtn.classList.remove('pause');
        playPauseBtn.classList.add('play');
        albumArt.classList.remove('playing');
    }
});

prevBtn.addEventListener('click', () => {
    // Логика предыдущего трека
    resetProgress();
});

nextBtn.addEventListener('click', () => {
    // Логика следующего трека
    resetProgress();
});

// Прогресс бар симуляция
function simulateProgress() {
    if (!isPlaying) return;
    
    let width = parseInt(progressBar.style.width) || 0;
    if (width < 100) {
        width += 0.5;
        progressBar.style.width = width + '%';
        setTimeout(simulateProgress, 100);
    } else {
        // Следующий трек при завершении
        resetProgress();
        if (isPlaying) {
            setTimeout(simulateProgress, 500);
        }
    }
}

function resetProgress() {
    progressBar.style.width = '0%';
}

// Клик по прогресс бару
document.querySelector('.progress-container').addEventListener('click', (e) => {
    if (!isPlaying) return;
    
    const progressContainer = e.currentTarget;
    const clickPosition = e.offsetX;
    const containerWidth = progressContainer.offsetWidth;
    const progressPercent = (clickPosition / containerWidth) * 100;
    
    progressBar.style.width = progressPercent + '%';
});

// Параллакс эффект для частиц
window.addEventListener('scroll', () => {
    const particles = document.getElementById('particles-container');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    particles.style.transform = `translate3d(0px, ${rate}px, 0px)`;
});

// Анимация появления при загрузке
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);

    // Авто-скролл к контенту при клике на индикатор
    document.querySelector('.scroll-down-indicator').addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
});

// Респонсив поведение
function handleResize() {
    const mainContent = document.getElementById('main-content');
    if (window.innerWidth <= 1000) {
        mainContent.classList.add('mobile');
    } else {
        mainContent.classList.remove('mobile');
    }
}

window.addEventListener('resize', handleResize);
handleResize();    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playPauseBtn.classList.remove('play');
        playPauseBtn.classList.add('pause');
        albumArt.classList.add('playing');
        simulateProgress();
    } else {
        playPauseBtn.classList.remove('pause');
        playPauseBtn.classList.add('play');
        albumArt.classList.remove('playing');
    }
});

prevBtn.addEventListener('click', () => {
    // Логика предыдущего трека
    resetProgress();
});

nextBtn.addEventListener('click', () => {
    // Логика следующего трека
    resetProgress();
});

// Прогресс бар симуляция
function simulateProgress() {
    if (!isPlaying) return;
    
    let width = parseInt(progressBar.style.width) || 0;
    if (width < 100) {
        width += 0.5;
        progressBar.style.width = width + '%';
        setTimeout(simulateProgress, 100);
    } else {
        // Следующий трек при завершении
        resetProgress();
        if (isPlaying) {
            setTimeout(simulateProgress, 500);
        }
    }
}

function resetProgress() {
    progressBar.style.width = '0%';
}

// Клик по прогресс бару
document.querySelector('.progress-container').addEventListener('click', (e) => {
    if (!isPlaying) return;
    
    const progressContainer = e.currentTarget;
    const clickPosition = e.offsetX;
    const containerWidth = progressContainer.offsetWidth;
    const progressPercent = (clickPosition / containerWidth) * 100;
    
    progressBar.style.width = progressPercent + '%';
});

// Параллакс эффект для частиц
window.addEventListener('scroll', () => {
    const particles = document.getElementById('particles-container');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    particles.style.transform = `translate3d(0px, ${rate}px, 0px)`;
});

// Анимация появления при загрузке
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);

    // Авто-скролл к контенту при клике на индикатор
    document.querySelector('.scroll-down-indicator').addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
});

// Респонсив поведение
function handleResize() {
    const mainContent = document.getElementById('main-content');
    if (window.innerWidth <= 1000) {
        mainContent.classList.add('mobile');
    } else {
        mainContent.classList.remove('mobile');
    }
}

window.addEventListener('resize', handleResize);
handleResize();
