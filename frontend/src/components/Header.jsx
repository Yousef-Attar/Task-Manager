import { supabase } from "../supabaseClient";
import "../styles/App.css";

export default function Header({ session }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="header">
      <h2>Task Manager</h2>
      <div>
        <span>{session.user.email}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}
