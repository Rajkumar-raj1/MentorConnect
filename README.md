```md
# MentorConnect

MentorConnect is a **production-ready MERN stack mentorship platform** that enables students to connect with mentors through **real-time messaging, group discussions, mentorship session booking, notifications, and role-based dashboards**.

---

## 🚀 Live Demo

**Frontend:** https://mentor-connect-umber-eta.vercel.app

**Backend API:** https://mentorconnect-xuwq.onrender.com

---

# ✨ Features

### Authentication
- Secure JWT Authentication
- Login & Registration
- Protected Routes
- Role-Based Authorization
- Persistent Authentication

### Student Features
- Browse Mentors
- View Mentor Profiles
- Book Mentorship Sessions
- One-to-One Chat
- Join Group Discussions
- Receive Notifications
- Manage Profile

### Mentor Features
- Create Mentor Profile
- Accept/Reject Sessions
- Complete Sessions
- Real-Time Chat
- Group Discussions
- Profile Management

### Admin Features
- Admin Dashboard
- User Management
- Mentor Approval
- Notifications

### Chat System
- Real-Time Messaging (Socket.IO)
- Typing Indicator
- Seen Messages
- Conversation List
- Last Message Preview
- Unread Message Count

### Group Chat
- Create Groups
- Join Groups
- Leave Groups
- Group Messaging
- Real-Time Updates

### Session Management
- Book Session
- Accept Session
- Reject Session
- Cancel Session
- Complete Session
- Meeting Link Support

### Notifications
- Real-Time Notifications
- Message Notifications
- Session Notifications
- Mark as Read
- Unread Badge

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Socket.IO Client
- React Hot Toast
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO
- Cloudinary
- Multer

---

 # 📂 Project Structure

MentorConnect
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── socket
│   │   ├── utils
│   │   ├── app.js
│   │   └── index.js
│   │
│   ├── public
│   │   └── temp
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── frontend
│   ├── public
│   │
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   │   ├── Chat
│   │   │   ├── Group
│   │   │   ├── Navbar
│   │   │   ├── Notification
│   │   │   ├── Profile
│   │   │   └── Session
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── socket
│   │   ├── utils
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── index.html
│
├── README.md
└── LICENSE
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Rajkumar-raj1/MentorConnect
````

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=8000

MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

CORS_ORIGIN=
```

---

## Frontend (.env)

```env
VITE_API_URL=

VITE_SOCKET_URL=


---

# 📌 API Modules

* Authentication
* Users
* Mentor Profiles
* Conversations
* Messages
* Groups
* Sessions
* Notifications
* Admin

---

# 🔐 Authentication

MentorConnect uses:

* JWT Access Token
* Refresh Token
* HTTP Only Cookies
* Protected APIs
* Role-Based Access Control

---

# 💬 Real-Time Features

* One-to-One Chat
* Typing Indicator
* Seen Status
* Conversation Updates
* Group Messaging
* Socket.IO Integration
* Live Notifications

---

# 🌟 Future Improvements

* Video Calling
* Screen Sharing
* Payment Integration
* Mentor Ratings
* AI Mentor Recommendations
* File Sharing
* Voice Messages
* Push Notifications

---

# 👨‍💻 Author

**Raj Kumar Lodhi**

GitHub: https://github.com/Rajkumar-raj1

LinkedIn: https://www.linkedin.com/in/raj-lodhi-313809290/

---


