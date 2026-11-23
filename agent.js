/**
 * CHRISTIAN BOLEA // OJT PORTFOLIO ASSISTANT
 * Instant, Honest Employer Q&A Concierge (540–600 Hours OJT)
 */

(function () {
  const GATEWAY_URL = window.FREELLMAPI_GATEWAY || null;
  const MODEL_NAME = window.FREELLMAPI_MODEL || "freellmapi-auto-failover";
  const RESUME_PDF_URL = "/resume.pdf";
  const CREDLY_URL = "https://www.credly.com/users/christian-bolea";

  function initAgentUI() {
    const html = `
      <!-- Launcher Button -->
      <div id="agentLauncher" title="Open OJT Portfolio Assistant" role="button" tabindex="0">
        <div class="agent-launcher-icon">
          <img src="/profile.jpg" alt="Christian Louis Bolea" class="agent-avatar-img">
          <span class="agent-online-dot"></span>
        </div>
        <div class="agent-launcher-text">
          <div class="agent-launcher-title">OJT <span>Assistant</span></div>
          <div class="agent-launcher-sub">540–600 Hrs &bull; Ask About Christian</div>
        </div>
      </div>

      <!-- Agent Chat Window -->
      <div id="agentWindow" role="dialog" aria-label="OJT Portfolio Assistant">
        <div class="agent-header">
          <div class="agent-header-info">
            <div class="agent-launcher-icon" style="width:34px; height:34px;">
              <img src="/profile.jpg" alt="Christian Louis Bolea" class="agent-avatar-img">
              <span class="agent-online-dot"></span>
            </div>
            <div>
              <div class="agent-header-title">OJT Portfolio Assistant</div>
              <div class="agent-badge-model">Available Dec 7, 2026 &bull; 540–600 Hrs</div>
            </div>
          </div>
          <div class="agent-header-controls">
            <button class="agent-btn-icon" onclick="window.BoleaAgent.clearChat()" title="Reset conversation" aria-label="Reset conversation">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            </button>
            <button class="agent-btn-icon" onclick="window.BoleaAgent.toggle()" title="Close assistant" aria-label="Close assistant">&times;</button>
          </div>
        </div>

        <div class="agent-messages" id="agentMessages">
          <div class="agent-msg bot">
            <div class="msg-sender">PORTFOLIO ASSISTANT</div>
            <div class="msg-bubble">
              Hello. I can help you evaluate <strong>Christian Louis Bolea</strong> for your <strong>540–600 hour OJT placement</strong> (available Dec 7, 2026 onward). Ask anything about his honest technical boundaries, NiyoSense capstone QA, or 34+ verified certificates.
            </div>
          </div>
        </div>

        <!-- Quick Prompt Chips -->
        <div class="agent-quick-chips">
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('What are Christian\\'s OJT hours and availability?')">540–600 Hr OJT</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('What did he actually do on the NiyoSense capstone?')">NiyoSense Role</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('What are his honest technical skills and limits?')">Honest Skills</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('Tell me about his Google AI and Wadhwani certifications')">Certifications</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('How can I view his PDF resume or contact him?')">Resume &amp; Contact</button>
        </div>

        <!-- Input Bar -->
        <div class="agent-input-bar">
          <input type="text" id="agentInput" class="agent-input" placeholder="Ask about OJT dates, Postman QA, certificates..." autocomplete="off">
          <button class="agent-send-btn" id="agentSendBtn" onclick="window.BoleaAgent.send()" aria-label="Send message">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.id = 'boleaAgentContainer';
    container.innerHTML = html;
    document.body.appendChild(container);

    const launcher = document.getElementById('agentLauncher');
    launcher.addEventListener('click', () => window.BoleaAgent.toggle());
    launcher.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.BoleaAgent.toggle();
      }
    });
    document.getElementById('agentInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') window.BoleaAgent.send();
    });
  }

  const INTENTS = [
    {
      name: 'ojt',
      keywords: ['ojt', 'hour', '540', '600', 'dec', 'december', 'avail', 'when', 'start', 'intern', 'practicum', 'setup', 'remote', 'hybrid', 'manila', 'lucena'],
      reply: () => ({
        text: `**OJT Placement & Availability:**
• **Duration:** **540–600 Hours** (MSEUF BS Information Technology)
• **Availability:** **December 7, 2026 onward**
• **Target Roles:** AI-Assisted Software Workflows, QA & API Testing (Postman), Application Integration, or IT Operations / Hardware Support.
• **Setup:** Remote, Hybrid, Lucena City, or Metro Manila.`,
        actions: [
          { label: "View Resume (PDF)", link: RESUME_PDF_URL },
          { label: "Copy Email", fn: "copyEmail" }
        ]
      })
    },
    {
      name: 'niyosense',
      keywords: ['niyosense', 'capstone', '3-person', 'team', 'black-box', 'sqlite', 'qr', 'sync', 'kanban', 'batch'],
      reply: () => ({
        text: `**NiyoSense Capstone — Lead Developer & Integrator:**
• Collaborated in a **3-person capstone team** to integrate and deploy an offline-first mobile field app paired with a Django plantation owner dashboard via AI-assisted workflows.
• Designed mobile and web user flows in **Figma** and ran hands-on build tests in **Android Studio** on physical Android devices.
• Verified REST API endpoints in **Postman** and ran black-box functional and edge-case testing (offline SQLite queuing, QR device pairing, cloud batch sync).
• Managed versioning, issues, and **Agile Kanban** tasks in **GitHub** and VS Code.`,
        actions: [
          { label: "NiyoSense Portal", link: "https://niyosense.me" },
          { label: "GitHub Repo", link: "https://github.com/Cbolea23/niyosense-capstone" }
        ]
      })
    },
    {
      name: 'projects',
      keywords: ['project', 'built', 'brainrot', 'photobooth', 'angelica', 'day back', 'portfolio', 'google play', 'capacitor', 'apk'],
      reply: () => ({
        text: `**5 Hands-On Projects Featured:**
1. **NiyoSense (Capstone):** Flutter + Django system integration, Postman API QA & physical Android testing.
2. **BrainRot Galaxy:** Live Google Play mobile game (` + '`com.coconut.brainrot_galaxy`' + `) built through AI-assisted prototyping.
3. **Angelica Photobooth:** HTML5 Canvas camera app packaged into a Capacitor Android APK.
4. **A Day Back Then:** Structured Gemini prompt-engineering & Remotion video automation workflow.
5. **Personal OJT Portfolio:** Static site (` + '`bolealabs.site`' + `) deployed on GitHub Pages with custom DNS.`,
        actions: [
          { label: "Jump to Projects", fn: "scrollToProjects" }
        ]
      })
    },
    {
      name: 'skills',
      keywords: ['skill', 'stack', 'tool', 'honest', 'limit', 'boundar', 'python', 'django', 'flutter', 'dart', 'postman', 'figma', 'android studio', 'solder', 'hardware', 'support', 'troubleshooting', 'gemini', 'antigravity', 'vertex'],
      reply: () => ({
        text: `**Honest Technical Skills & Boundaries:**
• **AI & Cloud Platforms:** Gemini, Google AI Studio, Google Cloud Agent Platform (Vertex AI Prompt Labs), Prompt Evaluation, Antigravity (AI-Assisted Dev).
• **App Development:** Python (Basics), Django (AI-Assisted / Basic Integration), Flutter & Dart (Coursework Fundamentals), HTML/CSS/JS, SQL.
• **QA, Design & Dev Tools:** Postman (API Verification), Android Studio, Figma, GitHub, VS Code.
• **Hardware & IT Support:** Electronics Soldering, Hardware Assembly & Troubleshooting, physical Android device testing.`,
        actions: [
          { label: "Jump to Skills Matrix", fn: "scrollToSkills" }
        ]
      })
    },
    {
      name: 'certs',
      keywords: ['cert', 'badge', 'credly', 'wadhwani', 'jobready', 'google', 'coursera', 'mern', 'swift', 'laravel', 'linux', 'cybersecurity', 'mysql', 'accelerator'],
      reply: () => ({
        text: `**Verified Credentials Overview:**
• **9 Credly Digital Badges:** Prompt Design in Vertex AI (Google Cloud) + 8 Google AI specialization badges.
• **10 Highlighted Certificates:** Google AI Professional Certificate (8-Course Specialization) & **Wadhwani JobReady (With AI) — Advanced Level (75 hrs)**.
• **34 Additional Certificates:** 11 Wadhwani Foundation employability modules + 23 Coursera certificates across Web, Mobile, Linux, SQL & Security.`,
        actions: [
          { label: "View Certifications", fn: "scrollToCerts" },
          { label: "Verify on Credly", link: CREDLY_URL }
        ]
      })
    },
    {
      name: 'education',
      keywords: ['school', 'university', 'mseuf', 'enverga', 'college', 'degree', 'coursework', 'grad', '2027', 'bsit', 'lucena', 'education'],
      reply: () => ({
        text: `**Academic Background:**
• **Degree:** Bachelor of Science in Information Technology (Major in Web & Mobile App Development)
• **University:** Manuel S. Enverga University Foundation (**MSEUF**), Lucena City, Quezon
• **Expected Graduation:** 2027
• **Core Coursework:** Mobile Applications Dev, Web Systems & Technologies, Database Management, Systems Analysis & Design, English for Occupational Purposes.`,
        actions: [
          { label: "Jump to Education", fn: "scrollToEducation" }
        ]
      })
    },
    {
      name: 'strengths',
      keywords: ['why', 'strength', 'hire', 'work ethic', 'about', 'who', 'qualif', 'good fit', 'suitab'],
      reply: () => ({
        text: `**Why Christian Fits an OJT Team:**
1. **Modern AI-Assisted Workflow:** Trained in structured prompting and careful output verification to prototype, integrate, and test faster.
2. **Hands-On QA Mindset:** Experienced with Postman endpoint checks, Figma flow validation, and physical Android hardware debugging.
3. **Honest & Trainable:** Transparent about current coding fundamentals, quick to read documentation, and reliable at following SOPs and team feedback.`,
        actions: [
          { label: "View Resume (PDF)", link: RESUME_PDF_URL }
        ]
      })
    },
    {
      name: 'contact',
      keywords: ['resume', 'cv', 'pdf', 'contact', 'email', 'mail', 'phone', 'call', 'number', 'linkedin', 'github', 'reach', 'hire'],
      reply: () => ({
        text: `**Direct Contact & Resume (PDF):**
• **Email:** ` + '`Bolea2133@gmail.com`' + `
• **Phone:** ` + '`0976 253 9052`' + `
• **Location:** Lucena City, Quezon, Philippines
• **LinkedIn:** ` + '`linkedin.com/in/bolea23`' + `
• **GitHub:** ` + '`github.com/cbolea23`' + `
• **Credly:** ` + '`credly.com/users/christian-bolea`' + ``,
        actions: [
          { label: "View Resume (PDF)", link: RESUME_PDF_URL },
          { label: "Copy Email", fn: "copyEmail" }
        ]
      })
    }
  ];

  async function generateReply(query) {
    const q = query.toLowerCase().trim();

    // Only call external LLM gateway when explicitly configured
    if (GATEWAY_URL) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const sysPrompt = `You are the OJT Portfolio Assistant for Christian Louis Bolea (BSIT Student at MSEUF, Expected Graduation 2027).
He seeks a 540-600 hour OJT placement (available Dec 7, 2026 onward) in AI-assisted software workflows, QA testing, application integration, or IT operations.
Contacts: Bolea2133@gmail.com | 09762539052 | Lucena City, Quezon | linkedin.com/in/bolea23 | github.com/cbolea23 | credly.com/users/christian-bolea.
Keep answers factual, honest about basic Python/Django/Flutter limits, concise, and employer-friendly.`;

        const response = await fetch(GATEWAY_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: MODEL_NAME,
            messages: [
              { role: 'system', content: sysPrompt },
              { role: 'user', content: query }
            ],
            max_tokens: 260,
            temperature: 0.3
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.choices && data.choices[0] && data.choices[0].message) {
            return { text: data.choices[0].message.content, actions: [] };
          }
        }
      } catch (e) {
        // Fall through cleanly to instant local concierge
      }
    }

    // Score weighted intents for accurate multi-keyword matching
    let bestIntent = null;
    let bestScore = 0;
    for (const intent of INTENTS) {
      let score = 0;
      for (const kw of intent.keywords) {
        if (q.includes(kw)) {
          score += kw.length >= 6 ? 2 : 1;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestIntent = intent;
      }
    }

    if (bestIntent && bestScore > 0) {
      return bestIntent.reply();
    }

    // Greeting or general fallback
    return {
      text: `Christian Louis Bolea is a **BS Information Technology student at MSEUF** (Class of 2027) available **Dec 7, 2026 onward** for a **540–600 hour OJT placement**.

You can ask me about:
• **OJT availability & target roles** (QA/API testing, AI-assisted workflows, IT ops)
• **NiyoSense capstone integration** (3-person team, Postman QA, Figma, Android Studio)
• **Honest technical skills** & hardware support experience
• **9 Credly badges & 44 total verified certificates** (Google AI, Wadhwani, Coursera)`,
      actions: [
        { label: "View Resume (PDF)", link: RESUME_PDF_URL },
        { label: "View Certifications", fn: "scrollToCerts" }
      ]
    };
  }

  window.BoleaAgent = {
    toggle: function () {
      const win = document.getElementById('agentWindow');
      if (win) {
        const willOpen = !win.classList.contains('open');
        win.classList.toggle('open', willOpen);
        if (!willOpen) {
          if (!document.getElementById('certLightbox')?.classList.contains('open')) {
            document.body.style.overflow = '';
          }
        } else if (window.innerWidth <= 520) {
          document.body.style.overflow = 'hidden';
        }
        if (willOpen && window.innerWidth > 640) {
          setTimeout(() => {
            const inp = document.getElementById('agentInput');
            if (inp) inp.focus();
          }, 120);
        }
      }
    },

    clearChat: function () {
      const box = document.getElementById('agentMessages');
      if (box) {
        box.innerHTML = `
          <div class="agent-msg bot">
            <div class="msg-sender">PORTFOLIO ASSISTANT</div>
            <div class="msg-bubble">
              Conversation reset. Ask about Christian's <strong>540–600 hour OJT placement</strong> (available Dec 7, 2026), his NiyoSense capstone testing, honest skill boundaries, or verified credentials.
            </div>
          </div>
        `;
      }
    },

    sendChip: function (text) {
      const inp = document.getElementById('agentInput');
      if (inp) {
        inp.value = text;
        this.send();
      }
    },

    send: async function () {
      const inp = document.getElementById('agentInput');
      const box = document.getElementById('agentMessages');
      if (!inp || !box) return;

      const text = inp.value.trim();
      if (!text) return;
      inp.value = '';

      const userDiv = document.createElement('div');
      userDiv.className = 'agent-msg user';
      userDiv.innerHTML = `
        <div class="msg-sender">YOU</div>
        <div class="msg-bubble">${escapeHTML(text)}</div>
      `;
      box.appendChild(userDiv);
      box.scrollTop = box.scrollHeight;

      const typingDiv = document.createElement('div');
      typingDiv.className = 'agent-msg bot';
      typingDiv.innerHTML = `
        <div class="msg-sender">PORTFOLIO ASSISTANT</div>
        <div class="agent-typing">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
      box.appendChild(typingDiv);
      box.scrollTop = box.scrollHeight;

      const [reply] = await Promise.all([
        generateReply(text),
        new Promise(r => setTimeout(r, 240))
      ]);
      if (typingDiv.parentNode) box.removeChild(typingDiv);

      const actionList = reply.actions || (reply.action ? [reply.action] : []);
      let actionHTML = '';
      if (actionList.length > 0) {
        actionHTML = '<div class="agent-actions-wrap">';
        for (const act of actionList) {
          if (act.link) {
            actionHTML += `<a href="${act.link}" target="_blank" rel="noopener" class="msg-action-btn">${escapeHTML(act.label)} &nearr;</a>`;
          } else if (act.fn) {
            actionHTML += `<button type="button" class="msg-action-btn" onclick="window.BoleaAgent.executeAction('${act.fn}')">${escapeHTML(act.label)} &rarr;</button>`;
          }
        }
        actionHTML += '</div>';
      }

      const botDiv = document.createElement('div');
      botDiv.className = 'agent-msg bot';
      botDiv.innerHTML = `
        <div class="msg-sender">PORTFOLIO ASSISTANT</div>
        <div class="msg-bubble">${formatMarkdown(reply.text)}${actionHTML}</div>
      `;
      box.appendChild(botDiv);
      box.scrollTop = box.scrollHeight;
    },

    executeAction: function (fnName) {
      const targetMap = {
        scrollToBadges: 'badges',
        scrollToProjects: 'projects',
        scrollToCerts: 'certifications',
        scrollToSkills: 'skills',
        scrollToEducation: 'education'
      };
      if (targetMap[fnName]) {
        if (window.innerWidth <= 640) {
          const win = document.getElementById('agentWindow');
          if (win && win.classList.contains('open')) this.toggle();
        }
        const el = document.getElementById(targetMap[fnName]);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (fnName === 'copyEmail') {
        if (typeof window.copyEmail === 'function') {
          window.copyEmail('Bolea2133@gmail.com');
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText('Bolea2133@gmail.com');
        }
      }
    }
  };

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function formatMarkdown(text) {
    let html = escapeHTML(text);
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgentUI);
  } else {
    initAgentUI();
  }
})();
