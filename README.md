# 📊 Next.js Dashboard App

A full-featured dashboard and public site built with **Next.js**, **TailwindCSS**, **shadcn/ui**, and **React Query** — using the public JSONPlaceholder API for managing posts.

> 🔗 Live Demo: _(add your Vercel link here after deploying)_

---

## ✨ Features

### 🌐 Public Site (`/`)
- Lists posts (title + excerpt)
- Clickable cards → View full post (`/posts/[id]`)
- 404 handling for invalid post IDs
- Modern design with Tailwind, shadcn/ui, and animations

### 🔧 Admin Dashboard (`/admin`)
- View all posts
- Create new post (with Tiptap rich text editor)
- Edit existing post
- Delete post (with optimistic update)
- Toast feedback for all actions (via Sonner)
- Responsive layout and smooth UX

---

## 🛠 Tech Stack

- [Next.js 14+](https://nextjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.dev)
- [React Query](https://tanstack.com/query/latest)
- [Tiptap Editor](https://tiptap.dev)
- [Sonner](https://sonner.emilkowal.dev) (toast notifications)

---

## 🚀 Getting Started

### 1. Clone the project
```bash
git clone https://github.com/Malikhur/next.js-dashboard.git
cd next.js-dashboard

2. Install dependencies
npm install

3. Run the development server
npm run dev
Open http://localhost:3000 in your browser.

📂 Project Structure

/app
  /admin            → Admin dashboard
    /edit/[id]      → Edit post page
  /posts/[id]       → Public post detail page
/components
  PostForm.tsx      → Form for create/edit posts
  ui/               → shadcn/ui components
/providers
  ReactQueryProvider.tsx
