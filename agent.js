/**
 * BOLEA AI // LABS-01 AGENT ENGINE
 * Powered by FreeLLMAPI Gateway (https://github.com/tashfeenahmed/freellmapi)
 * Zero-Downtime Multi-Model Failover & Autonomous Client-Side Tool Calling
 */

(function () {
  // FreeLLMAPI Gateway Configuration
  // Points to self-hosted FreeLLMAPI router instance (defaults to ai.bolealabs.site or fallback engine)
  const GATEWAY_URL = window.FREELLMAPI_GATEWAY || "https://ai.bolealabs.site/v1/chat/completions";
  const MODEL_NAME = window.FREELLMAPI_MODEL || "freellmapi-auto-failover";

  // System Knowledge Context
  const KNOWLEDGE_GRAPH = {
    founder: {
      name: "Christian Louis Bolea",
      role: "Student Software Developer & Automation Engineer",
      school: "Manuel S. Enverga University Foundation (MSEUF) - Lucena City, Quezon",
      degree: "Bachelor of Science in Information Technology (Major in Web and Mobile Application Development)",
      expectedGraduation: 2027,
      ojtRequirement: "486–500 Hours Practicum",
      contacts: {
        email: "contact@bolealabs.site",
        academicEmail: "A21-32404@student.mseuf.edu.ph",
        linkedin: "https://www.linkedin.com/in/christian-bolea-264670252/",
        github: "https://github.com/Cbolea23",
        phone: "+63 976 253 9052"
      }
    },
    flagship: {
      name: "NiyoSense (CCMS Capstone Project)",
      role: "Lead Mobile & Full-Stack Developer",
      url: "https://niyosense.me",
      apk: "https://github.com/Cbolea23/niyosense-capstone/releases/tag/v1.5.2",
      repo: "https://github.com/Cbolea23/niyosense-capstone",
      accuracy: "92.8% Fused Classification Accuracy",
      isoScore: "4.84 / 5.00 ISO/IEC 25010 Software Quality Rating",
      stack: "Flutter 3.x, Dart SDK, Django 6.1 (Python), PostgreSQL, SQLite Offline Cache, TFLite (YOLOv8-cls), Mel-Spectrogram Audio DSP, Cloudflare Edge, Render Cloud",
      formula: "P_final(c) = (0.70 * P_audio) + (0.30 * P_visual)",
      safeguards: "3-Gate OOD: Gate 1 (HSV chromaticity [36°, 148°] + Sobel texture), Gate 2 (Acoustic 300Hz HPF + 128-band Mel DSP), Gate 3 (Temperature Scaling T=1.6)"
    },
    studio: {
      name: "Bolea Labs",
      domain: "bolealabs.site",
      capabilities: [
        "Edge AI & Mobile Engineering (Flutter, Kotlin, TFLite, DSP)",
        "Programmatic Video Automation (Remotion, Node.js, FFmpeg, Lip-Sync)",
        "Multi-Platform Creator Tools (TikTok Content Posting API, YouTube Data API, Meta Graph API)",
        "Full-Stack Cloud Portals & PWAs (Django 6.1, Next.js, PostgreSQL)",
        "AI Agent Workflows & Commercial Skills (Agensi Marketplace)"
      ],
      channels: [
        { platform: "TikTok (Primary)", handle: "@adaybackthenofficial", url: "https://www.tiktok.com/@adaybackthenofficial" },
        { platform: "TikTok (Secondary)", handle: "@adaybackthen2official", url: "https://www.tiktok.com/@adaybackthen2official" },
        { platform: "YouTube", handle: "@adaybackthenofficial", url: "https://www.youtube.com/@adaybackthenofficial" },
        { platform: "Facebook", handle: "/adaybackthenofficial", url: "https://www.facebook.com/adaybackthenofficial/" },
        { platform: "Instagram", handle: "@adaybackthenofficial", url: "https://www.instagram.com/adaybackthenofficial/" }
      ]
    },
    websiteTech: {
      name: "Bolea Labs Studio & Portfolio Engine (bolealabs.site)",
      stack: "HTML5 Canvas 2D Spatial Physics (60 FPS), Vanilla ES2026, 3D CSS Matrix Shaders, Web Crypto API (SHA-256) CV Vault, FreeLLMAPI Smart Gateway, GitHub Pages Edge CDN, TLS 1.3"
    },
    certifications: [
      { name: "Backend Development and API Creation", issuer: "Packt", date: "Apr 7, 2026", id: "13BPR5I0J77P", url: "https://coursera.org/verify/13BPR5I0J77P" },
      { name: "Frontend Development with React", issuer: "Packt", date: "May 3, 2026", id: "L7GDU9MZ94WN", url: "https://coursera.org/verify/L7GDU9MZ94WN" },
      { name: "Database Structures and Management with MySQL", issuer: "Meta", date: "Oct 20, 2025", id: "ASZT80EG1ATO", url: "https://coursera.org/verify/ASZT80EG1ATO" },
      { name: "Introduction to Front-End Development", issuer: "Meta", date: "Oct 17, 2025", id: "PH3F7R5EW865", url: "https://coursera.org/verify/PH3F7R5EW865" },
      { name: "Foundations of Cybersecurity", issuer: "Google", date: "Oct 8, 2025", id: "G4S3PIR857ID", url: "https://coursera.org/verify/G4S3PIR857ID" },
      { name: "Flutter and Dart: Developing iOS, Android, and Mobile Apps", issuer: "IBM", date: "May 6, 2025", id: "RU6NWZOOYURW", url: "https://coursera.org/verify/RU6NWZOOYURW" }
    ]
  };

  // Inject UI Markup
  function initAgentUI() {
    const isPortfolioPage = window.location.pathname.includes('/portfolio');

    const html = `
      <!-- Launcher Button -->
      <div id="agentLauncher" title="Open Bolea AI Assistant">
        <div class="agent-launcher-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><rect x="4" y="8" width="16" height="12" rx="2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M9 17h6"/></svg>
          <span class="agent-online-dot"></span>
        </div>
        <div class="agent-launcher-text">
          <div class="agent-launcher-title">Bolea <span>AI</span></div>
          <div class="agent-launcher-sub">LABS-01 // FreeLLMAPI</div>
        </div>
      </div>

      <!-- Agent Chat Window -->
      <div id="agentWindow">
        <div class="agent-header">
          <div class="agent-header-info">
            <div class="agent-launcher-icon" style="width:28px; height:28px; font-size:0.85rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M9 17h6"/></svg>
            </div>
            <div>
              <div style="font-weight:700; font-size:0.92rem; color:#fff;">Bolea AI // LABS-01</div>
              <div class="agent-badge-model">Router: FreeLLMAPI &bull; 429 Failover</div>
            </div>
          </div>
          <div class="agent-header-controls">
            <button class="agent-btn-icon" onclick="window.BoleaAgent.clearChat()" title="Reset chat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            </button>
            <button class="agent-btn-icon" onclick="window.BoleaAgent.toggle()" title="Close">&times;</button>
          </div>
        </div>

        <div class="agent-messages" id="agentMessages">
          <div class="agent-msg bot">
            <div class="msg-sender">BOLEA AI // SYSTEM</div>
            <div class="msg-bubble">
              Hello. I am <strong>Bolea AI (LABS-01)</strong>, the technical concierge for Bolea Labs and Christian's OJT portfolio. Powered by the <strong>FreeLLMAPI smart router</strong>.
              <br><br>
              How can I assist you? I can analyze Christian's technical fit for an internship, explain our edge AI models, or navigate the project portfolio.
            </div>
          </div>
        </div>

        <!-- Quick Prompt Chips -->
        <div class="agent-quick-chips">
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('Match Christian for an OJT / Software Developer role')">Match for OJT</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('Explain the NiyoSense AI formula and architecture')">NiyoSense AI</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('What are the official creator channels?')">Official Channels</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('How is bolealabs.site engineered?')">Site Architecture</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('Unlock and download Christian\\'s resume')">Unlock Resume</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('Filter projects to mobile apps')">Filter: Mobile</button>
        </div>

        <!-- Input Bar -->
        <div class="agent-input-bar">
          <input type="text" id="agentInput" class="agent-input" placeholder="Ask about projects, OJT fit, tech stack, channels..." autocomplete="off">
          <button class="agent-send-btn" id="agentSendBtn" onclick="window.BoleaAgent.send()" aria-label="Send message">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.id = 'boleaAgentContainer';
    container.innerHTML = html;
    document.body.appendChild(container);

    // Event Listeners
    document.getElementById('agentLauncher').addEventListener('click', () => window.BoleaAgent.toggle());
    document.getElementById('agentInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') window.BoleaAgent.send();
    });
  }

  // Autonomous Reasoning & Response Synthesizer
  async function generateResponse(prompt) {
    const q = prompt.toLowerCase();

    // 1. Try FreeLLMAPI Gateway first if accessible
    try {
      const response = await fetch(GATEWAY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            {
              role: "system",
              content: `You are Bolea AI (LABS-01), the technical intelligence concierge of Bolea Labs (bolealabs.site) and Christian Louis Bolea.
Founded by Christian Louis Bolea, 3rd-year BSIT student at MSEUF majoring in Web and Mobile Application Development.
Seeking a 486-500 hour OJT / Software Engineering internship.
Projects:
1. NiyoSense (niyosense.me): Lead Mobile & Full-Stack Developer. Flutter 3.x, Django 6.1, PostgreSQL, TFLite YOLOv8-cls visual + 128-band Mel DSP acoustic knock fusion. 92.8% fused accuracy, 4.84/5.00 ISO/IEC 25010. Formula: P_final = 0.70*P_audio + 0.30*P_visual.
2. Bolea Labs Platform & Portfolio Engine (bolealabs.site): Zero-framework HTML5 Canvas 2D physics, 3D CSS matrix shaders, Web Crypto API (SHA-256) CV vault, FreeLLMAPI smart router gateway.
3. A Day Back Then: Remotion programmatic video factory, 58+ published episodes, TikTok Content Posting API, YouTube Data API, Meta Graph API.
4. Content Operations Dashboard: Next.js PWA, persistent jobs.
5. 24/7 RTMP Livestream Relay: FFmpeg continuous loop, self-healing watchdog.
6. Agensi AI Skills: 6 commercialized AI workflow packages.
7. Trivia Arena: Kotlin, Jetpack Compose, MVVM, Firebase Firestore atomic transactions.
8. Online Banking & Enrollment API: Django REST Framework, SimpleJWT auth.
9. BrainRot Galaxy! (com.coconut.brainrot_galaxy): Published commercial mobile Gacha TCG & 3D battler on Google Play Store. 45 collectible cards, upgraded to Godot 4.5+ with 3D Pokémon-style isometric turn-based combat, physical 3D coin toss, holographic foil shaders, pack opening physics, and synthesized retro audio.
Certifications (all on Coursera):
- Packt Backend Development & API Creation (13BPR5I0J77P)
- Packt Frontend Development with React (L7GDU9MZ94WN)
- Meta Database Structures & MySQL (ASZT80EG1ATO)
- Meta Intro to Front-End (PH3F7R5EW865)
- Google Foundations of Cybersecurity (G4S3PIR857ID)
- IBM Flutter & Dart Mobile Apps (RU6NWZOOYURW)
Always be concise, technical, precise, and enthusiastic.`
            },
            { role: "user", content: prompt }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
          return { text: data.choices[0].message.content, action: null };
        }
      }
    } catch (e) {
      // Fallback to local high-precision reasoning engine
    }

    // 2. High-Precision Local Knowledge Engine & UI Tool-Calling
    if (q.includes("match") || q.includes("ojt") || q.includes("hire") || q.includes("role") || q.includes("intern")) {
      return {
        text: `**OJT Candidate Match Analysis for Christian Louis Bolea:**
• **Target Practicum:** 486–500 Hours (MSEUF BSIT, Web & Mobile App Development)
• **Key Specializations:**
  1. **Mobile Development (Flutter/Dart & Kotlin):** Lead architect of *NiyoSense* (offline-first dual-model edge AI) and *Trivia Arena* (Jetpack Compose, MVVM).
  2. **Full-Stack & Backend (Python/Django & Next.js):** Built centralized REST APIs on Django 6.1 with PostgreSQL and SimpleJWT authentication.
  3. **DevOps & Media Automation:** Remotion video factory, 24/7 FFmpeg RTMP broadcast loops, and FreeLLMAPI gateway routing.
• **Certifications:** 6 verified credentials from **IBM**, **Google**, **Meta**, and **Packt**.
• **Availability:** Immediate start (Remote, Hybrid, Lucena City, or Metro Manila).`,
        action: { label: "Open CV Vault (PIN: 2026)", fn: "openPinModal" }
      };
    }

    if (q.includes("niyosense") || q.includes("formula") || q.includes("grading") || q.includes("coconut") || q.includes("acoustic")) {
      return {
        text: `**NiyoSense Dual-Model AI Architecture:**
• **Acoustic-Dominant Late Fusion Rule:**
  $$\\mathbf{P_{\\text{final}}(c) = (0.70 \\times P_{\\text{audio}}) + (0.30 \\times P_{\\text{visual}})}$$
• **The Innovation:** Outer green husks of young and medium coconuts look near-identical, but internal meat thickness strongly modulates acoustic knock resonance.
• **Edge AI Pipeline:**
  1. Standardized 4.0s knock recording (22,050 Hz PCM) converted on-device to a **128-band Slaney Mel-spectrogram**.
  2. Dual standalone **YOLOv8-cls** TFLite neural networks running 100% offline in Flutter.
  3. **3-Gate Safeguard:** HSV chromaticity filter + 300Hz high-pass filter + temperature scaling ($T=1.6$).
• **Results:** **92.8% Fused Accuracy** & **4.84 / 5.00 ISO/IEC 25010** software quality score.`,
        action: { label: "Visit Live Portal (niyosense.me)", link: "https://niyosense.me" }
      };
    }

    if (q.includes("channel") || q.includes("social") || q.includes("tiktok") || q.includes("youtube") || q.includes("facebook") || q.includes("instagram") || q.includes("watch")) {
      return {
        text: `**A Day Back Then &bull; Verified Creator Channels:**\n
• **TikTok (Primary):** [tiktok.com/@adaybackthenofficial](https://www.tiktok.com/@adaybackthenofficial)
• **TikTok (Secondary):** [tiktok.com/@adaybackthen2official](https://www.tiktok.com/@adaybackthen2official)
• **YouTube:** [youtube.com/@adaybackthenofficial](https://www.youtube.com/@adaybackthenofficial)
• **Facebook:** [facebook.com/adaybackthenofficial](https://www.facebook.com/adaybackthenofficial/)
• **Instagram:** [instagram.com/adaybackthenofficial](https://www.instagram.com/adaybackthenofficial/)\n
All content is produced via Bolea Labs' Remotion &amp; Node.js programmatic video factory and published through official OAuth human review gates.`,
        action: { label: "Open Creator Tool & Shows", link: "/adaybackthen.html" }
      };
    }

    if (q.includes("tech stack") || q.includes("how is this") || q.includes("engineered") || q.includes("freellmapi") || q.includes("canvas")) {
      return {
        text: `**Bolea Labs Studio Platform Engineering (bolealabs.site):**
• **FreeLLMAPI Gateway:** Integrated OpenAI-compatible gateway (\`tashfeenahmed/freellmapi\`) pooling free-tier keys (Gemini, Groq, Cerebras, GitHub Models) with automatic 429 failover.
• **Visual Physics:** 60 FPS HTML5 Canvas 2D neural particle network calculating real-time Euclidean distance vectors.
• **Spatial Shaders:** 3D CSS perspective transforms (\`rotateX\`, \`rotateY\`) coupled with cursor-tracked radial specular lighting.
• **Client Cryptography:** Web Crypto API (\`crypto.subtle.digest\`) SHA-256 hash validation for the resume vault.
• **Edge Performance:** Zero-dependency vanilla ES2026 deployed via Fastly / GitHub Edge CDN with automated TLS 1.3.`,
        action: { label: "View Site Architecture Section", fn: "scrollToSiteTech" }
      };
    }

    if (q.includes("resume") || q.includes("cv") || q.includes("pin") || q.includes("download")) {
      return {
        text: `Christian's verified PDF resume is protected in our **Client-Side SHA-256 Vault**.
Recruiters and hiring managers can unlock it instantly using:
• **Default Recruiter PIN:** \`2026\`

I can open the vault for you right now:`,
        action: { label: "Open CV Vault Now", fn: "openPinModal" }
      };
    }

    if (q.includes("brainrot") || q.includes("galaxy") || q.includes("play store") || q.includes("gacha") || q.includes("tcg") || q.includes("godot")) {
      return {
        text: `**BrainRot Galaxy! Mobile Gacha TCG & 3D Combat Engine:**
• **Google Play Publication:** Verified live production title published under package ID \`com.coconut.brainrot_galaxy\`.
• **Gameplay & Content:** 45 collectible viral meme fighters across 5 rarity tiers (Common to Legendary), mid-battle tactical consumables, and daily login rewards.
• **Engine Upgrade (Godot 4.5+):** Evolved from Flutter/Android client into a high-performance 3D Pokémon-style turn-based combat engine with an isometric diagonal battle arena, physical 3D coin toss turn decider, holographic foil card shaders, anticipation pack-ripping physics, and custom retro audio synthesis.`,
        action: { label: "View on Google Play Store", link: "https://play.google.com/store/apps/details?id=com.coconut.brainrot_galaxy" }
      };
    }

    if (q.includes("mobile") || q.includes("flutter") || q.includes("android")) {
      return {
        text: `Christian has extensive mobile engineering experience across **Flutter & Dart**, **Godot 4.5+ (Mobile)**, and **Kotlin & Jetpack Compose**:
1. **NiyoSense Field App:** Offline-first Flutter app running dual TFLite neural networks and real-time Mel-spectrogram DSP.
2. **BrainRot Galaxy! (Google Play Store):** Live published commercial mobile TCG & Gacha game (\`com.coconut.brainrot_galaxy\`) upgraded to Godot 4.5+ 3D Pokémon-style combat.
3. **Trivia Arena:** Native Android RPG game built with Kotlin, Jetpack Compose (MVVM), and atomic Firebase Firestore transactions.`,
        action: { label: "Filter Portfolio to Mobile Projects", fn: "filterMobile" }
      };
    }

    if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach")) {
      return {
        text: `You can reach Christian directly for OJT opportunities or studio inquiries:
• **Studio Email:** \`contact@bolealabs.site\`
• **Academic Email:** \`A21-32404@student.mseuf.edu.ph\`
• **LinkedIn:** \`https://www.linkedin.com/in/christian-bolea-264670252/\`
• **GitHub:** \`https://github.com/Cbolea23\``,
        action: { label: "Copy contact@bolealabs.site", fn: "copyEmail" }
      };
    }

    // Default Fallback
    return {
      text: `Christian Louis Bolea is a **BSIT student at MSEUF** and founder of **Bolea Labs**, specializing in **Flutter mobile edge AI**, **Django/Next.js backend portals**, and **Remotion programmatic media pipelines**.

Feel free to ask about:
1. His **OJT availability** & skill match (486–500 hours).
2. The **NiyoSense AI capstone** (92.8% accuracy, 70/30 late fusion).
3. The **A Day Back Then creator publishing suite** and verified channels.
4. His **6 verified Coursera certifications** (Google, Meta, IBM, Packt).
5. The **FreeLLMAPI & Canvas physics engine** powering this website.`,
      action: { label: "Open Full Portfolio (9 Projects)", link: "/portfolio/" }
    };
  }

  // Global Agent Controller
  window.BoleaAgent = {
    toggle: function () {
      const win = document.getElementById('agentWindow');
      if (win) {
        win.classList.toggle('open');
        if (win.classList.contains('open')) {
          setTimeout(() => document.getElementById('agentInput').focus(), 150);
        }
      }
    },
    clearChat: function () {
      const msgBox = document.getElementById('agentMessages');
      if (msgBox) {
        msgBox.innerHTML = `
          <div class="agent-msg bot">
            <div class="msg-sender">BOLEA AI // SYSTEM</div>
            <div class="msg-bubble">
              Chat session cleared. How can I assist you with Christian's portfolio or Bolea Labs systems?
            </div>
          </div>
        `;
      }
    },
    sendChip: function (text) {
      document.getElementById('agentInput').value = text;
      this.send();
    },
    send: async function () {
      const input = document.getElementById('agentInput');
      const msgBox = document.getElementById('agentMessages');
      const text = input.value.trim();
      if (!text) return;

      // Add user message
      const userDiv = document.createElement('div');
      userDiv.className = 'agent-msg user';
      userDiv.innerHTML = `<div class="msg-sender">YOU</div><div class="msg-bubble">${escapeHTML(text)}</div>`;
      msgBox.appendChild(userDiv);
      input.value = '';
      msgBox.scrollTop = msgBox.scrollHeight;

      // Add typing placeholder
      const botDiv = document.createElement('div');
      botDiv.className = 'agent-msg bot';
      botDiv.innerHTML = `<div class="msg-sender">BOLEA AI // FREELLMAPI</div><div class="msg-bubble"><em>Thinking...</em></div>`;
      msgBox.appendChild(botDiv);
      msgBox.scrollTop = msgBox.scrollHeight;

      // Generate response
      const result = await generateResponse(text);

      let actionHTML = '';
      if (result.action) {
        if (result.action.fn) {
          actionHTML = `<br><button class="agent-action-pill" onclick="window.BoleaAgent.executeAction('${result.action.fn}')">${result.action.label}</button>`;
        } else if (result.action.link) {
          actionHTML = `<br><a class="agent-action-pill" href="${result.action.link}" target="${result.action.link.startsWith('http') ? '_blank' : '_self'}">${result.action.label}</a>`;
        }
      }

      botDiv.querySelector('.msg-bubble').innerHTML = formatMarkdown(result.text) + actionHTML;
      msgBox.scrollTop = msgBox.scrollHeight;
    },
    executeAction: function (fnName) {
      if (fnName === 'openPinModal' && typeof window.openPinModal === 'function') {
        window.openPinModal();
      } else if (fnName === 'scrollToSiteTech') {
        const el = document.getElementById('site-tech');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.location.href = '/#site-tech';
      } else if (fnName === 'filterMobile') {
        if (typeof window.filterProjects === 'function') {
          const btn = document.querySelector('.filter-btn:nth-child(2)');
          window.filterProjects('mobile', btn || document.body);
          const p = document.getElementById('projects');
          if (p) p.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = '/portfolio/#projects';
        }
      } else if (fnName === 'copyEmail') {
        navigator.clipboard.writeText('contact@bolealabs.site').then(() => {
          alert('✓ contact@bolealabs.site copied to clipboard!');
        });
      }
    }
  };

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function formatMarkdown(text) {
    let html = escapeHTML(text);
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Inline code
    html = html.replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.08); padding:2px 5px; border-radius:4px; font-family:monospace; color:#fde047;">$1</code>');
    // Line breaks
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgentUI);
  } else {
    initAgentUI();
  }
})();
