# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Exam Module - Frontend

This is the **frontend** of the Exam Module project. It is built with **React**, **Vite**, and **Tailwind CSS**. Users can **register/login**, take an **exam with a timer**, and view their **results**.

---

## **Features**

- User **authentication** (register & login)
- Protected **exam page** with 5 questions
- **Timer** countdown for the exam
- Option selection with styled **radio buttons**
- Submit exam and view **results**
- Responsive design with **Tailwind CSS**

---

## **Prerequisites**

- Node.js (version 14 or above)
- npm or yarn
- Backend API running at `http://localhost:5001`

---

## **Getting Started**

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd exam-module/frontend
