import { Link } from "react-router-dom";
import {
  FaUserTie,
  FaComments,
  FaCalendarCheck,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  const cards = [
    {
      title: "Find Mentors",
      desc: "Search mentors by skills, branch, company, or expertise.",
      icon: <FaUserTie />,
      link: "/mentors",
    },
    {
      title: "My Sessions",
      desc: "View your booked sessions and mentorship requests.",
      icon: <FaCalendarCheck />,
      link: "/sessions",
    },
    {
      title: "Chat",
      desc: "Continue real-time conversations with mentors or students.",
      icon: <FaComments />,
      link: "/chat",
    },
    {
      title: "Groups",
      desc: "Join discussions around DSA, web development, and placements.",
      icon: <FaUsers />,
      link: "/groups",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Welcome, {user?.fullName || "User"} 👋
        </h1>

        <p className="mt-3 text-blue-100 max-w-2xl">
          Manage your mentorship journey, explore mentors, join group
          discussions, and track your learning sessions from one place.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm capitalize">
            {user?.role}
          </span>

          {user?.college && (
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              {user.college}
            </span>
          )}

          {user?.branch && (
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              {user.branch}
            </span>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-5">
              {card.icon}
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              {card.title}
            </h2>

            <p className="mt-2 text-sm text-gray-600 leading-6">
              {card.desc}
            </p>

            <div className="mt-5 flex items-center gap-2 text-blue-600 font-medium text-sm">
              Open
              <FaArrowRight className="group-hover:translate-x-1 transition" />
            </div>
          </Link>
        ))}
      </section>

      {user?.role === "mentor" && (
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Mentor Quick Actions
          </h2>

          <p className="mt-2 text-gray-600">
            Complete your mentor profile and manage incoming session requests.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link
              to="/mentor-profile"
              className="bg-blue-600 text-white px-5 py-3 rounded-lg text-center hover:bg-blue-700 transition"
            >
              Create / Edit Mentor Profile
            </Link>

            <Link
              to="/sessions"
              className="border border-blue-600 text-blue-600 px-5 py-3 rounded-lg text-center hover:bg-blue-50 transition"
            >
              View Session Requests
            </Link>
          </div>
        </section>
      )}

      {user?.role === "admin" && (
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Admin Controls
          </h2>

          <p className="mt-2 text-gray-600">
            Manage users, approve mentor accounts, and monitor platform
            activity.
          </p>

          <Link
            to="/admin"
            className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Open Admin Dashboard
          </Link>
        </section>
      )}
    </div>
  );
};

export default Dashboard;