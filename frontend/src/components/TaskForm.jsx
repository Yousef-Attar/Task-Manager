import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/App.css";

export default function TaskForm({ fetchTasks, users, token, editingTask, setEditingTask }) {
  const [form, setForm] = useState({
    title: "",
    status: "todo",
    started_date: "",
    assigned_user: "",
  });

  // If editing, pre-fill the form with the task data
  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        status: editingTask.status || "todo",
        started_date: editingTask.started_date || "",
        assigned_user: editingTask.assigned_user || "",
      });
    } else {
      setForm({ title: "", status: "todo", started_date: "", assigned_user: "" });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingTask) {
      // Update existing task
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/${editingTask.id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      // Create new task
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/tasks`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    // Reset form
    setForm({ title: "", status: "todo", started_date: "", assigned_user: "" });
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editingTask ? "Edit Task" : "Add New Task"}</h3>
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

      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>

      {editingTask && (
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setEditingTask(null)}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
