/* ===================== INIT ===================== */
document.addEventListener('DOMContentLoaded', () => {
  setFavicon();
  buildNav();
  buildHero();
  buildSocials();
  buildProjects();
  buildCats();
  buildClock();
  initScrollReveal();
  initNavHighlight();
  startHeroAnimations();
  fetchLanyard();
  fetchNowPlaying();
  fetchGitHub();
  fetchReddit();
  setInterval(fetchNowPlaying, 30000);
  setInterval(fetchLanyard, 15000);
  setInterval(fetchGitHub, 60000);
  setInterval(fetchReddit, 60000);
  startClocks();
});

/* ===================== FAVICON ===================== */
function setFavicon() {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = CONFIG.profilePicUrl;
  document.head.appendChild(link);
  document.title = CONFIG.pageTitle;
}

/* ===================== NAV ===================== */
const NAV_ITEMS = [
  { id: 'hero',     label: 'Home',     icon: svgHome() },
  { id: 'socials',  label: 'Socials',  icon: svgGlobe() },
  { id: 'projects', label: 'Projects', icon: svgFolder() },
  { id: 'cats',     label: 'Cats',     icon: svgCat() },
  { id: 'clock',    label: 'Clock',    icon: svgClock() },
];

function buildNav() {
  const pill = document.getElementById('nav-pill');
  NAV_ITEMS.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.dataset.target = item.id;
    btn.title = item.label;
    btn.innerHTML = item.icon;
    btn.addEventListener('click', () => {
      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
    });
    pill.appendChild(btn);
  });
}

function initNavHighlight() {
  const sections = NAV_ITEMS.map(n => document.getElementById(n.id)).filter(Boolean);
  const btns = document.querySelectorAll('.nav-btn');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        btns.forEach(b => b.classList.remove('active'));
        const active = document.querySelector(`.nav-btn[data-target="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => obs.observe(s));
}

/* ===================== HERO ===================== */
function buildHero() {
  const section = document.getElementById('hero');
  section.innerHTML = `
    <div class="section-inner hero-inner">
      <div class="hero-profile-wrap">
        <img class="hero-avatar" src="${CONFIG.profilePicUrl}" alt="${CONFIG.name}" />
      </div>
      <h1 class="hero-name">${CONFIG.name}</h1>
      <div class="presence-pill" id="presence-pill">
        <span class="presence-dot" id="presence-dot"></span>
        <span id="presence-text">Loading...</span>
      </div>
      <div class="now-playing-card" id="now-playing-card">
        <img class="now-playing-art" id="np-art" src="https://placehold.co/48x48" alt="Album art" />
        <div class="now-playing-info">
          <div class="now-playing-label" id="np-label">Now Playing</div>
          <div class="now-playing-track" id="np-track">—</div>
          <div class="now-playing-artist" id="np-artist">—</div>
        </div>
        <div class="now-playing-eq" id="np-eq">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  `;
}

function startHeroAnimations() {
  const pill = document.getElementById('nav-pill');
  setTimeout(() => pill.classList.add('visible'), 400);

  const profileWrap = document.querySelector('.hero-profile-wrap');
  const name = document.querySelector('.hero-name');
  const presencePill = document.getElementById('presence-pill');
  const nowPlaying = document.getElementById('now-playing-card');

  setTimeout(() => profileWrap?.classList.add('visible'), 300);
  setTimeout(() => name?.classList.add('visible'), 500);
  setTimeout(() => presencePill?.classList.add('visible'), 750);
  setTimeout(() => nowPlaying?.classList.add('visible'), 1000);
}

/* ===================== PROJECTS ===================== */
function buildProjects() {
  const section = document.getElementById('projects');
  const list = CONFIG.projects.map((p, i) => `
    <div class="project-row reveal" data-project="${i}" style="transition-delay:${i * 0.06}s">
      <div class="project-row-left">
        <span class="badge ${p.status === 'live' ? 'badge-live' : 'badge-dev'}">${p.status === 'live' ? 'Live' : 'In Dev'}</span>
        <div>
          <div class="project-row-name">${p.name}</div>
          <div class="project-row-desc">${p.description}</div>
        </div>
      </div>
      <span class="project-row-arrow">${svgChevron()}</span>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="section-inner">
      <h2 class="section-title reveal">Projects</h2>
      <div class="projects-list">${list}</div>
    </div>
  `;

  section.querySelectorAll('.project-row').forEach(row => {
    row.addEventListener('click', () => openProjectModal(parseInt(row.dataset.project)));
  });
}

function openProjectModal(index) {
  const p = CONFIG.projects[index];
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('modal');

  let linksHtml = '';
  if (p.isCurrent) {
    linksHtml = `<span class="modal-current">You're already here ✦</span>`;
  } else if (p.links && p.links.length > 0) {
    linksHtml = p.links.map(l => `
      <a class="modal-link" href="${l.url}" target="_blank" rel="noopener">
        ${svgExternalLink()} ${l.label}
      </a>
    `).join('');
  }

  modal.innerHTML = `
    <div class="modal-handle"></div>
    <button class="modal-close" id="modal-close-btn">✕</button>
    <div class="modal-name">${p.name}</div>
    <span class="badge ${p.status === 'live' ? 'badge-live' : 'badge-dev'}" style="margin-bottom:14px;display:inline-block">${p.status === 'live' ? 'Live' : 'In Development'}</span>
    <div class="modal-desc">${p.description}</div>
    <div class="modal-links">${linksHtml}</div>
  `;

  backdrop.classList.add('open');
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
}

function closeModal() {
  document.getElementById('modal-backdrop').classList.remove('open');
}

/* ===================== CATS ===================== */
function buildCats() {
  const section = document.getElementById('cats');
  const grid = CONFIG.cats.map((cat, i) => `
    <div class="cat-item" data-cat="${i}" style="transition-delay:${i * 0.08}s">
      <img src="${cat.url}" alt="${cat.name || 'Cat'}" loading="lazy" />
      ${cat.name ? `<div class="cat-name-overlay">${cat.name}</div>` : ''}
    </div>
  `).join('');

  section.innerHTML = `
    <div class="section-inner">
      <h2 class="section-title reveal">Cats 🐱</h2>
      <div class="cats-grid">${grid}</div>
    </div>
  `;

  section.querySelectorAll('.cat-item').forEach(item => {
    item.addEventListener('click', () => {
      const cat = CONFIG.cats[parseInt(item.dataset.cat)];
      openLightbox(cat);
    });
  });
}

function openLightbox(cat) {
  const lb = document.getElementById('lightbox');
  lb.querySelector('img').src = cat.url;
  lb.querySelector('.lightbox-name').textContent = cat.name || '';
  lb.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

/* ===================== CLOCK ===================== */
function buildClock() {
  const section = document.getElementById('clock');
  section.innerHTML = `
    <div class="section-inner" style="text-align:center;">
      <div class="big-clock reveal" id="big-clock"><span class="clock-hms">00:00:00</span><span class="clock-ms">.000</span></div>
      <div class="clock-label reveal">United Kingdom</div>
    </div>
  `;
}

function startClocks() {
  function tick() {
    const now = new Date();
    const ukStr = now.toLocaleString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const parts = ukStr.split(':');
    const h = parts[0] || '00';
    const m = parts[1] || '00';
    const s = parts[2] || '00';
    const ms = String(now.getMilliseconds()).padStart(3, '0');

    const bigClock = document.getElementById('big-clock');
    if (bigClock) bigClock.innerHTML = `<span class="clock-hms">${h}:${m}:${s}</span><span class="clock-ms">.${ms}</span>`;

    requestAnimationFrame(tick);
  }
  tick();
}

/* ===================== SOCIALS ===================== */
// Reordered: Discord, Reddit, GitHub first
const SOCIAL_ORDER = ['discord', 'reddit', 'github', 'twitter', 'instagram', 'mail', 'shield'];

function buildSocials() {
  const section = document.getElementById('socials');

  const sorted = [...CONFIG.socials].sort((a, b) => {
    const ai = SOCIAL_ORDER.indexOf(a.icon);
    const bi = SOCIAL_ORDER.indexOf(b.icon);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  const cards = sorted.map((s, i) => {
    const tag = s.url ? 'a' : 'div';
    const attrs = s.url ? `href="${s.url}" target="_blank" rel="noopener"` : '';
    const originalIndex = CONFIG.socials.indexOf(s);

    let subHtml = '';
    if (s.showPresence) {
      subHtml = `<span class="presence-dot" id="social-presence-dot-${originalIndex}"></span><span class="social-sub-text" id="social-sub-${originalIndex}">—</span>`;
    } else if (s.showKarma) {
      subHtml = `<span class="social-sub-text" id="social-sub-${originalIndex}">— karma</span>`;
    } else if (s.showCommit) {
      subHtml = `<span class="social-sub-text" id="social-sub-${originalIndex}">loading...</span>`;
    }

    return `
      <${tag} class="social-card reveal" ${attrs} data-social="${originalIndex}" style="transition-delay:${i * 0.07}s">
        <div class="social-card-left">
          <div class="social-icon">${getSocialIcon(s.icon)}</div>
          <div class="social-info">
            <div class="social-platform">${s.platform}</div>
            ${subHtml ? `<div class="social-sub">${subHtml}</div>` : ''}
          </div>
        </div>
        <span class="social-handle">${s.handle}</span>
      </${tag}>
    `;
  }).join('');

  section.innerHTML = `
    <div class="section-inner">
      <h2 class="section-title reveal">Socials</h2>
      <div class="socials-list">${cards}</div>
    </div>
  `;
}

/* ===================== LANYARD ===================== */
async function fetchLanyard() {
  if (!CONFIG.discordUserId || CONFIG.discordUserId === 'YOUR_DISCORD_USER_ID') {
    updatePresence('offline', 'Offline');
    return;
  }
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${CONFIG.discordUserId}`);
    const data = await res.json();
    if (!data.success) return;
    const { discord_status, activities } = data.data;
    let statusText = discord_status.charAt(0).toUpperCase() + discord_status.slice(1);
    const activity = activities?.find(a => a.type === 0);
    if (activity) statusText = `Playing ${activity.name}`;
    updatePresence(discord_status, statusText);
  } catch (e) {
    updatePresence('offline', 'Offline');
  }
}

function updatePresence(status, text) {
  const dot = document.getElementById('presence-dot');
  const textEl = document.getElementById('presence-text');
  if (dot) dot.className = 'presence-dot ' + status;
  if (textEl) textEl.textContent = text;

  CONFIG.socials.forEach((s, i) => {
    if (s.showPresence) {
      const d = document.getElementById(`social-presence-dot-${i}`);
      const t = document.getElementById(`social-sub-${i}`);
      if (d) d.className = 'presence-dot ' + status;
      if (t) t.textContent = text;
    }
  });
}

/* ===================== LAST.FM ===================== */
async function fetchNowPlaying() {
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${CONFIG.lastfmUsername}&api_key=${CONFIG.lastfmApiKey || '3b3d8c3e3e3e3e3e3e3e3e3e3e3e3e3e'}&format=json&limit=1`;
    const res = await fetch(url);
    const data = await res.json();
    const tracks = data?.recenttracks?.track;
    if (!tracks || tracks.length === 0) return;
    const track = Array.isArray(tracks) ? tracks[0] : tracks;
    const isNowPlaying = track['@attr']?.nowplaying === 'true';
    const name = track.name || '—';
    const artist = track.artist?.['#text'] || '—';
    const art = track.image?.find(i => i.size === 'medium')?.['#text'] || 'https://placehold.co/48x48';

    document.getElementById('np-track').textContent = name;
    document.getElementById('np-artist').textContent = artist;
    document.getElementById('np-art').src = art || 'https://placehold.co/48x48';
    document.getElementById('np-label').textContent = isNowPlaying ? 'Now Playing' : 'Last Played';

    const eq = document.getElementById('np-eq');
    if (eq) eq.className = 'now-playing-eq' + (isNowPlaying ? '' : ' paused');
  } catch (e) {
    const el = document.getElementById('np-track');
    if (el) el.textContent = 'Unavailable';
  }
}

/* ===================== GITHUB ===================== */
async function fetchGitHub() {
  try {
    const res = await fetch(`https://api.github.com/users/${CONFIG.githubUsername}/events/public`);
    const events = await res.json();
    const pushEvent = events?.find(e => e.type === 'PushEvent');
    if (!pushEvent) {
      const el = document.getElementById('github-commit-text');
      if (el) el.textContent = 'No recent commits';
      return;
    }
    const commit = pushEvent.payload?.commits?.[pushEvent.payload.commits.length - 1];
    const message = commit?.message?.split('\n')[0] || 'No message';
    const timeAgo = getTimeAgo(new Date(pushEvent.created_at));

    CONFIG.socials.forEach((s, i) => {
      if (s.showCommit) {
        const sub = document.getElementById(`social-sub-${i}`);
        if (sub) sub.textContent = `${message.slice(0, 28)}${message.length > 28 ? '…' : ''} · ${timeAgo}`;
      }
    });
  } catch (e) {}
}

/* ===================== REDDIT ===================== */
async function fetchReddit() {
  try {
    const res = await fetch(`https://www.reddit.com/user/${CONFIG.redditUsername}/about.json`);
    const data = await res.json();
    const karma = (data?.data?.link_karma || 0) + (data?.data?.comment_karma || 0);
    const formatted = karma.toLocaleString();

    CONFIG.socials.forEach((s, i) => {
      if (s.showKarma) {
        const sub = document.getElementById(`social-sub-${i}`);
        if (sub) sub.textContent = `${formatted} karma`;
      }
    });
  } catch (e) {}
}

/* ===================== SCROLL REVEAL ===================== */
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .cat-item, .social-card').forEach(el => obs.observe(el));
}

/* ===================== HELPERS ===================== */
function getTimeAgo(date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

/* ===================== SVG ICONS ===================== */
function svgHome() {
  return `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
}
function svgGlobe() {
  return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
}
function svgFolder() {
  return `<svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;
}
function svgCat() {
  return `<svg viewBox="0 0 24 24" stroke-width="1.8"><path d="M12 5C5.5 5 3 9 3 13c0 4 2.5 6 5 6h8c2.5 0 5-2 5-6 0-4-2.5-8-9-8z"/><path d="M8 5V2l3 3"/><path d="M16 5V2l-3 3"/><circle cx="9" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1" fill="currentColor" stroke="none"/><path d="M10 17c.5.5 1 .7 2 .7s1.5-.2 2-.7"/></svg>`;
}
function svgClock() {
  return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
}
function svgChevron() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
}
function svgExternalLink() {
  return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
}

function getSocialIcon(name) {
  const icons = {
    github:    `<svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
    twitter:   `<svg viewBox="0 0 24 24"><path d="M4 4l16 16M4 20L20 4"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
    discord:   `<svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>`,
    reddit:    `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="10"/><path d="M16.5 11.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S15 13.83 15 13s.67-1.5 1.5-1.5zM7.5 11.5C8.33 11.5 9 12.17 9 13s-.67 1.5-1.5 1.5S6 13.83 6 13s.67-1.5 1.5-1.5zM9 16.5s1 1.5 3 1.5 3-1.5 3-1.5M12 7c-2.5 0-4.5 1-5.5 2.5M12 7c2.5 0 4.5 1 5.5 2.5"/></svg>`,
    mail:      `<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    shield:    `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  };
  return icons[name] || icons['mail'];
}
