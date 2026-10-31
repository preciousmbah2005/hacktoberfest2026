# Learn2Earn — API Contracts & Team Integration Guide

**Platform:** Learn2Earn (AI-Powered Educational Platform with Mobile Data Rewards)  
**Hackathon Target:** 4-Hour Sprint MVP  
**Technical Lead (Developer 1):** Shared Foundation, Layout, Dashboard, Rewards Wallet, Auth & Contracts

---

## 1. Team Ownership & Responsibilities

| Role | Developer | Ownership Scope | Working Branch |
| :--- | :--- | :--- | :--- |
| **Tech Lead** | **Developer 1** (Current) | • Frontend foundation, Navigation, Shared Layout<br>• Student Dashboard (`/dashboard`)<br>• Rewards & Mobile Data Wallet (`/rewards`)<br>• Supabase Config & Auth Integration (`/login`, `/register`)<br>• Backend Core Foundation & FastAPI skeleton<br>• API Contracts Specification & Documentation | `main` |
| **Frontend Dev** | **Developer 2** | • Career orientation UI (`/orientation`)<br>• Career recommendation results display<br>• Career pathway exploration<br>• Course listing & catalog (`/courses`)<br>• Course details and interactive lesson UI | `feat/frontend-career-courses` |
| **Backend & AI Dev** | **Developer 3** | • Career orientation assessment logic (`POST /api/orientation/assess`)<br>• AI recommendation engine (Gemini / OpenAI)<br>• AI learning assistant API (`POST /api/ai/chat`)<br>• Supabase AI chat logs and vector search / embeddings | `feat/backend-ai-orientation` |

---

## 2. API Contract Endpoints

### 2.1. Career Orientation Assessment (Owned by Dev 3)
* **Endpoint:** `POST /api/orientation/assess`
* **Consumer:** Developer 2 (`/orientation`)
* **Provider:** Developer 3 (`backend/app/api/routes/orientation.py`)

#### Request Schema:
```json
{
  "answers": {
    "interests": ["technology", "mathematics", "artificial intelligence"],
    "favorite_subjects": ["computer science", "physics"],
    "skills": ["problem solving", "logical reasoning"],
    "career_goals": "Build intelligent systems and software solutions"
  }
}
```

#### Response Schema:
```json
{
  "recommendations": [
    {
      "pathway": "Software Engineering & Applied AI",
      "description": "Design and build intelligent software applications, user experiences, and backend services.",
      "reason": "Your interests in technology and career goals indicate strong alignment with modern software engineering.",
      "skills": ["Python", "TypeScript", "SQL", "AI Prompting", "Problem Solving"],
      "courses": [
        "Introduction to Python & AI Foundations",
        "Modern Full-Stack Web Development with SvelteKit",
        "Practical SQL & Relational Databases"
      ]
    }
  ]
}
```

---

### 2.2. AI Learning Assistant (Owned by Dev 3)
* **Endpoint:** `POST /api/ai/chat`
* **Consumer:** Frontend AI Tutor (`/ai-assistant`, Course Lessons)
* **Provider:** Developer 3 (`backend/app/api/routes/ai.py`)

#### Request Schema:
```json
{
  "message": "Explain Python functions",
  "course_id": "demo-python",
  "context": "Introduction to Python"
}
```

#### Response Schema:
```json
{
  "response": "In Python, a function is a reusable block of code defined with the `def` keyword...",
  "suggested_actions": [
    "Give me a code example for: Explain Python functions",
    "Show me a quick quiz question to earn points",
    "Explain this in simpler terms"
  ],
  "course_id": "demo-python"
}
```

---

### 2.3. Rewards & Wallet (Owned by Dev 1)
* **Endpoints:**
  * `GET /api/rewards/wallet?student_id={id}`: Fetch spendable points and mobile data totals.
  * `GET /api/rewards/packages`: Fetch redeemable telecom data bundles (MTN, Airtel, Safaricom, Glo, Vodafone).
  * `POST /api/rewards/redeem?student_id={id}`:
    ```json
    {
      "package_id": "pkg_mtn_500mb",
      "phone_number": "+2348012345678",
      "provider": "MTN"
    }
    ```
  * `POST /api/rewards/earn-points?student_id={id}`:
    ```json
    {
      "points": 75,
      "description": "Completed Lesson 3 in Python Foundations",
      "activity_type": "lesson_completed"
    }
    ```

---

### 2.4. Student Dashboard (Owned by Dev 1)
* **Endpoint:** `GET /api/dashboard/overview?student_id={id}`
* **Returns:** Aggregated metrics (learning points, streak days, active enrolled courses, achievements).

---

## 3. Frontend Integration Points for Developer 2

1. **Orientation Page (`frontend/src/routes/orientation/+page.svelte`):**
   * Pre-wired with `submitCareerAssessment(answers)` from `$lib/services/api`.
   * Extend the UI with dynamic questionnaire steps and visual pathway graphs.
2. **Courses Catalog & Lessons (`frontend/src/routes/courses/+page.svelte`):**
   * Pre-wired with `walletStore.claimRewardPoints(points, description)` to instantly reward learners upon lesson completion.
   * Connect to `/ai-assistant?course={id}` for inline tutor support.

---

## 4. Backend Integration Points for Developer 3

1. **Orientation Route (`backend/app/api/routes/orientation.py`):**
   * Connect with Gemini/OpenAI prompt template to parse `request.answers` and output structured `AssessmentResponse`.
2. **AI Chat Route (`backend/app/api/routes/ai.py`):**
   * Connect to Gemini API (`gemini-1.5-flash` or `gemini-2.0`) using `settings.GEMINI_API_KEY`.
   * Log interactions to `ai_chat_logs` table in Supabase.
