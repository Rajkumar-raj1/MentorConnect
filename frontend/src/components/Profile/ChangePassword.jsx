import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const ChangePassword = ({ loading = false, onSubmit }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ oldPassword: "", newPassword: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Old Password
          </label>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              className="w-full border rounded-lg pl-11 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            New Password
          </label>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full border rounded-lg pl-11 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;