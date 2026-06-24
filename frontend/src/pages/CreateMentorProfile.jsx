import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loader from "../components/Loader";
import {
  createMentorProfile,
  getMyMentorProfile,
  updateMentorProfile,
} from "../api/mentorApi";

const CreateMentorProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    bio: "",
    company: "",
    position: "",
    experience: "",
    skills: "",
    expertise: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await getMyMentorProfile();
      const profile = response.data;

      setIsEditMode(true);

      setFormData({
        bio: profile.bio || "",
        company: profile.company || "",
        position: profile.position || "",
        experience: profile.experience || "",
        skills: profile.skills?.join(", ") || "",
        expertise: profile.expertise?.join(", ") || "",
        linkedin: profile.linkedin || "",
        github: profile.github || "",
        portfolio: profile.portfolio || "",
      });
    } catch {
      setIsEditMode(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const preparePayload = () => ({
    ...formData,
    experience: Number(formData.experience) || 0,
    skills: formData.skills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    expertise: formData.expertise
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    availableSlots: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (isEditMode) {
        await updateMentorProfile(preparePayload());
        toast.success("Mentor profile updated successfully");
      } else {
        await createMentorProfile(preparePayload());
        toast.success("Mentor profile created successfully");
        setIsEditMode(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading mentor profile..." />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">
          {isEditMode ? "Edit Mentor Profile" : "Create Mentor Profile"}
        </h1>

        <p className="mt-3 text-blue-100">
          Add your skills, experience, company details, and mentorship expertise
          so students can find and connect with you.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-5 sm:p-8 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            placeholder="Tell students about yourself..."
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Example: TCS"
              className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>
            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Example: Software Engineer"
              className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Years of experience"
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="DSA, React, Node.js"
              className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Separate skills with commas.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expertise
            </label>
            <input
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              placeholder="Placement, Resume Review"
              className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Separate expertise with commas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <input
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />

          <input
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />

          <input
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            placeholder="Portfolio URL"
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {saving
            ? "Saving..."
            : isEditMode
            ? "Update Mentor Profile"
            : "Create Mentor Profile"}
        </button>
      </form>
    </div>
  );
};

export default CreateMentorProfile;