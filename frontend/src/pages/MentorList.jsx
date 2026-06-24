import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

import MentorCard from "../components/MentorCard";
import Loader from "../components/Loader";
import { getAllMentors, searchMentors } from "../api/mentorApi";
import { BRANCHES, GROUP_TOPICS } from "../utils/constants";

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    skill: "",
    company: "",
    branch: "",
  });

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const response = await getAllMentors();
      setMentors(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch mentors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const cleanFilters = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value) cleanFilters[key] = value;
      });

      const response =
        Object.keys(cleanFilters).length > 0
          ? await searchMentors(cleanFilters)
          : await getAllMentors();

      setMentors(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFilters({
      skill: "",
      company: "",
      branch: "",
    });

    fetchMentors();
  };

  if (loading) {
    return <Loader text="Fetching mentors..." />;
  }

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Find the Right Mentor
        </h1>

        <p className="mt-3 max-w-2xl text-blue-100">
          Search mentors by skills, company, branch, and expertise to get the
          right guidance for your career and placement preparation.
        </p>
      </section>

      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            name="skill"
            value={filters.skill}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          >
            <option value="">Select Skill</option>
            {GROUP_TOPICS.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="company"
            value={filters.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />

          <select
            name="branch"
            value={filters.branch}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          >
            <option value="">Select Branch</option>
            {BRANCHES.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <FaSearch />
              Search
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-3 border rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      {mentors.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No mentors found
          </h2>

          <p className="mt-2 text-gray-500">
            Try changing your filters or check again later.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </section>
      )}
    </div>
  );
};

export default MentorList;