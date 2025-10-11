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

// Класс для музыкального плеера
class MusicPlayer {
    constructor() {
        this.audio = new Audio('1.mp3');
        this.isPlaying = false;
        this.currentTrack = 0;
        this.tracks = [
            { name: "Poster Boy - 2holli", artist: "GoodHackOrg Sound", duration: 223 }
        ];
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.loadTrack(this.currentTrack);
    }

    setupElements() {
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progress = document.getElementById('progress');
        this.currentTimeEl = document.getElementById('current-time');
        this.durationEl = document.getElementById('duration');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.albumArt = document.querySelector('.album-art');
        this.trackName = document.querySelector('.track-name');
        this.artistName = document.querySelector('.artist-name');
        
        // Установка начального значения громкости
        this.audio.volume = 0.7;
        this.volumeSlider.value = 70;
    }

    setupEventListeners() {
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.prevTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.nextTrack());
        
        this.progress.parentElement.addEventListener('click', (e) => {
            const rect = this.progress.parentElement.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.audio.currentTime = percent * this.audio.duration;
        });
        
        this.volumeSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value / 100;
        });
    }

    loadTrack(index) {
        const track = this.tracks[index];
        this.currentTrack = index;
        
        // Обновляем информацию о треке
        this.trackName.textContent = track.name;
        this.artistName.textContent = track.artist;
        this.durationEl.textContent = this.formatTime(track.duration);
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.audio.play().catch(e => {
            console.log('Playback failed:', e);
        });
        this.isPlaying = true;
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    prevTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) {
            this.play();
        }
    }

    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) {
            this.play();
        }
    }

    updateProgress() {
        const currentTime = this.audio.currentTime;
        const duration = this.audio.duration || 1;
        const percent = (currentTime / duration) * 100;
        
        this.progress.style.width = `${percent}%`;
        this.currentTimeEl.textContent = this.formatTime(currentTime);
    }

    updateDuration() {
        this.durationEl.textContent = this.formatTime(this.audio.duration);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// Класс для управления анимациями и интерактивностью
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        createParticles();
        new MusicPlayer();
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
            document.querySelector('.header-title'),
            document.querySelector('.music-player'),
            document.querySelector('.about-section'),
            document.querySelector('.system-info')
        ];

        elementsToAnimate.forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }

    // Эффекты при наведении на кнопки
    addButtonHoverEffects() {
        const buttons = document.querySelectorAll('.control-btn, .link-item');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.05)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
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
