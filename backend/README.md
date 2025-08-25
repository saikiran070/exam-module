# Exam Module - Backend

This is the **backend** of the Exam Module project. It is built with **Node.js**, **Express**, and **MongoDB**, and handles:

* **User authentication** (register & login)
* **Exam questions** fetching
* **Exam submission** and result evaluation

It provides a secure API for your React frontend to interact with.

---

## Features

* User **registration** and **login** with JWT authentication
* **Protected exam routes** (require login)
* Store exam **questions** and **user answers** in MongoDB
* Passwords are hashed securely using **bcrypt**
* JWT token verification for all protected endpoints

---

## Prerequisites

* Node.js (version 14 or above)
* npm or yarn
* MongoDB (local or Atlas)
* `.env` file with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

---

## Getting Started

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd exam-module/backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the server in development mode**

```bash
npm run dev
```

* Server will start on port `5001` by default
* You should see a log like:

```
✅ MongoDB Connected
🚀 Server running on port 5001
```

---

## API Endpoints

### Auth Routes

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login existing user |

### Exam Routes

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| GET    | /api/exam/questions | Get all exam questions         |
| POST   | /api/exam/submit    | Submit user answers & evaluate |

> **Note:** All exam routes require a **JWT token** in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Usage Notes

* Make sure MongoDB is running and connected via `MONGO_URI`.
* Register users via `/api/auth/register`.
* Use the returned **JWT token** to access protected exam endpoints.
* Pre-populate the **questions collection** in MongoDB before starting exams.
* Passwords are securely hashed with **bcrypt**.
