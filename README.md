# 🚀 ResourceIQ Frontend

ResourceIQ is an intelligent task allocation and resource monitoring platform. This frontend is built with **Next.js 15**, **React 19**, and **Tailwind CSS**, providing a premium, high-performance dashboard for managing development resources and GitHub activities.

---

## ✨ Features

- **Premium Dashboard**: Real-time overview of platform health, active developers, and recent tasks.
- **GitHub Integration**: Live tracking of pull requests and activity feeds directly from GitHub.
- **Role-Based Protection**: Secure routes and interfaces for Admins and Team Members.
- **Modern UI/UX**: Built with shadcn/ui components, featuring a sleek dark-mode compatible design with glassmorphism effects.
- **Type Safety**: Fully implemented with TypeScript for robust development.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/)
- **API Client**: Native Fetch with JWT interceptors

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ 
- [ResourceIQ Backend](https://github.com/your-repo/resource_iq-backend) running at `http://localhost:8000`

### 2. Installation
Clone the repository and install dependencies:
```bash
cd resource_iq-frontend
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### 4. Run Development Server
```bash
npm run dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🔐 Authentication
The frontend connects to the FastAPI backend using **OAuth2 Password Grant (JWT)**.
1. Sign in via `/sign-in`.
2. The token is stored in `localStorage`.
3. Private routes (`/`) automatically check for the token and redirect if it's missing or expired.

---

## 📁 Project Structure
- `src/app`: Layouts, pages (Dashboard, Sign-in), and global styles.
- `src/components`: Reusable UI components (Buttons, Cards, Icons).
- `src/lib`: API client utilities and helper functions.
- `public`: Static assets and images.

---

## 🛡️ Security
- **JWT Protection**: Tokens are automatically attached to all API requests.
- **CORS Configuration**: Ensure the backend `.env` file includes `http://localhost:3000` in `BACKEND_CORS_ORIGINS`.
- **Environment Variables**: No sensitive backend keys (like GitHub Private Keys) are stored in the frontend.

---

## 👤 Author
Developed as part of the ResourceIQ suite.
