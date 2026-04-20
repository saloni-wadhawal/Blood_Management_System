# 🩸 Blood Management System

---

## 🌐 Overview

A **Full Stack Web Application** that helps manage blood donation and request processes efficiently.  
It connects **donors, recipients, and admins** to ensure quick response in emergency situations.

---

## 🚨 Problem Statement

Many patients face difficulty finding blood donors due to:

- ❌ Poor coordination  
- ❌ Delayed communication  
- ❌ Lack of centralized system  

---

## 💡 Solution

This platform provides a **smart and centralized system** to:

- ✅ Request blood easily  
- ✅ Manage requests via admin dashboard  
- ✅ Improve real-time communication  

---

## ✨ Features

- 📝 Blood Request System  
- 📊 Admin Dashboard  
- 🔄 Accept / Reject Requests  
- ⚡ Real-time Updates  
- 🎯 Clean & Responsive UI  

---

## 🖼️ Screenshots

### 🏠 Login Page
![Login](client/public/images/Login.png)

### 🔐 Dashboard
![Dashboard](client/public/images/dashboard.png)

### 📝 Add New Donor
![Add New Donor](client/public/images/Add_new_donor.png)

### 📊 Find Donor
![Find Donor](client/public/images/findDonor.png)

### 📊 Request Donor
![Request Donor](client/public/images/request_Donor.png)

---

## 🛠️ Tech Stack  

| 💻 Technology | 🚀 Usage |
|--------------|--------|
| React.js | Frontend UI |
| Node.js | Backend Runtime |
| Express.js | API Handling |
| MongoDB | Database |

---

## ⚙️ How It Works  

```mermaid
graph TD;
A[User Login/Register] --> B[Donor Adds Details]
B --> C[Patient Requests Blood]
C --> D[Stored in Database]
D --> E[Matching Donors Found]

---

## 📂 Project Structure

blood-management-system/
├── client/        # 🎨 Frontend (React)
│   ├── public/
│   │   └── images/    # 📸 Screenshots used in README
│   └── src/
├── server/        # ⚙️ Backend (Node + Express)
├── database/      # 🗄️ MongoDB Models & Config
└── README.md

---

## 🚀 Installation & Setup

###🔽 Clone Repository

git clone https://github.com/your-username/blood-management-system.git
cd blood-management-system
```

### ▶️ Run Backend

```bash
cd server
npm install
npm start
```

### ▶️ Run Frontend

```bash
cd client
npm install
npm start
```

###🔑 Environment Variables

Create a .env file inside the server folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000

---

## 👩‍💻 Author

**Saloni Mangesh Wadhawal**
🎓 Computer Engineering Student

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
