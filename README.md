# AutoDezire — Find the automobile that fits you.

AutoDezire is an AI-powered, user-centric automobile recommendation and suitability evaluation platform.

Instead of asking what vehicle you want, AutoDezire understands who you are, how you drive or ride, where you commute, and what you need. Based on this information, the system recommends suitable cars, motorcycles, and scooters.

---

## 🌟 Key Features

1. **User Profile & Questionnaire (Flow 1)**:
   - Multi-step questionnaire collecting personal profile (height, age), driving experience (city, highway, hills, rough roads), commute usage, passenger & luggage requirements, and comfortable budget.
   - **Top 3 Priorities Selection**: Weighted ranking boosting what matters most to the user (Safety, Comfort, Mileage, Ground Clearance, Highway Stability, etc.).
   - **10-15% Budget Margin Tolerance**: Clearly distinguishes between *Within Budget*, *Slightly Above Budget*, and *Beyond Range*.

2. **Specific Automobile Evaluation (Flow 2)**:
   - Search any vehicle (e.g. *Mahindra Thar, Tata Nexon, Hyundai Creta, Ather 450X, Royal Enfield*) to evaluate: **“How suitable is this vehicle for ME?”**
   - **Semi-Circular Colorful Suitability Gauge**: Visual 0–100 score (Red → Orange → Yellow → Green).
   - **5 × 2 Grid with 10 Requirement Cards**: Large icons, progress bars, and /10 suitability scores.
   - **Personalized Strengths & Considerations**: Tailored checkmarks and considerations explaining why a car fits or where compromises exist.
   - **Critical Priority Compromise Warning**: Flags serious weaknesses when a top priority scores low.

3. **GenAI / LLM Automobile Advisor**:
   - Context-aware chatbot receiving structured user telemetry, vehicle specs, scores, and trade-offs.
   - Supports Google Gemini API & OpenAI API with an intelligent context-aware fallback engine.

4. **Side-by-Side Comparison**:
   - Compare up to 3 vehicles on suitability for YOUR exact profile.

5. **Protected Admin Management Portal (`/admin`)**:
   - Metrics summary (Total, Cars, Bikes, Scooters).
   - Category-tailored Add / Edit forms and instant database updates.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Canvas Confetti, Responsive SPA.
- **Backend**: Node.js, Express.js, RESTful APIs, JWT Authentication, Password Hashing.
- **Database**: MongoDB (Mongoose) with In-Memory fallback store.
- **AI Integration**: Google Gemini API / OpenAI API / Context-Aware Engine.
- **Deployment**: cPanel Ready with `.htaccess`, build scripts, and `ecosystem.config.js`.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Run Development Server
```bash
# Runs Express backend (port 5000) and React frontend (port 3000) concurrently
npm run dev
```

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 🛡️ Default Admin Credentials
- **URL**: `/admin` or click **Admin Portal** in the sidebar.
- **Email**: `admin@autodezire.com`
- **Password**: `admin123`
