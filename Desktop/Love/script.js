/* ============================================================
   BIRTHDAY WISH APP — script.js
   Clean, commented, beginner-friendly vanilla JS
   ============================================================ */

/* ── CONFIGURATION ─────────────────────────────────────────────
   ✏️ CUSTOMIZE: Edit these values to personalise the app.
─────────────────────────────────────────────────────────────── */
const CONFIG = {
  // Birthday person's name (also update in index.html where marked)
  name: "Aurpa",

 // Typewriter message — each string becomes a line, typed out one by one
  message: [
    "Dear Aurpa, ✨",
    "",
    "We've only just started talking, but something about you ",
    "already feels different — special, in a way I didn't expect.",
    "",
    "I don't know where this will go, but on your birthday, ",
    "I just wanted you to know: I hope to be someone who stays.",
    "",
    "Not just someone who wished you well today, ",
    "but someone who walks beside you through many more. 🌸",
    "",
    "Happy Birthday, Aurpa.",
    "With hope, and with all my heart 💖"
  ].join("\n"),

  // Typewriter speed (ms per character — lower = faster)
  typeSpeed: 28,

  // How many floating hearts to spawn on stage 4
  heartCount: 18,

  // How many background particles to spawn globally
  particleCount: 30,
};


/* ── STATE ──────────────────────────────────────────────────── */
let currentStage  = 1;
let musicPlaying  = false;
let confettiAnim  = null;    // animation frame reference for confetti
let fireworksAnim = null;    // animation frame reference for fireworks


/* ── INIT ───────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  spawnParticles();          // background sparkle particles
  initMusicButton();
});


/* ════════════════════════════════════════════════════════════
   STAGE NAVIGATION
════════════════════════════════════════════════════════════ */

/**
 * goToStage(n) — transitions from the current stage to stage n.
 * Called by onclick attributes in index.html.
 */
function goToStage(n) {
  if (n === currentStage) return;

  // Hide current stage
  const prev = document.getElementById(`stage-${currentStage}`);
  if (prev) prev.classList.remove("active");

  currentStage = n;

  // Show new stage
  const next = document.getElementById(`stage-${n}`);
  if (next) {
    // Small delay allows CSS transition to trigger cleanly
    requestAnimationFrame(() => {
      next.classList.add("active");
    });
  }

  // Update nav dots
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i + 1 === n);
  });

  // Stage-specific setup
  switch (n) {
    case 2: startCountdown();    break;
    case 3: /* Polaroids animate via CSS */ break;
    case 4: startTypewriter();   break;
    case 5: animateCompliments(); break;
    case 6: animateTimeline();   break;
    case 7: startFireworks();    break;
  }

  // Stop fireworks if leaving stage 7
  if (n !== 7 && fireworksAnim) {
    cancelAnimationFrame(fireworksAnim);
    fireworksAnim = null;
  }
}

function restartSurprise() {
  if (fireworksAnim) { cancelAnimationFrame(fireworksAnim); fireworksAnim = null; }
  if (confettiAnim)  { cancelAnimationFrame(confettiAnim);  confettiAnim  = null; }
  // Reset typewriter state
  twDone = false;
  document.getElementById("typewriter-text").textContent = "";
  document.getElementById("msg-next-btn").classList.add("hidden");
  document.getElementById("wish-message").classList.add("hidden");
  goToStage(1);
}


/* ════════════════════════════════════════════════════════════
   STAGE 2 — COUNTDOWN + CONFETTI
════════════════════════════════════════════════════════════ */

function startCountdown() {
  const display = document.getElementById("countdown-display");
  const reveal  = document.getElementById("birthday-reveal");
  const canvas  = document.getElementById("confetti-canvas");

  // Make sure reveal is hidden at start
  reveal.classList.add("hidden");
  display.classList.remove("hidden");

  let count = 3;
  display.textContent = count;
  triggerCountAnim(display);

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      display.textContent = count;
      triggerCountAnim(display);
    } else {
      clearInterval(interval);
      // Show "Happy Birthday" reveal
      display.classList.add("hidden");
      reveal.classList.remove("hidden");
      // Launch confetti
      launchConfetti(canvas, 6000);
    }
  }, 900);
}

/** Re-triggers the CSS pop animation on the countdown number */
function triggerCountAnim(el) {
  el.style.animation = "none";
  // Force reflow so the animation restarts
  void el.offsetWidth;
  el.style.animation = "";
}


/* ── CONFETTI ENGINE ────────────────────────────────────────── */

/**
 * launchConfetti(canvas, duration_ms)
 * Draws colourful falling confetti on the given canvas element.
 */
function launchConfetti(canvas, duration) {
  const ctx    = canvas.getContext("2d");
  const W      = canvas.width  = window.innerWidth;
  const H      = canvas.height = window.innerHeight;
  const colors = ["#f472b6","#c084fc","#fbbf24","#34d399","#60a5fa","#fb923c","#fff"];
  const pieces = [];

  // Spawn 150 confetti pieces
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x:   Math.random() * W,
      y:   Math.random() * -H,
      w:   6 + Math.random() * 10,
      h:   10 + Math.random() * 16,
      rot: Math.random() * 360,
      vx:  (Math.random() - .5) * 3,
      vy:  2 + Math.random() * 4,
      vr:  (Math.random() - .5) * 8,
      col: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  const endTime = Date.now() + duration;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.col;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();

      p.x  += p.vx;
      p.y  += p.vy;
      p.rot += p.vr;

      // Wrap horizontally
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      // Reset when off bottom
      if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
    });

    if (Date.now() < endTime) {
      confettiAnim = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, W, H);
    }
  }
  draw();
}


/* ════════════════════════════════════════════════════════════
   STAGE 4 — TYPEWRITER
════════════════════════════════════════════════════════════ */

let twDone = false;

function startTypewriter() {
  if (twDone) return;  // don't restart if already done

  const textEl   = document.getElementById("typewriter-text");
  const cursorEl = document.getElementById("typewriter-cursor");
  const nextBtn  = document.getElementById("msg-next-btn");
  const heartsEl = document.getElementById("hearts-layer");

  textEl.textContent = "";
  let i = 0;
  const msg = CONFIG.message;

  // Spawn hearts continuously while typing
  spawnHearts(heartsEl, CONFIG.heartCount);

  function typeChar() {
    if (i < msg.length) {
      textEl.textContent += msg[i];
      i++;
      // Scroll card to bottom so newest text is always visible
      textEl.parentElement.scrollTop = textEl.parentElement.scrollHeight;
      setTimeout(typeChar, CONFIG.typeSpeed);
    } else {
      // Typing complete
      twDone = true;
      cursorEl.style.display = "none";
      nextBtn.classList.remove("hidden");
    }
  }
  typeChar();
}


/* ── FLOATING HEARTS ────────────────────────────────────────── */

function spawnHearts(container, count) {
  const symbols = ["❤️","💕","💗","💖","💓","🌸","💝"];
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.classList.add("heart-float");
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.setProperty("--x",   Math.random() * 95 + "%");
    el.style.setProperty("--dur", 4 + Math.random() * 5 + "s");
    el.style.setProperty("--del", Math.random() * 8 + "s");
    el.style.setProperty("--sz",  0.9 + Math.random() * 1.2 + "rem");
    container.appendChild(el);
  }
}


/* ════════════════════════════════════════════════════════════
   STAGE 5 — COMPLIMENT CARDS
════════════════════════════════════════════════════════════ */

/**
 * Adds the 'visible' class to each card with a staggered delay
 * to create a "cards appearing one by one" effect.
 */
function animateCompliments() {
  const cards = document.querySelectorAll(".compliment-card");
  cards.forEach((card, i) => {
    card.classList.remove("visible");
  });
  // Small timeout lets stage transition finish first
  setTimeout(() => {
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add("visible"), i * 200);
    });
  }, 300);
}


/* ════════════════════════════════════════════════════════════
   STAGE 6 — TIMELINE
════════════════════════════════════════════════════════════ */

/**
 * Uses IntersectionObserver to reveal timeline cards as they
 * enter the viewport (or triggers them all after a short delay
 * if IO isn't supported).
 */
function animateTimeline() {
  const items = document.querySelectorAll(".timeline-item");
  items.forEach(el => el.classList.remove("visible"));

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    items.forEach(el => obs.observe(el));
    // Fallback: trigger all after 800ms in case observer fires late
    setTimeout(() => items.forEach(el => el.classList.add("visible")), 800);
  } else {
    // Fallback for older browsers
    setTimeout(() => {
      items.forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 200);
      });
    }, 300);
  }
}


/* ════════════════════════════════════════════════════════════
   STAGE 7 — FIREWORKS
════════════════════════════════════════════════════════════ */

/**
 * A minimal particle-based fireworks engine using Canvas 2D.
 * Each "rocket" travels upward then explodes into coloured particles.
 */
function startFireworks() {
  const canvas = document.getElementById("fireworks-canvas");
  const ctx    = canvas.getContext("2d");

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors    = ["#f472b6","#c084fc","#fbbf24","#60a5fa","#34d399","#fb923c","#fff","#f9a8d4"];

  /** Create an explosion at (x, y) */
  function explode(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80;
      const speed = 1.5 + Math.random() * 4;
      particles.push({
        x, y,
        vx:    Math.cos(angle) * speed,
        vy:    Math.sin(angle) * speed,
        alpha: 1,
        radius: 2 + Math.random() * 2.5,
        color,
        gravity: 0.06,
      });
    }
  }

  /** Launch a new firework from the bottom of the screen */
  function launchRocket() {
    const x = 80 + Math.random() * (canvas.width - 160);
    const targetY = 80 + Math.random() * (canvas.height * 0.45);
    const duration = 600 + Math.random() * 500; // ms
    const startTime = performance.now();
    const startY = canvas.height;

    function rocketFrame(now) {
      const t = Math.min((now - startTime) / duration, 1);
      if (t < 1) {
        requestAnimationFrame(rocketFrame);
      } else {
        explode(x, targetY);
      }
    }
    requestAnimationFrame(rocketFrame);
  }

  // Launch a rocket every ~600ms
  launchRocket();
  const launchInterval = setInterval(() => {
    if (currentStage === 7) launchRocket();
    else clearInterval(launchInterval);
  }, 600);

  function drawFireworks() {
    if (currentStage !== 7) return;

    // Fade trail effect
    ctx.fillStyle = "rgba(26, 5, 51, 0.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw and update each particle
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x     += p.vx;
      p.y     += p.vy;
      p.vy    += p.gravity;
      p.vx    *= 0.98;
      p.alpha -= 0.014;

      if (p.alpha <= 0) { particles.splice(i, 1); continue; }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    fireworksAnim = requestAnimationFrame(drawFireworks);
  }
  drawFireworks();
}


/* ════════════════════════════════════════════════════════════
   MAKE A WISH BUTTON (Stage 7)
════════════════════════════════════════════════════════════ */

function makeWish() {
  const btn = document.getElementById("wish-btn");
  const msg = document.getElementById("wish-message");

  btn.textContent = "🌠 Wish Sent!";
  btn.disabled    = true;
  btn.style.opacity = ".7";
  msg.classList.remove("hidden");

  // Extra burst of confetti to celebrate the wish
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return; // confetti-canvas lives in stage-2; reuse fireworks canvas instead
  launchWishBurst();
}

function launchWishBurst() {
  const fw = document.getElementById("fireworks-canvas");
  const ctx = fw.getContext("2d");
  const colors = ["#fbbf24","#f472b6","#c084fc","#fff","#34d399"];
  // Spawn 200 pieces from the center
  const cx = fw.width / 2, cy = fw.height / 2;
  const pieces = [];
  for (let i = 0; i < 200; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = 2 + Math.random() * 7;
    pieces.push({
      x: cx, y: cy,
      vx: Math.cos(a)*s, vy: Math.sin(a)*s - 4,
      alpha: 1, r: 2 + Math.random()*3,
      color: colors[i % colors.length],
    });
  }
  function draw() {
    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];
      p.x += p.vx; p.y += p.vy; p.vy += .08; p.alpha -= .016;
      if (p.alpha <= 0) { pieces.splice(i,1); continue; }
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
    if (pieces.length > 0) requestAnimationFrame(draw);
  }
  draw();
}


/* ════════════════════════════════════════════════════════════
   SHARE BUTTON
════════════════════════════════════════════════════════════ */

/**
 * Uses the Web Share API if available (mobile), otherwise
 * falls back to copying the page URL to clipboard.
 */
function shareCard() {
  const shareData = {
    title: `Happy Birthday ${CONFIG.name}! 🎂`,
    text:  `A special birthday surprise for ${CONFIG.name}! 🎉`,
    url:   window.location.href,
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard! 📋 Share it with someone special 💌");
    }).catch(() => {
      alert("Share this link: " + window.location.href);
    });
  }
}


/* ════════════════════════════════════════════════════════════
   BACKGROUND MUSIC TOGGLE
════════════════════════════════════════════════════════════ */

function initMusicButton() {
  const btn   = document.getElementById("music-btn");
  const audio = document.getElementById("bg-music");
  const icon  = document.getElementById("music-icon");

  audio.volume = 0.35;  // gentle background volume

  btn.addEventListener("click", () => {
    if (musicPlaying) {
      audio.pause();
      icon.textContent = "🔇";
      btn.classList.remove("playing");
      musicPlaying = false;
    } else {
      audio.play().then(() => {
        icon.textContent = "🎵";
        btn.classList.add("playing");
        musicPlaying = true;
      }).catch(() => {
        // Autoplay blocked — inform user to click again
        icon.textContent = "🎵";
      });
    }
  });
}


/* ════════════════════════════════════════════════════════════
   BACKGROUND PARTICLES
════════════════════════════════════════════════════════════ */

/**
 * Spawns small floating dots in the global particles layer.
 * Purely decorative — adds depth to the dark background.
 */
function spawnParticles() {
  const layer = document.getElementById("particles-layer");
  for (let i = 0; i < CONFIG.particleCount; i++) {
    const el = document.createElement("span");
    el.classList.add("particle");
    el.style.setProperty("--x",   Math.random() * 100 + "%");
    el.style.setProperty("--dur", 7 + Math.random() * 10 + "s");
    el.style.setProperty("--del", Math.random() * 12 + "s");
    // Vary size and brightness
    const size = 2 + Math.random() * 3;
    el.style.width  = size + "px";
    el.style.height = size + "px";
    el.style.opacity = 0.15 + Math.random() * 0.4;
    layer.appendChild(el);
  }
}


/* ════════════════════════════════════════════════════════════
   WINDOW RESIZE — keep canvases full-screen
════════════════════════════════════════════════════════════ */

window.addEventListener("resize", () => {
  const fw = document.getElementById("fireworks-canvas");
  if (fw) { fw.width = window.innerWidth; fw.height = window.innerHeight; }
  const cf = document.getElementById("confetti-canvas");
  if (cf) { cf.width = window.innerWidth; cf.height = window.innerHeight; }
});