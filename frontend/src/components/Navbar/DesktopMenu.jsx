import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DesktopMenu = () => {
  const { user } = useAuth();

  let links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Mentors", path: "/mentors" },
    { name: "Groups", path: "/groups" },
    { name: "Sessions", path: "/sessions" },
    { name: "Chat", path: "/chat" },
  ];

  if (user?.role === "mentor") {
    links.push({ name: "Mentor Profile", path: "/mentor-profile" });
  }

  if (user?.role === "admin") {
    links = [{ name: "Admin Dashboard", path: "/admin" }];
  }

  return (
    <div className="hidden md:flex items-center gap-6">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `font-medium ${
              isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

export default DesktopMenu;