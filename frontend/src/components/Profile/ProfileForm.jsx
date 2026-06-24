import { useEffect, useState } from "react";

const ProfileForm = ({
  user,
  loading = false,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    college: "",
    branch: "",
    year: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        college: user.college || "",
        branch: user.branch || "",
        year: user.year || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Profile Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Full Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full border rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* College */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            College
          </label>

          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="Enter your college"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Branch & Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Branch
            </label>

            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="CSE / ECE / IT"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Year
            </label>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="">Select Year</option>

              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Role
          </label>

          <input
            type="text"
            value={user?.role || ""}
            disabled
            className="w-full border rounded-lg px-4 py-3 bg-gray-100 capitalize cursor-not-allowed"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;