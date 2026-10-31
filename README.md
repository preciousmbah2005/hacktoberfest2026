# Learn2Earn — AI-Powered Educational Platform with Mobile Data Rewards

> **Hackathon Sprint:** 4-Hour MVP  
> **Mission:** Fuel student education in emerging markets by converting STEM & AI learning milestones directly into real mobile data recharges.

---

## 1. Technology Stack

* **Frontend:** SvelteKit + TypeScript (Vanilla modern CSS design system with fluid typography and dark mode glassmorphism)
* **Backend:** Python 3.12 + FastAPI + Pydantic v2
* **Database:** Supabase PostgreSQL (Row-Level Security, Wallets, Courses, Assessments)
* **Authentication:** Supabase Auth (with seamless local demo fallback for offline evaluation)
* **AI Engine:** Google Gemini API & OpenAI API integrations

---

## 2. Repository Structure

```
learn2earn/
├── frontend/                  # SvelteKit + TypeScript client application
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/
│   │   │   │   ├── layout/    # Navbar, Sidebar, Footer (Dev 1)
│   │   │   │   ├── dashboard/ # StatsCards, ActiveCourses, Achievements (Dev 1)
│   │   │   │   ├── orientation/ # Integration foundation for Dev 2
│   │   │   │   ├── courses/   # Integration foundation for Dev 2
│   │   │   │   └── rewards/   # WalletBalanceCard, DataPackagesGrid, RedemptionModal (Dev 1)
│   │   │   ├── services/      # api.ts (FastAPI client) & supabase.ts (Auth)
│   │   │   └── stores/        # authStore, walletStore, dashboardStore
│   │   └── routes/
│   │       ├── +layout.svelte # Main shared layout & navigation shell
│   │       ├── +page.svelte   # Landing overview
│   │       ├── login/         # Student authentication
│   │       ├── register/      # Account creation (+500 welcome points)
│   │       ├── dashboard/     # Student progress dashboard
│   │       ├── orientation/   # Career aptitude survey & AI pathways (Dev 2/3)
│   │       ├── courses/       # Course catalog & lesson interfaces (Dev 2)
│   │       ├── rewards/       # Mobile data wallet & telco redemption (Dev 1)
│   │       └── ai-assistant/  # Interactive 24/7 AI tutor chat (Dev 3)
│   ├── package.json
│   └── .env.example
├── backend/                   # Python FastAPI service
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/        # dashboard, rewards, orientation, ai
│   │   ├── core/              # config.py, settings, CORS
│   │   ├── database/          # supabase_client.py
│   │   ├── schemas/           # Pydantic contract models
│   │   ├── services/          # rewards_service.py (telecom packages & ledger)
│   │   └── main.py            # FastAPI ASGI entrypoint
│   ├── requirements.txt
│   └── .env.example
├── supabase/
│   └── migrations/            # 20261031000000_initial_schema.sql (PostgreSQL tables & RLS)
├── API_CONTRACTS.md           # Formal API specification for Dev 2 & 3
├── README.md
└── .gitignore
```

---

## 3. Team Ownership & Git Workflow

* **Developer 1 — Technical Lead (Current Branch: `main`):**
  * Frontend architecture, shared navigation & responsive layout
  * Student Progress Dashboard (`/dashboard`)
  * Rewards Wallet & Simulated Mobile Data Redemption (`/rewards`)
  * Supabase Auth & Client Foundation
  * FastAPI Backend Setup & Core Routers
  * API Contract Specifications (`API_CONTRACTS.md`)

* **Developer 2 — Frontend Developer (Feature Branch: `feat/frontend-career-courses`):**
  * Rich Career Orientation Survey & Visual Pathway Explorer (`/orientation`)
  * Course Catalog, Lesson Viewers, and Interactive Quizzes (`/courses`)

* **Developer 3 — Backend & AI Developer (Feature Branch: `feat/backend-ai-orientation`):**
  * Career Orientation Evaluation Engine (`POST /api/orientation/assess`)
  * AI Learning Assistant Chat (`POST /api/ai/chat`)
  * Gemini/OpenAI prompt engineering & Supabase vector chat logging

---

## 4. Getting Started Locally

### Prerequisites
* Node.js v18+ & npm
* Python 3.10+

### 4.1. Run the Frontend (SvelteKit)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4.2. Run the Backend (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn backend.app.main:app --reload --port 8000
```
Interactive OpenAPI documentation will be accessible at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 5. API Contracts Summary

Full schema details are documented in [API_CONTRACTS.md](file:///c:/Users/hhp/OneDrive/Documents/hacktoberfest2026/API_CONTRACTS.md).

* `POST /api/orientation/assess`: Career aptitude survey evaluation
* `POST /api/ai/chat`: Interactive conceptual tutor & code explanation
* `GET /api/dashboard/overview`: Aggregated stats and enrolled courses
* `GET /api/rewards/wallet`: Current points & total mobile data redeemed
* `GET /api/rewards/packages`: Available telecom data bundles (MTN, Airtel, Safaricom, Glo, Vodafone)
* `POST /api/rewards/redeem`: Exchange points for instant simulated mobile data
* `POST /api/rewards/earn-points`: Credit points upon lesson or quiz completion
