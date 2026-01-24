# 🚀 TaskFlow - Premium Task Management

A visually stunning, animation-rich full-stack task management application built with modern technologies. Features a dark-mode first design with glassmorphism effects, smooth Framer Motion animations, and a production-grade backend.

![TaskFlow Preview](https://via.placeholder.com/800x400?text=TaskFlow+Premium+Dashboard)

## ✨ Features

### 🎨 Frontend
- **Dark/Light Mode** - Smooth animated theme toggle with localStorage persistence
- **Glassmorphism UI** - Modern glass-effect cards and components
- **Framer Motion Animations** - Page transitions, hover effects, and micro-interactions
- **Responsive Design** - Mobile-first approach, works on all devices
- **Swiper Carousel** - Beautiful task carousel with card effects
- **Animated Counters** - Dynamic stats display with spring physics
- **Toast Notifications** - Elegant feedback with react-hot-toast

### 🔐 Backend
- **JWT Authentication** - Secure token-based auth with refresh strategy
- **Password Hashing** - bcrypt with salt rounds for security
- **MongoDB/Mongoose** - Scalable NoSQL database
- **RESTful API** - Clean, well-documented endpoints
- **Error Handling** - Centralized error middleware
- **Input Validation** - Server-side validation for all inputs

---

## 📁 Project Structure

```
project x/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── animations/    # Framer Motion wrappers
│   │   │   ├── layout/        # Navbar, Layout
│   │   │   ├── theme/         # ThemeToggle
│   │   │   └── ui/            # Button, Card, Input, Modal, Skeleton
│   │   ├── context/           # Theme & Auth providers
│   │   ├── pages/             # Home, Login, Register, Dashboard, Profile
│   │   ├── routes/            # ProtectedRoute
│   │   ├── services/          # API abstraction layer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css          # Design system & utilities
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── config/               # Database configuration
│   ├── controllers/          # Business logic
│   ├── middleware/           # Auth & error handling
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── index.js              # Express server
│   ├── package.json
│   └── .env                  # Environment variables
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd "project x"

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Start Development Servers

```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 🔌 API Documentation

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### User

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/user/profile` | Get user profile | ✅ |
| PUT | `/api/user/profile` | Update profile | ✅ |
| PUT | `/api/user/password` | Update password | ✅ |

### Tasks

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tasks` | List all tasks | ✅ |
| GET | `/api/tasks/:id` | Get single task | ✅ |
| POST | `/api/tasks` | Create task | ✅ |
| PUT | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |

### Request/Response Examples

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Create Task (Protected)
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the TaskFlow app",
    "priority": "high"
  }'
```

---

## 🎨 Design System

### Theme System
```css
/* Dark Mode (Default) */
--bg-primary: #0f172a;
--bg-secondary: #1e293b;
--accent-primary: #6366f1;
--accent-gradient: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);

/* Light Mode */
--bg-primary: #f8fafc;
--bg-secondary: #ffffff;
```

### Animation Strategy
- **Page Transitions**: Fade + slide (300ms ease)
- **Hover Effects**: Scale 1.02-1.05 with glow
- **Theme Toggle**: Sun/moon morph with rotation
- **Loading States**: Skeleton shimmer animation
- **Counters**: Spring physics with viewport detection

---

## 📈 Scalability Approach

### Frontend
- **Component-Driven**: Atomic design with reusable primitives
- **Code Splitting**: React.lazy for route-based chunks
- **Memoization**: useMemo/useCallback for expensive operations
- **Context Optimization**: Separate contexts to prevent re-renders

### Backend
- **Service Layer**: Controllers delegate to services
- **Middleware Chain**: Auth → Validation → Handler → Error
- **Database Indexes**: Optimized queries with compound indexes
- **Token Strategy**: JWT with configurable expiry

### Performance
- **Animations**: GPU-accelerated transforms only
- **Bundle Size**: Tree-shaking, dynamic imports
- **API Calls**: Request deduplication, optimistic updates

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Vite, TailwindCSS, Framer Motion |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Auth** | JWT, bcryptjs |
| **Styling** | TailwindCSS, CSS Variables |
| **Animations** | Framer Motion, CSS Transitions |
| **UI Components** | Swiper.js, Lucide Icons, React Hot Toast |

---

## 📝 License

MIT License - feel free to use for your own projects!

---

## 🙏 Acknowledgments

Built with ❤️ as a premium internship submission demonstrating:
- Modern React patterns and best practices
- Production-grade backend architecture
- Stunning UI/UX with attention to detail
- Scalable, maintainable codebase
