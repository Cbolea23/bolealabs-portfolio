/**
 * CHRISTIAN BOLEA // OJT PORTFOLIO ASSISTANT
 * Transparent Recruiter & Employer Q&A Concierge (540–600 Hours OJT)
 */

(function () {
  const GATEWAY_URL = window.FREELLMAPI_GATEWAY || "https://ai.bolealabs.site/v1/chat/completions";
  const MODEL_NAME = window.FREELLMAPI_MODEL || "freellmapi-auto-failover";
  const RESUME_PDF_URL = "/resume.pdf";
  const CREDLY_URL = "https://www.credly.com/users/christian-bolea";

  function initAgentUI() {
    const html = `
      <!-- Launcher Button -->
      <div id="agentLauncher" title="Open OJT Portfolio Assistant">
        <div class="agent-launcher-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><rect x="4" y="8" width="16" height="12" rx="2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M9 17h6"/></svg>
          <span class="agent-online-dot"></span>
        </div>
        <div class="agent-launcher-text">
          <div class="agent-launcher-title">OJT <span>Assistant</span></div>
          <div class="agent-launcher-sub">540–600 Hrs &bull; Portfolio Q&amp;A</div>
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
              <div style="font-weight:700; font-size:0.92rem; color:#fff;">OJT Portfolio Assistant</div>
              <div class="agent-badge-model">Christian Louis Bolea &bull; BSIT 2027</div>
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
            <div class="msg-sender">PORTFOLIO ASSISTANT</div>
            <div class="msg-bubble">
              Hello! I can answer questions about <strong>Christian Louis Bolea's 540–600 hour OJT application</strong>, his honest technical skill set, AI-assisted development workflow, NiyoSense capstone integration, or verified Google &amp; Wadhwani certifications.
            </div>
          </div>
        </div>

        <!-- Quick Prompt Chips -->
        <div class="agent-quick-chips">
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('What are Christian\\'s OJT hours and target roles?')">540–600 Hr OJT Info</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('What was Christian\\'s actual role on the NiyoSense capstone?')">NiyoSense Capstone</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('What are his honest technical skills and boundaries?')">Honest Skill Breakdown</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('What certifications and Credly badges does he have?')">Google AI &amp; Certifications</button>
          <button class="agent-chip" onclick="window.BoleaAgent.sendChip('How can I view his resume or contact him?')">Resume &amp; Contact</button>
        </div>

        <!-- Input Bar -->
        <div class="agent-input-bar">
          <input type="text" id="agentInput" class="agent-input" placeholder="Ask about 540–600 hr OJT, skills, NiyoSense, resume..." autocomplete="off">
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

    document.getElementById('agentLauncher').addEventListener('click', () => window.BoleaAgent.toggle());
    document.getElementById('agentInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') window.BoleaAgent.send();
    });
  }

  async function generateReply(query) {
    const q = query.toLowerCase();

    // 1. Try optional self-hosted gateway if active
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2200);

      const sysPrompt = `You are the OJT Portfolio Assistant for Christian Louis Bolea (BSIT Student at Manuel S. Enverga University Foundation, Expected Graduation 2027).
He is seeking a 540-600 hour OJT placement (available Dec 7, 2026 onward) in AI-assisted software workflows, QA testing, application integration, or IT operations.
Contacts: Bolea2133@gmail.com | 09762539052 | Lucena City, Quezon | linkedin.com/in/bolea23 | github.com/cbolea23 | credly.com/users/christian-bolea.
Be completely honest and transparent about his capabilities:
- Capstone (NiyoSense): Collaborated in a 3-person capstone team as Lead Developer & Integrator to build and deploy NiyoSense (offline-first Flutter mobile field app + Django plantation owner dashboard) using AI-assisted workflows. Designed mobile and web flows in Figma, ran hands-on build testing in Android Studio and physical Android devices, verified REST API endpoints in Postman, ran black-box functional and edge-case testing (offline SQLite queuing, QR device pairing, cloud batch sync), and managed GitHub + Agile Kanban workflows.
- Skills: Gemini, Google AI Studio, Google Cloud Agent Platform/Vertex AI Prompt Design, Antigravity (AI-assisted dev), Python (Basics), Django (AI-assisted/basic integration), Flutter & Dart (Coursework fundamentals), Postman, Android Studio, Figma, GitHub, VS Code, Electronics Soldering, and Hardware Troubleshooting.
- Certifications: Google AI Professional Certificate (8-Course Specialization, Nov 2026), Prompt Design in Vertex AI Skill Badge (Google Cloud, Nov 2026), Google Generative AI Accelerator Program (100% completed, Nov 2026), Wadhwani JobReady (With AI) Advanced Level (75 hrs, Nov 2026), Packt Backend Development & API Creation (Apr 2026), Meta Introduction to Front-End Development (Oct 2025).
Keep answers concise, honest, and employer-friendly.`;

      const response = await fetch(GATEWAY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            { role: 'system', content: sysPrompt },
            { role: 'user', content: query }
          ],
          max_tokens: 280,
          temperature: 0.3
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
          return { text: data.choices[0].message.content, action: null };
        }
      }
    } catch (e) {
      // Fallback to local knowledge base
    }

    // 2. Honest Local Knowledge Responses
    if (q.includes("ojt") || q.includes("hour") || q.includes("540") || q.includes("600") || q.includes("role") || q.includes("intern")) {
      return {
        text: `**OJT Placement Summary for Christian Louis Bolea:**
• **Required Duration & Availability:** **540–600 Hours** — **Available Dec 7, 2026 onward** (MSEUF BSIT, Expected Graduation: 2027)
• **Target OJT Roles:**
  1. **AI-Assisted Software Workflows & Application Integration**
  2. **QA Testing, API Verification (Postman) & Mobile Build Testing (Android Hardware)**
  3. **IT Operations, Technical Support & Hardware Troubleshooting**
• **Work Setup:** Open to Remote, Hybrid, Lucena City, or Metro Manila placements.`,
        action: { label: "View Resume (PDF)", link: RESUME_PDF_URL }
      };
    }

    if (q.includes("niyosense") || q.includes("capstone")) {
      return {
        text: `**NiyoSense Capstone Project — Honest Role Breakdown:**
• **Role:** Lead Developer & Integrator (3-person capstone team, AI-Assisted Development, 2024 – Present)
• **What Christian Did:**
  1. Collaborated in a 3-person team to build and deploy NiyoSense (offline-first mobile field app + Django plantation owner dashboard) via structured AI-assisted workflows.
  2. Designed mobile and web user flows in **Figma**, and ran hands-on build testing in **Android Studio** and on physical Android devices across field-sorting scenarios.
  3. Verified REST API endpoints in **Postman** and executed black-box functional and edge-case testing (offline SQLite queuing, QR device pairing, cloud batch sync).
  4. Managed source code versioning, issue tracking, and **Agile Kanban** task workflows across the team in **GitHub** and **VS Code**.`,
        action: { label: "Visit NiyoSense Portal (niyosense.me)", link: "https://niyosense.me" }
      };
    }

    if (q.includes("skill") || q.includes("honest") || q.includes("boundar") || q.includes("tool") || q.includes("stack")) {
      return {
        text: `**Honest Technical Skills & Boundaries:**
• **AI & Cloud Platforms:** Gemini, Google AI Studio, Google Cloud Agent Platform / Vertex AI (Prompt Design Labs), Prompt Engineering & Output Evaluation, Antigravity (AI-Assisted Development)
• **Application Development:** Python (Basics), Django (AI-Assisted / Basic Integration), Flutter & Dart (Coursework Fundamentals)
• **Testing, Design & Dev Tools:** Postman (API Verification), Android Studio, Figma, GitHub, Visual Studio Code
• **Hardware & Tech Support:** Electronics Soldering, Basic Hardware Assembly & Troubleshooting
• **Working Style:** Transparent about current coding boundaries while thorough in testing, reading documentation, following SOPs, and verifying AI-generated outputs.`,
        action: { label: "Scroll to Skills Matrix", fn: "scrollToSkills" }
      };
    }

    if (q.includes("cert") || q.includes("credly") || q.includes("badge") || q.includes("google") || q.includes("wadhwani")) {
      return {
        text: `**Certifications & Training (Aligned with Resume):**
• **Google AI Professional Certificate (8-Course Specialization)** — Google / Coursera (Nov 2026): Focus on AI for App Building & Deployment, Prompt Engineering, Data Analysis, and Research.
• **Prompt Design in Vertex AI Skill Badge** — Google Cloud / Credly (Nov 2026)
• **Google Generative AI Accelerator Program** — Google Cloud Skills / SkillWallet (100% Completed, Nov 2026)
• **Employability Skills: JobReady (With AI) v1 — Advanced Level (75 hrs)** — Wadhwani Foundation (Nov 2026)
• **Backend Development and API Creation** — Packt / Coursera (Apr 2026)
• **Introduction to Front-End Development** — Meta / Coursera (Oct 2025)`,
        action: { label: "Verify Badges on Credly (9 Badges)", link: CREDLY_URL }
      };
    }

    if (q.includes("resume") || q.includes("cv") || q.includes("contact") || q.includes("email") || q.includes("phone")) {
      return {
        text: `**Direct Contact & Resume Access:**
• **Email:** \`Bolea2133@gmail.com\`
• **Phone:** \`0976 253 9052\`
• **Location:** Lucena City, Quezon, Philippines
• **LinkedIn:** \`linkedin.com/in/bolea23\`
• **GitHub:** \`github.com/cbolea23\`
• **Credly:** \`credly.com/users/christian-bolea\`

You can open or download Christian's current 1-page PDF resume directly:`,
        action: { label: "View Resume (PDF)", link: RESUME_PDF_URL }
      };
    }

    return {
      text: `Christian Louis Bolea is a **BS Information Technology student at MSEUF** (Expected Graduation: 2027) seeking a **540–600 hour OJT placement (available Dec 7, 2026 onward)** in AI-assisted software workflows, QA/API testing, application integration, or IT operations.

Ask me about:
1. His **540–600 hour OJT availability** and target roles.
2. His hands-on contribution to the **NiyoSense capstone project**.
3. His **Google AI Professional Certificate**, **Vertex AI badge**, and **Wadhwani JobReady (75 hrs)** training.
4. His **honest technical skills** (Postman, Figma, Android Studio, AI-assisted coding, hardware troubleshooting).`,
      action: { label: "View Resume (PDF)", link: RESUME_PDF_URL }
    };
  }

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
      const box = document.getElementById('agentMessages');
      if (box) {
        box.innerHTML = `
          <div class="agent-msg bot">
            <div class="msg-sender">PORTFOLIO ASSISTANT</div>
            <div class="msg-bubble">
              Chat reset. Ask me about Christian's 540–600 hour OJT objective, his NiyoSense capstone work, honest skill boundaries, or verified certifications.
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

      await new Promise(r => setTimeout(r, 420));
      const reply = await generateReply(text);
      box.removeChild(typingDiv);

      let actionHTML = '';
      if (reply.action) {
        if (reply.action.link) {
          actionHTML = `<br><a href="${reply.action.link}" target="_blank" rel="noopener" class="msg-action-btn" style="text-decoration:none;">${reply.action.label} &nearr;</a>`;
        } else if (reply.action.fn) {
          actionHTML = `<br><button class="msg-action-btn" onclick="window.BoleaAgent.executeAction('${reply.action.fn}')">${reply.action.label} &rarr;</button>`;
        }
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
      if (fnName === 'scrollToSkills') {
        const el = document.getElementById('skills');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function formatMarkdown(text) {
    let html = escapeHTML(text);
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.08); padding:2px 5px; border-radius:4px; font-family:monospace; color:#fde047;">$1</code>');
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgentUI);
  } else {
    initAgentUI();
  }
})();
