# Greenwood ERP - School Management System (SaaS)

Greenwood ERP is a full-stack, multi-role **School Management ERP System** built with **Node.js, Express, MongoDB (Mongoose), React (Vite), Tailwind CSS, JWT Auth, and RBAC**.

---

## 🚀 Key Features & Modules

- **Multi-Role Access Control (RBAC)**: Support for 7 distinct roles (`Super Admin`, `School Admin / Principal`, `Teacher`, `Accountant`, `Receptionist`, `Student`, `Parent`).
- **Interactive Role Dashboards**: Real-time analytics charts powered by **Recharts** (attendance trends, fee collection distribution, grade performance metrics).
- **Student Management**: Full CRUD, CSV import/export, student promotion workflow, printable **Student ID Card** modal, and detailed 8-tab profile view (Overview, Attendance, Academics, Exams, Fees, Homework, Documents, Communication).
- **Attendance Management**: Daily class roster, bulk marking ("Mark All Present"), monthly presence rates, and absence notifications.
- **Timetable & Scheduling**: Weekly period schedule grid with automatic teacher/class scheduling conflict detector.
- **Examinations & Gradebook**: Exam scheduling, marks matrix entry, automated total/percentage/GPA/rank calculation, and downloadable **Official Report Card PDF**.
- **Fees & Payment Invoicing**: Class fee structures, discount logic, payment recording, balance tracking, and downloadable **Official Fee Receipt PDF**.
- **Admissions Pipeline**: Application workflow (Enquiry → Applied → Under Review → Approved → Admitted).
- **Notices & Announcements**: Notice board with target audience filtering and pinned announcements.
- **School Calendar**: Event schedule for holidays, exams, parent-teacher meetings, and sports days.
- **Leave Management**: Leave application submission and administrator approval/rejection pipeline.
- **Library Catalog**: Books inventory, circulation logs, checkout/return tracking, and overdue fine logic.
- **Transport Fleet**: Vehicle roster, driver details, routes, stops, and student bus assignments.
- **System Audit Logs**: Security audit trail tracking entity modifications, user logins, and financial payments.
- **Global Search (`Ctrl + K`)**: Debounced search scanning across Students, Teachers, Parents, Notices, and Classes.
- **Quick Demo Role Switcher Toolbar**: 1-click role switcher bar in the top navbar for testing all 7 roles seamlessly.

---

## 🛠️ Technology Stack

### Backend
- **Node.js** & **Express.js** REST API
- **MongoDB** & **Mongoose** (with built-in `mongodb-memory-server` auto-fallback for 0-config dev setup)
- **JWT (JSON Web Tokens)** for access & refresh tokens
- **bcryptjs** for password hashing
- **PDFKit** for server-side PDF document generation
- **CORS**, **Helmet**, **express-rate-limit** for security

### Frontend
- **React.js (Vite)**
- **Tailwind CSS** for modern SaaS styling
- **React Router v6**
- **Lucide React** icons
- **Recharts** for data visualization
- **Axios** with automatic token refresh interceptors

---

## 🔑 Demo Credentials for Testing

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `superadmin@school.com` | `Admin@123` |
| **Principal / Admin** | `principal@school.com` | `Admin@123` |
| **Teacher** | `teacher@school.com` | `Teacher@123` |
| **Accountant** | `accountant@school.com` | `Accountant@123` |
| **Receptionist** | `receptionist@school.com` | `Receptionist@123` |
| **Student** | `student@school.com` | `Student@123` |
| **Parent** | `parent@school.com` | `Parent@123` |

*Note: In development mode, you can also use the floating **"Switch Role"** toolbar in the top navigation bar to switch between any role instantly with 1 click.*

---

## 📦 Setup & Installation Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Backend Setup
```bash
cd backend
npm install
npm run seed     # Populates MongoDB with demo school, users, classes & records
npm run dev      # Starts API server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev      # Starts React Vite app on http://localhost:5173
```

---

## 📁 Repository Directory Structure

```text
School_ERP/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection & JWT settings
│   │   ├── controllers/     # Controller logic for all 18 modules
│   │   ├── middleware/      # Auth, RBAC, AuditLog, ErrorHandler
│   │   ├── models/          # 28 Mongoose schemas with schoolId scoping
│   │   ├── routes/          # REST API route handlers
│   │   ├── services/        # PDF generation service (receipts & report cards)
│   │   ├── utils/           # Database seed script (seedData.js)
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Sidebar, Navbar, DataTable, StatCard, Modals
│   │   ├── context/         # AuthContext & NotificationContext
│   │   ├── layouts/         # DashboardLayout with global search
│   │   ├── pages/           # 18 feature screens & role dashboards
│   │   ├── services/        # Axios API client
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

---

## 🛡️ SaaS Multi-Tenancy Architecture

All models are built with a mandatory `schoolId` ObjectId reference. This allows the backend to operate as a multi-tenant SaaS application where multiple schools can share the infrastructure while maintaining strict data isolation.
