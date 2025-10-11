// Курсор-спотлайт
document.addEventListener('mousemove', (e) => {
    const spotlight = document.getElementById('cursor-spotlight');
    spotlight.style.transform = `translate(${e.clientX - 400}px, ${e.clientY - 400}px)`;
});

// Плавный скролл и анимации
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const mainContent = document.getElementById('main-content');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Исчезновение героя
    if (scrollPosition > windowHeight * 0.3) {
        hero.classList.add('fade-out');
    } else {
        hero.classList.remove('fade-out');
    }

    // Появление основного контента
    if (scrollPosition > windowHeight * 0.5) {
        mainContent.classList.add('visible');
    }
});

// Музыкальный плеер
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const albumArt = document.querySelector('.album-art');
const progressBar = document.querySelector('.progress-bar');

let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    
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
