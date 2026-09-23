/* ============================================================
   COFRE DE RECUERDOS — Lógica (JavaScript vanilla ES6+)
   ============================================================ */

/* ------------------------------------------------------------
   CONFIGURACIÓN — edita estos valores
   ------------------------------------------------------------ */

// 🔑 CLAVE SECRETA DEL COFRE — cambia el texto entre comillas por tu clave real.
const PASSWORD = "Teamo1006*";

// 📸 RECUERDOS del carrusel. Mezcla imágenes y videos libremente.
//    - type:    'image' o 'video'
//    - src:     ruta relativa al archivo (¡ojo!, tus fotos son .jpeg, no .jpg)
//    - alt:     texto descriptivo (accesibilidad)
//    - caption: leyenda opcional que aparece sobre el recuerdo (déjala en "" si no quieres texto)
//
//    Para escribir una dedicatoria sobre una foto, rellena su "caption", por ejemplo:
//      { type: "image", src: "assets/foto-1.jpeg", alt: "Recuerdo 1", caption: "Donde todo empezó" },
const MEDIA = [
  { type: "image", src: "assets/foto-1.jpeg", alt: "Recuerdo 1", caption: "" },
  { type: "image", src: "assets/foto-2.jpeg", alt: "Recuerdo 2", caption: "" },
  { type: "image", src: "assets/foto-3.jpeg", alt: "Recuerdo 3", caption: "" },
  { type: "image", src: "assets/foto-4.jpeg", alt: "Recuerdo 4", caption: "" },
  { type: "image", src: "assets/foto-5.jpeg", alt: "Recuerdo 5", caption: "" },
  { type: "video", src: "assets/video-1.mp4", alt: "Video 1", caption: "" },
  { type: "image", src: "assets/foto-6.jpeg", alt: "Recuerdo 6", caption: "" },
  { type: "image", src: "assets/foto-7.jpeg", alt: "Recuerdo 7", caption: "" },
  { type: "image", src: "assets/foto-8.jpeg", alt: "Recuerdo 8", caption: "" },
  { type: "image", src: "assets/foto-9.jpeg", alt: "Recuerdo 9", caption: "" },
  { type: "image", src: "assets/foto-10.jpeg", alt: "Recuerdo 10", caption: "" },
  { type: "video", src: "assets/video-2.mp4", alt: "Video 2", caption: "" },
  { type: "image", src: "assets/foto-11.jpeg", alt: "Recuerdo 11", caption: "" },
  { type: "image", src: "assets/foto-12.jpeg", alt: "Recuerdo 12", caption: "" },
  { type: "image", src: "assets/foto-13.jpeg", alt: "Recuerdo 13", caption: "" },
  { type: "image", src: "assets/foto-14.jpeg", alt: "Recuerdo 14", caption: "" },
  { type: "image", src: "assets/foto-15.jpeg", alt: "Recuerdo 15", caption: "" },
  { type: "video", src: "assets/video-3.mp4", alt: "Video 3", caption: "" },
  { type: "image", src: "assets/foto-16.jpeg", alt: "Recuerdo 16", caption: "" },
  { type: "image", src: "assets/foto-17.jpeg", alt: "Recuerdo 17", caption: "" },
  { type: "image", src: "assets/foto-18.jpeg", alt: "Recuerdo 18", caption: "" },
  { type: "image", src: "assets/foto-19.jpeg", alt: "Recuerdo 19", caption: "" },
  { type: "image", src: "assets/foto-20.jpeg", alt: "Recuerdo 20", caption: "" },
  { type: "image", src: "assets/foto-21.jpeg", alt: "Recuerdo 21", caption: "" },
];

// 🎵 CANCIÓN dedicada. Reemplaza la ruta por el nombre real de tu .mp3 en /assets/.
const SONG = {
  src: "assets/nuestra-cancion.mp3", // reemplazar con el nombre real del archivo en /assets/
  title: "Nuestra canción",
  artist: "Dedicada a ti ♥",
  downloadName: "nuestra-cancion.mp3", // nombre sugerido al descargar
};

/* ------------------------------------------------------------
   ESTADO INTERNO
   ------------------------------------------------------------ */
let currentSlide = 0;      // índice del recuerdo visible
let autoplayTimer = null;  // temporizador del avance automático
const AUTOPLAY = true;     // pon false para desactivar el avance automático
const AUTOPLAY_MS = 6000;  // milisegundos entre recuerdos (solo imágenes)

/* ------------------------------------------------------------
   PUNTO DE ENTRADA
   ------------------------------------------------------------ */

// Arranca la aplicación una vez que el DOM está listo.
function init() {
  initCofre();
}

/* ------------------------------------------------------------
   1. COFRE / ACCESO
   ------------------------------------------------------------ */

// Conecta el cofre, el modal de contraseña y su validación.
function initCofre() {
  const chestBtn = document.getElementById("chest-btn");
  const modal = document.getElementById("access-modal");
  const closeBtn = document.getElementById("modal-close");
  const form = document.getElementById("access-form");

  chestBtn.addEventListener("click", openAccessModal);
  closeBtn.addEventListener("click", closeAccessModal);
  form.addEventListener("submit", handlePasswordSubmit);

  // Cerrar el modal al hacer clic fuera de la tarjeta o con Escape.
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeAccessModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeAccessModal();
  });
}

// Muestra el modal de contraseña y enfoca el campo.
function openAccessModal() {
  const modal = document.getElementById("access-modal");
  const input = document.getElementById("password-input");
  modal.hidden = false;
  input.value = "";
  clearError();
  window.requestAnimationFrame(() => input.focus());
}

// Oculta el modal de contraseña.
function closeAccessModal() {
  const modal = document.getElementById("access-modal");
  modal.hidden = true;
  clearError();
}

// Valida la contraseña enviada y decide si abrir el cofre.
function handlePasswordSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("password-input");
  const value = input.value.trim();

  if (value.toLowerCase() === PASSWORD.toLowerCase()) {
    unlockContent();
  } else {
    showError("Esa no es nuestra clave... inténtalo de nuevo 💚");
  }
}

// Muestra el mensaje de error, sacude el modal, limpia el campo y devuelve el foco.
function showError(message) {
  const modal = document.querySelector(".modal");
  const errorEl = document.getElementById("error-msg");
  const input = document.getElementById("password-input");

  errorEl.textContent = message;
  errorEl.classList.add("is-visible");

  modal.classList.remove("is-shaking");
  void modal.offsetWidth; // reinicia la animación
  modal.classList.add("is-shaking");

  input.value = "";
  input.focus();
}

// Limpia el mensaje de error.
function clearError() {
  const errorEl = document.getElementById("error-msg");
  errorEl.textContent = "";
  errorEl.classList.remove("is-visible");
}

// Contraseña correcta: elimina el acceso del DOM y revela el contenido principal.
function unlockContent() {
  const overlay = document.getElementById("access-overlay");
  const modal = document.getElementById("access-modal");

  closeAccessModal();
  overlay.classList.add("is-opening");

  // Tras la animación de apertura, se ELIMINAN del DOM (no solo se ocultan).
  window.setTimeout(() => {
    overlay.remove();
    modal.remove();
  }, 900);

  revealMain();
}

// Inyecta y muestra la galería y el reproductor, e inicializa sus módulos.
function revealMain() {
  const main = document.getElementById("main-content");
  const player = document.getElementById("player");

  main.hidden = false;
  main.classList.add("is-revealed");
  player.hidden = false;

  initCarrusel();
  initPlayer();
}

/* ------------------------------------------------------------
   2. CARRUSEL
   ------------------------------------------------------------ */

// Construye el carrusel: slides, indicadores, controles, swipe y autoplay.
function initCarrusel() {
  renderSlides();
  renderDots();
  bindCarouselControls();
  initSwipe();
  goToSlide(0);
  scheduleAutoplay();
}

// Crea dinámicamente cada recuerdo (imagen o video) dentro del carrusel.
function renderSlides() {
  const track = document.getElementById("carousel-track");
  track.innerHTML = "";

  MEDIA.forEach((item, index) => {
    const slide = document.createElement("li");
    slide.className = "slide";
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "recuerdo");
    slide.setAttribute("aria-label", `${index + 1} de ${MEDIA.length}`);

    const media = createMediaElement(item);
    slide.appendChild(media);

    // Leyenda opcional del recuerdo.
    if (item.caption) {
      const caption = document.createElement("p");
      caption.className = "slide-caption";
      caption.textContent = item.caption;
      slide.appendChild(caption);
    }

    // Aviso amable si el archivo aún no existe en /assets/.
    slide.appendChild(createFallback(item.src));

    track.appendChild(slide);
  });
}

// Crea el elemento <img> o <video> según el tipo de recuerdo.
function createMediaElement(item) {
  let el;
  if (item.type === "video") {
    el = document.createElement("video");
    el.src = item.src;
    el.controls = true;
    el.playsInline = true;
    el.preload = "metadata";
    el.setAttribute("aria-label", item.alt || "Video del recuerdo");
  } else {
    el = document.createElement("img");
    el.src = item.src;
    el.alt = item.alt || "Recuerdo";
    el.loading = "lazy";
  }
  // Si el archivo no carga, marca el slide para mostrar el aviso de reemplazo.
  el.addEventListener("error", () => {
    el.closest(".slide").classList.add("has-error");
  });
  return el;
}

// Crea el aviso que indica qué archivo colocar en /assets/.
function createFallback(src) {
  const box = document.createElement("div");
  box.className = "slide-fallback";
  box.innerHTML =
    '<svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-4.5-4.5L5 22"/></svg>' +
    "<strong>Aquí irá tu recuerdo</strong>" +
    "<span>Coloca este archivo en la carpeta:</span>" +
    "<code>" + src + "</code>";
  return box;
}

// Crea los indicadores (dots) y los conecta a cada recuerdo.
function renderDots() {
  const dotsWrap = document.getElementById("carousel-dots");
  dotsWrap.innerHTML = "";

  MEDIA.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Ir al recuerdo ${index + 1}`);
    dot.addEventListener("click", () => {
      goToSlide(index);
      scheduleAutoplay();
    });
    dotsWrap.appendChild(dot);
  });
}

// Conecta las flechas, el teclado y la pausa del autoplay al pasar el cursor.
function bindCarouselControls() {
  const prev = document.getElementById("prev-btn");
  const next = document.getElementById("next-btn");
  const carousel = document.querySelector(".carousel");

  prev.addEventListener("click", () => { prevSlide(); scheduleAutoplay(); });
  next.addEventListener("click", () => { nextSlide(); scheduleAutoplay(); });

  // Navegación con flechas del teclado.
  document.addEventListener("keydown", (event) => {
    if (document.getElementById("main-content").hidden) return;
    if (event.key === "ArrowLeft") { prevSlide(); scheduleAutoplay(); }
    if (event.key === "ArrowRight") { nextSlide(); scheduleAutoplay(); }
  });

  // Pausa el avance automático mientras el cursor está encima.
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", scheduleAutoplay);
}

// Muestra el recuerdo indicado y actualiza indicadores y videos.
function goToSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".carousel-dot");
  if (slides.length === 0) return;

  currentSlide = (index + slides.length) % slides.length;

  pauseAllVideos();

  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === currentSlide));
  dots.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === currentSlide);
    dot.setAttribute("aria-selected", i === currentSlide ? "true" : "false");
  });
}

// Avanza al siguiente recuerdo.
function nextSlide() {
  goToSlide(currentSlide + 1);
}

// Retrocede al recuerdo anterior.
function prevSlide() {
  goToSlide(currentSlide - 1);
}

// Pausa todos los videos (al cambiar de recuerdo).
function pauseAllVideos() {
  document.querySelectorAll(".slide video").forEach((video) => {
    if (!video.paused) video.pause();
  });
}

// Programa el avance automático (solo si el recuerdo actual es una imagen).
function scheduleAutoplay() {
  stopAutoplay();
  if (!AUTOPLAY || MEDIA.length <= 1) return;
  if (MEDIA[currentSlide] && MEDIA[currentSlide].type === "video") return;
  autoplayTimer = window.setTimeout(() => {
    nextSlide();
    scheduleAutoplay();
  }, AUTOPLAY_MS);
}

// Detiene el avance automático.
function stopAutoplay() {
  if (autoplayTimer) {
    window.clearTimeout(autoplayTimer);
    autoplayTimer = null;
  }
}

// Habilita el gesto de deslizar (swipe) en dispositivos táctiles.
function initSwipe() {
  const viewport = document.querySelector(".carousel-viewport");
  let startX = 0;
  let isTouching = false;

  viewport.addEventListener("touchstart", (event) => {
    startX = event.changedTouches[0].clientX;
    isTouching = true;
    stopAutoplay();
  }, { passive: true });

  viewport.addEventListener("touchend", (event) => {
    if (!isTouching) return;
    isTouching = false;
    const deltaX = event.changedTouches[0].clientX - startX;
    const threshold = 50; // píxeles mínimos para contar como swipe
    if (deltaX > threshold) prevSlide();
    else if (deltaX < -threshold) nextSlide();
    scheduleAutoplay();
  }, { passive: true });
}

/* ------------------------------------------------------------
   3. REPRODUCTOR DE MÚSICA
   ------------------------------------------------------------ */

// Configura el audio y conecta todos los controles del reproductor.
function initPlayer() {
  const audio = document.getElementById("audio");

  audio.src = SONG.src;
  document.getElementById("song-title").textContent = SONG.title;
  document.getElementById("song-artist").textContent = SONG.artist;

  const download = document.getElementById("download-btn");
  download.href = SONG.src;
  download.setAttribute("download", SONG.downloadName || "");

  bindPlayerControls();
}

// Conecta play/pausa, barra de progreso, colapsar/expandir y eventos del audio.
function bindPlayerControls() {
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play-btn");
  const fab = document.getElementById("player-fab");
  const collapseBtn = document.getElementById("player-collapse");
  const track = document.getElementById("progress-track");

  playBtn.addEventListener("click", togglePlay);
  collapseBtn.addEventListener("click", () => setPlayerCollapsed(true));

  // El botón flotante expande el reproductor (y no interrumpe la música).
  fab.addEventListener("click", () => setPlayerCollapsed(false));

  // Buscar posición al hacer clic sobre la barra de progreso.
  track.addEventListener("click", seek);
  track.addEventListener("keydown", seekWithKeyboard);

  // Eventos del audio: refrescan la interfaz.
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("loadedmetadata", () => {
    document.getElementById("duration").textContent = formatTime(audio.duration);
  });
  audio.addEventListener("play", () => reflectPlayState(true));
  audio.addEventListener("pause", () => reflectPlayState(false));
  audio.addEventListener("ended", () => reflectPlayState(false));
}

// Alterna entre reproducir y pausar la canción.
function togglePlay() {
  const audio = document.getElementById("audio");
  if (audio.paused) {
    // .play() devuelve una promesa; la capturamos por si el navegador la bloquea.
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}

// Refleja en la interfaz si la música está sonando o en pausa.
function reflectPlayState(isPlaying) {
  const player = document.getElementById("player");
  const playBtn = document.getElementById("play-btn");
  player.classList.toggle("is-playing", isPlaying);
  playBtn.setAttribute("aria-label", isPlaying ? "Pausar" : "Reproducir");
}

// Actualiza la barra de progreso y el tiempo transcurrido.
function updateProgress() {
  const audio = document.getElementById("audio");
  const fill = document.getElementById("progress-fill");
  const knob = document.getElementById("progress-knob");
  const track = document.getElementById("progress-track");
  const current = document.getElementById("current-time");

  const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  fill.style.width = percent + "%";
  knob.style.left = percent + "%";
  current.textContent = formatTime(audio.currentTime);
  track.setAttribute("aria-valuenow", Math.round(percent));
}

// Salta a la posición de la canción según dónde se hizo clic.
function seek(event) {
  const audio = document.getElementById("audio");
  const track = document.getElementById("progress-track");
  if (!audio.duration) return;
  const rect = track.getBoundingClientRect();
  const ratio = (event.clientX - rect.left) / rect.width;
  audio.currentTime = Math.min(Math.max(ratio, 0), 1) * audio.duration;
  updateProgress();
}

// Permite mover la canción con las flechas del teclado sobre la barra.
function seekWithKeyboard(event) {
  const audio = document.getElementById("audio");
  if (!audio.duration) return;
  if (event.key === "ArrowRight") audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
  if (event.key === "ArrowLeft") audio.currentTime = Math.max(audio.currentTime - 5, 0);
  updateProgress();
}

// Colapsa o expande el reproductor flotante.
function setPlayerCollapsed(collapsed) {
  const player = document.getElementById("player");
  const fab = document.getElementById("player-fab");
  const collapseBtn = document.getElementById("player-collapse");
  player.dataset.collapsed = String(collapsed);
  fab.setAttribute("aria-expanded", String(!collapsed));
  // Devuelve el foco al control visible tras cambiar de estado.
  window.requestAnimationFrame(() => (collapsed ? fab : collapseBtn).focus());
}

/* ------------------------------------------------------------
   UTILIDADES
   ------------------------------------------------------------ */

// Convierte segundos a un formato de minutos:segundos (m:ss).
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/* ------------------------------------------------------------
   ARRANQUE
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", init);
