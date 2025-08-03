# 💼 Job Application API

This is a Node.js-powered backend API designed for a **Job Application System**, enabling users to search and apply for jobs, and allowing admins to manage and review all job applications. Built with secure authentication and role-based access using **JWT**, it supports both user and admin functionalities.

---

## 📌 Features

- 🔐 **JWT-based Authentication**
- 🧑‍💼 **Admin Panel API** for managing all job applications
- 👨‍💻 **User Functionality** to apply for and view job applications
- 🗃️ **Session & Cookie Management** using `cookie-parser` and session logic
- 🔄 **Role-based access control** (User/Admin)
- 🌐 **MongoDB** for storing all job and user-related data

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB** (via Mongoose)
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Cookie-parser** for handling cookies
- **Session management**

---

## 🚀 Getting Started

### 🔧 Installation

```bash 
git clone https://github.com/your-username/job-api.git
cd job-api
npm install
npm start