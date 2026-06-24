import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import { BRANCHES, YEARS } from "../utils/constants";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
    college: "",
    branch: "",
    year: "",
    avatar: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Name, email and password are required");
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      setLoading(true);
      await register(data);
      toast.success("Registered successfully. Please login.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Join MentorConnect as a student or mentor
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full pl-11 pr-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full pl-11 pr-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full pl-11 pr-12 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
        >
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
        </select>

        <input
          name="college"
          value={formData.college}
          onChange={handleChange}
          placeholder="College"
          className="w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          >
            <option value="">Select Branch</option>
            {BRANCHES.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>

          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          >
            <option value="">Select Year</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year} Year
              </option>
            ))}
          </select>
        </div>

        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          className="w-full text-sm border rounded-lg px-4 py-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;