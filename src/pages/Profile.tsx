import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
// The following imports are commented out because the modules cannot be found.
// import ProfileCard from "../components/ProfileCard";
// import AnalyticsWidget from "../components/AnalyticsWidget";
// import ThemeToggle from "../components/ThemeToggle";
import TaskList from "../components/TaskList";

export default function Profile() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow transition-colors">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link to="/" className="font-bold text-xl text-blue-600 dark:text-blue-400">MyUserSite</Link>
      </motion.div>
      <div className="flex items-center gap-4">
        <Link to="/" className={location.pathname === "/" ? "font-semibold" : ""}>Home</Link>
        {isAuthenticated && (
          <>
            <Link to="/dashboard" className={location.pathname === "/dashboard" ? "font-semibold" : ""}>Dashboard</Link>
            <Link to="/settings" className={location.pathname === "/settings" ? "font-semibold" : ""}>Settings</Link>
            <button onClick={logout} className="text-red-500">Logout</button>
          </>
        )}
        {!isAuthenticated && <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
}