#  IssuePulse  
### AI-Powered Smart Hostel Issue Tracking Platform

IssuePulse is a **modern, AI-assisted, visually rich web platform** designed to transform how hostel and campus issues are reported, tracked, and resolved.

It replaces informal systems like WhatsApp groups, verbal complaints, and paper registers with a **structured, transparent, and collaborative digital solution** — built with a **demo-first, hackathon-ready mindset**.

---

##  Why IssuePulse?

Hostel infrastructure issues are often:
- reported multiple times
- poorly tracked
- slow to resolve
- invisible to decision-makers

**IssuePulse solves this** by combining:
- clean workflows  
- real-time collaboration  
- AI-assisted intelligence  
- and a highly animated, modern UI  

---

##  Key Features

###  Authentication & Roles
- Email & password authentication
- Role-based access:
  - **Student**
  - **Admin**
- Secure role enforcement using database policies

---

### 📝Issue Reporting
Students can report issues with:
- Title & description
- Category & priority
- Optional image upload
- Automatic tagging (hostel / block / room)

---

###  AI-Assisted Intelligence *(Prototype-Friendly)*
- **AI auto-categorization** of issues
- **Priority prediction**
- **Duplicate issue detection (semantic similarity)**
- **AI summaries for admins**
- **Vision-based damage analysis** (conceptual / prototype)



---

###  Smart Issue Chat Rooms (Realtime)
- Each issue has its own discussion room
- Students facing the same issue can collaborate
- Admins can join and post updates
- Built using realtime subscriptions

---

###  Dashboards

####  Student Dashboard
- View submitted issues
- Color-coded status & priority
- Card-based, animated UI

#### Admin Dashboard
- View all issues
- Update issue status
- Highlight urgent cases
- Analytics cards (prototype / aggregated data)

---

### UI / UX (Major Focus)
- Gradient-based modern theme
- Branded navigation
- Glass-style cards
- Status pills & chips
- Smooth page transitions
- Subtle, premium animations using motion
- Mobile-responsive design

---

##  Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion (animations)

### Backend & Infra
- Supabase (PostgreSQL, Auth, Realtime)
- Row Level Security (RLS)

### AI / Intelligence
- LLM APIs (categorization, summaries)
- Embeddings (duplicate detection)
- Vision APIs (damage detection – prototype)

### Deployment
- Vercel

---


## How to Run Locally

###  Clone the repository
```bash
git clone https://github.com/Adarsh-s-007/issuepulse.git
cd issuepulse
