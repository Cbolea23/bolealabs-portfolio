# FreeLLMAPI Gateway Deployment & Integration Guide for Bolea Labs

This document details the architecture, deployment instructions, and upstream configuration for running **FreeLLMAPI** (`https://github.com/tashfeenahmed/freellmapi`) as the dedicated AI smart-router backend for **`bolealabs.site`** and **Bolea AI // LABS-01**.

---

## 1. System Architecture

```
                                  +---------------------------------------+
                                  |   bolealabs.site (GitHub Pages Edge)  |
                                  |   - agent.css (Floating Glassmorphism)|
                                  |   - agent.js  (Bolea AI // LABS-01)   |
                                  +-------------------+-------------------+
                                                      |
                                                      |  HTTPS /v1/chat/completions
                                                      v
                                  +---------------------------------------+
                                  |  ai.bolealabs.site (Self-Hosted Proxy)|
                                  |      FreeLLMAPI Smart Gateway         |
                                  |  - AES-256-GCM Credential Shield      |
                                  |  - Automatic 429 Rate-Limit Failover  |
                                  +-------------------+-------------------+
                                                      |
                    +-------------------+-------------+-------------+-------------------+
                    |                   |                           |                   |
                    v                   v                           v                   v
            Google AI Studio       Groq Cloud               Cerebras Cloud          GitHub Models
           (Gemini 2.5 Flash)  (Llama-3.3-70B 300 t/s)    (Llama-3.3 2000 t/s)   (GPT-4o mini / Llama)
            [15 RPM Free Tier]  [30 RPM Free Tier]         [30 RPM Free Tier]     [150 RPD Free Tier]
```

### Zero-Downtime Hybrid Fallback Design
Even if the backend container is sleeping, restarting, or rate-limited across all upstream providers, **the website will never break or display an error message to recruiters**. `agent.js` automatically detects unreachable network states and seamlessly runs Christian's embedded local knowledge graph, executing client-side DOM actions (filtering mobile projects, triggering the CV vault PIN modal, copying contact emails) in real time.

---

## 2. Acquiring Free-Tier API Keys

To maximize uptime and throughput, gather free API keys from the following providers (no credit card required):

| Provider | Model | Free Tier Quota | Key Creation URL |
| :--- | :--- | :--- | :--- |
| **Google AI Studio** | `gemini-2.5-flash` | 15 RPM / 1M TPM / 1,500 RPD | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| **Groq Cloud** | `llama-3.3-70b-versatile` | 30 RPM / 6,000 TPM / 14.4k RPD | [console.groq.com/keys](https://console.groq.com/keys) |
| **Cerebras Cloud** | `llama-3.3-70b` | 30 RPM / 60k TPM (Fastest inference) | [cloud.cerebras.ai](https://cloud.cerebras.ai) |
| **GitHub Models** | `gpt-4o-mini` / `llama-3.3` | 150 requests/day per PAT | [github.com/settings/tokens](https://github.com/settings/tokens) |
| **Mistral AI** | `mistral-small-latest` | 1 RPS / 1B tokens free tier | [console.mistral.ai](https://console.mistral.ai) |

---

## 3. Deployment Option A: Docker on Linux VPS / Muse's Server (Recommended)

### Step 1: Clone and Build FreeLLMAPI
```bash
git clone https://github.com/tashfeenahmed/freellmapi.git
cd freellmapi
```

### Step 2: Configure Environment Variables
Create a `.env` file in the `freellmapi` folder:
```env
# Server Configuration
PORT=8000
HOST=0.0.0.0

# Master Encryption Key (Generate a random 32-character string for AES-256)
ENCRYPTION_SECRET=bolea_labs_ultra_secure_master_key_2026

# Upstream Free-Tier Keys for Gateway Auto-Rotation
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
CEREBRAS_API_KEY=your_cerebras_api_key_here
GITHUB_TOKEN=your_github_pat_here
MISTRAL_API_KEY=your_mistral_api_key_here

# Rate Limiting & Failover Strategy
DEFAULT_FALLBACK_ORDER=gemini-2.5-flash,groq-llama-3.3-70b,cerebras-llama-3.3-70b,github-models
MAX_RETRIES_ON_429=3
```

### Step 3: Run with Docker Compose or Docker CLI
```bash
# Using Docker CLI:
docker build -t freellmapi:latest .
docker run -d \
  --name freellmapi-gateway \
  --restart always \
  -p 8000:8000 \
  --env-file .env \
  freellmapi:latest
```

### Step 4: Map Subdomain `ai.bolealabs.site` via Cloudflare Tunnel (Zero Open Ports)
1. Install Cloudflare `cloudflared` on the server:
   ```bash
   curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
   sudo dpkg -i cloudflared.deb
   ```
2. Authenticate and create a tunnel:
   ```bash
   cloudflared tunnel login
   cloudflared tunnel create bolea-ai
   ```
3. Configure `~/.cloudflared/config.yml`:
   ```yaml
   tunnel: <TUNNEL_UUID>
   credentials-file: /root/.cloudflared/<TUNNEL_UUID>.json
   ingress:
     - hostname: ai.bolealabs.site
       service: http://localhost:8000
     - service: http_status:404
   ```
4. Route DNS in Namecheap / Cloudflare for `ai.bolealabs.site` pointing to `<TUNNEL_UUID>.cfargotunnel.com`.
5. Start tunnel service:
   ```bash
   sudo cloudflared service install
   sudo systemctl start cloudflared
   ```

---

## 4. Deployment Option B: Free PaaS Container (Render.com / Hugging Face Spaces)

If you prefer not to manage a VPS:
1. **Fork `https://github.com/tashfeenahmed/freellmapi`** to your GitHub account (`Cbolea23`).
2. Go to **Render.com** -> **New Web Service** -> Connect `freellmapi`.
3. Select **Docker** environment.
4. Add Environment Variables:
   - `GEMINI_API_KEY`
   - `GROQ_API_KEY`
   - `ENCRYPTION_SECRET`
5. Render assigns a free URL (e.g. `https://freellmapi-bolea.onrender.com`).
6. In `agent.js` (or in `<script>` on `index.html`), set:
   ```html
   <script>
     window.FREELLMAPI_GATEWAY = "https://freellmapi-bolea.onrender.com/v1/chat/completions";
   </script>
   ```

---

## 5. Verification & Testing

Verify that your proxy responds with OpenAI-compatible streaming or json:

```bash
curl -X POST https://ai.bolealabs.site/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "freellmapi-auto-failover",
    "messages": [
      {"role": "system", "content": "You are Bolea AI for Christian Louis Bolea."},
      {"role": "user", "content": "What is NiyoSense?"}
    ]
  }'
```

Expected output:
```json
{
  "id": "chatcmpl-freellmapi-01",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "NiyoSense is Christian Louis Bolea's CCMS Capstone project—a multimodal edge AI acoustic and visual classification system for coconut maturity achieving 92.8% fused classification accuracy..."
      }
    }
  ]
}
```

---

## 6. Client-Side Tool Calling Map in `agent.js`

The AI agent interprets user intents and triggers DOM actions on the website:

| User Query | Action Pill | Client-Side Trigger |
| :--- | :--- | :--- |
| *"How can I download Christian's resume?"* | `[Unlock Resume (PIN)]` | Calls `window.openPinModal()` -> Focuses PIN keypad |
| *"Show me his mobile apps"* | `[Filter Mobile Projects]` | Filters to Flutter/Android cards & scrolls to `#projects` |
| *"How is this website built?"* | `[Inspect Architecture]` | Smooth scrolls to `#site-tech` on `index.html` |
| *"How do I email him?"* | `[Copy contact@bolealabs.site]` | Copies address to clipboard & displays toast |

---

*Engineered with precision for Bolea Labs &bull; 2026*
