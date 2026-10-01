import os
import sys
import json
import subprocess
import shutil
from PIL import Image, ImageChops
import fitz  # PyMuPDF
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

BASE_DIR = r"c:\Users\yukta\OneDrive\Desktop\AutoDezire"
DOCS_DIR = os.path.join(BASE_DIR, "docs")
PNG_DIR = os.path.join(DOCS_DIR, "diagrams", "png")
TEMP_DIR = os.path.join(DOCS_DIR, "temp_render")

os.makedirs(PNG_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# ==============================================================================
# DIAGRAM DEFINITIONS
# ==============================================================================
DIAGRAMS = [
    {
        "id": "01_System_Overview_UseCase",
        "title": "System Overview Use Case Diagram",
        "category": "Use Case Diagrams",
        "description": "Comprehensive system boundary illustrating all four system actors (Guest, Registered User, Admin, and external AI Service) interacting with AutoDezire's core functional subsystems.",
        "mermaid": """graph TB
    subgraph AutoDezire["AutoDezire - AI Vehicle Recommendation System"]
        direction TB

        subgraph Auth["Authentication"]
            UC1["Register Account"]
            UC2["Login"]
            UC3["View My Profile"]
        end

        subgraph Discovery["Vehicle Discovery"]
            UC4["Browse / Search Vehicles"]
            UC5["Fill Profile Questionnaire"]
            UC6["Get AI Recommendations"]
            UC7["View Vehicle Details & Evaluation"]
            UC8["Compare Vehicles Side-by-Side"]
        end

        subgraph AI["AI Advisor"]
            UC9["Chat with AI Advisor"]
            UC10["Get Personalized AI Response"]
        end

        subgraph Saved["Saved Vehicles"]
            UC11["Save Vehicle"]
            UC12["View Saved Vehicles"]
            UC13["Remove Saved Vehicle"]
        end

        subgraph Admin["Admin Panel"]
            UC14["View Dashboard Metrics"]
            UC15["Add New Vehicle"]
            UC16["Edit Vehicle"]
            UC17["Delete Vehicle"]
            UC18["Browse All Inventory"]
        end
    end

    Guest(("Guest"))
    User(("Registered User"))
    Admin_Actor(("Admin"))
    AI_Actor(("AI Service"))

    Guest --> UC1
    Guest --> UC2
    Guest --> UC4
    Guest --> UC7
    Guest --> UC9

    User --> UC3
    User --> UC5
    User --> UC6
    User --> UC7
    User --> UC8
    User --> UC9
    User --> UC11
    User --> UC12
    User --> UC13

    Admin_Actor --> UC14
    Admin_Actor --> UC15
    Admin_Actor --> UC16
    Admin_Actor --> UC17
    Admin_Actor --> UC18
    Admin_Actor --> UC2

    AI_Actor --> UC10

    UC9 -. "«include»" .-> UC10
    UC5 -. "«include»" .-> UC6
    UC6 -. "«include»" .-> UC7
    UC7 -. "«extend»" .-> UC11

    User -- "inherits" --> Guest
"""
    },
    {
        "id": "02_Authentication_Module_UseCase",
        "title": "Authentication & Identity Module Use Case",
        "category": "Use Case Diagrams",
        "description": "Details registration, credential authentication, JWT token issuance, bcrypt hashing, and the resilient in-memory fallback mechanism.",
        "mermaid": """graph LR
    subgraph AUTH["Authentication & Identity Module"]
        A1["Register with Name/Email/Password"]
        A2["Login with Email/Password"]
        A3["Admin Login (Hardcoded Credentials)"]
        A4["Get Current User Profile (JWT)"]
        A5["JWT Token Generation"]
        A6["Password Hashing (bcrypt)"]
        A7["Validate Email Uniqueness"]
        A8["Memory Store Fallback (No DB)"]
    end

    G(("Guest"))
    U(("Registered User"))
    AD(("Admin"))

    G --> A1
    G --> A2
    AD --> A3
    U --> A4

    A1 -. "«include»" .-> A5
    A1 -. "«include»" .-> A6
    A1 -. "«include»" .-> A7
    A2 -. "«include»" .-> A5
    A3 -. "«extend»" .-> A2
    A1 -. "«extend»" .-> A8
    A2 -. "«extend»" .-> A8
"""
    },
    {
        "id": "03_Vehicle_Discovery_Recommendations_UseCase",
        "title": "Vehicle Discovery & Recommendation Engine Use Case",
        "category": "Use Case Diagrams",
        "description": "Illustrates 30+ parameter lifestyle questionnaire submission, 12-dimension weighted suitability scoring, catalog search, and multi-vehicle comparison.",
        "mermaid": """graph LR
    subgraph DISC["Vehicle Discovery & Recommendation Engine"]
        D1["Search by Brand / Model / Category"]
        D2["Filter by Fuel Type / Price / Body Type"]
        D3["Fill Profile Questionnaire (30+ params)"]
        D4["Submit Profile for Scoring"]
        D5["Run Suitability Engine (12-Dim Scoring)"]
        D6["View Top Recommendations (Cars/Bikes/Scooters)"]
        D7["View Vehicle Detail & Evaluation Report"]
        D8["Compare 2 Vehicles Side-by-Side"]
        D9["View Suitability Score Breakdown"]
        D10["Filter Recommendations by Category"]
    end

    G(("Guest"))
    U(("Registered User"))

    G --> D1
    G --> D7

    U --> D1
    U --> D2
    U --> D3
    U --> D6
    U --> D7
    U --> D8
    U --> D10

    D3 -. "«include»" .-> D4
    D4 -. "«include»" .-> D5
    D5 -. "«include»" .-> D6
    D7 -. "«include»" .-> D9
    D6 -. "«extend»" .-> D10
    D1 -. "«extend»" .-> D2
"""
    },
    {
        "id": "04_AI_Advisor_Module_UseCase",
        "title": "AI Advisor Module Use Case",
        "category": "Use Case Diagrams",
        "description": "Models the OpenRouter-powered conversational advisor leveraging Google Gemma 26B, dynamically integrating buyer profile, vehicle specs, and suitability metrics.",
        "mermaid": """graph LR
    subgraph AIADV["AI Advisor Module (Google Gemma 26B via OpenRouter)"]
        AI1["Open AI Advisor Chat"]
        AI2["Send Natural Language Question"]
        AI3["Resolve User Profile (JWT or Default)"]
        AI4["Resolve Selected Vehicle Context"]
        AI5["Run Suitability Evaluation (if missing)"]
        AI6["Build Context-Aware Prompt"]
        AI7["Call OpenRouter API (Gemma 4 26B)"]
        AI8["Receive Personalized AI Response"]
        AI9["Display Conversation History"]
    end

    G(("Guest"))
    U(("Registered User"))
    AI(("AI Service"))

    G --> AI1
    G --> AI2
    U --> AI1
    U --> AI2
    AI --> AI7
    AI --> AI8

    AI2 -. "«include»" .-> AI3
    AI2 -. "«include»" .-> AI4
    AI4 -. "«extend»" .-> AI5
    AI2 -. "«include»" .-> AI6
    AI6 -. "«include»" .-> AI7
    AI7 -. "«include»" .-> AI8
    AI1 -. "«include»" .-> AI9
"""
    },
    {
        "id": "05_Saved_Vehicles_Module_UseCase",
        "title": "Saved Vehicles Module Use Case",
        "category": "Use Case Diagrams",
        "description": "Covers user wishlist bookmarking, duplicate prevention, and full vehicle details population for persistent saved inventories.",
        "mermaid": """graph LR
    subgraph SAVED["Saved Vehicles Module"]
        S1["Save Vehicle to Wishlist"]
        S2["View All Saved Vehicles"]
        S3["Remove Vehicle from Saved"]
        S4["Check if Already Saved (Prevent Duplicates)"]
        S5["Fetch Full Vehicle Details for Saved Entry"]
    end

    U(("Registered User"))

    U --> S1
    U --> S2
    U --> S3

    S1 -. "«include»" .-> S4
    S2 -. "«include»" .-> S5
"""
    },
    {
        "id": "06_Admin_Panel_Module_UseCase",
        "title": "Admin Panel Management Use Case",
        "category": "Use Case Diagrams",
        "description": "Details administrator dashboard KPIs, full inventory lifecycle management (CRUD), category filtering, and status activation.",
        "mermaid": """graph LR
    subgraph ADMIN["Admin Panel Management Module"]
        AD1["View Dashboard Metrics (Total/Active/By Category)"]
        AD2["Browse All Vehicle Inventory"]
        AD3["Filter Inventory by Category/Search"]
        AD4["Add New Vehicle (Car / Bike / Scooter)"]
        AD5["Edit Existing Vehicle Details"]
        AD6["Delete Vehicle"]
        AD7["Validate Admin JWT Token"]
        AD8["Set Vehicle isActive Status"]
    end

    A(("Admin"))

    A --> AD1
    A --> AD2
    A --> AD4
    A --> AD5
    A --> AD6

    AD1 -. "«include»" .-> AD7
    AD2 -. "«include»" .-> AD7
    AD4 -. "«include»" .-> AD7
    AD5 -. "«include»" .-> AD7
    AD6 -. "«include»" .-> AD7
    AD2 -. "«extend»" .-> AD3
    AD4 -. "«extend»" .-> AD8
    AD5 -. "«extend»" .-> AD8
"""
    },
    {
        "id": "07_UML_Class_Diagram",
        "title": "UML Domain Class Diagram",
        "category": "Structural UML Diagrams",
        "description": "Shows domain entities, relationships, attributes, and embedded value objects across User, Profile, Vehicle, Bike, SavedVehicle, and SuitabilityEngine.",
        "mermaid": """classDiagram
    class User {
        +String name
        +String email
        +String password
        +String role
        +Profile profile
        +Date createdAt
        +Date updatedAt
        +matchPassword(password) Boolean
    }

    class Profile {
        +Number height
        +Number age
        +String categoryPreference
        +Number yearsExperience
        +Number totalKm
        +Number dailyKm
        +Number monthlyKm
        +Number cityPercent
        +Number highwayPercent
        +Number ruralPercent
        +String roadConditions
        +Number regularPassengers
        +Number maxPassengers
        +Boolean hasChildren
        +Boolean hasElderly
        +String luggageRequirement
        +String pillionFrequency
        +Number budget
        +Number expectedOwnershipYears
        +String runningCostImportance
        +List topPriorities
    }

    class Vehicle {
        +String brand
        +String model
        +String category
        +String bodyType
        +Number priceFrom
        +Number priceTo
        +String priceDisplay
        +String fuelType
        +List availableFuelTypes
        +String transmission
        +String engine
        +Number engineCC
        +String power
        +String torque
        +String mileage
        +Number groundClearance
        +Number seatingCapacity
        +Number bootSpace
        +Number seatHeight
        +Number kerbWeight
        +Number idealHeightMin
        +Number idealHeightMax
        +String batteryCapacity
        +Boolean chargingRequired
        +Number safetyRating
        +String image
        +BaseScores baseScores
        +List trimVariants
        +Boolean isActive
    }

    class Bike {
        +String brand
        +String model
        +String category
        +String bodyType
        +Number priceFrom
        +Number priceTo
        +String fuelType
        +String transmission
        +String engine
        +Number engineCC
        +String power
        +String torque
        +String mileage
        +Number seatHeight
        +Number kerbWeight
        +Number groundClearance
        +String riderTriangle
        +Number idealHeightMin
        +Number idealHeightMax
        +Number idealInseamMin
        +Number idealInseamMax
        +Number pillionSeatComfort
        +Number underseatStorageLitres
        +String brakeSetup
        +Boolean beginnerFriendly
        +BikeBaseScores baseScores
        +Boolean isActive
    }

    class SavedVehicle {
        +String vehicleId
        +Number suitabilityScore
        +Date savedAt
    }

    class BaseScores {
        +Number safety
        +Number groundClearance
        +Number comfort
        +Number spacePracticality
        +Number mileageRunningCost
        +Number maintenanceCost
        +Number performance
        +Number resaleValue
        +Number highwayStability
        +Number cityDriveSuitability
        +Number ergonomicFit
        +Number handleability
    }

    class BikeBaseScores {
        +Number mileageRunningCost
        +Number ergonomicFlatFoot
        +Number riderWeightHandling
        +Number cityTrafficAgility
        +Number pillionComfort
        +Number underseatStorage
        +Number highwayTouringPoise
        +Number brakingSafety
        +Number maintenanceCost
        +Number performanceAcceleration
    }

    class TrimVariant {
        +String name
        +String priceApprox
        +Boolean isTopModel
        +List safety
        +List comfort
        +List infotainment
        +List convenience
    }

    class SuitabilityResult {
        +Number overallScore
        +String budgetStatus
        +Map dimensionScores
        +List strengths
        +List considerations
        +String ergonomicFit
    }

    User "1" *-- "1" Profile : has
    Vehicle "1" *-- "1" BaseScores : has
    Vehicle "1" *-- "0..*" TrimVariant : has
    Bike "1" *-- "1" BikeBaseScores : has
    SavedVehicle "0..*" --> "1" Vehicle : references
    User "1" --> "0..*" SavedVehicle : saves
    Profile --> SuitabilityResult : evaluated against
    Vehicle --> SuitabilityResult : produces
    Bike --> SuitabilityResult : produces
"""
    },
    {
        "id": "08_System_Architecture_Diagram",
        "title": "System Architecture & Tier Deployment Diagram",
        "category": "Architectural UML Diagrams",
        "description": "Visualizes Client Tier (Vite React), Server Tier (Express Node.js REST API), Database Tier (MongoDB Atlas), and External AI Tier (OpenRouter).",
        "mermaid": """graph TB
    subgraph CLIENT["Client Tier (React + Vite + TailwindCSS)"]
        LAND["ScrollScrubbingLanding (Entry)"]
        AUTH_UI["AuthModal (Login/Register)"]
        DASH["HomeView (Dashboard)"]
        PROFILE["QuestionnaireView"]
        RECO["RecommendationsView"]
        SEARCH["SearchVehicleView"]
        EVAL["EvaluationView"]
        COMPARE["CompareView"]
        AI_UI["AIAdvisorView"]
        SAVED_UI["SavedVehiclesView"]
        ADMIN_UI["AdminDashboard"]
        CTX["AppContext (Global State)"]
    end

    subgraph SERVER["Server Tier (Node.js + Express REST API)"]
        AUTH_R["/api/auth"]
        RECO_R["/api/recommendations"]
        VEHICLE_R["/api/vehicles"]
        AI_R["/api/ai/chat"]
        SAVED_R["/api/saved"]
        ADMIN_R["/api/admin"]
        SUIT["SuitabilityEngine (12 Dimensions)"]
        AI_SVC["aiAdvisorService"]
        STORE["Store (DB + Memory Fallback)"]
        AUTH_MW["authMiddleware (JWT)"]
    end

    subgraph DB["Database Tier (MongoDB Atlas)"]
        USERS[("users collection")]
        VEHICLES[("vehicles collection")]
        BIKES[("bikes collection")]
        SAVED_COL[("savedvehicles collection")]
    end

    subgraph EXTERNAL["External AI Services"]
        OPENROUTER["OpenRouter API (Google Gemma 4 26B)"]
    end

    CLIENT -->|"REST API (JSON/HTTP)"| SERVER
    AUTH_R --> AUTH_MW
    ADMIN_R --> AUTH_MW
    RECO_R --> SUIT
    AI_R --> AI_SVC
    AI_R --> SUIT
    AI_SVC --> OPENROUTER
    SERVER --> STORE
    STORE -->|"Mongoose ODM"| DB
"""
    },
    {
        "id": "09_Sequence_AI_Advisor_Chat",
        "title": "Sequence Diagram: AI Advisor Chat Interaction",
        "category": "Behavioral Sequence Diagrams",
        "description": "Chronological trace of natural language query processing, profile retrieval, runtime suitability computation, and OpenRouter Gemma LLM inference.",
        "mermaid": """sequenceDiagram
    autonumber
    actor User as User / Guest
    participant ChatUI as AIAdvisorView (React)
    participant API as /api/ai/chat (Express)
    participant JWTAuth as JWT Resolver
    participant SuitEng as SuitabilityEngine
    participant AISvc as aiAdvisorService
    participant OpenRouter as OpenRouter API (Gemma)

    User->>ChatUI: Submits question about vehicle
    ChatUI->>API: POST /api/ai/chat {message, vehicleId, history}
    API->>JWTAuth: Decode Bearer token (optional)
    JWTAuth-->>API: userProfile (from DB / Memory)
    API->>API: Resolve vehicle details from store
    opt Suitability evaluation missing
        API->>SuitEng: evaluateVehicleSuitability(vehicle, profile)
        SuitEng-->>API: suitabilityResult
    end
    API->>AISvc: generateAdvisorResponse({message, profile, vehicle, suitability})
    AISvc->>AISvc: Construct system context prompt
    AISvc->>OpenRouter: POST /chat/completions
    OpenRouter-->>AISvc: LLM response
    AISvc-->>API: {reply, model}
    API-->>ChatUI: {success: true, data: {reply, model}}
    ChatUI-->>User: Renders advisor recommendation
"""
    },
    {
        "id": "10_Sequence_Vehicle_Recommendation",
        "title": "Sequence Diagram: Suitability Recommendation Flow",
        "category": "Behavioral Sequence Diagrams",
        "description": "End-to-end flow from user questionnaire submission, catalog batch retrieval, 12-dimensional weighted scoring, sorting, to categorized frontend presentation.",
        "mermaid": """sequenceDiagram
    autonumber
    actor User as Registered User
    participant Form as QuestionnaireView (React)
    participant API as Express API (/api/recommendations)
    participant Store as store.js
    participant DB as MongoDB Database
    participant Engine as SuitabilityEngine

    User->>Form: Submits 30+ parameter lifestyle questionnaire
    Form->>API: POST /api/recommendations {profile}
    API->>Store: getAllVehicles()
    Store->>DB: Query active vehicles & bikes
    DB-->>Store: Return catalogue
    Store-->>API: Array of vehicles
    loop For each candidate vehicle
        API->>Engine: evaluateVehicleSuitability(vehicle, profile)
        Engine->>Engine: Score 12 lifestyle dimensions
        Engine-->>API: evaluation {overallScore, budgetStatus}
    end
    API->>API: Sort by overallScore DESC & categorize
    API-->>Form: {topMatches, categorized}
    Form-->>User: Renders ranked recommendations
"""
    },
    {
        "id": "11_Component_Interaction_Summary",
        "title": "Component & API Interaction Summary",
        "category": "Architectural UML Diagrams",
        "description": "High-level map connecting React frontend views to corresponding Express route handlers and controller logic.",
        "mermaid": """graph LR
    subgraph Frontend["Frontend Views"]
        F1["QuestionnaireView"]
        F2["RecommendationsView"]
        F3["SearchVehicleView"]
        F4["EvaluationView"]
        F5["AIAdvisorView"]
        F6["SavedVehiclesView"]
        F7["AdminDashboard"]
        F8["AuthModal"]
    end

    subgraph Backend["Backend Endpoints"]
        B1["/api/auth"]
        B2["/api/recommendations"]
        B3["/api/vehicles"]
        B4["/api/ai/chat"]
        B5["/api/saved"]
        B6["/api/admin"]
    end

    F1 -->|"POST profile"| B2
    F2 -->|"GET vehicles"| B3
    F3 -->|"GET search"| B3
    F4 -->|"GET vehicle/:id"| B3
    F5 -->|"POST message"| B4
    F6 -->|"GET/POST/DELETE"| B5
    F7 -->|"CRUD metrics & vehicles"| B6
    F8 -->|"POST login/register"| B1
"""
    }
]

# ==============================================================================
# STEP 1: RENDER DIAGRAMS TO PNG USING CHROME HEADLESS + PYMUPDF + PILLOW
# ==============================================================================
def render_all_pngs():
    print("=" * 70)
    print("STEP 1: Rendering all 11 Mermaid diagrams to PNG...")
    print("=" * 70)

    # Build multi-page HTML
    sections_html = []
    for diag in DIAGRAMS:
        sections_html.append(f"""
        <div class="diagram-page">
            <div class="diagram-wrapper">
                <pre class="mermaid">
{diag['mermaid']}
                </pre>
            </div>
        </div>
        """)

    full_html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Diagram Render Batch</title>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <script>
        mermaid.initialize({{
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
            themeVariables: {{
                fontFamily: 'Segoe UI, Arial, sans-serif',
                fontSize: '13px',
                primaryColor: '#e0f2fe',
                primaryBorderColor: '#0284c7',
                lineColor: '#334155'
            }}
        }});
    </script>
    <style>
        @page {{
            size: 2000px 1400px;
            margin: 0;
        }}
        html, body {{
            margin: 0;
            padding: 0;
            background: #ffffff;
            font-family: 'Segoe UI', Arial, sans-serif;
        }}
        .diagram-page {{
            page-break-after: always;
            box-sizing: border-box;
            width: 2000px;
            height: 1400px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            background: #ffffff;
        }}
        .diagram-wrapper {{
            display: inline-block;
            background: #ffffff;
        }}
        .mermaid {{
            display: block;
        }}
    </style>
</head>
<body>
    {''.join(sections_html)}
</body>
</html>"""

    batch_html_path = os.path.join(TEMP_DIR, "batch_render.html")
    batch_pdf_path = os.path.join(TEMP_DIR, "batch_render.pdf")

    with open(batch_html_path, "w", encoding="utf-8") as f:
        f.write(full_html)

    print(f"Executing Chrome Headless to rasterize {len(DIAGRAMS)} diagrams...")
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=8000",
        f"--print-to-pdf={batch_pdf_path}",
        "--no-pdf-header-footer",
        f"file:///{batch_html_path.replace(os.sep, '/')}"
    ]
    subprocess.run(cmd, capture_output=True, timeout=30)

    if not os.path.exists(batch_pdf_path):
        raise RuntimeError("Failed to generate batch PDF from Chrome headless.")

    pdf_doc = fitz.open(batch_pdf_path)
    print(f"Chrome generated PDF with {len(pdf_doc)} pages.")

    generated_pngs = {}
    for idx, diag in enumerate(DIAGRAMS):
        if idx >= len(pdf_doc):
            print(f"Warning: Page {idx} not found in PDF doc.")
            continue
        page = pdf_doc[idx]
        # Render at 200 DPI for high fidelity without bloating
        pix = page.get_pixmap(dpi=200)
        temp_png = os.path.join(TEMP_DIR, f"{diag['id']}_raw.png")
        pix.save(temp_png)

        # Auto-crop white borders using Pillow
        im = Image.open(temp_png).convert("RGB")
        bg = Image.new("RGB", im.size, (255, 255, 255))
        diff = ImageChops.difference(im, bg)
        bbox = diff.getbbox()

        final_png = os.path.join(PNG_DIR, f"{diag['id']}.png")
        if bbox:
            pad = 35
            crop_box = (
                max(0, bbox[0] - pad),
                max(0, bbox[1] - pad),
                min(im.width, bbox[2] + pad),
                min(im.height, bbox[3] + pad)
            )
            cropped = im.crop(crop_box)
            cropped.save(final_png, "PNG", optimize=True)
            print(f"  [OK] {diag['id']}.png ({cropped.width}x{cropped.height}, {os.path.getsize(final_png):,} bytes)")
        else:
            im.save(final_png, "PNG")
            print(f"  [!] {diag['id']}.png (Uncropped, {os.path.getsize(final_png):,} bytes)")

        generated_pngs[diag["id"]] = final_png

    return generated_pngs

# ==============================================================================
# STEP 2: BUILD COMPLETE MICROSOFT WORD (.DOCX) SPECIFICATION
# ==============================================================================
def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def style_table(table, col_widths=None):
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, row in enumerate(table.rows):
        for j, cell in enumerate(row.cells):
            cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
            set_cell_margins(cell, top=120, bottom=120, left=150, right=150)
            if col_widths and j < len(col_widths):
                cell.width = col_widths[j]
            if i == 0:
                set_cell_background(cell, "1E3A8A")  # Dark Navy
                for paragraph in cell.paragraphs:
                    paragraph.alignment = WD_ALIGN_PARAGRAPH.LEFT
                    for run in paragraph.runs:
                        run.font.bold = True
                        run.font.color.rgb = RGBColor(255, 255, 255)
                        run.font.size = Pt(10)
            else:
                bg = "F8FAFC" if i % 2 == 1 else "FFFFFF"
                set_cell_background(cell, bg)
                for paragraph in cell.paragraphs:
                    for run in paragraph.runs:
                        run.font.size = Pt(9.5)
                        run.font.color.rgb = RGBColor(30, 41, 59)

def build_docx_document(png_dict):
    print("\n" + "=" * 70)
    print("STEP 2: Building AutoDezire_UML_and_UseCase_Specification.docx...")
    print("=" * 70)

    doc = Document()

    # Configure Margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Document Header / Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_title = p_title.add_run("AUTODEZIRE")
    r_title.font.size = Pt(28)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(30, 58, 138)  # #1E3A8A

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run("Software Requirements Specification (SRS)\nUML & Use Case Architecture Document")
    r_sub.font.size = Pt(16)
    r_sub.font.bold = True
    r_sub.font.color.rgb = RGBColor(2, 132, 199)  # #0284C7

    p_meta = doc.add_paragraph()
    p_meta.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_meta = p_meta.add_run("System Architecture • Functional Use Cases • Domain Models • Sequence Flows\nVersion 1.0.0 | September 2026")
    r_meta.font.size = Pt(10)
    r_meta.font.italic = True
    r_meta.font.color.rgb = RGBColor(100, 116, 139)

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # --------------------------------------------------------------------------
    # 1. Executive Summary
    # --------------------------------------------------------------------------
    h1 = doc.add_heading("1. Executive Summary & System Overview", level=1)
    h1.paragraph_format.space_before = Pt(16)
    h1.paragraph_format.space_after = Pt(8)

    p1 = doc.add_paragraph()
    p1.add_run(
        "AutoDezire is an advanced automobile decision-support and recommendation platform engineered "
        "to assist buyers in selecting optimal vehicles (Cars, Motorcycles, and Electric Scooters) "
        "tailored to their exact physical ergonomics, driving environment, passenger obligations, and budget. "
        "Unlike generic automotive portals that rank vehicles purely on marketing specs, AutoDezire implements a "
        "12-dimension deterministic suitability engine paired with OpenRouter Google Gemma 4 26B AI conversational guidance."
    )

    # --------------------------------------------------------------------------
    # 2. System Actors & Roles
    # --------------------------------------------------------------------------
    h2 = doc.add_heading("2. System Actors & Responsibilities", level=1)
    h2.paragraph_format.space_before = Pt(16)
    h2.paragraph_format.space_after = Pt(8)

    actors_table = doc.add_table(rows=1, cols=3)
    hdr_cells = actors_table.rows[0].cells
    hdr_cells[0].text = "Actor"
    hdr_cells[1].text = "Type"
    hdr_cells[2].text = "Functional Scope & Responsibilities"

    actor_data = [
        ("Guest (Unauthenticated)", "Human (Primary)", "Browses catalog, filters vehicles, views suitability reports, interacts with AI Advisor demo."),
        ("Registered User", "Human (Primary)", "Maintains persistent 30+ parameter lifestyle profile, saves wishlists, receives weighted suitability scores, compares vehicles side-by-side."),
        ("Administrator", "Human (Secondary)", "Manages system inventory (CRUD operations for cars/bikes/scooters), monitors dashboard platform KPIs, audits active listings."),
        ("External AI Service (Gemma)", "Automated System (Supporting)", "Google Gemma 26B via OpenRouter API. Evaluates user lifestyle prompts, produces context-aware natural language vehicular advice.")
    ]

    for name, atype, scope in actor_data:
        row = actors_table.add_row().cells
        row[0].text = name
        row[1].text = atype
        row[2].text = scope

    style_table(actors_table, [Inches(1.8), Inches(1.5), Inches(3.5)])

    # --------------------------------------------------------------------------
    # 3. High-Level Use Case Model
    # --------------------------------------------------------------------------
    doc.add_page_break()
    h3 = doc.add_heading("3. High-Level System Overview Use Case Diagram", level=1)
    h3.paragraph_format.space_before = Pt(12)
    h3.paragraph_format.space_after = Pt(8)

    p_uc_desc = doc.add_paragraph(
        "The following diagram captures the complete functional boundary of AutoDezire. It maps the interactions "
        "between all four primary/secondary actors and the core functional modules: Authentication, Vehicle Discovery, "
        "AI Advisor, Saved Wishlists, and the Administrative Control Panel."
    )

    if "01_System_Overview_UseCase" in png_dict:
        img_p = doc.add_paragraph()
        img_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        img_p.paragraph_format.space_before = Pt(8)
        img_p.paragraph_format.space_after = Pt(6)
        doc.add_picture(png_dict["01_System_Overview_UseCase"], width=Inches(6.4))
        cap = doc.add_paragraph()
        cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r_cap = cap.add_run("Figure 1: AutoDezire High-Level System Overview Use Case Diagram")
        r_cap.font.size = Pt(9)
        r_cap.font.italic = True
        r_cap.font.color.rgb = RGBColor(100, 116, 139)

    # --------------------------------------------------------------------------
    # 4. Detailed Module Use Cases
    # --------------------------------------------------------------------------
    doc.add_page_break()
    doc.add_heading("4. Detailed Module-Level Use Case Diagrams & Specifications", level=1)

    module_sections = [
        ("02_Authentication_Module_UseCase", "4.1 Authentication & Identity Subsystem",
         "Manages secure user registration, bcrypt credential encryption, JWT session management, and fallback in-memory store for high-availability operation.",
         [
             ("UC-01: User Registration", "Guest", "High", "Validate Email Uniqueness, Hash Password, Generate JWT", "Memory Fallback", "Allows new users to create accounts with email and password."),
             ("UC-02: User Login", "Guest / Admin", "High", "Validate Credentials, Generate JWT", "Admin Hardcoded Override", "Authenticates registered users or admin credentials and issues Bearer tokens.")
         ]),
        ("03_Vehicle_Discovery_Recommendations_UseCase", "4.2 Vehicle Discovery & Recommendation Engine Subsystem",
         "Drives the personalized matching pipeline. Collects 30+ buyer profile data points and executes 12-dimension deterministic scoring across terrain, ergonomics, space, and finances.",
         [
             ("UC-05: Submit Lifestyle Questionnaire", "Registered User", "High", "Suitability Engine Execution", "Category Filter", "Saves user constraints (height, daily km, terrain, budget) to profile."),
             ("UC-06: Compute Recommendations", "Registered User", "High", "12-Dimension Scoring Engine", "Budget Categorization", "Ranks catalog by overall suitability score (0-100) and groups by category.")
         ]),
        ("04_AI_Advisor_Module_UseCase", "4.3 AI Conversational Advisor Subsystem",
         "Integrates OpenRouter Google Gemma 4 26B LLM with AutoDezire's internal domain models, injecting buyer profile and suitability scores into prompts.",
         [
             ("UC-09: Chat with AI Advisor", "Guest / User", "High", "Resolve User Context, Build Prompt, OpenRouter API", "On-the-fly Suitability Engine", "Provides real-time conversational vehicular advice and comparisons."),
             ("UC-10: Receive AI Response", "AI Service", "High", "JSON Formatting, Model Attribution", "Fallback Graceful Message", "Generates personalized advice streaming response.")
         ]),
        ("05_Saved_Vehicles_Module_UseCase", "4.4 Saved Vehicles (Wishlist) Subsystem",
         "Enables users to curate a personal comparison list of preferred models with real-time suitability metrics.",
         [
             ("UC-11: Save Vehicle", "Registered User", "Medium", "Duplicate Check, Store Update", "None", "Adds vehicle ID and timestamped evaluation score to user wishlist."),
             ("UC-12: View Saved Vehicles", "Registered User", "Medium", "Populate Vehicle Details", "None", "Fetches rich vehicle specs and suitability for all wishlisted items.")
         ]),
        ("06_Admin_Panel_Module_UseCase", "4.5 Administrative Inventory & Metrics Subsystem",
         "Restricted administration dashboard for automotive catalog management, inventory audits, and platform metrics.",
         [
             ("UC-14: View Admin Metrics", "Admin", "High", "Verify JWT Admin Role", "None", "Aggregates inventory counts: total cars, bikes, scooters, active listings."),
             ("UC-15: Add New Vehicle", "Admin", "High", "Input Validation, Store Insert", "Default Base Scores", "Creates new vehicle entry with pricing, powertrain, and ergonomics specs.")
         ])
    ]

    fig_counter = 2
    for diag_id, title, desc, ucs in module_sections:
        h = doc.add_heading(title, level=2)
        h.paragraph_format.space_before = Pt(14)
        h.paragraph_format.space_after = Pt(6)

        p = doc.add_paragraph(desc)
        p.paragraph_format.space_after = Pt(8)

        if diag_id in png_dict:
            img_p = doc.add_paragraph()
            img_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            doc.add_picture(png_dict[diag_id], width=Inches(6.2))
            cap = doc.add_paragraph()
            cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r_cap = cap.add_run(f"Figure {fig_counter}: {title}")
            r_cap.font.size = Pt(9)
            r_cap.font.italic = True
            r_cap.font.color.rgb = RGBColor(100, 116, 139)
            fig_counter += 1

        # Use Case Table
        uc_table = doc.add_table(rows=1, cols=6)
        hdr = uc_table.rows[0].cells
        hdr[0].text = "Use Case"
        hdr[1].text = "Actor"
        hdr[2].text = "Priority"
        hdr[3].text = "«include»"
        hdr[4].text = "«extend»"
        hdr[5].text = "Functional Summary"

        for uc_name, actor, prio, inc, ext, summ in ucs:
            r = uc_table.add_row().cells
            r[0].text = uc_name
            r[1].text = actor
            r[2].text = prio
            r[3].text = inc
            r[4].text = ext
            r[5].text = summ

        style_table(uc_table, [Inches(1.5), Inches(1.0), Inches(0.8), Inches(1.3), Inches(1.0), Inches(1.4)])
        doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # --------------------------------------------------------------------------
    # 5. UML Class Diagram & Domain Data Model
    # --------------------------------------------------------------------------
    doc.add_page_break()
    h5 = doc.add_heading("5. UML Structural Class Diagram & Domain Entities", level=1)
    h5.paragraph_format.space_before = Pt(14)

    doc.add_paragraph(
        "AutoDezire utilizes an Object-Document Data Model implemented via Mongoose ODM. "
        "The class diagram below visualizes primary entities: User (with embedded Profile), "
        "Vehicle (Car model with TrimVariants), Bike (Motorcycles and Scooters with 2-Wheeler ergonomic parameters), "
        "SavedVehicle, and the SuitabilityResult computational entity."
    )

    if "07_UML_Class_Diagram" in png_dict:
        img_p = doc.add_paragraph()
        img_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        doc.add_picture(png_dict["07_UML_Class_Diagram"], width=Inches(6.4))
        cap = doc.add_paragraph()
        cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r_cap = cap.add_run(f"Figure {fig_counter}: UML Domain Class Diagram")
        r_cap.font.size = Pt(9)
        r_cap.font.italic = True
        r_cap.font.color.rgb = RGBColor(100, 116, 139)
        fig_counter += 1

    # Class specs table
    doc.add_heading("Domain Entity Schema Specifications", level=2)
    entity_table = doc.add_table(rows=1, cols=4)
    ehdr = entity_table.rows[0].cells
    ehdr[0].text = "Entity"
    ehdr[1].text = "Type"
    ehdr[2].text = "Key Attributes / Fields"
    ehdr[3].text = "Domain Purpose"

    entities = [
        ("User", "Root Document", "name, email, password (hashed), role ('user'|'admin'), profile, createdAt", "Identity & authentication root."),
        ("Profile", "Embedded Document", "height (cm), age, budget (Lakhs), dailyKm, highwayPercent, cityPercent, roadConditions, regularPassengers, topPriorities (max 3)", "Stores buyer lifestyle parameters for deterministic scoring."),
        ("Vehicle", "Root Document", "brand, model, category ('Car'), bodyType, priceFrom, priceTo, engine, power, mileage, groundClearance, seatingCapacity, baseScores, trimVariants", "4-wheeler catalog with dimensional ergonomics and baseline scores."),
        ("Bike", "Root Document", "brand, model, category ('Motorcycle'|'Scooter'), seatHeight (mm), kerbWeight, riderTriangle, idealInseamMin/Max, pillionSeatComfort, underseatStorageLitres", "2-wheeler catalog with rider triangle ergonomics and inseam fit."),
        ("SavedVehicle", "Root Document", "vehicleId (ref), suitabilityScore, savedAt", "Persistent wishlist collection references."),
        ("SuitabilityResult", "Computed Object", "overallScore (0-100), budgetStatus, dimensionScores (12 dimensions), strengths[], considerations[]", "Output generated by SuitabilityEngine per vehicle-profile pair.")
    ]

    for en, et, attrs, purp in entities:
        r = entity_table.add_row().cells
        r[0].text = en
        r[1].text = et
        r[2].text = attrs
        r[3].text = purp

    style_table(entity_table, [Inches(1.2), Inches(1.2), Inches(2.6), Inches(1.8)])

    # --------------------------------------------------------------------------
    # 6. System Architecture & Component Interaction
    # --------------------------------------------------------------------------
    doc.add_page_break()
    doc.add_heading("6. System Architecture & Tier Interaction Models", level=1)

    doc.add_paragraph(
        "AutoDezire follows a modern decoupled 4-Tier Architecture: Presentation Tier (Vite React), "
        "Application Service Tier (Node.js Express), Persistence Tier (MongoDB Atlas with memory store fallback), "
        "and External Intelligence Tier (OpenRouter Gemma 26B)."
    )

    if "08_System_Architecture_Diagram" in png_dict:
        img_p = doc.add_paragraph()
        img_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        doc.add_picture(png_dict["08_System_Architecture_Diagram"], width=Inches(6.3))
        cap = doc.add_paragraph()
        cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r_cap = cap.add_run(f"Figure {fig_counter}: 4-Tier System Architecture & Deployment Diagram")
        r_cap.font.size = Pt(9)
        r_cap.font.italic = True
        r_cap.font.color.rgb = RGBColor(100, 116, 139)
        fig_counter += 1

    if "11_Component_Interaction_Summary" in png_dict:
        img_p = doc.add_paragraph()
        img_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        doc.add_picture(png_dict["11_Component_Interaction_Summary"], width=Inches(6.2))
        cap = doc.add_paragraph()
        cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r_cap = cap.add_run(f"Figure {fig_counter}: Frontend Views to REST API Endpoints Interaction Map")
        r_cap.font.size = Pt(9)
        r_cap.font.italic = True
        r_cap.font.color.rgb = RGBColor(100, 116, 139)
        fig_counter += 1

    # --------------------------------------------------------------------------
    # 7. Dynamic Behavioral Sequence Diagrams
    # --------------------------------------------------------------------------
    doc.add_page_break()
    doc.add_heading("7. Behavioral UML Sequence Diagrams", level=1)

    doc.add_heading("7.1 AI Advisor Conversational Query Execution Flow", level=2)
    doc.add_paragraph(
        "This sequence traces the end-to-end flow of an automotive advisory query. "
        "The server decodes JWT authentication, retrieves candidate vehicle specs, dynamically triggers the "
        "suitability engine if uncomputed, constructs an expert persona prompt, and calls OpenRouter Gemma 26B."
    )

    if "09_Sequence_AI_Advisor_Chat" in png_dict:
        img_p = doc.add_paragraph()
        img_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        doc.add_picture(png_dict["09_Sequence_AI_Advisor_Chat"], width=Inches(6.4))
        cap = doc.add_paragraph()
        cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r_cap = cap.add_run(f"Figure {fig_counter}: UML Sequence Diagram — AI Advisor Chat Interaction")
        r_cap.font.size = Pt(9)
        r_cap.font.italic = True
        r_cap.font.color.rgb = RGBColor(100, 116, 139)
        fig_counter += 1

    doc.add_heading("7.2 Vehicle Recommendation & Scoring Execution Flow", level=2)
    doc.add_paragraph(
        "Traces user questionnaire submission, catalog batch loading, and 12-dimensional weighted scoring "
        "by the SuitabilityEngine, followed by descending rank sorting and category classification."
    )

    if "10_Sequence_Vehicle_Recommendation" in png_dict:
        img_p = doc.add_paragraph()
        img_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        doc.add_picture(png_dict["10_Sequence_Vehicle_Recommendation"], width=Inches(6.4))
        cap = doc.add_paragraph()
        cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r_cap = cap.add_run(f"Figure {fig_counter}: UML Sequence Diagram — Recommendation & Scoring Flow")
        r_cap.font.size = Pt(9)
        r_cap.font.italic = True
        r_cap.font.color.rgb = RGBColor(100, 116, 139)
        fig_counter += 1

    # --------------------------------------------------------------------------
    # 8. Requirements Traceability Matrix
    # --------------------------------------------------------------------------
    doc.add_page_break()
    doc.add_heading("8. SRS Requirements Traceability Matrix (RTM)", level=1)
    doc.add_paragraph(
        "The following matrix maps all 20 functional use cases to the underlying Express REST API endpoints, "
        "backend service handlers, and React frontend views."
    )

    rtm_table = doc.add_table(rows=1, cols=5)
    rtm_hdr = rtm_table.rows[0].cells
    rtm_hdr[0].text = "UC ID"
    rtm_hdr[1].text = "Use Case Title"
    rtm_hdr[2].text = "Primary Actor"
    rtm_hdr[3].text = "REST Endpoint"
    rtm_hdr[4].text = "Frontend Component"

    rtm_data = [
        ("UC-01", "Register Account", "Guest", "POST /api/auth/register", "AuthModal.jsx"),
        ("UC-02", "Login", "Guest / Admin", "POST /api/auth/login", "AuthModal.jsx"),
        ("UC-03", "View Profile", "User", "GET /api/auth/me", "SettingsView.jsx"),
        ("UC-04", "Search / Filter Vehicles", "Guest / User", "GET /api/vehicles", "SearchVehicleView.jsx"),
        ("UC-05", "Submit Questionnaire", "User", "POST /api/recommendations", "QuestionnaireView.jsx"),
        ("UC-06", "Get AI Recommendations", "User", "POST /api/recommendations", "RecommendationsView.jsx"),
        ("UC-07", "View Vehicle Evaluation", "Guest / User", "GET /api/vehicles/:id", "EvaluationView.jsx"),
        ("UC-08", "Compare Vehicles", "User", "Local State / Store", "CompareView.jsx"),
        ("UC-09", "Chat with AI Advisor", "Guest / User", "POST /api/ai/chat", "AIAdvisorView.jsx"),
        ("UC-10", "Receive AI Advice", "AI Service", "OpenRouter Gemma 26B", "AIAdvisorView.jsx"),
        ("UC-11", "Save Vehicle Wishlist", "User", "POST /api/saved", "EvaluationView.jsx / Card"),
        ("UC-12", "View Saved Vehicles", "User", "GET /api/saved", "SavedVehiclesView.jsx"),
        ("UC-13", "Remove Saved Vehicle", "User", "DELETE /api/saved/:id", "SavedVehiclesView.jsx"),
        ("UC-14", "View Admin Metrics", "Admin", "GET /api/admin/metrics", "AdminDashboard.jsx"),
        ("UC-15", "Browse Inventory", "Admin", "GET /api/admin/vehicles", "AdminDashboard.jsx"),
        ("UC-16", "Add Vehicle", "Admin", "POST /api/admin/vehicles", "AdminDashboard.jsx"),
        ("UC-17", "Edit Vehicle", "Admin", "PUT /api/admin/vehicles/:id", "AdminDashboard.jsx"),
        ("UC-18", "Delete Vehicle", "Admin", "DELETE /api/admin/vehicles/:id", "AdminDashboard.jsx"),
        ("UC-19", "Deterministic Suitability Engine", "System Engine", "suitabilityEngine.js", "Server Internal"),
        ("UC-20", "Interactive Video Landing Scrub", "Guest", "Client State", "ScrollScrubbingLanding.jsx")
    ]

    for uid, utitle, uactor, uep, ucomp in rtm_data:
        r = rtm_table.add_row().cells
        r[0].text = uid
        r[1].text = utitle
        r[2].text = uactor
        r[3].text = uep
        r[4].text = ucomp

    style_table(rtm_table, [Inches(0.8), Inches(1.8), Inches(1.0), Inches(1.8), Inches(1.4)])

    docx_path = os.path.join(DOCS_DIR, "AutoDezire_UML_and_UseCase_Specification.docx")
    doc.save(docx_path)
    print(f"Word document saved successfully: {docx_path} ({os.path.getsize(docx_path):,} bytes)")
    return docx_path

# ==============================================================================
# STEP 3: BUILD PROFESSIONAL STANDALONE PDF VIA CHROME HEADLESS
# ==============================================================================
def build_pdf_document(png_dict):
    print("\n" + "=" * 70)
    print("STEP 3: Building AutoDezire_UML_and_UseCase_Specification.pdf...")
    print("=" * 70)

    # Convert image paths to web-friendly relative file URIs
    def img_tag(diag_id, caption):
        if diag_id in png_dict:
            file_url = f"file:///{png_dict[diag_id].replace(os.sep, '/')}"
            return f"""
            <div class="figure-container">
                <img src="{file_url}" alt="{caption}" class="diagram-img"/>
                <div class="figure-caption">{caption}</div>
            </div>
            """
        return ""

    pdf_html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AutoDezire — Software Requirements Specification & UML Models</title>
    <style>
        @page {{
            size: A4 portrait;
            margin: 18mm 16mm 18mm 16mm;
            @bottom-right {{
                content: counter(page);
            }}
        }}

        body {{
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            line-height: 1.55;
            font-size: 10pt;
            background: #ffffff;
            margin: 0;
            padding: 0;
        }}

        /* Cover Page */
        .cover-page {{
            page-break-after: always;
            height: 90vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            border-bottom: 4px solid #1e3a8a;
            padding-bottom: 40px;
        }}

        .cover-badge {{
            background: #e0f2fe;
            color: #0369a1;
            font-weight: 700;
            font-size: 11pt;
            padding: 6px 16px;
            border-radius: 20px;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 24px;
        }}

        .cover-title {{
            font-size: 34pt;
            font-weight: 800;
            color: #1e3a8a;
            margin: 0 0 12px 0;
            letter-spacing: -0.5px;
        }}

        .cover-subtitle {{
            font-size: 16pt;
            font-weight: 600;
            color: #0284c7;
            max-width: 650px;
            margin: 0 0 32px 0;
        }}

        .cover-meta {{
            font-size: 10pt;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
            margin-top: 40px;
            width: 80%;
            line-height: 1.8;
        }}

        /* Section Headings */
        h1 {{
            font-size: 18pt;
            font-weight: 700;
            color: #1e3a8a;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 6px;
            margin-top: 28px;
            margin-bottom: 14px;
            page-break-after: avoid;
        }}

        h2 {{
            font-size: 13pt;
            font-weight: 600;
            color: #0369a1;
            margin-top: 20px;
            margin-bottom: 8px;
            page-break-after: avoid;
        }}

        p {{
            margin-top: 0;
            margin-bottom: 10px;
            text-align: justify;
        }}

        .page-break {{
            page-break-after: always;
        }}

        /* Figures & Diagrams */
        .figure-container {{
            margin: 16px auto;
            text-align: center;
            page-break-inside: avoid;
        }}

        .diagram-img {{
            max-width: 95%;
            height: auto;
            max-height: 480px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
            background: #ffffff;
            padding: 8px;
        }}

        .figure-caption {{
            font-size: 8.5pt;
            font-style: italic;
            color: #64748b;
            margin-top: 6px;
        }}

        /* Tables */
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 12px 0 18px 0;
            font-size: 8.5pt;
            page-break-inside: avoid;
        }}

        th {{
            background-color: #1e3a8a;
            color: #ffffff;
            font-weight: 600;
            text-align: left;
            padding: 7px 10px;
            border: 1px solid #1e3a8a;
        }}

        td {{
            padding: 6px 10px;
            border: 1px solid #cbd5e1;
            vertical-align: top;
        }}

        tr:nth-child(even) {{
            background-color: #f8fafc;
        }}

        .priority-high {{
            color: #dc2626;
            font-weight: 600;
        }}

        .priority-med {{
            color: #d97706;
            font-weight: 600;
        }}

        .priority-low {{
            color: #2563eb;
            font-weight: 600;
        }}

        .highlight-box {{
            background-color: #f0f9ff;
            border-left: 4px solid #0284c7;
            padding: 10px 14px;
            border-radius: 0 6px 6px 0;
            margin: 12px 0;
            font-size: 9pt;
        }}
    </style>
</head>
<body>

    <!-- Cover Page -->
    <div class="cover-page">
        <div class="cover-badge">Software Requirements Specification</div>
        <div class="cover-title">AutoDezire</div>
        <div class="cover-subtitle">AI-Powered Vehicle Recommendation & Ergonomic Decision Platform</div>
        <div style="font-size: 11pt; color: #334155; font-weight: 600;">Complete UML Modeling & Use Case Specification Suite</div>
        <div class="cover-meta">
            <strong>Project:</strong> AutoDezire Recommendation Platform<br>
            <strong>Standard:</strong> IEEE 830-1998 Software Requirements Specification<br>
            <strong>Artifacts:</strong> Use Case Models • Domain Class Diagrams • System Architecture • Sequence Flows • Traceability<br>
            <strong>Date:</strong> September 2026 | <strong>Version:</strong> 1.0.0
        </div>
    </div>

    <!-- Section 1: Executive Summary -->
    <h1>1. Executive Summary & Problem Domain</h1>
    <p>
        <strong>AutoDezire</strong> is a full-stack, AI-powered vehicle advisory platform engineered to address the critical gap in automobile purchasing:
        matching a buyer's physical ergonomics, daily commute topography, family passenger needs, and long-term operating budget with the exact vehicular engineering profile.
        Unlike legacy search engines that rank cars solely on horsepower or generic price points, AutoDezire calculates a weighted 12-dimension deterministic suitability score
        (safety ratings, ground clearance for bad roads, cabin headroom, seat height/inseam for two-wheelers, fuel economy, and running cost) paired with
        an interactive OpenRouter Google Gemma 4 26B conversational advisor.
    </p>

    <div class="highlight-box">
        <strong>Key Architectural Philosophy:</strong> Deterministic Suitability Engine (mathematical guarantee against hallucinations)
        paired with a Generative LLM Context Engine (OpenRouter Gemma 26B) for nuanced natural language reasoning.
    </div>

    <!-- Section 2: Actors -->
    <h1>2. System Actors & Role Hierarchy</h1>
    <table>
        <thead>
            <tr>
                <th style="width: 20%;">Actor Name</th>
                <th style="width: 18%;">Actor Type</th>
                <th>Responsibilities & Privilege Scope</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Guest</strong></td>
                <td>Human (Primary)</td>
                <td>Unauthenticated user. Allowed to browse vehicle catalogue, filter cars/bikes/scooters, inspect detailed specs, and interact with the AI Advisor demo.</td>
            </tr>
            <tr>
                <td><strong>Registered User</strong></td>
                <td>Human (Primary)</td>
                <td>Authenticated via JWT. Holds persistent 30+ parameter lifestyle profile, bookmarks saved wishlists, receives individualized suitability scores, compares vehicles.</td>
            </tr>
            <tr>
                <td><strong>Administrator</strong></td>
                <td>Human (Secondary)</td>
                <td>Privileged administrative user (verified via admin JWT role). Exercises CRUD control over car and bike catalogs, monitors platform metrics and listing status.</td>
            </tr>
            <tr>
                <td><strong>AI Service (Gemma)</strong></td>
                <td>Automated External Actor</td>
                <td>External OpenRouter LLM (Google Gemma 4 26B). Ingests user lifestyle constraints, vehicle engineering parameters, and outputs personalized advice.</td>
            </tr>
        </tbody>
    </table>

    <div class="page-break"></div>

    <!-- Section 3: High-Level System Overview -->
    <h1>3. High-Level System Overview Use Case Diagram</h1>
    <p>
        The System Overview diagram specifies the system boundary of AutoDezire, displaying the four actors and their associations
        with the primary functional subsystems: Authentication, Vehicle Discovery, AI Advisor, Saved Wishlists, and the Administrative Dashboard.
    </p>

    {img_tag("01_System_Overview_UseCase", "Figure 1: AutoDezire High-Level System Overview Use Case Diagram")}

    <div class="page-break"></div>

    <!-- Section 4: Detailed Module Use Cases -->
    <h1>4. Detailed Module-Level Use Case Diagrams & Specifications</h1>

    <h2>4.1 Authentication & Identity Module</h2>
    <p>
        Manages user registration, credential authentication, JWT token generation, bcrypt password hashing, and seamless fallback to memory storage.
    </p>
    {img_tag("02_Authentication_Module_UseCase", "Figure 2: Authentication & Identity Module Use Case")}

    <table>
        <thead>
            <tr>
                <th>Use Case</th>
                <th>Actor</th>
                <th>Priority</th>
                <th>«include»</th>
                <th>«extend»</th>
                <th>Functional Summary</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>UC-01: Register</strong></td>
                <td>Guest</td>
                <td><span class="priority-high">High</span></td>
                <td>JWT Token Generation, Password Hashing, Validate Email</td>
                <td>Memory Store Fallback</td>
                <td>Creates user record with hashed password and returns bearer JWT token.</td>
            </tr>
            <tr>
                <td><strong>UC-02: Login</strong></td>
                <td>Guest / Admin</td>
                <td><span class="priority-high">High</span></td>
                <td>JWT Token Generation</td>
                <td>Admin Hardcoded Override</td>
                <td>Authenticates credentials and issues authenticated session token.</td>
            </tr>
            <tr>
                <td><strong>UC-03: View Profile</strong></td>
                <td>User</td>
                <td><span class="priority-med">Medium</span></td>
                <td>JWT Protection Middleware</td>
                <td>—</td>
                <td>Retrieves authenticated user profile and lifestyle parameters.</td>
            </tr>
        </tbody>
    </table>

    <div class="page-break"></div>

    <h2>4.2 Vehicle Discovery & Recommendation Engine Module</h2>
    <p>
        Gathers 30+ lifestyle parameters through an interactive questionnaire, processes constraints through the 12-dimension suitability engine,
        and presents ranked, categorized recommendations.
    </p>
    {img_tag("03_Vehicle_Discovery_Recommendations_UseCase", "Figure 3: Vehicle Discovery & Recommendation Engine Use Case")}

    <table>
        <thead>
            <tr>
                <th>Use Case</th>
                <th>Actor</th>
                <th>Priority</th>
                <th>«include»</th>
                <th>«extend»</th>
                <th>Functional Summary</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>UC-05: Questionnaire</strong></td>
                <td>User</td>
                <td><span class="priority-high">High</span></td>
                <td>Submit Profile for Scoring</td>
                <td>—</td>
                <td>Captures height, age, daily km, terrain, passengers, luggage, and budget.</td>
            </tr>
            <tr>
                <td><strong>UC-06: Recommendations</strong></td>
                <td>User</td>
                <td><span class="priority-high">High</span></td>
                <td>12-Dimension Suitability Engine</td>
                <td>Filter by Category</td>
                <td>Returns ranked list of best-fit vehicles grouped by Cars, Bikes, and Scooters.</td>
            </tr>
            <tr>
                <td><strong>UC-07: Vehicle Details</strong></td>
                <td>Guest / User</td>
                <td><span class="priority-high">High</span></td>
                <td>Suitability Breakdown</td>
                <td>Save to Wishlist</td>
                <td>Displays comprehensive specifications, NCAP safety, and score breakdowns.</td>
            </tr>
            <tr>
                <td><strong>UC-08: Compare Vehicles</strong></td>
                <td>User</td>
                <td><span class="priority-med">Medium</span></td>
                <td>—</td>
                <td>—</td>
                <td>Renders side-by-side metric comparison between selected models.</td>
            </tr>
        </tbody>
    </table>

    <div class="page-break"></div>

    <h2>4.3 AI Conversational Advisor Module</h2>
    <p>
        Leverages OpenRouter Google Gemma 4 26B LLM with dynamic context injection: user physical profile, current vehicle specifications,
        and suitability breakdown.
    </p>
    {img_tag("04_AI_Advisor_Module_UseCase", "Figure 4: AI Advisor Module Use Case")}

    <h2>4.4 Saved Vehicles & Admin Management Modules</h2>
    {img_tag("05_Saved_Vehicles_Module_UseCase", "Figure 5: Saved Vehicles Module Use Case")}
    {img_tag("06_Admin_Panel_Module_UseCase", "Figure 6: Admin Panel Management Use Case")}

    <div class="page-break"></div>

    <!-- Section 5: UML Domain Class Diagram -->
    <h1>5. UML Domain Structural Class Diagram</h1>
    <p>
        The following class diagram documents the Mongoose ODM domain model hierarchy, embedded documents, and computational objects.
    </p>
    {img_tag("07_UML_Class_Diagram", "Figure 7: UML Domain Class Diagram")}

    <table>
        <thead>
            <tr>
                <th>Entity Class</th>
                <th>Type</th>
                <th>Attributes & Types</th>
                <th>Relationships & Associations</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>User</strong></td>
                <td>Mongoose Model</td>
                <td>name: String, email: String, password: String, role: Enum, profile: Profile</td>
                <td>Composition with <code>Profile</code> (1:1). References <code>SavedVehicle</code> (1:N).</td>
            </tr>
            <tr>
                <td><strong>Vehicle</strong></td>
                <td>Mongoose Model</td>
                <td>brand, model, category, bodyType, priceFrom, priceTo, mileage, groundClearance, safetyRating, baseScores: BaseScores, trimVariants: TrimVariant[]</td>
                <td>Composition with <code>BaseScores</code> (1:1). Composition with <code>TrimVariant</code> (1:N).</td>
            </tr>
            <tr>
                <td><strong>Bike</strong></td>
                <td>Mongoose Model</td>
                <td>brand, model, category, seatHeight, kerbWeight, riderTriangle, idealInseamMin, pillionSeatComfort, baseScores: BikeBaseScores</td>
                <td>Composition with <code>BikeBaseScores</code> (1:1).</td>
            </tr>
            <tr>
                <td><strong>SavedVehicle</strong></td>
                <td>Mongoose Model</td>
                <td>vehicleId: ObjectId (Ref), suitabilityScore: Number, savedAt: Date</td>
                <td>Association with <code>Vehicle</code>.</td>
            </tr>
            <tr>
                <td><strong>SuitabilityResult</strong></td>
                <td>Compute Object</td>
                <td>overallScore: Number, budgetStatus: String, dimensionScores: Map, strengths: String[], considerations: String[]</td>
                <td>Computed output of <code>SuitabilityEngine</code> for any Vehicle + Profile.</td>
            </tr>
        </tbody>
    </table>

    <div class="page-break"></div>

    <!-- Section 6: System Architecture -->
    <h1>6. System Architecture & Component Interaction</h1>
    <p>
        Visualizes the 4-tier deployment topology: Client Tier (Vite React), Server Tier (Node.js Express),
        Persistence Tier (MongoDB Atlas), and External AI Tier (OpenRouter Gemma).
    </p>
    {img_tag("08_System_Architecture_Diagram", "Figure 8: 4-Tier System Architecture & Deployment Diagram")}
    {img_tag("11_Component_Interaction_Summary", "Figure 9: Frontend Components to Express Endpoints Interaction Map")}

    <div class="page-break"></div>

    <!-- Section 7: Sequence Diagrams -->
    <h1>7. Behavioral UML Sequence Diagrams</h1>

    <h2>7.1 AI Advisor Chat Interaction Flow</h2>
    {img_tag("09_Sequence_AI_Advisor_Chat", "Figure 10: UML Sequence Diagram — AI Advisor Chat Interaction Flow")}

    <h2>7.2 Vehicle Recommendation & Scoring Execution Flow</h2>
    {img_tag("10_Sequence_Vehicle_Recommendation", "Figure 11: UML Sequence Diagram — Vehicle Recommendation & Scoring Flow")}

    <div class="page-break"></div>

    <!-- Section 8: Traceability Matrix -->
    <h1>8. Requirements Traceability Matrix (RTM)</h1>
    <p>
        Maps functional use cases to backend REST API endpoints and React frontend components.
    </p>
    <table>
        <thead>
            <tr>
                <th style="width: 10%;">UC ID</th>
                <th style="width: 25%;">Use Case Title</th>
                <th style="width: 15%;">Actor</th>
                <th style="width: 25%;">REST API Endpoint</th>
                <th>Frontend Component</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>UC-01</td><td>Register Account</td><td>Guest</td><td>POST /api/auth/register</td><td>AuthModal.jsx</td></tr>
            <tr><td>UC-02</td><td>Login</td><td>Guest / Admin</td><td>POST /api/auth/login</td><td>AuthModal.jsx</td></tr>
            <tr><td>UC-03</td><td>View Profile</td><td>User</td><td>GET /api/auth/me</td><td>SettingsView.jsx</td></tr>
            <tr><td>UC-04</td><td>Search / Filter Vehicles</td><td>Guest / User</td><td>GET /api/vehicles</td><td>SearchVehicleView.jsx</td></tr>
            <tr><td>UC-05</td><td>Submit Questionnaire</td><td>User</td><td>POST /api/recommendations</td><td>QuestionnaireView.jsx</td></tr>
            <tr><td>UC-06</td><td>Get AI Recommendations</td><td>User</td><td>POST /api/recommendations</td><td>RecommendationsView.jsx</td></tr>
            <tr><td>UC-07</td><td>View Vehicle Details</td><td>Guest / User</td><td>GET /api/vehicles/:id</td><td>EvaluationView.jsx</td></tr>
            <tr><td>UC-08</td><td>Compare Vehicles</td><td>User</td><td>Local State / Store</td><td>CompareView.jsx</td></tr>
            <tr><td>UC-09</td><td>Chat with AI Advisor</td><td>Guest / User</td><td>POST /api/ai/chat</td><td>AIAdvisorView.jsx</td></tr>
            <tr><td>UC-10</td><td>Receive AI Advice</td><td>AI Service</td><td>OpenRouter API</td><td>AIAdvisorView.jsx</td></tr>
            <tr><td>UC-11</td><td>Save Vehicle Wishlist</td><td>User</td><td>POST /api/saved</td><td>EvaluationView.jsx</td></tr>
            <tr><td>UC-12</td><td>View Saved Vehicles</td><td>User</td><td>GET /api/saved</td><td>SavedVehiclesView.jsx</td></tr>
            <tr><td>UC-13</td><td>Remove Saved Vehicle</td><td>User</td><td>DELETE /api/saved/:id</td><td>SavedVehiclesView.jsx</td></tr>
            <tr><td>UC-14</td><td>View Admin Metrics</td><td>Admin</td><td>GET /api/admin/metrics</td><td>AdminDashboard.jsx</td></tr>
            <tr><td>UC-15</td><td>Browse Admin Inventory</td><td>Admin</td><td>GET /api/admin/vehicles</td><td>AdminDashboard.jsx</td></tr>
            <tr><td>UC-16</td><td>Add Vehicle</td><td>Admin</td><td>POST /api/admin/vehicles</td><td>AdminDashboard.jsx</td></tr>
            <tr><td>UC-17</td><td>Edit Vehicle</td><td>Admin</td><td>PUT /api/admin/vehicles/:id</td><td>AdminDashboard.jsx</td></tr>
            <tr><td>UC-18</td><td>Delete Vehicle</td><td>Admin</td><td>DELETE /api/admin/vehicles/:id</td><td>AdminDashboard.jsx</td></tr>
            <tr><td>UC-19</td><td>12-Dim Suitability Engine</td><td>System Engine</td><td>suitabilityEngine.js</td><td>Backend Internal</td></tr>
            <tr><td>UC-20</td><td>Interactive Video Scrub</td><td>Guest</td><td>Client State</td><td>ScrollScrubbingLanding.jsx</td></tr>
        </tbody>
    </table>

</body>
</html>"""

    pdf_html_path = os.path.join(DOCS_DIR, "srs_report.html")
    with open(pdf_html_path, "w", encoding="utf-8") as f:
        f.write(pdf_html_content)

    pdf_path = os.path.join(DOCS_DIR, "AutoDezire_UML_and_UseCase_Specification.pdf")
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=6000",
        f"--print-to-pdf={pdf_path}",
        "--no-pdf-header-footer",
        f"file:///{pdf_html_path.replace(os.sep, '/')}"
    ]
    subprocess.run(cmd, capture_output=True, timeout=25)

    if os.path.exists(pdf_path):
        print(f"PDF document saved successfully: {pdf_path} ({os.path.getsize(pdf_path):,} bytes)")
    else:
        raise RuntimeError("PDF generation failed.")
    return pdf_path

# ==============================================================================
# MAIN ORCHESTRATOR
# ==============================================================================
if __name__ == "__main__":
    print("\n" + "=" * 70)
    print("STARTING COMPLETE UML & USE CASE EXPORT PIPELINE FOR AUTODEZIRE")
    print("=" * 70)

    png_dict = render_all_pngs()
    docx_file = build_docx_document(png_dict)
    pdf_file = build_pdf_document(png_dict)

    # Clean up temp files
    shutil.rmtree(TEMP_DIR, ignore_errors=True)

    print("\n" + "=" * 70)
    print("EXPORT COMPLETED SUCCESSFULLY!")
    print(f"  - PNG Diagrams Directory: {PNG_DIR}")
    print(f"  - Word Document (.docx):  {docx_file}")
    print(f"  - PDF Document (.pdf):   {pdf_file}")
    print("=" * 70)
