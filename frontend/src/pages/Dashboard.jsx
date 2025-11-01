import { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard({ session }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const token = session.access_token;

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Fetch tasks
  const fetchTasks = async () => {
    const { data } = await axios.get(`${API_BASE}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
      params: statusFilter ? { status: statusFilter } : {},
    });
    setTasks(data);
  };

  // Fetch users for assignment
  const fetchUsers = async () => {
    const { data } = await axios.get(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(data);
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [statusFilter]);

  return (
    <div>
      <Header session={session} />
      <div className="filter-bar">
        <label>Status:</label>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <TaskForm fetchTasks={fetchTasks} users={users} token={token} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} token={token} />
    </div>
  );
}
