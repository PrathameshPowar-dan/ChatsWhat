
# 🗨️ ChatsWhat

**ChatsWhat** is a full-stack real-time chat app built with the **MERN stack**. It features user authentication, live messaging via Socket.io, profile management, and media uploads — all with a responsive UI powered by React and Tailwind CSS.

## 🌐 Live Demo
🔗 [Live Preview](https://chatswhat.onrender.com)

---

## 🚀 Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Zustand (state management)
- Axios
- Socket.io-client

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (auth)
- Cloudinary + Multer (media upload)
- Socket.io (real-time)
- dotenv

---

## 🔐 Features

- ✅ Signup/Login with secure cookie-based auth
- ✅ Upload profile pictures
- ✅ Real-time messaging with online user tracking
- ✅ Update profile & account info
- ✅ Responsive design with clean UI

---

## 📦 Folder Structure

```
ChatsWhat/
├── backend/           # Express + MongoDB server
│   └── src/
├── frontend/          # React + Vite client
│   └── src/
├── package.json       # Root scripts to run both
└── .env               # Environment variables (not committed)
```

---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/PrathameshPowar-dan/ChatsWhat.git
cd ChatsWhat
```

### 2. Setup environment variables

#### Backend: `/backend/.env`
```
PORT=7000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

#### Frontend (optional): `/frontend/.env`
```
VITE_API_BASE_URL=http://localhost:7000/api
VITE_SOCKET_URL=http://localhost:7000
```

### 3. Install dependencies and run the app
```bash
npm install
npm run build
npm start
```

---

## 📄 License

This project is open-source and free to use.
