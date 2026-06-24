import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { DEFAULT_AVATAR } from "../../utils/constants";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen((prev) => !prev)}>
        <img
          src={user?.avatar || `${DEFAULT_AVATAR}&name=${user?.fullName}`}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg z-50 border">
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Profile
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;