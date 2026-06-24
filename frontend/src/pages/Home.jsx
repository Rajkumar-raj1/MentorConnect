import { Link } from "react-router-dom";
import {
  FaUsers,
  FaComments,
  FaCalendarCheck,
  FaSearch,
  FaUserTie,
  FaArrowRight,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-10 items-center py-10">
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-5">
            Student Mentorship Platform
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Connect with mentors and grow your career faster
          </h1>

          <p className="mt-6 text-gray-600 text-base sm:text-lg leading-7">
            MentorConnect helps students find experienced mentors, join
            discussion groups, book sessions, and chat in real time for career
            and placement guidance.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/mentors"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Find Mentors <FaArrowRight />
            </Link>

            <Link
              to="/groups"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium text-center hover:bg-blue-50 transition"
            >
              Explore Groups
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="bg-white/10 rounded-2xl p-5 mb-5">
            <p className="text-sm opacity-80">Upcoming Session</p>
            <h3 className="text-xl font-semibold mt-2">
              Resume Review with Senior Mentor
            </h3>
            <p className="mt-2 text-sm opacity-90">
              Today, 6:00 PM - 7:00 PM
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-4">
              <FaUserTie className="text-2xl mb-3" />
              <h4 className="text-2xl font-bold">50+</h4>
              <p className="text-sm opacity-80">Mentors</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <FaComments className="text-2xl mb-3" />
              <h4 className="text-2xl font-bold">1k+</h4>
              <p className="text-sm opacity-80">Messages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Everything students need in one platform
          </h2>
          <p className="mt-3 text-gray-600">
            Built for mentorship, placement preparation, and real-time
            collaboration.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaSearch />,
              title: "Find Mentors",
              desc: "Search mentors by skills, branch, company, and expertise.",
            },
            {
              icon: <FaComments />,
              title: "Real-time Chat",
              desc: "Chat directly with mentors and students using Socket.io.",
            },
            {
              icon: <FaCalendarCheck />,
              title: "Book Sessions",
              desc: "Request mentorship sessions and track booking status.",
            },
            {
              icon: <FaUsers />,
              title: "Group Discussions",
              desc: "Join topic-based communities for DSA, web dev, and more.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 leading-6">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white rounded-3xl shadow-md p-6 sm:p-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            How MentorConnect Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Create Account",
              desc: "Register as a student or mentor and complete your profile.",
            },
            {
              step: "02",
              title: "Connect & Discuss",
              desc: "Search mentors, join groups, and start real-time conversations.",
            },
            {
              step: "03",
              title: "Book Sessions",
              desc: "Schedule mentorship sessions and improve your placement preparation.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-4">
                {item.step}
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 leading-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Ready to start your mentorship journey?
        </h2>

        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Join MentorConnect and connect with mentors who can guide you in
          projects, DSA, resumes, interviews, and placements.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;