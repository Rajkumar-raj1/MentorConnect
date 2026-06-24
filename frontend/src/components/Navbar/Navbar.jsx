import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import NotificationBell from "./NotificationBell";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />

        {isAuthenticated && <DesktopMenu />}

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <NotificationBell />
              <UserDropdown />
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Navbar;