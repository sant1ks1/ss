// Создание анимированного фона с частицами
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100 + 100}%`;
        
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        const colors = [
            'linear-gradient(45deg, #667eea, #764ba2)',
            'linear-gradient(45deg, #0088cc, #00bfff)',
            'linear-gradient(45deg, #ff6b6b, #ff8e53)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Простой и рабочий музыкальный плеер
class SimpleMusicPlayer {
    constructor() {
        this.audio = new Audio('1.mp3');
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.updateDuration();
    }

    setupElements() {
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.progress = document.getElementById('progress');
        this.currentTimeEl = document.getElementById('current-time');
        this.durationEl = document.getElementById('duration');
        this.volumeSlider = document.getElementById('volumeSlider');
        
        this.audio.volume = 0.7;
        this.volumeSlider.value = 70;
    }

    setupEventListeners() {
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.onEnded());
        
        // Клик по прогресс-бару
        document.querySelector('.progress-bar').addEventListener('click', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.audio.currentTime = percent * this.audio.duration;
        });
        
        // Громкость
        this.volumeSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value / 100;
        });
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            this.audio.play().catch(e => {
                console.warn('Playback failed (user interaction required):', e);
                alert('Для воспроизведения музыки нажмите на кнопку Play ещё раз.');
            });
            this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        this.isPlaying = !this.isPlaying;
    }

    updateProgress() {
        const percent = (this.audio.currentTime / (this.audio.duration || 1)) * 100;
        this.progress.style.width = `${percent}%`;
        this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    }

    updateDuration() {
        this.durationEl.textContent = this.formatTime(this.audio.duration || 0);
    }

    onEnded() {
        this.isPlaying = false;
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.progress.style.width = '0%';
        this.currentTimeEl.textContent = '0:00';
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// Основной класс портфолио
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        createParticles();
        new SimpleMusicPlayer();
        this.addPageLoadAnimation();
    }

    addPageLoadAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
