# 🧠 Task Manager — Full Stack Project (React + Express + Supabase)

A simple and secure **Task Manager** web app built with **React (Vite)**, **Express.js**, and **Supabase** for authentication and database.

Users can:
- Sign up and log in
- Create, edit, and delete their own tasks
- Assign tasks to other users
- Filter tasks by status (To Do, In Progress, Done)
- See only tasks they created or that are assigned to them

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite) + plain CSS |
| Backend | Express.js |
| Database | Supabase (PostgreSQL + Auth) |
| Deployment | Render (Backend) + Vercel (Frontend) |

---

## 📁 Project Structure

project-root/
│
├── backend/
│ ├── index.js
│ ├── supabaseClient.js
│ ├── routes/
│ ├── middleware/
│ └── .env.example
│
├── frontend/
│ ├── src/
│ ├── .env.example
│ └── vite.config.js
│
└── README.md


---

## ⚙️ Environment Variables

### 🔹 Backend (`/backend/.env`)
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=4000


### 🔹 Frontend (`/frontend/.env`)


VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=https://your-backend.onrender.com/api


> ⚠️ Never commit `.env` files to GitHub — only `.env.example`.

---

## 🧰 Local Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Yousef-Attar/task-manager.git
cd task-manager
2. Backend setup
bash
Copy code
cd backend
npm install
cp .env.example .env
# Fill in your Supabase URL + Service Role Key
npm start
Your API will run on http://localhost:4000

3. Frontend setup
bash
Copy code
cd ../frontend
npm install
cp .env.example .env
# Fill in your Supabase URL + Anon Key
npm run dev
Visit your app at http://localhost:5173

🗃️ Database (Supabase)
Tables
profiles
Column	Type	Description
id	UUID (PK)	Same as auth.users.id
email	text	User’s email
created_at	timestamp	Auto-filled

tasks
Column	Type	Description
id	UUID (PK)	Auto-generated
title	text	Task title
status	text	todo, in_progress, or done
started_date	date	Optional
assigned_user	UUID	Linked to profiles.id
created_by	UUID	Creator of task
created_at	timestamp	Auto-filled

Row Level Security (RLS)
Users can only view tasks they created or are assigned to.

Users can create, update, and delete only their own tasks.

Authenticated users can view all profiles (for assignment).

🔐 Authentication Flow
Supabase Auth handles registration, login, logout.

Frontend stores session using Supabase client.

Every request to the backend includes Authorization: Bearer <access_token>.

The backend verifies this token via middleware before allowing access.

🧑‍💻 Author

Yousef Attar
Frontend Developer & Robotics Teacher
📧 yousefattar961@gmail.com
🔗 http://www.linkedin.com/in/yousef-attar-961leb
🔗 https://myportfolioforfrontend.netlify.app/
