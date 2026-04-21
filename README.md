# ============================================================================
# ONLINE INTERVIEW PLATFORM - PROJECT DOCUMENTATION
# ============================================================================
<img width="1903" height="909" alt="image" src="https://github.com/user-attachments/assets/56eac2f6-ef82-47d0-b627-cc522fe527b3" />

## TABLE OF CONTENTS

1. Project Overview
2. Technology Stack
3. Features List (FULL)
4. Folder Structure Explanation
5. System Architecture
6. DFD (Data Flow Diagram) Explanation
7. ERD (Entity Relationship Diagram) Explanation
8. Security Architecture
9. Authentication Flow (Clerk + Stream)
10. Application Flow (Stepwise)
11. Backend Internal Flow
12. Frontend Internal Flow
13. Auto API Documentation
14. Dependencies Installation
15. Environment Variables
16. How To Run Project
17. Runtime Flow (After Startup)
18. Common Errors & Fixes
19. Developer Notes

---

# ============================================================================
# 1. PROJECT OVERVIEW
# ============================================================================

## Project Name
Online Interview Platform

## Purpose
A real-time collaborative coding and technical interview platform that enables users to conduct technical interviews remotely. It features live video/audio calls, real-time chat, and a synchronized code editor with support for multiple languages.

## High-Level System Summary
This is a full-stack Modern Web Application built with the MERN stack (MongoDB, Express, React, Node.js) + Clerk (Auth) + Stream (Video/Chat).
- **Authentication**: Managed via Clerk (Social & Email login).
- **Real-time Collaboration**: Stream SDK for Video/Audio and Chat.
- **Code Execution**: Integrated code editor (Monaco) with multi-language support.
- **Session Management**: Logic to create, join, and manage interview sessions.

## Business Problem Solved
- Facilitates remote technical hiring by providing a unified environment for coding and communication.
- Eliminates the need for multiple tools (Zoom + Google Docs + IDE) by combining them into one platform.
- Provides a structured repository of coding problems for interviewers.

---

# 2. TECHNOLOGY STACK
# ============================================================================

## Frontend

| Category | Technology |
|----------|------------|
| Framework | React 19 with Vite |
| Language | JavaScript (ES6+) |
| Styling | Tailwind CSS v4, DaisyUI |
| State Management | React Query (@tanstack/react-query), Learnings from standard React Hooks |
| Routing | React Router v7 |
| Authentication | Clerk React SDK |
| Real-time | Stream Video & Chat SDKs |
| Code Editor | Monaco Editor (@monaco-editor/react) |
| HTTP Client | Axios |
| UI Components | Lucide React, Framer Motion |
| Notifications | React Hot Toast |

### Frontend Dependencies (Key)
```json
{
  "react": "^19.1.1",
  "vite": "^7.1.7",
  "tailwindcss": "^4.1.14",
  "@clerk/clerk-react": "^5.x",
  "@stream-io/video-react-sdk": "^1.x",
  "stream-chat-react": "^13.x",
  "@monaco-editor/react": "^4.x",
  "@tanstack/react-query": "^5.x",
  "axios": "^1.x",
  "framer-motion": "^12.x"
}
```

## Backend

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB (Mongoose ODM) |
| Authentication | Clerk Express SDK |
| Real-time API | Stream Node SDK |
| Background Jobs | Inngest |
| Security | CORS, Dotenv |

### Backend Dependencies (Key)
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.1",
  "@clerk/express": "^1.7.41",
  "@stream-io/node-sdk": "^0.7.12",
  "stream-chat": "^9.24.0",
  "inngest": "^3.x",
  "dotenv": "^17.x",
  "cors": "^2.x"
}
```

---

# 3. FEATURES LIST (FULL)
# ============================================================================

## User Management
- [x] Secure Sign-up/Login via Clerk (Google, GitHub, Email)
- [x] User Profile management (via Clerk)
- [x] Persistent session handling

## Dashboard & Navigation
- [x] Interactive Dashboard listing active sessions
- [x] "My Recent Sessions" history
- [x] Responsive Navigation bar with Auth state awareness
- [x] Theme toggling/responsiveness

## Interview Sessions
- [x] **Create Session**: Select problem and difficulty to start a new room.
- [x] **Join Session**: Join existing sessions via ID or Dashboard list.
- [x] **Active Status**: View live active sessions from other users.
- [x] **End Session**: Host can terminate the session.

## Collaboration Tools
- [x] **Video/Audio Call**: High-quality real-time communication (Stream).
- [x] **Live Chat**: Text messaging within the session.
- [x] **Screen Sharing**: Built-in screen share capability.
- [x] **Participant Management**: View who is in the room.

## Coding Environment
- [x] **Code Editor**: Full-featured Monaco editor.
- [x] **Multi-language Support**: JavaScript, Python, Java, C++.
- [x] **Syntax Highlighting**: Language-specific formatting.
- [x] **Problem Description**: Integrated panel showing problem details.

---

# 4. FOLDER STRUCTURE EXPLANATION
# ============================================================================

## Backend Structure (`backend/src`)

```
backend/src/
├── controllers/          # Business logic for routes
│   ├── chatController.js    # Stream token generation
│   └── sessionController.js # Session CRUD & management
├── Db/
│   └── db.js            # MongoDB connection logic
├── lib/
│   ├── env.js           # Environment variable validation
│   ├── inngest.js       # Background job configuration
│   └── stream.js        # Stream SDK clients (Video & Chat)
├── middlewares/
│   └── protectRoute.js  # Auth middleware wrapper (Clerk)
├── models/
│   ├── Session.js       # Session Mongoose Schema
│   └── UserModel.js     # User Mongoose Schema
├── routes/
│   ├── chatRoutes.js    # Routes for chat/stream tokens
│   └── sessionRoutes.js # Routes for session operations
└── server.js            # Entry point, App setup, Middleware
```

## Frontend Structure (`frontend/src`)

```
frontend/src/
├── api/                  # API integration layer
│   └── Session.js       # Session-related API calls
├── components/           # Reusable UI components
│   ├── DashBoard/       # Dashboard specific widgets
│   ├── navbar/          # Navigation component
│   └── ...
├── data/
│   └── problems.js      # Static list of coding problems
├── hooks/                # Custom React hooks
│   ├── useScreenSize.js # Responsive logic
│   ├── useSessions.js   # React Query hooks for sessions
│   └── useStreamClient.js # Stream client initialization
├── pages/                # Main Application Pages
│   ├── home/            # Landing page
│   ├── DashBoard/       # User dashboard
│   ├── SessionPage/     # Main interview room
│   ├── problem-section-pages/ # Problem browsing
│   └── ...
├── service/
│   └── axios.js         # Axios instance config
├── App.jsx               # Main Routing & Layout
└── main.jsx              # Providers (Clerk, QueryClient)
```

---

# 5. SYSTEM ARCHITECTURE
# ============================================================================

## Client-Server Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT (FRONTEND)                             │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  React Application (Vite)                                       │   │
│  │  ├── Clerk SDK (Auth UI & Session)                             │   │
│  │  ├── Stream React SDKs (Video/Chat UI)                         │   │
│  │  ├── React Query (Server State Sync)                           │   │
│  │  └── Axios (API Requests)                                      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │ REST API (JSON)
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           SERVER (BACKEND)                              │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Express.js Server                                             │   │
│  │  ├── Clerk Middleware (Auth Verification)                      │   │
│  │  ├── Controllers (Logic)                                       │   │
│  │  └── Stream Node SDK (Token Gen)                               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└────────────────┬────────────────┬──────────────────────┬────────────────┘
                 │                │                      │
         ┌───────▼───────┐  ┌─────▼─────┐         ┌──────▼──────┐
         │    MongoDB    │  │  Clerk    │         │   Stream    │
         │   (Database)  │  │  (Auth)   │         │ (Real-time) │
         └───────────────┘  └───────────┘         └─────────────┘
```

## Request Lifecycle

1. **User Action**: User creates a session on Frontend.
2. **Auth Check**: Frontend Clerk SDK ensures user is logged in.
3. **API Call**: Axios sends `POST /api/sessions` with Auth Token.
4. **Middleware**: Backend `clerkMiddleware` verifies the token.
5. **Controller**: `sessionController` creates DB entry & initializes Stream Call.
6. **Integration**: Backend calls Stream API to create video room.
7. **Response**: Session details + Stream ID returned to Client.
8. **Connection**: Client connects to Stream WebSocket using returned ID.

---

# 6. DFD (DATA FLOW DIAGRAM) EXPLANATION
# ============================================================================

## Level 0 - Context Diagram

```
                    ┌─────────────────┐
                    │                 │
    ┌───────────────┤   USER         ├──────────────┐
    │               │                 │              │
    │               └─────────────────┘              │
    │                       │                        │
    │ (Login/Profile)       ▼  (Video/Chat)          │
    │               ┌─────────────────┐              │
    │       ┌──────►│  INTERVIEW     │◄──────┐       │
    │       │       │    PLATFORM    │       │       │
    │       │       │                 │       │       │
    │       │       └───────┬─────────┘       │       │
    │       │               │                 │       │
    ▼       ▼               ▼                 ▼       ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│    CLERK     │    │   MONGODB    │    │    STREAM    │
│ (Identity)   │    │  (Session)   │    │  (Real-time) │
└──────────────┘    └──────────────┘    └──────────────┘
```

## Level 1 - Session Creation Flow

```
┌───────┐      ┌────────────┐      ┌─────────────┐      ┌──────────┐
│ USER  │─────►│ BACKEND API│─────►│ MONGODB     │─────►│ STREAM   │
│       │      │ /sessions  │      │ Create Doc  │      │ Init Call│
└───────┘      └────────────┘      └─────────────┘      └──────────┘
    ▲                │                   │                    │
    └────────────────┴───────────────────┴────────────────────┘
       Returns Session ID + Call ID to Frontend
```

---

# 7. ERD (ENTITY RELATIONSHIP DIAGRAM) EXPLANATION
# ============================================================================

## Entities

### 1. User Entity
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | MongoDB unique ID |
| clerkId | String | Unique ID from Clerk Auth |
| email | String | User's email address |
| username | String | Display name |
| profileImage | String | URL to avatar |
| createdAt | Date | Timestamp |

### 2. Session Entity
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Session unique ID |
| problem | String | Problem Title/ID |
| difficulty | String | Easy/Medium/Hard |
| host | ObjectId | Ref to User (Host) |
| participant | ObjectId | Ref to User (Joiner) |
| status | String | "active" or "completed" |
| callId | String | Stream Video Call ID |
| createdAt | Date | Timestamp |

## Relationships

### Ref Relations (Mongoose `populate`)
- **Session ↔ User (Host)**: Many-to-One. A user can host multiple sessions.
- **Session ↔ User (Participant)**: Many-to-One. A user can join multiple sessions.

---

# 8. SECURITY ARCHITECTURE
# ============================================================================

## Authentication Mechanism
- **Clerk Auth**: Handles all Identity Management (Signup, Login, Sessions).
- **Frontend**: `ClerkProvider` manages auth state and JWT injection.
- **Backend**: `clerkMiddleware` verifies the signed JWT on incoming requests.

## Authorization
- **Protected Routes**: All API routes are protected. Middleware rejects requests without valid Clerk session.
- **Role Validation**:
    - **Host Actions**: Only the session host can "End" a session.
    - **Join Validation**: Users cannot join their own session as a participant.
    - **Capacity**: Sessions are locked once a participant joins (2 users max).

## Token Management
- **Clerk Tokens**: Short-lived, managed automatically by Clerk SDKs.
- **Stream Tokens**: Generated on backend using `stream-chat` server SDK and passed to frontend for WebSocket connections.

---

# 9. AUTHENTICATION FLOW (CLERK + STREAM)
# ============================================================================

## 1. User Login (Clerk)
User authenticates on Frontend via Clerk Component -> Clerk returns Session Token.

## 2. API Request
Frontend Axios Interceptor attaches Session Token to `Authorization/Cookie` header.

## 3. Backend Verification
`clerkMiddleware()` intercepts request -> Verifies JWT signature against Clerk Public Key.
-> Adds `auth` object to `req`.

## 4. Stream Token Generation (Backend)
When user joins/creates session:
Backend uses `STREAM_API_SECRET` to sign a custom token for the `clerkId`.
returns `token` to frontend.

## 5. Real-time Connection
Frontend uses `token` to connect to Stream WebSocket directly.

---

# 10. APPLICATION FLOW (STEPWISE)
# ============================================================================

### 1. Startup
- **Backend**: Connects to MongoDB, inits Stream Client, starts Express on PORT.
- **Frontend**: Loads React, inits Clerk Provider, checks local session.

### 2. Dashboard
- User logs in -> Redirected to `/dashboard`.
- `useSessions` hook calls `GET /api/sessions/active`.
- User sees list of coding rooms.

### 3. Create Session
- User clicks "Start Interview" -> Selects Problem.
- `POST /api/sessions` call -> Backend creates Session Doc + Stream Call.
- Frontend redirects to `/session/:id`.

### 4. In Session
- Frontend inits `StreamVideoClient` and `StreamChat`.
- Video Grid renders.
- Monaco Editor loads.
- User can invite others via Link.

### 5. Join Session
- Second user clicks "Join".
- `POST /api/sessions/:id/join` -> Backend updates `participant` field.
- Stream adds user to call.

---

# 11. BACKEND INTERNAL FLOW
# ============================================================================

```
Request (POST /sessions)
    ↓
server.js (App)
    ↓
clerkMiddleware (Verifies Auth)
    ↓
sessionRoutes.js
    ↓
protectRoute Middleware (Ensures user exists in DB)
    ↓
sessionController.createSession
    ↓
    ├── Validate Body
    ├── Create Stream Call (via Stream SDK)
    ├── Create Chat Channel
    ├── Save to MongoDB (Session Model)
    └── Populate Host Info
    ↓
Response (201 Created)
```

---

# 12. FRONTEND INTERNAL FLOW
# ============================================================================

```
App.jsx (Router)
    ↓
Route /session/:id
    ↓
SessionPage.jsx
    ↓
useAuthentication (Check Login)
    ↓
Fetch Session Data (API)
    ↓
Initialize Stream Client (Video/Chat)
    ↓
Render Components:
    ├── <StreamTheme> (Layout)
    ├── <CodeEditor> (Monaco)
    └── <MeetingRoom> (Video)
```

---

# 13. AUTO API DOCUMENTATION
# ============================================================================

## API Endpoints Overview

| Method | Endpoint | Description | Auth Required | Request Body | Response |
|--------|----------|-------------|---------------|--------------|----------|
| POST | `/api/sessions` | Create new session | Yes | `problem`, `difficulty` | Session Object |
| GET | `/api/sessions/active` | Get all active sessions | Yes | - | List of Sessions |
| GET | `/api/sessions/my-recent` | Get user's history | Yes | - | List of Sessions |
| GET | `/api/sessions/:id` | Get session details | Yes | - | Session Object |
| POST | `/api/sessions/:id/join` | Join a session | Yes | - | Session Object |
| POST | `/api/sessions/:id/end` | End a session | Yes | - | Message + Session |
| GET | `/api/chat/token` | Get Stream Chat Token | Yes | - | Token String |

---

### Detailed Endpoint Reference

#### POST /api/sessions
- **Purpose**: Creates a new interview session and initializes Stream resources.
- **Auth**: Required.
- **Request**:
  ```json
  {
    "problem": "Two Sum",
    "difficulty": "Easy"
  }
  ```
- **Response** (201):
  ```json
  {
    "session": {
      "_id": "65d...",
      "host": { "username": "...", "clerkId": "..." },
      "callId": "session_170...",
      "status": "active"
    }
  }
  ```
- **Flow**: Route -> Session Controller -> Stream API -> MongoDB Create -> Response

#### GET /api/sessions/active
- **Purpose**: Retrieves list of sessions where `status: "active"`.
- **Auth**: Required.
- **Response** (200):
  ```json
  {
    "sessions": [ { "host": {...}, "problem": "Two Sum" }, ... ]
  }
  ```

#### POST /api/sessions/:id/join
- **Purpose**: Adds current user as `participant` to the session.
- **Auth**: Required.
- **Logic**: Fails if session is full or user is host.
- **Response** (200): Updated Session Object.

#### POST /api/sessions/:id/end
- **Purpose**: Marks session as `completed` and cleans up Stream resources.
- **Auth**: Required (Host only).
- **Response** (200):
  ```json
  { "message": "Session ended successfully", "session": {...} }
  ```

#### GET /api/chat/token
- **Purpose**: Generates a temporary token for the user to connect to Stream Chat.
- **Auth**: Required.
- **Response** (200):
  ```json
  {
    "token": "eyJhbG...",
    "userId": "user_clerk_id",
    "userName": "Name"
  }
  ```

---

# 14. DEPENDENCIES INSTALLATION
# ============================================================================

## Backend Setup

1. **Navigate to Backend**
   ```bash
   cd backend
   ```
2. **Install Packages**
   ```bash
   npm install
   ```
3. **Important Dependencies**:
   - `express`: Web Server
   - `mongoose`: Database
   - `@clerk/express`: Authentication
   - `@stream-io/node-sdk`: Video API
   - `stream-chat`: Chat API

4. **Start Server**
   ```bash
   npm start      # Production
   npm run dev    # Development (Nodemon)
   ```

## Frontend Setup

1. **Navigate to Frontend**
   ```bash
   cd frontend
   ```
2. **Install Packages**
   ```bash
   npm install
   ```
3. **Important Dependencies**:
   - `react`, `react-dom`
   - `@clerk/clerk-react`
   - `@stream-io/video-react-sdk`
   - `axios`

4. **Start Dev Server**
   ```bash
   npm run dev
   ```

---

# 15. ENVIRONMENT VARIABLES
# ============================================================================

## Backend (`backend/.env`)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| PORT | Server Port | No | 5000 |
| DB_URL | MongoDB Connection String | Yes | mongodb://... |
| CLERK_PUBLISHABLE_KEY | Clerk Public Key | Yes | pk_test_... |
| CLERK_SECRET_KEY | Clerk Secret Key | Yes | sk_test_... |
| STREAM_API_KEY | Stream API Key | Yes | from dashboard |
| STREAM_API_SECRET | Stream Secret | Yes | from dashboard |
| INNGEST_EVENT_KEY | Inngest Key | No | ... |
| INNGEST_SIGNING_KEY | Inngest Signing Key | No | ... |

## Frontend (`frontend/.env` / `.env.local`)

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_CLERK_PUBLISHABLE_KEY | Clerk Public Key for Auth | Yes |
| VITE_API_URL | Backend API Base URL | Yes (e.g. `http://localhost:5000/api`) |

---

# 16. HOW TO RUN PROJECT
# ============================================================================

## Step 1: Configure Environment
Ensure both `backend/.env` and `frontend/.env` are created with the keys listed above (Clerk, Stream, Mongo).

## Step 2: Start Backend
```bash
cd backend
npm run dev
# Server should run on http://localhost:5000
```

## Step 3: Start Frontend
```bash
cd frontend
npm run dev
# Vite server runs on http://localhost:5173
```

## Step 4: Verify
Open `http://localhost:5173`, sign in via Clerk, and check the Dashboard.

---

# 17. RUNTIME FLOW (AFTER STARTUP)
# ============================================================================

1. **Idle State**: Server waits for API requests on Port 5000.
2. **User Connects**: Frontend loads, Clerk checks token.
3. **Dash Load**: Frontend requests active sessions. Backend queries Mongo.
4. **Session Start**: backend creates session -> Frontend joins Stream Call.
5. **Interview**: Real-time video/audio via Stream servers, code editor local state.

---

# 18. COMMON ERRORS & FIXES
# ============================================================================

### Error: "Missing Publishable Key"
**Fix**: Ensure `VITE_CLERK_PUBLISHABLE_KEY` is in `frontend/.env`.

### Error: "Stream API key or secret is missing"
**Fix**: Add `STREAM_API_KEY` and `STREAM_API_SECRET` to `backend/.env`.

### Error: "Connection Refused" (MongoDB)
**Fix**: Check if MongoDB is running locally or if `DB_URL` is correct.

### Error: "Unauthorized" on API calls
**Fix**: Ensure you are logged in on frontend. Check network tab for Authorization header/cookie.

---

# 19. DEVELOPER NOTES
# ============================================================================

## Scalability Improvements
- **Socket Scaling**: Stream handles the heavy lifting for video/chat scaling.
- **Code Execution**: Currently client-side. For production, integrate a remote execution engine (e.g., Piston) to run code securely on server.

## Security Improvements
- **Webhooks**: Implement Clerk/Stream webhooks to sync user data more reliably.
- **Rate Limiting**: Add `express-rate-limit` to backend routes.

## Performance
- **React Query**: Configured to cache session lists. Tweaking `staleTime` can reduce server load.
- **Lazy Loading**: Code Editor is heavy; ensure it's lazy loaded.

# ============================================================================
# END OF DOCUMENTATION
# ============================================================================
