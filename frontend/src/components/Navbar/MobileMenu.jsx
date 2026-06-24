import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isOpen) return null;

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  // =========================
  // ADMIN MENU
  // =========================
  if (isAuthenticated && user?.role === "admin") {
    return (
      <div className="md:hidden bg-white border-t shadow-sm px-4 py-4 space-y-3">
        <Link
          to="/admin"
          onClick={closeMenu}
          className="block text-gray-700"
        >
          Admin Dashboard
        </Link>

        <Link
          to="/notifications"
          onClick={closeMenu}
          className="block text-gray-700"
        >
          Notifications
        </Link>

        <Link
          to="/profile"
          onClick={closeMenu}
          className="block text-gray-700"
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="text-red-600 font-medium"
        >
          Logout
        </button>
      </div>
    );
  }

  // =========================
  // STUDENT / MENTOR MENU
  // =========================
  return (
    <div className="md:hidden bg-white border-t shadow-sm px-4 py-4 space-y-3">
      {isAuthenticated ? (
  <Link
    onClick={closeMenu}
    to="/dashboard"
    className="block text-gray-700"
  >
    Dashboard
  </Link>
) : (
  <Link
    onClick={closeMenu}
    to="/"
    className="block text-gray-700"
  >
    Home
  </Link>
)}

      <Link
        onClick={closeMenu}
        to="/mentors"
        className="block text-gray-700"
      >
        Mentors
      </Link>

      <Link
        onClick={closeMenu}
        to="/groups"
        className="block text-gray-700"
      >
        Groups
      </Link>

      {isAuthenticated ? (
        <>
          <Link
            onClick={closeMenu}
            to="/sessions"
            className="block text-gray-700"
          >
            Sessions
          </Link>

          <Link
            onClick={closeMenu}
            to="/chat"
            className="block text-gray-700"
          >
            Chat
          </Link>

          <Link
            onClick={closeMenu}
            to="/notifications"
            className="block text-gray-700"
          >
            Notifications
          </Link>

          <Link
            onClick={closeMenu}
            to="/profile"
            className="block text-gray-700"
          >
            Profile
          </Link>

          {user?.role === "mentor" && (
            <Link
              onClick={closeMenu}
              to="/mentor-profile"
              className="block text-gray-700"
            >
              Mentor Profile
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="text-red-600 font-medium"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <Link
            onClick={closeMenu}
            to="/login"
            className="text-center border border-blue-600 text-blue-600 py-2 rounded-lg"
          >
            Login
          </Link>

          <Link
            onClick={closeMenu}
            to="/register"
            className="text-center bg-blue-600 text-white py-2 rounded-lg"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;