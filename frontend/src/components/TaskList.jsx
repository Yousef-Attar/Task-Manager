import axios from "axios";
import "../styles/App.css";

export default function TaskList({ tasks, fetchTasks, token }) {
  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((t) => (
          <div key={t.id} className="task-card">
            <h3>{t.title}</h3>
            <p>Status: {t.status}</p>
            {t.started_date && <p>Start: {t.started_date}</p>}
            {t.assigned_user && <p>Assigned: {t.profiles?.email}</p>}
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
