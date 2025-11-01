import { useState } from "react";
import axios from "axios";
import "../styles/App.css";

export default function TaskForm({ fetchTasks, users, token }) {
  const [form, setForm] = useState({
    title: "",
    status: "todo",
    started_date: "",
    assigned_user: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/tasks`,
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setForm({ title: "", status: "todo", started_date: "", assigned_user: "" });
    fetchTasks();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input
        type="date"
        name="started_date"
        value={form.started_date}
        onChange={handleChange}
      />
      <select
        name="assigned_user"
        value={form.assigned_user}
        onChange={handleChange}
      >
        <option value="">Assign user...</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.email}
          </option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
