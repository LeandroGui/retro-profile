// --- CONFIGURACIÓN DE AUDIO ---
const bgm = document.getElementById('bgm-music');
const sfxStart = document.getElementById('sfx-start');
const muteBtn = document.getElementById('mute-btn');
const startBtn = document.getElementById('btn-start');

let isMuted = false;

// Volumen inicial
bgm.volume = 0.2;      // Música suave
sfxStart.volume = 0.5; // Efecto Start presente

// --- DATOS DEL USUARIO (Leandro) ---
const cvData = {
    academic: [
        { title: "Licenciatura en Análisis y Gestión de Datos", place: "Universidad Nacional de San Luis", year: "03/2025 - 06/2029" },
        { title: "Full Stack AI (RAG & Agents)", place: "Bootcamp AI Planet", year: "06/2024 - 09/2024" },
        { title: "FULL Stack AI (LLM) Engineer", place: "Bootcamp AI Planet", year: "08/2023 - 10/2023"},
        { title: "Formación en Inteligencia Artificial", place: "Universidad de Buenos Aires", year: "09/2022 - 01/2023"},
        { title: "Bootcamp Python", place: "Fundación Educativa Santísima Trinidad", year: "02/2022 - 07/2022"},
        { title: "Administración Pública", place: "Instituto Superior Técnico de Estudios Económicos de Cuyo", year: "03/2020 - 12/2022"},
    ],
    skills: [
        "Python", "LLMs", "RAG", "Agents", "Prompts Engineering", "Git", "GitHub", "VS Code", "Jupyter"
    ],
    languages: [
        { lang: "Español", level: "Nativo" },
        { lang: "Inglés", level: "General - Intermedio" }
    ],
    interests: "Inteligencia Artificial, Deportes, Viajes, Lectura, Nuevas Tecnologías.",
    email: "leandrodeep" + "@" + "gmail.com" 
};

// --- LÓGICA DE INICIO (START GAME) ---
startBtn.addEventListener('click', () => {
    // 1. Reproducir sonido
    if (!isMuted) {
        sfxStart.currentTime = 0;
        sfxStart.play().catch(e => console.log("Audio error:", e));
    }

    // 2. Efecto visual en botón
    startBtn.classList.remove('blink');
    startBtn.innerText = "LOADING...";

    // 3. Esperar 800ms y cambiar pantalla
    setTimeout(() => {
        navigateTo('screen-cv');
    }, 800);
});

// --- FUNCIÓN DE NAVEGACIÓN ---
function navigateTo(screenId) {
    // Ocultar/Mostrar pantallas
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    
    const activeScreen = document.getElementById(screenId);
    activeScreen.classList.remove('hidden');
    activeScreen.classList.add('active');

    // Gestión de la Música según pantalla
    if (screenId === 'screen-cv') {
        if (!isMuted) {
            bgm.play().catch(e => console.log("Autoplay blocked"));
        }
    } else if (screenId === 'screen-home') {
        // Resetear música y botón al volver
        bgm.pause();
        bgm.currentTime = 0;
        startBtn.innerText = "START GAME";
        startBtn.classList.add('blink');
    }
}

// --- CONTROL DE MUTE ---
muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;

    if (isMuted) {
        bgm.pause();
        muteBtn.innerText = "🔇 OFF";
        muteBtn.classList.add('muted');
    } else {
        // Si estamos en la pantalla 2, reanudar música
        const isCvScreen = !document.getElementById('screen-cv').classList.contains('hidden');
        if (isCvScreen) bgm.play();
        
        muteBtn.innerText = "🔊 ON";
        muteBtn.classList.remove('muted');
    }
});

// --- CARGA DE DATOS EN EL DOM ---
function loadData() {
    // Cargar Educación
    const eduContainer = document.getElementById('education-list');
    cvData.academic.forEach(item => {
        eduContainer.innerHTML += `
            <div class="entry">
                <div class="entry-title">${item.title}</div>
                <div class="entry-place">${item.place}</div>
                <div class="entry-date">[${item.year}]</div>
            </div>
        `;
    });

    // Cargar Habilidades
    const skillsContainer = document.getElementById('skills-list');
    cvData.skills.forEach(skill => {
        skillsContainer.innerHTML += `<div class="skill-tag">${skill}</div>`;
    });

    // Cargar Idiomas
    const langContainer = document.getElementById('languages-list');
    cvData.languages.forEach(item => {
        langContainer.innerHTML += `<li>> ${item.lang} [${item.level}]</li>`;
    });

    // Cargar Intereses
    document.getElementById('interests-text').innerText = "> " + cvData.interests;

    // Email seguro
    const emailBtn = document.getElementById('secure-email');
    emailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`Envia un correo a: ${cvData.email}`);
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', loadData);
