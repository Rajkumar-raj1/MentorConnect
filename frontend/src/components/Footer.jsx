import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              MentorConnect
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Connect with experienced mentors, collaborate with
              students, join discussion groups, and accelerate your
              learning journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/mentors"
                  className="hover:text-blue-400 transition"
                >
                  Find Mentors
                </Link>
              </li>

              <li>
                <Link
                  to="/groups"
                  className="hover:text-blue-400 transition"
                >
                  Groups
                </Link>
              </li>

              <li>
                <Link
                  to="/sessions"
                  className="hover:text-blue-400 transition"
                >
                  Sessions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Connect
            </h3>

            <div className="flex gap-4 mb-5">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="text-2xl hover:text-white transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="text-2xl hover:text-blue-400 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:support@mentorconnect.com"
                className="text-2xl hover:text-red-400 transition"
              >
                <FaEnvelope />
              </a>
            </div>

            <p className="text-sm text-gray-400">
              support@mentorconnect.com
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {currentYear} MentorConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;